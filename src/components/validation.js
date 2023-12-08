const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const disableSubmitButton = (buttonElement, config) => {
  if (buttonElement.classList.contains(config.inactiveButtonClass)) {
    buttonElement.setAttribute('disabled', true);
  }
  else buttonElement.removeAttribute('disabled');
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
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
  disableSubmitButton(buttonElement, config); 
} 

export { enableValidation, clearValidation, config };
