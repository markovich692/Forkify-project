import { apiUrl } from './config';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(`${apiUrl}/${id}`);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);

    const { recipe } = data.data;

    state.recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };

    // console.log(state.recipe);
  } catch (error) {
    alert(error);
  }
};
