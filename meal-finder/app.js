const search = document.getElementById("search"),
  searchForm = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsElem = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  singleMealElem = document.getElementById("single-meal");

let mealsDataArray = [];

const submitSearch = (e) => {
  e.preventDefault();

  //Clear single meal
  singleMealElem.innerHTML = "";

  const searchTerm = search.value;

  if (searchTerm.trim()) {
    fetchMeal(searchTerm);
  } else {
    alert("Enter a value please.");
  }

  console.log(searchTerm.trim());
};

const fetchMeal = async (term) => {
  try {
    const { data } = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    );
    // const data = await res.json();
    mealsDataArray = data.meals;
    console.log(mealsDataArray);

    if (data.meals === null) {
      resultHeading.innerHTML =
        "There are no search results. Please try again with a new term!";
    } else {
      resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
      const mealsHTML = data.meals
        .map((meal) => {
          const { idMeal, strMealThumb, strMeal } = meal;
          return `<div class="meal">
    <img src="${strMealThumb}" alt="${strMeal}" title="${strMeal}">
    <div class="meal-info" data-mealID='${idMeal}'>
        <h3>${strMeal}</h3>
    </div>
</div>`;
        })
        .join("");
      mealsElem.innerHTML = mealsHTML;
      search.value = "";
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const findMealbyId = (id) => {
  const singleMeal = mealsDataArray.find((meal) => {
    return meal.idMeal === id;
  });
  console.log(singleMeal);

  renderSingleMeal(singleMeal);
};

const renderSingleMeal = (meal) => {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  const { strMeal, strMealThumb, strCategory, strArea, strInstructions } = meal;
  singleMealElem.innerHTML = `<div class="single-meal">
  <h1>${strMeal}</h1>
  <img src="${strMealThumb}" alt="${strMeal}">
  <div class="single-meal-info">
    ${strCategory ? `<p>${strCategory}</p>` : ``}
    ${strArea ? `<p>${strArea}</p>` : ``}
  </div>
  <div class="main">
  <p>${strInstructions}</p>
  <h2>Ingredients</h2>
  <ul>
  ${ingredients
    .map((ing) => {
      return `<li>${ing}</li>`;
    })
    .join("")}
  </ul>
  </div>
</div>`;

  console.log(ingredients);
};

//Event listeners.
searchForm.addEventListener("submit", submitSearch);
mealsElem.addEventListener("click", (e) => {
  const mealInfo = e.composedPath().find((elem) => {
    if (elem.classList) {
      return elem.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealID");
    findMealbyId(mealID);
  }
});
