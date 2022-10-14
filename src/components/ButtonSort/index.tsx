import { StateSortType, StateSortTypeType } from "../SortAndFilterBlock";
import s from "./ButtonSort.module.scss";

type Props = {
  nameParam: string;
  stateSort: StateSortType;
  onSortChange: (stateSort: StateSortType) => void;
};

export const ButtonSort = ({
  nameParam,
  stateSort,
  onSortChange,
}: Props): JSX.Element => {
  const { columnForSorting, sortingType } = stateSort;

  console.log('render ButtonSort')


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
        columnForSorting: nameParam,
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

  return (
    <button className={s.sortButton} onClick={handleClickButton}>
      {whichSymbol()}
    </button>
  );
};
