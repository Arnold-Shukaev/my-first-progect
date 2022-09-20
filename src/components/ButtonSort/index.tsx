import { useRef, useEffect } from "react";
import s from "./ButtonSort.module.scss";

type Props = {
  nameParam: string;
  stateSort: any; // Почему тут any?
  //ОК
  setStateSort: any; // И тут?
  // лучше переименовать этот проп в onSortChange: (sortState: SortState) => void
  //ОК

};

export const ButtonSort = ({ nameParam, stateSort, setStateSort }: Props) => {
  const { columnForSorting, sortingType } = stateSort;
  const refButton = useRef<HTMLButtonElement>(null);

  function handleClickButton() {
    if (columnForSorting !== refButton.current) {
      setStateSort({ columnForSorting: refButton.current, sortingType: "asc" });
    } else {
      let newSortingType: string;
      sortingType === "none"
        ? (newSortingType = "asc")
        : sortingType === "asc"
        ? (newSortingType = "desc")
        : (newSortingType = "none"); // Тут тоже дичь какая-то, напиши через switch. Тернарные операторы не используют для выполнения чего-то в скобках, они для возврата значения при присвоении типа `let a = b > 0 ? "p" : "n"`
  //ОК

      setStateSort({
        columnForSorting: refButton.current, // Зачем хранить рефы на кнопки, можно же просто имя столбца использовать?
        //АА. Надо с тобой поговорить. Что конкретно ты имеешь в виду?
        sortingType: newSortingType,
      });
    }
  }

  useEffect(() => {
    if (columnForSorting === refButton.current) {
      sortingType === "none"
        ? (refButton.current!.innerHTML = "") // обращение к innerHTML через ref это не React way. Тебе тут вообще ref не нужен, зачем с ним возиться?
        //TODO: ДОПОЛНИТЕЛЬНО ПЕРЕВАРИТЬ И ПЕРЕДЕЛАТЬ
        : sortingType === "asc"
        ? (refButton.current!.innerHTML = "&#8659")
        : (refButton.current!.innerHTML = "&#8657"); // Такую цепочку тернарных операторов очень сложно читать, обычно их избегают. Лучше использовать switch
  //ОК

    } else {
      refButton.current!.innerHTML = "";
    }
  }, [columnForSorting, sortingType]);

  return (
    <button
      className={s.sortButton}
      ref={refButton}
      onClick={handleClickButton}
      data-name-param={nameParam} // Зачем этот параметр?)
      //АА. Используется родителем для сортировки
    ></button>
  );
};
