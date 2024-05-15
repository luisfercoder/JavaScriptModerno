function initApp(){
  const result = document.querySelector('#resultado');

  const selectCategories = document.querySelector('#categorias');
  if(selectCategories){
    selectCategories.addEventListener('change',selectCategory);
    getCategories();
  }
  const favoriteDiv = document.querySelector('.favoritos');
  if(favoriteDiv){
    obtainFavorites();
  }

  const modal = new bootstrap.Modal('#modal',{});

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
    recipeImage.alt = `Ilustration of recipe ${strMeal ?? recipe.tittle}`;
    recipeImage.src = strMealThumb ?? recipe.img;

    const recipeCardBody = document.createElement('DIV');
    recipeCardBody.classList.add('card-body');

    const recipeHeading = document.createElement('H3');
    recipeHeading.classList.add('card-title','mb-3');
    recipeHeading.textContent = strMeal ?? recipe.tittle;

    const recipeButton = document.createElement('BUTTON');
    recipeButton.classList.add('btn','btn-danger','w-100');
    recipeButton.textContent = 'See Recipe';
    // recipeButton.dataset.bsTarget = "#modal";
    // recipeButton.dataset.bsToggle = "modal";
    recipeButton.onclick = function(){
      selectRecipe(idMeal ??recipe.id);
    }


    //Push the code in HTML
    recipeCardBody.appendChild(recipeHeading);
    recipeCardBody.appendChild(recipeButton);

    recipeCard.appendChild(recipeImage);
    recipeCard.appendChild(recipeCardBody);
    
    recipeContainer.appendChild(recipeCard);

    result.appendChild(recipeContainer);

  })
  }
  function selectRecipe(id){
    const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
    .then(answer => answer.json())
    .then(result => showRecipeModal(result.meals[0]))
  }
  function showRecipeModal(recipe){
    let {idMeal,strInstructions,strMealThumb,strMeal}= recipe;
    
    //Add content to modal
    let modalTitle = document.querySelector('#modal .modal-title');
    let modalBody = document.querySelector('#modal .modal-body');

     modalTitle.textContent = strMeal;
     modalBody.innerHTML = `
     <img class="img-fluid" src="${strMealThumb}" alt="recipe ${strMeal}"/>
     <h3 class="my-3">Instructions</h3>
     <p>${strInstructions}</p>
     <h3 class="my-3">Ingredients & Quantities</h3>
     `;

    
     let listGroup = document.createElement('UL');
     listGroup.classList.add('list-group');
     //Show quantities and ingredients
     for(let i=1;i<=20; i++){
      if(recipe[`strIngredient${i}`]){
        let ingredient = recipe[`strIngredient${i}`];
        let quantity = recipe[`strMeasure${i}`];

        let ingredientLi = document.createElement('LI');
        ingredientLi.classList.add('list-group-item');
        ingredientLi.textContent = `${ingredient} - ${quantity}`

        listGroup.appendChild(ingredientLi);
      }
     }
     modalBody.appendChild(listGroup);
     //Create 
     let modalFooter = document.querySelector('.modal-footer');
     cleanHTMl(modalFooter);
     //Bottons close and favorite
     let btnFavorite = document.createElement('BUTTON');
     btnFavorite.classList.add('btn','btn-danger','col');
     btnFavorite.textContent = existStorage(idMeal) ? 'Delete Favorite' : 'Save Favorite';
    //Save in LocalStorage
    btnFavorite.onclick = function(){

      if(existStorage(idMeal)){
        eraseFavorite(idMeal);
        btnFavorite.textContent = 'Save Favorite';
        showToast('Eliminado correctamente');
        return
      }

      addFavorite({
        id:idMeal,
        tittle: strMeal,
        img: strMealThumb
      });
      btnFavorite.textContent ='Delete Favorite';
      showToast('Agregado correctamente');

    }
     let btnCloseModal = document.createElement('BUTTON');
     btnCloseModal.classList.add('btn','btn-secondary','col');
     btnCloseModal.textContent = 'Close';
     btnCloseModal.onclick = function(){
      modal.hide();
     }

     modalFooter.appendChild(btnFavorite);
     modalFooter.appendChild(btnCloseModal);

    //Show the modal
    modal.show();
  }
  function addFavorite(recipe){
   let favorite = JSON.parse(localStorage.getItem('favoritos')) ?? [];
   localStorage.setItem('favoritos',JSON.stringify([...favorite, recipe]));
  }
  function eraseFavorite(id){
    let favorite = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    let newFavorites= favorite.filter(favorite => favorite.id !== id);
    localStorage.setItem('favoritos',JSON.stringify(newFavorites));

  }
  function existStorage(id){
    let favorite = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    return favorite.some(favorite => favorite.id ===id);

  }
  function showToast(message){
    let toastDiv = document.querySelector('#toast');
    let toastBody = document.querySelector('.toast-body');
    let toast = new bootstrap.Toast(toastDiv);
    toastBody.textContent = message;
    toast.show();
  }
  function obtainFavorites(){
    const favorites = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    if(favorites.length){
      showRecipe(favorites);
      return
    }
    let noFavorites = document.createElement('P');
    noFavorites.textContent = 'No favorites Yet';
    noFavorites.classList.add('fs-4','text-center','font-bold','mt-5');
    favoriteDiv.appendChild(noFavorites);
  }

  function cleanHTMl(selector){
    while(selector.firstChild){
      selector.removeChild(selector.firstChild);
    }
  }

}
document.addEventListener('DOMContentLoaded',initApp);