"use strict";

// DOM elements
const radiosToggleTheme = Array.from(
  document.querySelectorAll(".radio-theme-select")
);
const calcScreen = document.querySelector("#calc-screen");
const btnNumberKeys = Array.from(document.querySelectorAll(".calc-btn-number"));
const btnOperationalKeys = Array.from(
  document.querySelectorAll(".calc-btn-operation")
);
const calcButtonResult = document.querySelector(".calc-btn-result");
const calcButtonDelete = document.querySelector(".calc-btn-delete");

// Functions
const changeBodyClass = (nameClass) => {
  const body = document.body;

  body.setAttribute("class", nameClass);
};

const addNumberValuesToScreen = (value) => {
  let ScreenValue = calcScreen.textContent;
  let calcScreenInitialValue = Number(calcScreen.textContent);

  calcScreen.textContent =
    calcScreenInitialValue === 0 ? value : ScreenValue + value;
  allowSpecialKeysOnCalcScreen = true;
  isBtnResultDisabled(false);
};

const addSpecialCharsToScreen = (value) => {
  if (allowSpecialKeysOnCalcScreen) {
    calcScreen.textContent =
      Number(calcScreen.textContent) === 0
        ? "0" + value
        : calcScreen.textContent + value;
    allowSpecialKeysOnCalcScreen = false;
    isBtnResultDisabled(true);
  }
};

const isBtnResultDisabled = (state) => {
  if (state) {
    calcButtonResult.setAttribute("disabled", "disabled");
  } else {
    calcButtonResult.removeAttribute("disabled", "disabled");
  }
};

const calculateTheResult = () => {
  const convertedCalcScreenValue = Number(calcScreen.textContent);

  const expressionValidToCalc = convertedCalcScreenValue !== 0;

  if (expressionValidToCalc) {
    const result = eval(calcScreen.textContent);
    calcScreen.textContent = result;
  }
};

const deleteValueFromCalcScreen = () => {
  let currentScreenValue = calcScreen.textContent;
  let slicedScreenValue = currentScreenValue.slice(
    0,
    currentScreenValue.length - 1
  );

  let lastChar = slicedScreenValue.at(slicedScreenValue.length - 1);
  let lastCharIsSpecialChar = !isNaN(Number(lastChar));

  if (slicedScreenValue.length > 0) {
    calcScreen.textContent = slicedScreenValue;
    if (lastCharIsSpecialChar) {
      allowSpecialKeysOnCalcScreen = true;
    } else {
      allowSpecialKeysOnCalcScreen = false;
    }
  } else {
    calcScreen.textContent = "0";
    allowSpecialKeysOnCalcScreen = true;
  }
  calcScreen.textContent =
    slicedScreenValue.length > 0 ? slicedScreenValue : "0";
};

// Global variables
let allowSpecialKeysOnCalcScreen = true;

radiosToggleTheme.map((radio) => {
  radio.addEventListener("click", () => {
    let radioID = radio.id;

    switch (radioID) {
      case "radio-theme1":
        changeBodyClass("theme1");
        break;
      case "radio-theme2":
        changeBodyClass("theme2");
        break;
      case "radio-theme3":
        changeBodyClass("theme3");
        break;
    }
  });
});

btnNumberKeys.map((numberKey) => {
  numberKey.addEventListener("click", () =>
    addNumberValuesToScreen(numberKey.value)
  );
});

btnOperationalKeys.map((operationKey) => {
  operationKey.addEventListener("click", () => {
    addSpecialCharsToScreen(operationKey.value);
  });
});

calcButtonResult.addEventListener("click", calculateTheResult);

calcButtonDelete.addEventListener("click", deleteValueFromCalcScreen);
