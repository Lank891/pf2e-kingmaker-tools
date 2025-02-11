package at.posselt.pfrpg2e.macros

import at.posselt.pfrpg2e.actor.hasFeat
import at.posselt.pfrpg2e.actor.investedArmor
import at.posselt.pfrpg2e.actor.partyMembers
import at.posselt.pfrpg2e.actor.proficiency
import at.posselt.pfrpg2e.app.awaitablePrompt
import at.posselt.pfrpg2e.app.forms.FormElementContext
import at.posselt.pfrpg2e.app.forms.RadioInput
import at.posselt.pfrpg2e.app.forms.Select
import at.posselt.pfrpg2e.app.forms.SelectOption
import at.posselt.pfrpg2e.app.forms.formContext
import at.posselt.pfrpg2e.app.prompt
import at.posselt.pfrpg2e.camping.findCurrentRegion
import at.posselt.pfrpg2e.camping.getCamping
import at.posselt.pfrpg2e.camping.getCampingActor
import at.posselt.pfrpg2e.data.actor.Proficiency
import at.posselt.pfrpg2e.data.checks.DegreeOfSuccess
import at.posselt.pfrpg2e.data.regions.Terrain
import at.posselt.pfrpg2e.fromCamelCase
import at.posselt.pfrpg2e.utils.asSequence
import at.posselt.pfrpg2e.utils.postChatTemplate
import com.foundryvtt.core.Actor
import com.foundryvtt.core.AnyObject
import com.foundryvtt.core.Game
import com.foundryvtt.core.ui
import com.foundryvtt.pf2e.actions.CheckDC
import com.foundryvtt.pf2e.actions.SingleCheckActionUseOptions
import com.foundryvtt.pf2e.actor.PF2ECharacter
import com.foundryvtt.pf2e.pf2e
import js.objects.recordOf
import kotlinx.coroutines.await
import kotlinx.js.JsPlainObject

@JsPlainObject
private external interface SenseDirectionData {
    val skill: String
    val dc: Int
}

@JsPlainObject
private external interface AskActorSenseDirectionSubmitData {
    val name: String
}

@JsPlainObject
private external interface AskActorSenseDirectionContext {
    val formRows: Array<FormElementContext>
}

private suspend fun selectActor(choices: List<PF2ECharacter>): PF2ECharacter? {
    return awaitablePrompt<AskActorSenseDirectionSubmitData, PF2ECharacter?>(
        title = "Select Character",
        templatePath = "components/forms/form.hbs",
        templateContext = AskActorSenseDirectionContext(
            formRows = choices
                .sortedBy { it.name }
                .mapIndexed { index, actor ->
                    RadioInput(
                        name = "name",
                        label = actor.name,
                        value = actor.name,
                        checked = index == 0,
                    ).toContext()
                }.toTypedArray()
        ).unsafeCast<AnyObject>(),
    ) { data ->
        choices.find { actor -> actor.name == data.name }
    }
}

suspend fun senseDirectionMacro(game: Game, actor: Actor?) {
    val chosenActor = if (actor is PF2ECharacter) {
        actor
    } else {
        val ownedActors = game.partyMembers()
            .filter { it.isOwner }
        if (ownedActors.size == 1) {
            ownedActors.first()
        } else if (ownedActors.size > 1) {
            selectActor(ownedActors)
        } else {
            null
        }
    }
    if (chosenActor == null) {
        ui.notifications.error("Please select a Character")
        return
    }
    val camping = game.getCampingActor()?.getCamping()
    val skills = chosenActor.skills.asSequence()
        .map { SelectOption(label = it.component2().label, value = it.component1()) }
        .toList()
    val currentRegion = camping?.findCurrentRegion()
    val defaultDc = currentRegion?.zoneDc ?: 15
    val defaultSkill = "survival"
    prompt<SenseDirectionData, Unit>(
        title = "Sense Direction",
        templatePath = "components/forms/form.hbs",
        templateContext = recordOf(
            "formRows" to formContext(
                Select(
                    name = "skill",
                    label = "Skill",
                    options = skills,
                    value = defaultSkill,
                ),
                Select.dc(
                    name = "dc",
                    label = "DC",
                    value = defaultDc,
                )
            )
        )
    ) {
        val options = SingleCheckActionUseOptions(
            difficultyClass = CheckDC(value = it.dc),
            rollOptions = arrayOf("action:sense-direction"),
            statistic = it.skill,
            actors = arrayOf(chosenActor),
        )
        val result = game.pf2e.actions.get("sense-direction")?.use(options)?.await()?.firstOrNull()
        val degree = fromCamelCase<DegreeOfSuccess>(result?.outcome!!)!!
        postChatTemplate(
                templateContext = recordOf(
                    "succcess" to degree.succeeded(),
                ),
                templatePath = "chatmessages/sense-direction.hbs",
                speaker = chosenActor
            )
    }
}