"use strict";

// DOM elements
const radiosToggleTheme = Array.from(
  document.querySelectorAll(".radio-theme-select")
);
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

const addValuesToCalcScreen = (valueProperty, allowSpecialChars) => {
  const calcScreen = document.querySelector("#calc-screen");
  const calcScreenInitialValue = Number(calcScreen.textContent);

  calcScreen.textContent =
    calcScreenInitialValue === 0
      ? valueProperty
      : (calcScreen.textContent += valueProperty);

  allowSpecialKeysOnCalcScreen = allowSpecialChars;
  if (!allowSpecialChars) {
    isBtnResultDisabled(true);
  } else {
    isBtnResultDisabled(false);
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
  let calcScreen = document.querySelector("#calc-screen");
  const convertedCalcScreenValue = Number(calcScreen.textContent);

  const expressionValidToCalc = convertedCalcScreenValue !== 0;

  if (expressionValidToCalc) {
    const result = eval(calcScreen.textContent);
    calcScreen.textContent = result;
  }
};

const deleteValueFromCalcScreen = () => {
  let calcScreen = document.querySelector("#calc-screen");

  let newCalcScreenValue = calcScreen.textContent.slice(
    0,
    calcScreen.textContent.length - 1
  );

  if (calcScreen.textContent.length <= 1) {
    calcScreen.textContent = "0";
    allowSpecialKeysOnCalcScreen = false;
  } else {
    calcScreen.textContent = newCalcScreenValue;
    allowSpecialKeysOnCalcScreen = true;
  }

  let specialCharsNotAllowed = ["*", "/", "+", "-", "."];
  let disallowCalcResult = specialCharsNotAllowed.includes(
    calcScreen.textContent.at(calcScreen.textContent.length - 1)
  );
};

// Global variables
let allowSpecialKeysOnCalcScreen = false;

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
  numberKey.addEventListener("click", () => {
    addValuesToCalcScreen(numberKey.value, true);
  });
});

btnOperationalKeys.map((operationKey) => {
  operationKey.addEventListener("click", () => {
    if (allowSpecialKeysOnCalcScreen) {
      addValuesToCalcScreen(operationKey.value, false);
    }
  });
});

calcButtonResult.addEventListener("click", calculateTheResult);

calcButtonDelete.addEventListener("click", deleteValueFromCalcScreen);
