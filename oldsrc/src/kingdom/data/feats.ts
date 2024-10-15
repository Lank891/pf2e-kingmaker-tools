import {capitalize} from '../../utils';
import {allSkills, Skill} from './skills';
import {Modifier} from '../modifiers';
import { Kingdom } from './kingdom';

export interface KingdomFeat {
    name: string;
    level: number;
    category: Skill | 'general'
    text: string;
    prerequisites?: string;
    automationNotes?: string;
    modifiers?: (kingdom: Kingdom) => Modifier[];
}


function generateForAllSkills(feat: KingdomFeat): KingdomFeat[] {
    return allSkills.map(skill => {

        return {
            ...feat,
            name: `${feat.name} (${capitalize(skill)})`,
        };
    });
}

export const allFeats: KingdomFeat[] = [
    {
        name: '-',
        level: 0,
        category: "general" as (Skill | 'general'),
        text: '',
    },
    /*{
        automationNotes: 'Vacancy role penalty removal is not automated',
        name: 'Civil Service',
        level: 1,
        text: `Everyone has a place and a role, and as long as those roles are filled, the government functions. When you
select this feat, choose one leadership role; that role is now supported by your efficient civil servants, so its vacancy penalty is no longer applicable. If you wish to change the leadership role to which Civil Service applies, you can do so using the New Leadership activity at the start of a Kingdom turn. You gain a +2 circumstance bonus to New Leadership checks.`,
        modifiers: [{
            name: 'Swapping Civil Service',
            enabled: false,
            value: 2,
            type: 'circumstance',
            activities: ['new-leadership'],
        }],
    },*/
    /*{
        name: 'Cooperative Leadership',
        level: 1,
        text: `Your leaders are skilled at working with one another. When a leader uses the Focused Attention kingdom
activity to aid another leader’s kingdom check, the circumstance bonus granted by a success is increased to +3.
At 11th level, your leaders’ collaborative style leads them to ever greater successes when they work together. When a leader uses the Focused Attention kingdom activity to aid another leader’s check, treat a critical failure on the aided check as a failure. If your kingdom has at least the expert rank in the skill used in the aided check, treat a failure on the check as a success. (This
does not allow you to ever improve a critical failure to a success.)`,
    },*/
    /*{
        name: 'Crush Dissent',
        level: 1,
        prerequisites: 'Trained in Warfare',
        text: `Your rule brooks no dissent and stamps out traitors, making harsh examples of them. Once per Kingdom
turn when you gain Unrest, you can attempt to crush the dissent by attempting a basic Warfare check. On a success, the Unrest increase is canceled, but on a critical failure, the Unrest increase is doubled. In addition, you gain a +1 circumstance bonus to checks to resolve dangerous kingdom events that involve internal bickering, such as Feud.`,
        modifiers: [{
            name: 'Dangerous Kingdom Event involving internal bickering',
            enabled: false,
            value: 1,
            type: 'circumstance',
            phases: ['event'],
        }],
    },*/
    /*{
        name: 'Fortified Fiefs',
        level: 1,
        prerequisites: 'Trained in Defense',
        text: `Your vassals take their duty to protect those under their stewardship seriously, and your engineers emphasize
the value of a strong defense when it comes to building settlements and fortifications. You gain a +2 circumstance bonus to checks attempted as part of the Fortify Hex activity and on activities to build or repair a Barracks, Castle, Garrison, Keep, Stone Wall, or Wooden Wall. In addition, you gain a +1 circumstance bonus to all kingdom checks attempted during dangerous events that directly impact
your settlements’ defenses.`,
        modifiers: [{
            name: 'Fortified Fiefs',
            type: 'circumstance',
            activities: ['fortify-hex'],
            enabled: true,
            value: 2,
        }, {
            name: 'Build or repair a Barracks, Castle, Garrison, Keep, Stone Wall, or Wooden Wall',
            type: 'circumstance',
            activities: ['build-structure'],
            enabled: false,
            value: 2,
        }, {
            name: 'Dangerous Event impacting settlement defenses',
            type: 'circumstance',
            phases: ['event'],
            enabled: false,
            value: 1,
        }],
    },*/
    {
        name: 'Insider Trading',
        level: 1,
        category: "industry" as (Skill | 'general'),
        prerequisites: 'Trained in Industry',
        text: `You facilitate the collaboration of business leaders behind the scenes to arbitrarily manipulate supply and demand for certain goods within your kingdom and surrounding lands. 
        As a Leadership activity, attempt an Industry control check. On a success, you gain +1 circumstance bonus to Establish Work Site, Establish Trade Agreement, and Trade Commodities for the remainder of the kingdom turn.
        If the kingdom is master in Industry, the bonus increases to +2, or to +4 if it is legendary. 
        On a critical success, you additionally gain a bonus Resource Die on your next kingdom turn. 
        On a critical failure gain 1 Unrest and take a –2 circumstance penalty to those activities for the success effect for the remainder of the turn.`,
    },
    /*{
        automationNotes: 'You need to manually increase the ruin thresholds',
        name: 'Muddle Through',
        level: 1,
        prerequisites: 'Trained in Wilderness',
        text: 'Your people are independent-minded and take care of the small things around the kingdom, not letting them pile up into bigger problems. Increase two of your Ruin thresholds by 1 and one of them by 2.',
    },*/
    /*{
        automationNotes: 'Hire Adventurers RP reduction is not implemented',
        name: 'Practical Magic',
        level: 1,
        prerequisites: 'Trained in Magic',
        text: `Magic has an honored place in your society, and your people incorporate it into their everyday work to make
life easier. You gain a +1 circumstance bonus to Magic checks, and you can use Magic checks in place of Engineering checks. In addition, as magic-wielding NPCs find your nation a comfortable place to live and work, you reduce the cost of using the Hire Adventurers activity to 1 RP.`,
        modifiers: [{
            name: 'Practical Magic',
            type: 'circumstance',
            skills: ['magic'],
            enabled: true,
            value: 1,
        }],
    },*/
    /*{
        automationNotes: 'Hire Adventurers RP reduction is not implemented',
        name: 'Practical Magic (V&K)',
        level: 1,
        prerequisites: 'Trained in Magic',
        text: `Magic has an honored place in your society, and your people incorporate it into their everyday work to make
life easier. You gain a +1 circumstance bonus to Magic checks, and if you have Expert Magic you gain a +1 circumstance bonus to Engineering checks. If you have Master Magic, this bonus increases to +2. In addition, as magic-wielding NPCs find your nation a comfortable place to live and work, you reduce the cost of using the Hire Adventurers activity to 1 RP.`,
        modifiers: [{
            name: 'Practical Magic',
            type: 'circumstance',
            skills: ['magic'],
            enabled: true,
            value: 1,
        }],
    },*/
    /*{
        automationNotes: 'Nothing automated',
        name: 'Pull Together',
        level: 1,
        prerequisites: 'Trained in Politics',
        text: `Your people are very reliable, and their swift decision‑making keeps most projects from getting too
far off track. Once per Kingdom turn when you roll a critical failure on a Kingdom skill check, attempt a DC 11 flat check. If this succeeds, your citizens heed the call to put in extra work to mitigate the disaster; treat the Kingdom skill check result as failure instead. The DC of this flat check increases by 5 each time you subsequently use it, but it decreases by 1 (to a minimum of 11) for each Kingdom turn that passes when you do not use it.`,
    },*/
    ...generateForAllSkills({
        // not automated: choose skill
        automationNotes: 'You need to manually increase the skill proficiency',
        name: 'Skill Training',
        level: 1,
        category: "general" as (Skill | 'general'),
        text: `Your kingdom receives the trained proficiency rank in a Kingdom skill of your choice. You can select this feat
multiple times, choosing a new skill each time. If taken at 6th level or higher, you may choose trained skill instead and your kingdom becomes
expert in it. It taken at 12th level or higher - expert may become master instead.`,
    }),
    {
        automationNotes: 'Decreasing Unrest is not automated',
        name: 'Endure Anarchy',
        level: 3,
        category: "general" as (Skill | 'general'),
        prerequisites: 'Loyalty 14',
        text: 'Your kingdom holds together even in the midst of extreme peril. If your kingdom’s Unrest is 6 or higher and you use a Quell Unrest activity, decrease the Unrest by an additional 1. You do not fall into anarchy unless your kingdom’s Unrest reaches 24',
    },
    /*{
        name: 'Inspiring Entertainment',
        level: 3,
        prerequisites: 'Culture 14',
        text: `Your kingdom’s artists and entertainers are talented and prolific, and there’s never a shortage of new plays, operas, novels, music, sculptures, paintings, or other forms of distraction to entertain the citizens, even during
times of upheaval. Your kingdom gains a +2 circumstance bonus to all Culture-based skill checks whenever your kingdom has at least 1 Unrest.`,
    },*/
    ...generateForAllSkills({
        name: 'Kingdom Assurance',
        level: 1,
        category: "general" as (Skill | 'general'),
        text: `Even when things go poorly in other areas, you can count on consistency in carrying out kingdom activities
with a chosen skill. Choose one Kingdom skill in which your kingdom is trained. Once per Kingdom turn, when you would attempt a skill check for that skill, you can forgo rolling and instead take a result equal to 10 + your proficiency bonus; do not apply any other bonuses, penalties, or modifiers to this result. Special You can select this feat multiple times. Each time, choose a different skill and gain the benefits of this feat for that skill.`,
    }),
    /*{
        automationNotes: 'Not automated',
        name: 'Liquidate Resources',
        level: 3,
        prerequisites: 'Economy 14',
        text: `Your kingdom’s economy can liquidate resources in an emergency when funding runs out. The first time during
a Kingdom turn in which you are forced to spend RP as the result of a failed skill check or a dangerous event, and that expense reduces you to 0 RP, you may instead reduce your RP to 1 and treat the expense as if it were paid in full. At the start of your next Kingdom turn, roll 4 fewer Resource Dice than normal.`,
    },*/
    /*{
        name: 'Quick Recovery',
        level: 3,
        prerequisites: 'Stability 14',
        text: 'Your kingdom recovers more quickly from danger and disaster. Whenever you attempt a skill check to end an ongoing harmful kingdom event, you gain a +4 circumstance bonus to the check.',
        modifiers: [{
            name: 'Ongoing Harmful Event',
            type: 'circumstance',
            enabled: false,
            phases: ['event'],
            value: 4,
        }],
    },*/
    /*{
        automationNotes: 'Re-rolling a failure or crit failure for 2 RP is not automated',
        name: 'Free and Fair',
        level: 7,
        text: 'Your reputation for transparency and fairness in conducting elections, appointments, and other changes in government inspires tremendous public trust. You gain a +2 circumstance bonus to Loyalty-based checks attempted as part of the New Leadership and Pledge of Fealty activities. If you fail or critically fail such a check, you can spend 2 RP to reroll the check (but without the +2 circumstance bonus); attempting this adds the Fortune trait. You must take the result of the second roll, even if it is worse than the original roll.',
        modifiers: [{
            name: 'Loyalty Based Skill',
            type: 'circumstance',
            abilities: ['loyalty'],
            activities: ['new-leadership'],
            enabled: true,
            value: 2,
        }, {
            name: 'Loyalty Based Skill',
            type: 'circumstance',
            abilities: ['loyalty'],
            activities: ['pledge-of-fealty'],
            enabled: true,
            value: 2,
        }],
    },*/
    {
        automationNotes: 'First time you get luxuries is not automated',
        name: 'Quality of Life',
        level: 7,
        category: "general" as (Skill | 'general'),
        text: 'Your kingdom’s robust economy makes the creature comforts of civilization more readily available to all, and even finer luxuries are more easily had. The first time you gain Luxury Commodities in a Kingdom turn, increase the total gained by 1. All of your settlements are treated as 1 level higher than their actual level for the purposes of determining what sorts of magic items might be offered for sale at their markets and shops.',
    },
    /*{
        automationNotes: 'You do not get 1 extra RP at the start of your next turn on a critical success',
        name: 'Fame and Fortune',
        level: 11,
        text: 'Your kingdom’s reputation has spread far and wide, bringing in visitors to behold the spectacle of your greatness and pay their respects. Whenever you achieve a critical success on any Kingdom skill check during the Activity phase of a Kingdom turn, gain 1 bonus Resource Die at the start of your next Kingdom turn.',
    },*/
    {
        name: 'Channel Locks',
        level: 2,
        category: "boating" as (Skill | 'general'),
        prerequisites: 'Expert in Boating, Trained in Engineering',
        text: `Your people are skilled in modifying or coping with
difficult terrain features, such as using channel locks for
steep elevation changes or rocky rapids. Choose a nonnavigable river within your kingdom, then spend 2 RP
and attempt an Engineering control check. You have a +1
circumstance bonus to this check; if the kingdom is at
least master in Boating, this bonus increases to +2, or to
+3 if it is legendary in Boating;

Critical Success As success, and you regain 1 RP;
Success The target river becomes navigable;
Failure The river remains non-navigable; however, you
do not need to pay the RP cost for the next Channel
Locks attempt made in this hex;
Critical Failure The river remains non-navigable and the
spent RP is lost`,
        modifiers: (kindgom : Kingdom) => [{
            name: 'Boating bonus',
            type: 'circumstance',
            activities: ['channel-locks'],
            value: kindgom.skillRanks.boating - 1,
            enabled: true
        } as Modifier],
    },
    {
        name: 'Mage Corps',
        level: 2,
        category: "magic" as (Skill | 'general'),
        prerequisites: 'Expert in Magic',
        automationNotes: 'No automation for Armies',
        text: `Some of your kingdom’s mages are studied in the
application of war magics. You can add Mage Corps
special units to your armies.

The Mage Corps special unit allows to use 2-action War Magic activity that deals damage to up to 3 armies 
or grants to their army temporary tactic that the army meets prerequicite for: Aerial Batalion, Aquatic Batalion, Darkvision or Flaming Shot.

War Magic can be used once per encounter, twice if your kingdom is legendatry in Magic.`
    },
    {
        name: 'Beast Mounts',
        level: 1,
        category: 'agriculture' as (Skill | 'general'),
        prerequisites: 'Trained in Agriculture',
        automationNotes: 'No automation for Armies',
        text: `Your ranchers are exceptionally talented, capable of
taming and raising wilder animals, such as bears, lions,
or wolves. When tamed, these beasts can serve as mounts
for the armies. You can add Bestial Mounts special units to your cavalry.

Bestial Mounts special unit grants army either Varied Weapons tactic, or +2 status bonus to melee attacks rolls (chosen when special unit is recruited).`
    },
    {
        name: 'Beasts of Burden',
        level: 1,
        category: 'agriculture' as (Skill | 'general'),
        prerequisites: 'Trained in Agriculture',
        text: `Your people use domesticated animals like horses, oxen,
and the like to make their work easier. With animals
serving as transport for people and goods, powering mills
and towing plows, the kingdom gains a +1 circumstance
bonus to Agriculture, Engineering, and Wilderness
checks; if your kingdom is a master in Agriculture, this
bonus increases to +2.`,
        modifiers: (kindgom : Kingdom) => [{
            name: 'Beasts of Burden',
            type: 'circumstance',
            skills: ["agriculture", "engineering", "wilderness"],
            value: kindgom.skillRanks.agriculture >= 3 ? 2 : 1,
            enabled: true
        } as Modifier],
    }
]
.sort((featA, featB) => featA.name.toLowerCase().localeCompare(featB.name.toLowerCase())) // Sort by name
.sort((featA, featB) => featA.level - featB.level) // Then by level
.sort((featA, featB) => {   // Then move it such that we have all normal feats, then skill trainings, then assurance
    const a = featA.name.toLowerCase();
    const b = featB.name.toLowerCase();

    const aIsSkillTraining = a.startsWith('skill training');
    const aIsKingdomAssurance = a.startsWith('kingdom assurance');
    const aIsNormal = !aIsSkillTraining && !aIsKingdomAssurance;

    const bIsSkillTraining = b.startsWith('skill training');
    const bIsKingdomAssurance = b.startsWith('kingdom assurance');
    const bIsNormal = !bIsSkillTraining && !bIsKingdomAssurance;

    if(aIsKingdomAssurance && bIsKingdomAssurance) // 2x assurrance = we don't touch
        return 0;
    if(aIsKingdomAssurance) // a is assurance = a is after b
        return 1;
    if(bIsKingdomAssurance) // b is assurance = b is after a
        return -1;

    // At this point no assurance

    if(aIsSkillTraining && bIsSkillTraining) // 2x skill training = we don't touch
        return 0;
    if(aIsSkillTraining) // a is skill training = a is after b
        return 1;
    if(bIsSkillTraining) // b is skill training = b is after a
        return -1;

    // At this point no assurance and no skill training = we don't touch
    return 0;
});

export const allFeatsByName = Object.fromEntries((allFeats)
    .map((feat) => [feat.name, feat]));

