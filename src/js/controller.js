import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
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
    recipeView.renderError();
  }
};

//CONTROL SEARCH RESULTS
const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();

    console.log(query);

    if (!query) return;

    await model.loadSearchResults(query);

    console.log(model.state.search.results);
  } catch (error) {
    console.error(error);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();

const init_2 = function () {
  searchView.addHandlerSearch(controlSearchResults);
};

init_2();
