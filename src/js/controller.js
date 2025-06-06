import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODEL_CLOSE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    //1)Loading recipe and updates the state
    await model.loadRecipe(id);

    //Render spinner
    recipeView.renderSpinner();

    //0 Results view
    resultView.update(model.getSearchResultsPage());

    bookmarksView.update(model.state.bookmarks);

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
  //   //Gets the ID of the currently rendered recipe
  const id = window.location.hash.slice(1);

  //Updates the recipe object and defines the bookmarked as true
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //Renders the recipe along with the filled bookmark icon
  recipeView.update(model.state.recipe);

  //Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newAddRecipe) {
  try {
    //Render Spinner
    addRecipeView.renderSpinner();

    //New recipe to be uploaded
    await model.uploadRecipe(newAddRecipe);

    //Renders the recipe once the state is updated
    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    //Change bookmarks View
    bookmarksView.render(model.state.bookmarks);

    //Change ID in URL using the history API of the browser
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //Close the form
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  bookmarksView.addHandlerRender(controlBookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
