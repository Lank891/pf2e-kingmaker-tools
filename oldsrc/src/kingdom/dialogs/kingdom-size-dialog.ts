import {kingdomSizeData} from '../data/kingdom';
import {capitalize} from '../../utils';

class KingdomSizeDialog extends Application {

    /** @inheritdoc */
    static get defaultOptions(): ApplicationOptions {
        return foundry.utils.mergeObject(super.defaultOptions, {
            template: 'modules/pf2e-kingmaker-tools/templates/kingdom/kingdom-size-help.hbs',
            classes: ['dialog'],
            width: 'auto',
            jQuery: false,
        });
    }

    getData(): object | Promise<object> {
        return {
            data: kingdomSizeData.map(s => {
                return {
                    size: s.sizeFrom + (s.sizeTo ? '-' + s.sizeTo : ''),
                    type: capitalize(s.type),
                    dice: '1' + s.resourceDieSize,
                    modifier: '+' + s.controlDCModifier,
                    storage: s.commodityCapacity,
                    requiredMetropolises: s.requiredMetropolises,
                    requiredCities: s.requiredCities,
                    requiredTowns: s.requiredTowns,
                    requiredVillages: s.requiredVillages
                };
            }),
        };
    }
}

export function kingdomSizeDialog(): void {
    new KingdomSizeDialog().render(true);
}