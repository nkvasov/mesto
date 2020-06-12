const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close-btn');
const profileEditBtn = document.querySelector('.profile__edit-btn');

popupCloseBtn.addEventListener('click', popupToggle);
profileEditBtn.addEventListener('click', popupToggle);


function popupToggle() {
  popup.classList.toggle('popup_opened');
}



// Находим форму в DOM
let popupForm = popup.querySelector('.popup__container');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = popupForm.querySelector('.popup__name-input');
    let jobInput = popupForm.querySelector('.popup__job-input');

    // Получите значение полей из свойства value
    let name = nameInput.getAttribute('value');
    console.log({name});

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener('submit', formSubmitHandler);
