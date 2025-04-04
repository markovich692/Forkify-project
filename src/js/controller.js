import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
if (module.hot) {
  module.hot.accept();
}

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

    // console.log(recipeView._data);
  } catch (error) {
    console.error(error);
    recipeView.renderError();
  }
};

//CONTROL SEARCH RESULTS
const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();

    //1-Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2-Load search results
    await model.loadSearchResults(query);

    if (resultView._data.length === 0)
      throw new Error('The recipe you did query does not exist');

    //3-Render results
    resultView.render(model.state.search.results);
  } catch (error) {
    resultView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
