"use strict";

import './style.css';
import Popup from './blocks/popup/popup';
import validateData from './blocks/validateData/validateData';
import validateInput from './blocks/validateInput/validateInput';
import {cardList, newPlaceButton, userButton, userNameHeader, aboutUserParagraph} from './blocks/consts/consts';
import Api from './blocks/api/api';

// все переменные вынести в отдельный файл в отдельный объект. Настройки все в одно месте.
const api = new Api({
  baseUrl: 'https://praktikum.tk/cohort1',
  headers: {
    authorization: '97536aad-2615-4e27-b54c-91daa47b4fd5',
    'Content-Type': 'application/json'
  }
});

//Запуск прорисовки страницы
api.getUserData();
api.getInitialCards();


/* Открывает форму для ввода данных новой карточки */
newPlaceButton.addEventListener('click', function() {
  cardList.popupCall();
});

/* Ввод данных пользователя */
// в addEventListener надо добавлять только функцию
userButton.addEventListener('click', function() {
// вынести в отдельную функцию
  const userPopupContent = `<div class="popup__content">
  <img src="../images/close.svg" alt="" class="popup__close popup__close_user">
  <h3 class="popup__title">Редактировать профиль</h3>
  <form class="popup__form" name="user">
      <input id="username" type="text" name="username" class="popup__input popup__input_type_user-name" placeholder="Имя">
      <span id="error-username" class="error-message">Это обязательное поле</span>
      <input id="aboutuser" type="text" name="aboutuser" class="popup__input popup__input_type_about-user" placeholder="О себе">
      <span id="error-aboutuser" class="error-message">Это обязательное поле</span>
      <button class="button popup__button" disabled>+</button>
  </form>
</div>`;
  const user = new Popup(userPopupContent);
  const formUser = document.forms.user;
  const userName = document.querySelector('#username');
  const aboutUser = document.querySelector('#aboutuser');
  const popupUserCloseButton = document.querySelector('.popup__close_user');

    /* Считываем исходные значения профиля*/
  userName.value = userNameHeader.textContent;
  aboutUser.value = aboutUserParagraph.textContent;
  validateData(userName);
  validateData(aboutUser);
    /* Считываем данные профиля из формы*/
  userName.addEventListener('input', validateInput);
  aboutUser.addEventListener('input', validateInput);


    /* Принимает данные формы */
    // вынести в отдельную функцию класса
  formUser.addEventListener('submit', function (evt) {
  evt.preventDefault();
    api.editUserData(userName.value, aboutUser.value)
    .then((res) => {
      userNameHeader.textContent = res.name;
      aboutUserParagraph.textContent = res.about;
      user.close();
    })

    });
  /* Закрывает форму ввода данных пользователя */
  popupUserCloseButton.addEventListener('click', function() {user.close();});
});

/**
 * Очень хорошо что вы изучаете гит, эти знания пригодятся Вам не только при работе с большими проектами, когда вы наберётесь опыта и попадёте в большую команду
 * Вы настроили webpack и babel что очень хорошо.
 * 
 * Я прокомментировал проблемные участки кода которые мне попались на глаза при просмотре.
 * Вынесите весь JS код в одну папку для быстроко поиска. Очень неудобно искать 
 * Не дробите проект на слишком мелкие модули, это очень усложняет изучение и поддержку проекта
 * 
 * Старайтесь не вести разработку в одной ветке слишком долго, чтобы у вас не  небыло проблем при реквесте.
 * 
 * README.md должно быть рассписано как запустить проект, пошагово, что из себя представляет проект.
 * Представьте что вы отдедите свой проект своему другу через 5 лет и вы двлжны рассказать что и за чем он, какую несёт цель и так далее
 * 
 * Вы проделали большую работу, жду Ваших исправлений. При текущих знаниях я думаю они не займут много времени
 */
