package at.posselt.pfrpg2e.migrations.migrations

import com.foundryvtt.core.Game

class Migration20 : Migration(20)
{
    override suspend fun migrateKingdom(game: Game, kingdom: dynamic) {
        kingdom.leaders.ruler.proficientSkills = arrayOf("industry", "intrigue", "politics", "statecraft", "warfare")
        kingdom.leaders.ruler.requiredCharacterSkills = arrayOf("deception", "diplomacy", "intimidation", "performance", "society")
    
        kingdom.leaders.counselor.proficientSkills = arrayOf("arts", "folklore", "politics", "scholarship", "trade")
        kingdom.leaders.counselor.requiredCharacterSkills = arrayOf("deception", "diplomacy", "performance", "religion", "society")

        kingdom.leaders.general.proficientSkills = arrayOf("boating", "defense", "engineering", "exploration", "warfare")
        kingdom.leaders.general.requiredCharacterSkills = arrayOf("athletics", "crafting", "diplomacy", "intimidation", "survival")

        kingdom.leaders.emissary.proficientSkills = arrayOf("intrigue", "magic", "politics", "statecraft", "trade")
        kingdom.leaders.emissary.requiredCharacterSkills = arrayOf("deception", "diplomacy", "intimidation", "stealth", "thievery")

        kingdom.leaders.magister.proficientSkills = arrayOf("defense", "folklore", "magic", "scholarship", "wilderness")
        kingdom.leaders.magister.requiredCharacterSkills = arrayOf("arcana", "diplomacy", "nature", "occultism", "religion")

        kingdom.leaders.treasurer.proficientSkills = arrayOf("arts", "boating", "industry", "intrigue", "trade")
        kingdom.leaders.treasurer.requiredCharacterSkills = arrayOf("crafting", "diplomacy", "medicine", "nature", "society")

        kingdom.leaders.viceroy.proficientSkills = arrayOf("agriculture", "engineering", "industry", "scholarship", "wilderness")
        kingdom.leaders.viceroy.requiredCharacterSkills = arrayOf("crafting", "diplomacy", "medicine", "nature", "society")

        kingdom.leaders.warden.proficientSkills = arrayOf("agriculture", "boating", "defense", "exploration", "wilderness")
        kingdom.leaders.warden.requiredCharacterSkills = arrayOf("athletics", "diplomacy", "nature", "stealth", "survival")
    }
}