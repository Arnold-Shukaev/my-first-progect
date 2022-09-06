import { Dispatch, HTMLAttributeAnchorTarget, SetStateAction } from "react";
import { ButtonSort } from "../ButtonSort";
import { InputForFilter } from "../InputForFilter";
import s from "./SortAndFilterBlock.module.scss";

type Props = {
  nameButton: string;
  nameParam: string;
  stateSort: any;
  setStateSort: any;
  setStateFilter: Dispatch<SetStateAction<StateFilterType>>;
};
export type StateSortType = {
  columnForSorting: HTMLButtonElement | null;
  sortingType: string;
};
export function sort(
  table: any[],
  { columnForSorting, sortingType }: StateSortType
) {
  if (table.length === 0 || columnForSorting === null) return table;
  const columnSorting = columnForSorting.dataset.nameParam!;
  switch (sortingType) {
    case "none":
      table.sort((a: any, b: any) => a._id - b._id);
      break;
    case "asc":
      table.sort((a: any, b: any) =>
        a[columnSorting] > b[columnSorting] ? 1 : -1
      );
      break;
    case "desc":
      table.sort((a: any, b: any) =>
        b[columnSorting] > a[columnSorting] ? 1 : -1
      );
      break;
    default: {
      console.log("ОШИБКА! Не предвиденное значение в thingsReducer");
    }
  }
}
export type StateFilterType = {
  [word: string]: string;
};
export function filter(table: any[], filteringRules: StateFilterType) {
  // let countRules = 0;
  // for (let rule in filteringRules) {
  //   countRules++;
  // }
  const countRules = Object.keys(filteringRules).length; // Так проще
  if (table.length === 0 || countRules === 0)
    return { resultListThings: table };

  let resultListThings = table;
  for (let rule in filteringRules) {
    let nameColumn = rule;
    let substring = filteringRules[rule].toLowerCase();
    resultListThings = resultListThings.filter((thing) =>
      thing[nameColumn].toString().toLowerCase().includes(substring)
    );
  }

  const noFilteringResult =
    resultListThings.length === 0 ? (
      <tr>
        <td colSpan={table.length} style={{ textAlign: "center" }}>
          Отсутствуют значения, соответствующие условиям фильтрации <br />
        </td>
      </tr>
    ) : null;
  return { resultListThings, noFilteringResult };
}

export const SortAndFilterBlock = ({
  nameButton,
  nameParam,
  stateSort,
  setStateSort,
  setStateFilter,
}: Props) => {
  return (
    <div className={s.sortBlock}>
      <InputForFilter
        nameButton={nameButton}
        nameParam={nameParam}
        setStateFilter={setStateFilter}
      />
      <ButtonSort
        nameParam={nameParam}
        stateSort={stateSort}
        setStateSort={setStateSort}
      />
    </div>
  );
};
