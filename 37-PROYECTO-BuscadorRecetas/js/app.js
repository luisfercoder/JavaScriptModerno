function initApp(){
  
  const selectCategories = document.querySelector('#categorias');
  selectCategories.addEventListener('change',selectCategory);

  const result = document.querySelector('#resultado');

  getCategories();

  function getCategories(){
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    fetch(url)
    .then(answer => answer.json())
    .then(result => showCategories(result.categories))
  }

  function showCategories (categories =[]){
    categories.forEach(category => {
      const{strCategory}= category;
      const option =document.createElement('OPTION');
      option.value = strCategory;
      option.textContent = strCategory;
      selectCategories.appendChild(option);
    })

  }

  function selectCategory(e){
  const category = e.target.value;
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  fetch(url)
    .then(answer => answer.json())
    .then(result=>showRecipe(result.meals))
  }

  function showRecipe(recipes =[]){
  cleanHTMl(result);

  let heading = document.createElement('H2');
  heading.classList.add('text-center','text-black','my-5');
  heading.textContent = recipes.length ? 'Resultados' :'No hay resultados';
  result.appendChild(heading);
    
  recipes.forEach(recipe =>{
    const {idMeal, strMeal, strMealThumb}=recipe;
    const recipeContainer = document.createElement('DIV');
    recipeContainer.classList.add('col-md-4');

    const recipeCard = document.createElement('DIV');
    recipeCard.classList.add('card', 'mb-4');

    const recipeImage = document.createElement('IMG');
    recipeImage.classList.add('card-img-top');
    recipeImage.alt = `Ilustration of recipe ${strMeal}`;
    recipeImage.src = strMealThumb;
    console.log(recipeImage)

    const recipeCardBody = document.createElement('DIV');
    recipeCardBody.classList.add('card-body');

    const recipeHeading = document.createElement('H3');
    recipeHeading.classList.add('card-title','mb-3');
    recipeHeading.textContent = strMeal;

    const recipeButton = document.createElement('BUTTON');
    recipeButton.classList.add('btn','btn-danger','w-100');
    recipeButton.textContent = 'See Recipe';
    recipeButton.dataset.bsTarget = "#modal";
    recipeButton.dataset.bsToggle = "modal";


    //Push the code in HTML
    recipeCardBody.appendChild(recipeHeading);
    recipeCardBody.appendChild(recipeButton);

    recipeCard.appendChild(recipeImage);
    recipeCard.appendChild(recipeCardBody);
    
    recipeContainer.appendChild(recipeCard);

    result.appendChild(recipeContainer);

  })
  }
  function cleanHTMl(selector){
    while(selector.firstChild){
      selector.removeChild(selector.firstChild);
    }
  }

}
document.addEventListener('DOMContentLoaded',initApp);