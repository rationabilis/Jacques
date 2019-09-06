/* Функции валидации ввода*/

import validateForm from '../validateForm/validateForm';
// Нет смысла в этом участке кода.
export default function validateInput(evt) {
    validateForm(evt.target.parentElement);
  }