package at.posselt.pfrpg2e.migrations.migrations

import com.foundryvtt.core.Game

class Migration21 : Migration(21)
{
    override suspend fun migrateKingdom(game: Game, kingdom: dynamic) {
        kingdom.leaders.ruler.expertise = 0
        kingdom.leaders.ruler.performedActivityInTurn = false
    
        kingdom.leaders.counselor.expertise = 0
        kingdom.leaders.counselor.performedActivityInTurn = false

        kingdom.leaders.general.expertise = 0
        kingdom.leaders.general.performedActivityInTurn = false
        
        kingdom.leaders.emissary.expertise = 0
        kingdom.leaders.emissary.performedActivityInTurn = false
        
        kingdom.leaders.magister.expertise = 0
        kingdom.leaders.magister.performedActivityInTurn = false
        
        kingdom.leaders.treasurer.expertise = 0
        kingdom.leaders.treasurer.performedActivityInTurn = false
        
        kingdom.leaders.viceroy.expertise = 0
        kingdom.leaders.viceroy.performedActivityInTurn = false
        
        kingdom.leaders.warden.expertise = 0
        kingdom.leaders.warden.performedActivityInTurn = false
    }
}