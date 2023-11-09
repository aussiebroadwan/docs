<script setup>
    import DbTable from '@/components/DbTable.vue'

    const system_scheme = {
      "users": [
        { name: "id", type: "INTEGER", description: "The Discord ID of the User" },
        { name: "balance", type: "INTEGER", description: "The user's balance" },
      ],
      "apps": [
        { name: "id", type: "INTEGER", description: "The Discord ID of the User" },
        { name: "name", type: "TEXT", description: "Name of the App or Game" },
        { name: "description", type: "TEXT", description: "What is the purpose of this app?" },
        { name: "api_key", type: "TEXT", description: "API Key for the App, yes very secure" },
        { name: "deactivated_at", type: "DATETIME*", description: "If not null, then the app is disabled" },
      ]
    };

    const finance_scheme = {
      "events": [
        { name: "id", type: "INTEGER", description: "The primary key of the event" },
        { name: "last_ping", type: "DATETIME", description: "The last time the event was pinged" },
        { name: "description", type: "TEXT", description: "Description about the event" },
        { name: "app_id", type: "INTEGER", description: "The App that created the event" },
      ],
      "transactions": [
        { name: "id", type: "INTEGER", description: "The primary key of the transaction" },
        { name: "user_id", type: "INTEGER", description: "The foreign key of the user" },
        { name: "event_id", type: "INTEGER", description: "The foreign key of the event" },
        { name: "type", type: "TEXT", description: "The type of transaction (CREDIT or DEBIT)" },
        { name: "amount", type: "INTEGER", description: "The amount of the transaction" },
        { name: "description", type: "TEXT", description: "Description about the transaction" },
      ],
    };

    const achievement_scheme = {
      "badges": [
        { name: "id", type: "INTEGER", description: "The primary key of the badge" },
        { name: "app_id", type: "INTEGER", description: "The App this badge is for" },
        { name: "name", type: "TEXT", description: "Name of the badge" },
        { name: "description", type: "TEXT", description: "Description text of the badge" },
        { name: "target_value", type: "INTEGER", description: "What value does the user need to symbolise as completed" },
        { name: "reward_money", type: "INTEGER", description: "Does the user get any reward money?" },
        { name: "graphic", type: "TEXT", description: "Base64 encoded 1024x1024 graphic badge for the badge" },
      ],
      "user_badges": [
        { name: "id", type: "INTEGER", description: "The primary key of the user's badge" },
        { name: "badge_id", type: "INTEGER", description: "Achivement this progress is for" },
        { name: "user_id", type: "INTEGER", description: "User this progress is for" },
        { name: "value", type: "INTEGER", description: "Current progress value" },
        { name: "completed_time", type: "DATETIME*", description: "When was the badge completed" },
        { name: "last_updated_time", type: "DATETIME", description: "When was the badge last progressed" },
      ]
    };

</script>

# System Design

The Aussie BroadWAN discord channel is designed to have a bunch of integrated 
games and apps which can be interfaced in and out of the Discord Clients. The 
key features we need to centralise and allow the ability to be shared across 
the different games and apps are:

- **Finance System**: How much money does the user have in the server, share 
  the funds too all integrations.
- **Achievement System**: Allow applications to register achievements and 
  manage the user's progress with them to assign badges and flex their skill.

::: info NOTE
This system will also need to handle alternative means of getting funds for 
users outside of the integrated games and apps.
:::

When an game or app has been registered to the system, it will receive an API
key. This API key must be used for all API calls, this will allow achievements
to be registered per application with the right tracking as well as tracing
back transactions.

Both finance and achievement systems will utilise the global system scheme. 
New users that haven't been scene will be auto added to the database with their
Discord ID.

<DbTable :data="system_scheme" />

> Types postfixed with `*` are nullable eg. `DATETIME*`

## Finance System

The Finance System is a core component of the Aussie BroadWAN discord channel, 
and the Finance System will serve as the backbone for managing and tracking 
user finances across the integrated games and apps. It will include 
functionalities to monitor how much money each user has within the server and 
enable the seamless sharing of these funds among all integrated applications. 
Additionally, this system will be responsible for handling alternative methods 
of acquiring funds for users, ensuring a comprehensive and versatile approach 
to managing financial resources in the Aussie BroadWAN discord channel 
ecosystem.

In the event of a app/game crashing, it would be good to have a system in place 
which can rollback transactions. This will be done via the use of events, 
transactions must be linked to an event which must be periodically pinged until 
closed. If an event goes 1 minute without having been pinged, it will refund 
all transactions.

The Finance System will expose a RESTful API using gin, a lightweight web 
framework for Go. The API will have the following endpoints:

- `POST /api/v1/finance/event` Create an event for transactions which will 
  return the event id eg. `{ "event_id": 12 }`
- `POST /api/v1/finance/event/<event_id>/ping` Lets the system know the event 
  is still open
- `POST /api/v1/finance/event/<event_id>/close` Lets the system know the event 
  is closed and all attached transactions are finalised.
- `POST /api/v1/finance/transaction` create a transaction with the required 
  following JSON body 

```json
{
    "user_id": 169015299834642432, // Discord User ID
    "event_id": 12,
    "type": "credit",
    "amount": 15,
    "description": "test transaction"
}
```

The API will also use swagger-go, a tool to automatically generate swagger 
documentation from code comments. The swagger UI will be served at 
`/swagger/*any` endpoint.

The Finance System will use sqlite, a self-contained, serverless, 
zero-configuration SQL database engine, to store the data for events, 
transactions and users. The database will have three tables: events, 
transactions and users, with the following schema:

<DbTable :data="finance_scheme" />

> Types postfixed with `*` are nullable eg. `DATETIME*`

## Achievement System

The Achievement System is another core component of the Aussie BroadWAN discord 
channel, and the Achievement System will allow applications to register 
achievements and manage the user's progress with them to assign badges and flex 
their skill. It will include functionalities to create, update and query 
achievements, as well as to reward users for completing achievements with 
money and graphics.

The Achievement System will also expose a RESTful API using gin, with the 
following endpoints:

- `POST /api/v1/achievement/register` Using the following json body register a 
  new achievement to system which can be used by the app/game linked to the API 
  key.

```json
{
    "name": "Legendary monkey",
    "description": "You've officially done some amazing things in the channel and have been recognised",
    "target_value": 100,
    "reward_money": 10,
    "graphic": "" // base64 image
}
```

- `POST /api/v1/achievement/<achievement_id>` increase the user's progress of a 
  given achievement, use the following json body:

```json
{
    "user_id": 169015299834642432, // Discord ID
    "value": 5 // Value to increment
}
```

The API will also use swagger-go to generate the swagger documentation, which 
will be served at the same endpoint as the Finance System.

The Achievement System will use the same sqlite database as the Finance System, 
but with two additional tables: apps and achievements, with the following 
schema:

<DbTable :data="achievement_scheme" />

> Types postfixed with `*` are nullable eg. `DATETIME*`

The Achievement System will implement the logic to update the user's progress 
on the achievements by querying and updating the database. If the user 
completes an achievement, it will also reward the user with money and graphic, 
and update the user's balance accordingly.