import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';
import { SEARCH_URL } from './config.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookMarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    // const res = await fetch(`${API_URL}/${id}`);
    // const data = await res.json();
    console.log(data);
    const { recipe } = data.data;
    console.log(recipe);
    //benim yöntem
    // const newRecipe = {};
    // let newKey;
    // for (let key in recipe) {
    //   newKey = key.replace('_', '');
    //   newRecipe[newKey] = recipe[key];
    // }
    // console.log(newRecipe);
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    //Temp error handling
    console.error(err);
    throw err;
  }
};
export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${SEARCH_URL}${query}`);
    console.log(data);
    state.search.results = data.recipes.map(rec => {
      return {
        id: rec.recipe_id,
        title: rec.title,
        publisher: rec.publisher,
        sourceUrl: rec.source_url,
        image: rec.image_url,
        publisherUrl: rec.publisher_url,
      };
    });

    //
  } catch (err) {
    throw err;
  }
};
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * this.state.search.resultsPerPage;
  const end = page * this.state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
