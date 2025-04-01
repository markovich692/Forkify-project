import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { recipeDisplay } from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io
// const data = await fetch('https://forkify-api.jonas.io').then(data =>
//   console.log(data)
// );

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    //Render spinner
    recipeView.renderSpinner();

    //1)Loading recipe
    await model.loadRecipe(id);

    //2)Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
  }
};

recipeDisplay(controlRecipe);

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

// console.log(recipeView);
