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

const getRecipe = async function () {
  try {
    const res = await fetch(
      'https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886c'
    );

    if (!res.ok) throw new Error((await res.json()).message);

    const data = await res.json();

    console.log(data.data.recipe);
  } catch (error) {
    console.error(error);
  }
};

getRecipe();
