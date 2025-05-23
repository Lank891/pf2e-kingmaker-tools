# PFRPG 2e: Kingdom Building, Camping & Weather

This module ships all OGL licensed rules to run the Kingdom, Camping and Weather rule systems for the most popular adventure for PFRPG 2e.

**Documentation is included in a journal inside FoundryVTT!**

## Lank's Homebrew Changes
- Changes V&K xp for new hexes, events, and RP (they are smaller).
- Added kingdom activities from this repo homebrew propositions.
- Added camping activities: Influence Companion, Discover Companion, Provide Aid, Relax, Resourceless Healing.
- Capital of the kingdom can have more lots (which is not tracked) - reduced level to match max level of village/town/city even though there are more lots used, but increased consumption as it would be higher tier. Minimal influence of the capital is 1.
- Removed non-V&K versions of buildings.
- Changed some camping css to work with Pathfinder UI v3.
- Added camping setting that adds flat amount of rations consumption.
- Changed Unrest to have penalties at 1, 4, 8 and 12 instead of 1, 5, 10, 15. Anarchy starts at 16 inestead of 20. Anarchy with Endure Anarchy feat starts at 19 inestead of 24. Ruin and losing hexes starts at 8 insetad of 10. Rebalanced unrest activities.
- Event check starts at 11 rather than 16.
- Kingdom feats each level instead of once per 2 levels, slot for 1st-level feat.
- Unified Creative and Supernatural solution to have the same downsides. Both are decided before rolling the check and better result is used. Creative solution rolls the same skill but second roll has +2 circumstance bonus. Supernatural solution rolls Magic, but does not add any bonus apart from proficiency+ability.
- Some feats are different than in original rules and there are more of them, including some activities related to those feats. Only relevant in my campaign will be done.
- Changed some kingdom activities to better match homebrew I'm using.
- Increase Control DC for level 1-4 to match dc by level table.
- Buildings that give bonuses to earn income increase the effective settlement level for the purposes of calculating earn income task level.
- Macro for Sense Direction.
- Some custom buildings.
- Activity item bonuses from buildings are calculated from all cities, not only active city + capital.
- Fame is now Crisis Points and is generated on critical failures instead of on critical successes.
- Control DC has no penalty for size, size instead limits leadership activities if not enough towns are present; if not met the amount of lieadership activities is halved.
- Invested leadership role bonus is applied only to leadership activities.
- Caps for the amount of master and legendary proficiencies (not forced since trainings are not automated).
- [WIP] Leadership rework:
    - Base leadership bonus is +2
    - Characters must have enough skills for their role at given kingdom level or their bonus is lower (NPC only scales with their level agains level of kingdom)
    - Each leader makes one leadership activity, if skill is matching for their role they apply their bonus, otherwise -2
    - For events leader always apply their bonus

## Licensing

All PFRPG 2e content uses the [Open Gaming License](./OpenGameLicense.md). If you find non OGL content, please file an
issue and I'll get it removed ASAP. I've tried my best to scrub existing content, but there might still be leftovers.

The source code is licensed under the AGPLv3 license, except for
the [src/jsMain/kotlin/com/foundryvtt](./src/jsMain/kotlin/com/foundryvtt) folder which is licensed
under [Apache License 2.0](./src/jsMain/kotlin/com/foundryvtt/LICENSE).

All images in the [img/structures](./img/structures) and [img/camping/backgrounds](./img/camping/backgrounds) are
licensed under [CC0 - Public Domain](https://creativecommons.org/publicdomain/zero/1.0/)
by [Mark Pearce](https://github.com/MarkPearce). They
were [generated and retouched using a MidJourney subscriber account](https://github.com/BernhardPosselt/pf2e-kingmaker-tools/issues/76).
According to their [Terms of Service](https://docs.midjourney.com/docs/terms-of-service), subscribers to MidJourney that
are not part of a company own all the generated images.

## Installation

The package is available through the [module registry](https://foundryvtt.com/packages/pf2e-kingmaker-tools)

## Functionality

This module ships with implementations for all the extra mechanics provided in the best sandbox PFRPG 2e adventure,
including optional and popular homebrew from Vance & Kerenshara:

* Camping Sheet
* Kingdom Sheet
* Weather
* Combat Tracks

### House Rules & GM Tips

You can look up my tips and house rules [here](./docs/house-rules.md)

### Official Module Integration

If you've enabled the official module, the following things are automatically taken care of:

* Token Mappings for all companions and structures except for a few exceptions (see Manual journal)
* Weather Sound Effects for rain, rainstorms, blizzard and snow
* Default and Region combat tracks
* Rolltable integration for:
    * Kingdom Events
    * Random Encounters
    * Cult Events

### Screenshots

![kingdom-sheet.png](./docs/images/kingdom-sheet.png)

![settlements.png](./docs/images/settlements.png)

![camping sheet](./img/camping/docs/camping-activities.webp)

## Development

If you are interested in hacking on the code base, take a look at the [Kotlin JS Primer](./docs/Kotlin%20JS%20Primer.md)
for a quick intro on how to interact with the js api.

### Setup

Install the following things:

* JDK 21
* git
* node
* yarn

First, clone the repository into a local folder, e.g. **/home/bernhard/dev**:

    cd /home/bernhard/dev
    git clone https://github.com/BernhardPosselt/pf2e-kingmaker-tools.git 

Then link this directory to your foundry data folder:

    ln -s /home/bernhard/dev/pf2e-kingmaker-tools/ /home/bernhard/.local/share/FoundryVTT/Data/modules/pf2e-kingmaker-tools/

Run the package task to build everything from scratch:

    ./gradlew build

Then, you can keep building the project using:

    ./gradlew assemble

or if you want to both build it and run its tests:

    ./gradlew build

To execute tests run:

    ./gradlew jsTest

Finally, start foundry

    cd dev/FoundryVTT-12.330/
    ./foundryvtt

You can release a new version using:

    GITHUB_TOKEN="token_here" FOUNDRY_TOKEN="token_here" ./gradlew release

### Enable Schema Autocompletion Support in IntelliJ

Some files are in JSON rather than actual code. To get autocompletion for these in IntelliJ, you need to enable custom
schemas.

In settings, go to **Languages & Frameworks > Schemas and DTDs > JSON Schema Mappings**.

Click on the + to add a new mapping for each schema. Then add the following (see a list of values further down below):

* **Name**: Name of the Schema
* **Schema file or URL**: Path to the Schema file in [./schemas/](./schemas/)
* **Schema Version**: Always **JSON Schema version 7**
* Then click on the **+** below and **Directory**

Schemas:

* Recipes:
    * **Name**: Recipes
    * **Schema file or URL**: schemas/recipes.json
    * **Directory**: data/recipes
* Structures:
    * **Name**: Structures
    * **Schema file or URL**: schemas/structures.json
    * **Directory**: data/structures
* Camping Activities:
    * **Name**: Camping Activities:
    * **Schema file or URL**: schemas/camping-activities.json
    * **Directory**: data/camping-activities