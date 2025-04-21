import { API_URL, RES_PER_PAGE, API_KEY } from './config';
import { getJSON, sendJSON } from './helpers';
import recipeView from './views/recipeView';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },

  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;

  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    state.recipe = createRecipeObject(data);

    //Checks if the id of the currently displayed recipe corresponds to any of the id in the bookmarks array
    {
      state.bookmarks.some(bookmark => bookmark.id === id)
        ? (state.recipe.bookmarked = true)
        : (state.recipe.bookmarked = false);
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    const { recipes } = data.data;

    state.search.results = recipes.map(rec => {
      return {
        id: rec.id,
        image: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
      };
    });

    state.search.page = 1;
  } catch (error) {
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; //0

  const end = page * state.search.resultsPerPage; //9

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * (newServings / state.recipe.servings);
  });

  state.recipe.servings = newServings;
};

//PERSISTS BOOKMARKS

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

//BOOKMARK TEST UPDATE STATE
export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(rec => rec.id === id);
  state.bookmarks.splice(index, 1);
  state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (!storage) return;
  state.bookmarks = JSON.parse(storage);
};

init();

export const uploadRecipe = async function (newRecipe) {
  try {
    //Seperate the ingredients value into an array of 3 different values
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArray = ing[1].replaceAll(' ', '').split(',');

        if (ingArray.length !== 3)
          throw new Error(
            'Wrong ingredients format! Please use the correct format :)'
          );

        const [quantity, unit, description] = ingArray;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    //Format the newRecipe the same way we receives it from the API
    const recipe = {
      // id: newRecipe.id,
      title: newRecipe.title,
      cooking_time: +newRecipe.cookingTime,
      image_url: newRecipe.sourceUrl,
      source_url: newRecipe.sourceUrl,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      ingredients,
    };

    //Sends data to the API
    const data = await sendJSON(`${API_URL}?key=${API_KEY}`, recipe);

    console.log(data);
    //Formats the API data back to its previous format and updates the state
    state.recipe = createRecipeObject(data);

    //Adds the createdAt and the key to our state.recipe object
    // state.recipe.createdAt = data.data.recipe.createdAt;
    // state.recipe.key = data.data.recipe.key;

    console.log(state.recipe);

    //Bookmark our newly created recipe
    addBookmark(state.recipe);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
