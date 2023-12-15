import * as model from './model';
import recipeView from './views/recipeView';
import searchview from './views/searchView';
import resultsView from './views/resultsView';
import PaginationView from './views/paginationView';
// import icons from '../img/icons.svg'; //parcel 1

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './views/paginationView';

// if (module.hot) {
//   module.hot.accept();
// }
///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // application logic
    console.log(id);
    if (!id) return;
    recipeView.renderSpinner(); //presentation logic
    //1-loading recipe
    await model.loadRecipe(id); //async fonksiyonu yine bir async fonksiyonu çağırdı ve bu async fonksiyonunun sonu gelmeden devam edebilir bu yüzden bu fonksiyonumuzun başına await ekliyruz ki bunun executionu bitene kadar diğer işlemlere geçmesin

    const { recipe } = model.state;
    //2)Rendering recipe

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError(err);
  }
};
const controlSearchResult = async function () {
  try {
    resultsView.renderSpinner();

    //1-Get search query
    const query = searchview.getQuery();
    if (!query) return;

    console.log(query);

    //2-loading query results from api (get search query)
    await model.loadSearchResult(query);
    //3-Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    // 4 Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};
// controlRecipes();
const controlPagination = function (goToPage) {
  //1-Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // 2-Render new pagination buttons
  paginationView.render(model.state.search);
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchview.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
};
init();

// recipeView.renderSearch();
