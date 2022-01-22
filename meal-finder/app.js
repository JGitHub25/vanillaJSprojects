const search = document.getElementById("search"),
  searchForm = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsElem = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  singleMealElem = document.getElementById("single-meal");

const searchMeal = (e) => {
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
    const res = await fetch(
      `https:www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    );
    const data = await res.json();
    console.log(data);

    if (data.meals === null) {
      resultHeading.innerHTML =
        "There are no search results. Please try again with a new term!";
    } else {
      resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

//Event listeners.
searchForm.addEventListener("submit", searchMeal);
