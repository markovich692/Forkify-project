import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import icons from 'url:../img/icons.svg';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    //Render spinner
    recipeView.renderSpinner();

    //0 Results view
    resultView.update(model.getSearchResultsPage());

    //1)Loading recipe and updates the state
    await model.loadRecipe(id);

    // console.log(model.state.recipe);
    //2)Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

//CONTROL SEARCH RESULTS
const controlSearchResults = async function () {
  try {
    //1-Get search query
    const query = searchView.getQuery();
    if (!query) return;
    //2-Load search results
    await model.loadSearchResults(query);

    //3-Render 10 results per page
    resultView.render(model.getSearchResultsPage());

    //4-Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    resultView.renderError();
  }
};

const controlPagination = function (btnGoTo) {
  resultView.render(model.getSearchResultsPage(btnGoTo));

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //1Update the state object servings and ingredients quantity
  model.updateServings(newServings);

  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  model.addBookmark(model.state.recipe);
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  recipeView.addHandlerServings(controlServings);
};

init();
