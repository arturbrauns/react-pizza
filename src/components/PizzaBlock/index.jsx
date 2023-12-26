import React from "react";

// С помощью деструктуризации достаем нужные пропсы
function PizzaBlock({ title, price, imageUrl, sizes, types }) {
  // Создаем состояние, для выбора типа теста
  const [activeType, setActiveType] = React.useState(0);
  // Создаем состояние, для выбора размера пицц
  const [activeSize, setActiveSize] = React.useState(0);
  // Создаем массив видов теста
  const typeNames = ["тонкое", "традиционное"];

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza"></img>
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {/* Обойди массив типов теста и для каждого элемента создай li, в который будет передаваться значение текущего элемента.
            Значение используется для key, для события onClick, который передает значение активного типа в state(чтобы понять на какое тесто кликнули),
            а так же идет проверка state и текущего значения для присвоения класса active(чтобы понять, что выбрано).
            Так же передается значение текущего индекса в typeNames(чтобы отрисовать тип теста)  */}
            {types.map((typeId) => (
              <li
                key={typeId}
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? "active" : ""}
              >
                {typeNames[typeId]}
              </li>
            ))}
          </ul>

          <ul>
            {/* Обойди массив размеров пицц и для каждого элемента создай li, в который будет передаваться индекс и значение текущего элемента.
            Индекс используется для key, для события onClick, который передает индекс активного размера в state(чтобы понять на какой размер кликнули),
            а так же идет проверка state и текущего индекса для присвоения класса active(чтобы понять, что выбрано).
            Так же, орисовывается значение текущего элемента(чтобы отрисовать размеры пиццы ) */}
            {sizes.map((size, i) => (
              <li
                key={size}
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? "active" : ""}
              >
                {size}
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              ></path>
            </svg>
            <span>Добавить</span>
            <i>0</i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
