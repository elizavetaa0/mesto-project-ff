import {config} from './config.js';

const disableSubmitButton = (buttonElement, config) => {
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(config.inactiveButtonClass)
};

const showInputError = (formElement, inputElement, errorMessage, config) => { 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.add(config.inputErrorClass); 
  errorElement.textContent = errorMessage; 
  errorElement.classList.add(config.errorClass); 
}; 

const hideInputError = (formElement, inputElement, config) => { 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.remove(config.inputErrorClass); 
  errorElement.textContent = ''; 
  errorElement.classList.remove(config.errorClass); 
}; 

const checkInputValidity = (formElement, inputElement, config) => { 
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const setEventListeners = (formElement, config) => { 
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const buttonElement = formElement.querySelector(config.submitButtonSelector); 
  toggleButtonState(inputList, buttonElement, config); 
  inputList.forEach((inputElement) => { 
    inputElement.addEventListener('input', (evt) => { 
      checkInputValidity(formElement, evt.target, config); 
      toggleButtonState(inputList, buttonElement, config); 
    }); 
  });
} 

const enableValidation = (config) => { 
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => { 
    formElement.addEventListener('submit', function(evt) { 
      evt.preventDefault(); 
    }); 
    setEventListeners(formElement, config); 
  });
};

const clearValidation = (formElement, config) => { 
  const inputList = formElement.querySelectorAll(config.inputSelector); 
  inputList.forEach((inputElement) => { 
    hideInputError(formElement, inputElement, config); 
    inputElement.setCustomValidity(""); 
  }); 
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  disableSubmitButton(buttonElement, config);
};

const hasInvalidInput = (inputList) => { 
  return Array.from(inputList).some((inputElement) => { 
    return !inputElement.validity.valid; 
  }); 
} 

const toggleButtonState = (inputList, buttonElement, config) => { 
  if (hasInvalidInput(inputList)) { 
    disableSubmitButton(buttonElement, config); 
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
} 

export { enableValidation, clearValidation, config };
