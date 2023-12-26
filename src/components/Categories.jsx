import React from "react";

// С помощью деструктуризации достаем нужные пропсы(state и setState)
function Categories({ value, onChangeCategory }) {
  // Создаем массив из категорий для дальнейшего рендера
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {/* Обойди массив категорий и для каждого элемента создай li, в который будет передаваться индекс текущего элемента и его значение.
        Индекс используется для key, для события onClick, который передает индекс активной категории в state, а так же
        идет проверка state и текущего индекса для присвоения класса active. Так же отрисовывается значение текущего элемента  */}
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)}
            className={value === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
