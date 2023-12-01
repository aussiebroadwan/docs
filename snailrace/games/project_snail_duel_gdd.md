# Project Snail Duel

Project Snail Duel is a discord game that allows players to challenge each 
other in strategic and thrilling battles using their snails and items from 
their inventory. The game is inspired by the world of snail racing, where 
remarkable snails and their racers compete for glory and fame. The game is 
also connected to the story of the police taskforce that fights against illegal 
snail racing, where only the best snails and operators are selected to join the 
program.

The game combines the excitement of snail racing with the strategy of 
deck-building. It showcases the different snail breeds and their abilities, 
as well as the environmental features and hazards of the arenas. It challenges 
the players to create and customise their snail squads and items, to take 
advantage of the arena's environment and combatting other snails. It connects 
the players to the world and the story of snail racing, and to the community 
of snail enthusiasts.

## Gameplay

There are two stages to the gameplay, theres deck building and then there is 
dueling. The deck building requires the user to select 3 snails and 2 item 
cards. Similar to normal snailracing, snails can have upto 2 abilities selected
which the snail can use during the battle. Snails and items dont get used up as
they act as cards, these can be traded. The Dueling gameplay is divided into the
following phases:

1. **Preperation Phase**: 
        Once the 2 players accept the duel, the players are able to each select
        what arena/map they want to battle at and their deck/sqaud to battle 
        with. Once both players ready up, it will move to the next phase.
2. **Betting/Display Phase**:
        Once the preperation phase is done, a random map will be selected from
        the two options the 2 players nominated. This will display the chosen
        arena/map and display both decks.
3. **Duel Phase**:
        A battle will simulate between the snails, there will be no graphic for
        this. The game card in Discord will display an actively updating 
        activity feed of items used, attacks done + damage, if snails get 
        knocked out etc.
4. **Reward Phase**:
        The rewards for this duel will be different depending on what type of 
        duel it was. If it was a ranked duel, then it will increase the rank
        proportionally to the difference between the 2 players as well as a 50g
        reward. If it was a casual duel, then it will increase the expereince
        of the player and snails, there is also a very low chance of finding
        a item card.

To initiate a duel, one player must use the `/snailduel <player2> [ranked]` 
command. This will send a duel request to player 2 to accept or deny. On 
accept, then the preperation phase will start.

## Maps and Arenas

The maps haven't been decided yet, but the way they should function is as 
follows. Each map/arena should have 3 different features which can affect the
play of the duel. These are an environmental passive effect, a chance of an 
active environmental effect and a map design feature (open space, hiding spots,
mountians, forrests, or buildings etc.) An example game card which displayed 
map and effect is the following:

```
This duel is between @player1 and @player2, it is hosted at **Frozen Peaks** so 
pick your squads wisely.

- Cold Environment
- Possible Blizzard
- Alpine Forrest Terrain
```

This means that if the squads have snails who are weak to cold will have 
disadvantage against enemy snails. A blizzard may or may not occur as it says 
"possible", if it does happen then visibility will go down to near zero making 
only short range/direct attacks to be possible, only the Chillshell wont be 
affected, while others snail types (if a winter jacket item isnt int he squad) 
may take damage. The alpine forrest give chance for many hiding spots, allowing 
trap items to be more effective and causing issue for snails that have long 
range attacks.


## Item Cards

Items cards can be bought, traded or found. These can be collected and used 
accordingly during duels, which can help with your snails survival or cause more
damage to the enemy snails. The card types are as follows:

- **Offensive**:
        Increases the attack hit, damage or crit chance. This could be
        environmental specific or a general upgrade.
- **Defensive**:
        Increases your snails defensive ability, this could be a winter jacket
        to protect your snails against environmental blizards or a flashing 
        badge which puts off the enemy snails focus to hit your snail.
- **Traps**:
        Traps can be placed by your snails to either damage or capture enemy 
        snails. Some of the most powerful traps like salt pits could do massive
        damage, but also could hurt your snail if it gets confused.
- **Support**:
        Support items are single use per duel, they can up your snails chances
        of winning a confrontation by applying a health pack. It could also be
        recon items to help your snails identify enemies before they find you.



