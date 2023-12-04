const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`.${formInput.id}-error`);

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
};

const checkInputValidity = (formElement, inputElement) => {
  const customErrorMessage = "Введите только латинские и кириллические буквы, знаки дефиса и пробелы.";
  const customTooShortMessage = `Минимальное количество символов: ${inputElement.minLength}. Длина текста сейчас 1 символ.`;
  const customMissingMessage = "Вы пропустили это поле.";
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

  if (inputElement.type === 'url') {
    const urlErrorMessage = "Введите адрес сайта";
    if (inputElement.validity.valueMissing) {
      inputElement.setCustomValidity(customMissingMessage);
      showInputError(formElement, inputElement, customMissingMessage);
    }
    else if (!inputElement.checkValidity()) {
      inputElement.setCustomValidity(urlErrorMessage);
      showInputError(formElement, inputElement, urlErrorMessage);
    }
    else {
      hideInputError(formElement, inputElement);
      inputElement.setCustomValidity('');
    }
  }

  else {
    if (inputElement.validity.valueMissing) {
      inputElement.setCustomValidity(customMissingMessage);
      showInputError(formElement, inputElement, customMissingMessage);
    } 
    else if (inputElement.type === 'text' && !regex.test(inputElement.value)) {
      inputElement.setCustomValidity(customErrorMessage);
      showInputError(formElement, inputElement, customErrorMessage);
    } 
    else if (inputElement.validity.tooShort) {
      inputElement.setCustomValidity(customTooShortMessage);
      showInputError(formElement, inputElement, customTooShortMessage);
    } 
  
    else {
      hideInputError(formElement, inputElement);
      inputElement.setCustomValidity('');
    }
  }


};

function setEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button')
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      checkInputValidity(formElement, evt.target);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_inactive');
  }
  else buttonElement.classList.remove('button_inactive');
}

function clearValidation(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
    inputElement.setCustomValidity("");
  });
}


export {enableValidation, clearValidation};