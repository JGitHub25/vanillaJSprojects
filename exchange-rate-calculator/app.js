const access_key = "";
const URL = `http://api.exchangeratesapi.io/v1/latest?access_key=${access_key}`;

function getElement(selector) {
  const selectedElement = document.getElementById(selector);
  if (!selectedElement) {
    throw new Error(`No element found with the selector: ${selector}`);
  } else {
    return selectedElement;
  }
}

const currencyOne = getElement("currency-one");
const currencyTwo = getElement("currency-two");
const amount_currencyOne = getElement("amount-one");
const amount_currencyTwo = getElement("amount-two");
const btnSwap = getElement("swap");
const rate = getElement("rate");

async function calculate() {
  async function getData() {
    try {
      const response = await fetch(URL);

      if (response.ok) {
        const data = await response.json();
        return data;
      }
      throw new Error("The request to the exchange API has failed.");
    } catch (error) {
      console.log(error);
    }
  }

  const exchangeRates = await getData();

  function setData(data) {
    const value1EuroInCurrency1 = data.rates[currencyOne.value];
    const value1EuroInCurrency2 = data.rates[currencyTwo.value];
    const value1Curr1InCurr2 = value1EuroInCurrency2 / value1EuroInCurrency1;

    rate.textContent = `La tasa es: ${new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: `${currencyOne.value}`,
      currencyDisplay: "name",
    }).format(1)}  = ${new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: `${currencyTwo.value}`,
      currencyDisplay: "name",
    }).format(value1Curr1InCurr2.toFixed(5))}`;

    amount_currencyTwo.value = (
      amount_currencyOne.value * value1Curr1InCurr2
    ).toFixed(2);
  }

  setData(exchangeRates);
}

function swap() {
  [currencyOne.value, currencyTwo.value] = [
    currencyTwo.value,
    currencyOne.value,
  ];

  calculate();
}

window.addEventListener("DOMContentLoaded", calculate);

currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amount_currencyOne.addEventListener("input", calculate);
btnSwap.addEventListener("click", swap);
