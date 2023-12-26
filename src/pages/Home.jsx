import React from "react";
import qs from "qs";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

// Импорт для логики в useEffect
import { list } from "../components/Sort";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Создание ссылки, где изначально isSearch = false(пиццы никто не искал / URL пустое)
  const isSearch = React.useRef(false);
  // Первого рендера не было
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  // Запрос на получение пицц
  const fetchPizzas = () => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";


    // Сделай запрос по адресу и 
    axios
      .get(
        `https://64a43678c3b509573b574494.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

  // Если был превый рендер или изменили параметры, то... (ЛАЙФХАК-КОСТЫЛЬ: useEffect при первом рендере всегда срабатывает)
  // Превращаем значеня внутри qs.stringify в строку, для вшивания в URL
  // При этом отслеживаем изменения: categoryId, sort.sortProperty, currentPage
  // navigate передает в URL адрес нашу строку.
  // Знак вопроса нужен для сшивания полученной строки с localhost...
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    // Первый рендер был
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый рендер, то проверяем URL-параметры(что-то искали на сайте) и убераем вопросительный знак(substring(1)) и спарьсь это(преврати в объект)
  // Затем передаем в Редакс
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      // Обойди массив list и найди объекты, которые свопадают по свойству sortProperty, с тем что есть в URl
      // И сохрани это объект в sort. Данное выражение необходимо, потому что в initialState находится объект,
      // а не строка
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      // Обновляем state, передаем спарсиные данные
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      // Если в URL что-то было(пиццы искали), isSearch.current = true;
      isSearch.current = true;
    }
  }, []);

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    // Если URL пустое, никто пиццы не гуглил (isSearch = false), то жди, когда придут парамметры с URl, чтобы сделать запрос(а так, запрос делается без предварительных параметров)
    // Проще говоря, был рендер - запрашиваем пиццы
    if (!isSearch.current) {
      fetchPizzas();
    }

    // Еще раз уточняем, что пиццы никто не искал(URL пустое было)
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
