import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './views/paginationView.js';

// if (module.hot) {
//   module.hot.accept();
// }

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
    //1-Get search query
    const query = searchView.getQuery();
    if (!query) return;

    resultView.renderSpinner();

    //2-Load search results
    await model.loadSearchResults(query);

    //3-Render results
    resultView.render(model.getSearchResultsPage());

    //4-Control pagination
    // paginationView.render(model.state.search.page);
  } catch (error) {
    // console.log(error);
    resultView.renderError();
  }
};

// const controlPagination = function () {
//   paginationView.render(model.state.search.page);
// };

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  // paginationView.addHandlerPagination(controlPagination);
};

init();
