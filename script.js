const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close-btn');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__description');
const profileEditBtn = profile.querySelector('.profile__edit-btn');

const popupForm = popup.querySelector('.popup__container');
const nameInput = popupForm.querySelector('.popup__name-input');
const jobInput = popupForm.querySelector('.popup__job-input');

popupCloseBtn.addEventListener('click', popupToggle);

profileEditBtn.addEventListener('click', editProfile);

popupForm.addEventListener('submit', formSubmitHandler);



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

