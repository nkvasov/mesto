// Из чеклиста для самопроверки:
// DOM-элементы, к которым есть обращение в скрипте, вынесены в константы.

const popup = document.querySelector('.popup'); // попап
const popupCloseBtn = popup.querySelector('.popup__close-btn'); // кнопка закрытия попапа
const popupForm = popup.querySelector('.popup__container'); // форма попапа
const nameInput = popupForm.querySelector('.popup__name-input'); // поле ввода имени Профиля
const jobInput = popupForm.querySelector('.popup__job-input'); // поле ввода описания Профиля

const profile = document.querySelector('.profile'); // секция Профиль
const profileName = profile.querySelector('.profile__name'); // имя профиля на странице
const profileJob = profile.querySelector('.profile__description'); // описание профиля на странице
const profileEditBtn = profile.querySelector('.profile__edit-btn'); // кнопка редактирования профиля



popupCloseBtn.addEventListener('click', popupToggle); // обработка нажатия кнопки "Закрыть" попап

profileEditBtn.addEventListener('click', editProfile); // обработка нажатия кнопки редактирования профиля

popupForm.addEventListener('submit', formSubmitHandler); // обработка нажатия кнопки "Cохранить" попап или клавиши Enter



function popupToggle() {
  popup.classList.toggle('popup_opened');
}

function editProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupToggle();
}

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupToggle();
}

