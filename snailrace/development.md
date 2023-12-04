# Snailrace Rework for Integrations

Snailracing is split into parts, the Discord Bot and the Snailrace Server. The
server is the main point of processing and snail/race management. The Discord 
Bot is the original interaction point for users, though the server being 
seperate allows for other integrations for interactions. There are a handful of
features that the server must handle:

- **Scheduled Races**: 
        To start with, there will be a total of 5 locations of where races take
        place. Each location will have a total of 7 races a day with a random
        pool of snails to select from.

- **Placing Bets**:
        As the race schedule will always be available, bets can be made and 
        placed at the start of each day. Before a bet can be made, the user's 
        balance will be checked via the TAB Transaction API. 

- **Buy/Sell Snails**:
        When the user can afford it, they are able to buy their own snails. 
        These can be levelled up and customised, then can be traded or sold for
        more money.

- **Snail Registry**:
        Snails and their stats are stored in a snail registry. This will include
        it's current owner, level, attributes, active and unlocked abilities 
        etc.

- **Race Simulation**:
        The race simulation is invoked when a race starts, it takes the list of
        snails and a data channel. The simulation will send the state of each 
        snail every second until the race is finished.

<img class="rounded-lg" src="/snailrace/dev/simple_sketch.png" alt="image"/>

As mentioned before, the Discord bot is purely an interaction and UI point for
players. It interacts with the server via a series of API calls which include 
REST APIs for interaction requests, Websockets for live races, Webhooks for 
scheduled races and other events. The for Webhooks to work, the Discord bot will
need to have to subscribe to the events and supply a health API endpoint for the
Snailrace Server to check if it should still send Webhooks to that endpoint.

The bot and server will be written in Go and stored in different repos on the 
TABs Github. The server will have a SDK along side its core which can be 
imported into the Discord Bot and used to abstract calls. Logging will be setup
using Logrus and have a middleware to send to the TAB Loki instance for log 
aggregation.

## Project Milestones

Milestones will be tagged with [Semantic Versioning], and the following has been
planned as what needs to be developed. This will be generalised across the 
API Server and Discord Bot.

### 1.0.0 - A New Hope

This is the start of the project, the feature set will be very trimmed down and
also have things the current snailrace version doesn't have. There will be no
user interaction, instead only scheduled races will race in the Discord view:

- 3 Locations, the names, environmental status and track surface hasn't been
  decided but will be updated in the docs when they are.
- 7 Races per Location per Day, these will be various lengths and filled by an
  existing snail pool.
- 100 Starting snails, these are unowned and will remain for the rest of the 
  snailracing existance.
- 50 Random virtual betters will exist and place bets during the betting phase
  of the races. There will be no betting phase displayed.
- Races will be displayed and updated live (once a second), this should display
  the race the same way as the current snailrace does.
- User's can view the schedule
- A starting swagger file will be avaliable
- A Go SDK for API calls will be avaliable in the Snailrace Server Core

### 1.1.0 - Betting Your Life Away

In this release, betting will be added. New users will be registered with `100g`
of currency. This can be used to place bets on the scheduled races, though this
must be done on a per-day basis as the race schedules arent finalised until the
start of each day. The following are what need to be implemented:

- Allow users to register, this will check if the user has a balance or not and
  create a balance of 100g if none.
- User's are able to place bets on scheduled races that haven't been raced yet.
- The bets are able to be either `win` or `place` to start with.

> **Note**: If there is time, then other bet types can be implemented such as 
>           `each-way`, `trifecta`, `exacta` and/or `quinella`.

### 1.2.0 - Owning and Racing Snails

Assuming user's havent lost all their money yet, they are able to buy snails. A
snail can be bought for `100g` which will generate a random snail. User's can 
submit their snails to the race pool for scheduled races. This race pool is used
by the scheduled races to randomly select the snails which are going to be 
racing that day in their respected races. If the user's submitted snail wins 
then the owner will receive a portion of the prize pool.

- User's are able to buy snails which are added to the user's inventory.
- User's are able to submit their snails to the scheduled race pool.
- User's are able to recieve winnings if their snail wins the races.
- User's can view a cards of their snails and other peoples snails
- Snails will gain experience, levels and skill points. Though none of this will
  be useable until later.

### 1.3.0 - Private Races

Private races are the only features that are in the current snailrace (alongside
betting). But we are going to introduce it at this stage due to the ability to
thoroughly test the betting and racing logic before people get too upset. The 
difference is in the flavour of the tracks. On joining a race, the player can
vote for a race track, the most votes will be the track that the race is at 
(otherwise it will be a random pick).

- User's can Host a race with flags of `auto-fill` and `no-bets`.
- User's can set a snail from their inventory as their active snail.
- User's can join races with their active snail and vote for a race track.
- The virtual bets will be placed before user bets are open, this will set the 
  fixed odds for the snails.
- The same bets for schedules can be made on these private races.

### 1.4.0 - Skills and Items

Finally, money and levels actually mean something. Each snail species will have
a form of skill tree which skill points can be spent to unlock skills/abilities
on the tree. Only 2 skills can be active at a time, so they should be used 
wisely. Items will also be added to the game, these will mainly be consumables
which can be used to fill an item slot for the snail for a race. 

- Snails which have skillpoints to spare can be used to buy up the skill tree.
- A shop catelogue will be viewable and allow users to buy items. The snail 
  purchasing will also be moved to the shop.
- Snails will also be able to be sold at the shop for money proportionally per
  level.
- Items can be bought and applied to snails in the users inventory.
- 2 Skills can be applied to snails.

