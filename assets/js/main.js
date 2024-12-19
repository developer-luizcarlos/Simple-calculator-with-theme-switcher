"use strict";
// Global variables and startup configurations
let allowSpecialKeysOnCalcScreen = true;

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
const calcButtonReset = document.querySelector(".calc-btn-reset");

// Functions
const changeBodyClass = (nameClass) => {
  document.body.setAttribute("class", nameClass);
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
    const resultIsNan = isNaN(result) || !Number.isFinite(result);

    if (resultIsNan) {
      calcScreen.textContent = "0";
      allowSpecialKeysOnCalcScreen = true;
      alert("It's impossible to calculate this expression");
    } else {
      calcScreen.textContent = result;
    }
  }
};

const deleteValueFromCalcScreen = () => {
  let slicedScreenValue = calcScreen.textContent.slice(
    0,
    calcScreen.textContent.length - 1
  );

  let lastChar = slicedScreenValue.at(slicedScreenValue.length - 1);
  let lastCharIsNotSpecialChar = !isNaN(Number(lastChar));

  if (lastCharIsNotSpecialChar) {
    isBtnResultDisabled(false);
  }

  allowSpecialKeysOnCalcScreen =
    lastCharIsNotSpecialChar || Number(calcScreen.textContent) == "0"
      ? true
      : false;

  calcScreen.textContent = slicedScreenValue.length ? slicedScreenValue : "0";
};

const resetCalcScreenValues = () => {
  calcScreen.textContent = "0";
  allowSpecialKeysOnCalcScreen = true;
  isBtnResultDisabled(false);
};

// Function implementations

radiosToggleTheme.forEach((radio, index) => {
  radio.addEventListener("click", () => {
    changeBodyClass(`theme${index + 1}`);
  });
});

btnNumberKeys.forEach((numberKey) => {
  numberKey.addEventListener("click", () =>
    addNumberValuesToScreen(numberKey.value)
  );
});

btnOperationalKeys.forEach((operationKey) => {
  operationKey.addEventListener("click", () => {
    addSpecialCharsToScreen(operationKey.value);
  });
});

calcButtonResult.addEventListener("click", calculateTheResult);

calcButtonDelete.addEventListener("click", deleteValueFromCalcScreen);

calcButtonReset.addEventListener("click", resetCalcScreenValues);
