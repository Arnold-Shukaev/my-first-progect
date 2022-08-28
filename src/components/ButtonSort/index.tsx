import { useRef, useEffect } from "react";
import s from "./ButtonSort.module.scss";

type Props = {
  nameParam: string;
  stateSort: any;
  setStateSort: any;
};

export const ButtonSort = ({ nameParam, stateSort, setStateSort }: Props) => {
  const { columnForSorting, sortingType } = stateSort;
  const refButton = useRef<HTMLButtonElement>(null);

  function hendleClickButton() {
    if (columnForSorting !== refButton.current) {
      setStateSort({ columnForSorting: refButton.current, sortingType: "asc" });
    } else {
      let newSortingType: string;
      sortingType === "none"
        ? (newSortingType = "asc")
        : sortingType === "asc"
        ? (newSortingType = "desc")
        : (newSortingType = "none");

      setStateSort({
        columnForSorting: refButton.current,
        sortingType: newSortingType,
      });
    }
  }

  useEffect(() => {
    if (columnForSorting === refButton.current) {
      sortingType === "none"
        ? (refButton.current!.innerHTML = "")
        : sortingType === "asc"
        ? (refButton.current!.innerHTML = "&#8659")
        : (refButton.current!.innerHTML = "&#8657");
    } else {
      refButton.current!.innerHTML = "";
    }
  });

  return (
    <button
      className={s.sortButton}
      ref={refButton}
      onClick={() => hendleClickButton()}
      data-name-param={nameParam}
    ></button>
  );
};
