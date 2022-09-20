import { StateSortType, StateSortTypeType } from "../SortAndFilterBlock";
import s from "./ButtonSort.module.scss";

type Props = {
  nameParam: string;
  stateSort: StateSortType;
  // Почему тут any?
  //ОК исправлено с any
  onSortChange: (stateSort: StateSortType) => void;
  // И тут?
  //ОК исправлено с any

  // лучше переименовать этот проп в onSortChange: (sortState: SortState) => void
  // Готово
};

export const ButtonSort = ({ nameParam, stateSort, onSortChange }: Props) => {
  const { columnForSorting, sortingType } = stateSort;
  // const refButton = useRef<HTMLButtonElement>(null);

  function handleClickButton() {
    if (columnForSorting !== nameParam) {
      onSortChange({ columnForSorting: nameParam, sortingType: "asc" });
    } else {
      let newSortingType: StateSortTypeType;
      switch (sortingType) {
        case "none":
          newSortingType = "asc";
          break;
        case "asc":
          newSortingType = "desc";
          break;
        case "desc":
          newSortingType = "none";
          break;
      }

      onSortChange({
        columnForSorting: nameParam, // Зачем хранить рефы на кнопки, можно же просто имя столбца использовать?
        //TODO: !!!!!!АА. Надо с тобой поговорить. Что конкретно ты имеешь в виду?
        // Походу разобрался
        sortingType: newSortingType,
      });
    }
  }

  function whichSymbol() {
    if (columnForSorting !== nameParam) {
      return "";
    } else {
      switch (sortingType) {
        case "none":
          return "";
        case "asc":
          return "\u21D3";
        case "desc":
          return "\u21D1";
      }
    }
  }
  // useEffect(() => {
  //   if (columnForSorting === refButton.current) {
  //     //     sortingType === "none"
  //     //       ? (refButton.current!.innerHTML = "") // обращение к innerHTML через ref это не React way. Тебе тут вообще ref не нужен, зачем с ним возиться?
  //     //       //TODO: ДОПОЛНИТЕЛЬНО ПЕРЕВАРИТЬ И ПЕРЕДЕЛАТЬ
  //     //       : sortingType === "asc"
  //     //       ? (refButton.current!.innerHTML = "&#8659")
  //     //       : (refButton.current!.innerHTML = "&#8657"); // Такую цепочку тернарных операторов очень сложно читать, обычно их избегают. Лучше использовать switch
  //     // //ОК

  //     switch (sortingType) {
  //       case "none":
  //         refButton.current!.innerHTML = "";
  //         break;
  //       case "asc":
  //         refButton.current!.innerHTML = "&#8659";
  //         break;
  //       case "desc":
  //         refButton.current!.innerHTML = "&#8657";
  //         break;
  //     }
  //   } else {
  //     refButton.current!.innerHTML = "";
  //   }
  // }, [columnForSorting, sortingType]);

  return (
    <button
      className={s.sortButton}
      // ref={refButton}
      onClick={handleClickButton}
      // data-name-param={nameParam} // Зачем этот параметр?)
      //АА. Используется родителем для сортировки
    >
      {whichSymbol()}
    </button>
  );
};
