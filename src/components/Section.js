export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Обрабатывает переданные в конструктор данные с помощью переданной функции
  renderItems() {
    this._initialArray.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

// Добавляет указанный элемент на страницу (в контейнер экземпляра класса)
  addItem(element) {
    this._container.prepend(element);
  }
}
