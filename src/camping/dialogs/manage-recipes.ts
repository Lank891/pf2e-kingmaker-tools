import {Rarity, RecipeData} from '../recipes';
import {createUUIDLink, escapeHtml, parseCheckbox} from '../../utils';

interface ManageRecipesOptions {
    recipes: RecipeData[];
    learnedRecipes: Set<string>;
    onSubmit: (learnedRecipes: Set<string>, deletedRecipes: Set<string>) => Promise<void>
}

export interface ViewRecipeData {
    learned: boolean;
    recipe: string;
    recipeName: string;
    cookingLoreDC: number;
    ingredients: string;
    price: string;
    rarity: Rarity,
    level: number;
    name: string;
    isHomebrew: boolean;
}

export async function toTemplateRecipe(recipe: RecipeData, learnedRecipes: Set<string>): Promise<ViewRecipeData> {
    return {
        learned: learnedRecipes.has(recipe.name),
        name: recipe.name,
        recipe: await TextEditor.enrichHTML(createUUIDLink(recipe.uuid, recipe.name)),
        recipeName: recipe.name,
        cookingLoreDC: recipe.cookingLoreDC,
        ingredients: `Basic: ${recipe.basicIngredients * 2}, Special: ${recipe.specialIngredients * 2}`,
        price: recipe.cost,
        rarity: recipe.rarity,
        level: recipe.level,
        isHomebrew: recipe.isHomebrew ?? false,
    };
}

function tpl(data: ViewRecipeData[]): string {
    return `
        <form class="camping-dialog">
            <table class="km-table">
                <tr>
                    <th>Name</th>
                    <th>Rarity</th>
                    <th>Level</th>
                    <th>DC</th>
                    <th>Learning Cost</th>
                    <th>Purchase Cost</th>
                    <th>Learned</th>
                    <th>Delete</th>
                </tr>
                ${data.map((r, index) => {
        return `<tr>
                        <td>${r.recipe}</td>
                        <td>${escapeHtml(r.rarity)}</td>
                        <td>${r.level}</td>
                        <td>${r.cookingLoreDC}</td>
                        <td>${escapeHtml(r.ingredients)}</td>
                        <td>${escapeHtml(r.price)}</td>
                        <td><input type="checkbox" name="add-${index}" ${r.learned ? 'checked' : ''} ${r.name === 'Basic Meal' || r.name === 'Hearty Meal' ? 'disabled' : ''}></td>
                        <td><input type="checkbox" name="delete-${index}" ${r.isHomebrew ? '' : 'disabled'}></td>
                    </tr>`;
    }).join('\n')}
            </table>
        </form>
        `;
}

export async function manageRecipesDialog(options: ManageRecipesOptions): Promise<void> {
    const recipes = [...options.recipes];
    recipes.sort((a, b) => a.name.localeCompare(b.name));
    const data = await Promise.all(recipes.map(r => toTemplateRecipe(r, options.learnedRecipes)));
    new Dialog({
        title: 'Manage Recipes',
        content: tpl(data),
        buttons: {
            save: {
                icon: '<i class="fa-solid fa-save"></i>',
                label: 'Save',
                callback: async (html): Promise<void> => {
                    const $html = html as HTMLElement;
                    const enableRecipes = data
                        .map((r, index) => {
                            const enabled = parseCheckbox($html, `add-${index}`);
                            return {enabled, name: r.name};
                        })
                        .filter(r => r.enabled)
                        .map(r => r.name);
                    const deleteRecipes = data
                        .map((r, index) => {
                            const enabled = parseCheckbox($html, `delete-${index}`);
                            return {enabled, name: r.name};
                        })
                        .filter(r => r.enabled)
                        .map(r => r.name);
                    await options.onSubmit(new Set(enableRecipes), new Set(deleteRecipes));
                },
            },
        },
        default: 'save',
    }, {
        jQuery: false,
        width: 800,
        height: 600,
    }).render(true);
}