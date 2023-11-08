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

## Finance System

the server, and the Finance System will serve as the backbone for managing and
tracking user finances across the integrated games and apps. It will include 
functionalities to monitor how much money each user has within the server and 
enable the seamless sharing of these funds among all integrated applications.
Additionally, this system will be responsible for handling alternative methods
of acquiring funds for users, ensuring a comprehensive and versatile approach 
to managing financial resources in the Aussie BroadWAN discord channel 
ecosystem.

In the event of a app/game crashing, it would be good to have a system in place
which can rollback transactions. This will be done via the use of `events`, 
transcations must be linked to an event which must be periodically pinged until
closed. If an event goes 1 minute without having been pinged, it will refund all
transactions.

### Create an Event

```bash
curl --location --request POST '{{host}}/finance/event' \
--header 'Authorization: Bearer {{api_token}}'
```

This will respond with an `{ "event_id": 12 }` which must be used in pings and
relevant transcations.

### Ping an Event

```bash
curl --location --request POST '{{host}}/finance/event/12/ping' \
--header 'Authorization: Bearer {{api_token}}'
```

Events must be pingged periodically within a 1 minute interval. If there a ping
hans't been made within that time, the event is automatically closed and the 
transactions have been returned.

### Close an Event

```bash
curl --location --request POST '{{host}}/finance/event/12/close' \
--header 'Authorization: Bearer {{api_token}}'
```

Closing an event means that all transactions made within that event are 
finalised.

### Making a Transaction

```bash
curl --location --request POST '{{host}}/finance/transaction' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{api_token}}' \
--data '{
    "user_id": 169015299834642432,
    "event_id": 12,
    "type": "credit",
    "amount": 15,
    "description": "test transaction"
}'
```

This transaction is linked to event 12, which will be finalised when the event
is closed. The event will be redacted if the event isn't closed properly. 
