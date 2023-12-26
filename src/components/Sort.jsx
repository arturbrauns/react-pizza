import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../redux/slices/filterSlice";

// Создаем массив объектов для использования в pop-up, чтобы создать сортировку
export const list = [
  { name: "популярности (DESC)", sortProperty: "rating" },
  { name: "популярности (ASC)", sortProperty: "-rating" },
  { name: "цена (DESC)", sortProperty: "price" },
  { name: "цена (ASC)", sortProperty: "-price" },
  { name: "алфавиту (DESC)", sortProperty: "title" },
  { name: "алфавиту (ASC)", sortProperty: "-title" },
];

function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);
  const sortRef = React.useRef();

  // Создаем состояние pop-up окна, начальное значение которого false(окно закрыто)
  const [open, setOpen] = React.useState(false);

  // Создаем функцию для выбора метода сортировки, а так же для открытия и скрытия pop-up
  // После того, как тип сортировки был выбран, закрой pop-up
  const onClickListItem = (obj) => {
    dispatch(setSort(obj));
    setOpen(!open);
  };

  React.useEffect(() => {
    const hadleClickOutside = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener("click", hadleClickOutside);

    return () => {
      document.body.removeEventListener("click", hadleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          ></path>
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>

      {/* Если состояние open = true(pop-up открыт), тогда выполни код далее */}
      {/* Обойди массив объектов для pop-up и для каждого элемента создай li, в который будет передаваться объект текущего элемента и индекс.
      Индекс используется для key...  */}
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={
                  sort.sortProperty === obj.sortProperty ? "active" : ""
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
