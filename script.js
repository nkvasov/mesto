let popup = document.querySelector('.popup');
// let closeBtn = popup.querySelector('popup__close-btn');
// closeBtn.addEventListener('click', )
// popup.style.color = 'red';
let editButton = document.querySelector('.profile__edit-btn');
// editButton.style.border = '5px solid red';


function openPopup() {
  console.log('sss');
  // alert('aaa');
  // editButton.style.border = '5px solid blue';
  popup.classList.add('popup_status_opened');
  popup.classList.remove('popup_status_closed');
}

// openPopup();

editButton.addEventListener('click', openPopup);

// let test = document.querySelector(".header__logo");

// test.addEventListener('click', openPopup);

