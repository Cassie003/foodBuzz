const counrtiesDisplay = document.getElementById('counrties');
const  mealDisplay = document.getElementById('meal');
 const recipeDisplay = document.getElementById('recipe');



let  countries = [];

const popolateCountries = ()  =>{
    const fetchPromise =fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
      
      fetchPromise
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          data.meals.forEach(country =>{
            const titleBlock = document.createElement('div');
            titleBlock.id = country.strArea;
            titleBlock.classList.add('title-block');
            titleBlock.innerHTML = country.strArea;
            
            titleBlock.addEventListener('click', function (e) {
                const fetchMeal = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country.strArea}`);

                fetchMeal
                .then((response) => response.json())
                .then( (meals) => {
                    console.log(meals);
                    meals.meals.forEach((item) =>{
                        const mealCard = document.createElement('div');
                        mealObj = `<div class = "meal-card"> 
                                    <img src= '${item.strMealThumb}' /> 
                                    <div class="meal-name">${item.strMeal}</div>
                                </div>`;

                        mealCard.innerHTML = mealObj;

                        mealCard.addEventListener('click', function(e) {
                            const fetchRecipe = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`);
                            
                            fetchRecipe
                            .then((response) => response.json())
                            .then((response) => {
                                console.log(response);
                                
                                //
                                let ingredientArr = [];
                                let measureArr = [];
                                response.meals.forEach((item) => {

                                    for(let key in item) {
                                        if(key.includes('Ingredient') &&  item[key] !== '' ){
                                            ingredientArr.push(item[key]);
                                        }
                                        if (key.includes('Measure') && item[key] !== ''){
                                            measureArr.push(item[key]);
                                        }

                                    }

                                    const mealInstructions = item.strInstructions.split('. ');

                                    let instructionObj = '';
                                    mealInstructions.forEach((item) => {
                                        instructionObj += `
                                        <div class = "instructions"> ${item}</div>

                                    `;
                                    });
                                    let ingredientObj ='';
                                    ingredientArr.forEach ((item) => {
                                        ingredientObj +=`
                                        <div class = "ingredient"> ${item}</div>
                                        `;

                                    });
                                    let measureObj = '';
                                    measureArr.forEach((item) =>{
                                     measureObj +=`
                                     <div class = "measurements"> ${item}</div>
                                     `;

                                     
                                    })

                                    let pageLayout =`
                                    <div> 
                                        <img src = "${item.strMealThumb}" />
                                        <h1>${item.strMeal}</h1>
                                        <h2>Ingredients</h2>
                                        ${ingredientObj}
                                        <h2>Measurement</h2>
                                        ${ measureObj}
                                        <h2>instructions</h2>
                                        ${ instructionObj}

                                    </div>
                                    `
                                    
                                    recipeDisplay.innerHTML = pageLayout;

                                });


                                mealDisplay.style.display = 'none';
                            });
                        });
                        mealDisplay.appendChild(mealCard);
                    
                        counrtiesDisplay.style.display = 'none';


                    });
                });
            });
   
            counrtiesDisplay.appendChild(titleBlock);
       })
        });

   
}
popolateCountries();

// function getMealsByCountry(country) {

// }