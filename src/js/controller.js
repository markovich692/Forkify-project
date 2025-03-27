// b53d8e25-a7be-4355-90ac-e0540c6b11d8

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

// const data = await fetch('https://forkify-api.jonas.io').then(data =>
//   console.log(data)
// );

console.log('TEXT');

const showRecipe = async function () {
  try {
    const res = await fetch(
      'https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886'
    );

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);

    console.log(res, data);

    let { recipe } = data.data;

    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(recipe);
  } catch (error) {
    console.error(error);
  }
};

showRecipe();
