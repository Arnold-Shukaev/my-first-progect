import { memo, useState } from "react";
import {
  filter,
  sort,
  SortAndFilterBlock,
  StateFilterType,
  StateSortType,
} from "../SortAndFilterBlock";
import s from "./DisplayListThings.module.scss";

type Props = {
  columnsForDisplay: string[];
  columnsName: string[];
  idSelectedThing: string | null;
  onSelectedThings: (thing: string | null) => void;
  nameID: string;
  listThings: Record<string, string>[];
  children?: string;
};

export const DisplayListThings = ({
  columnsForDisplay,
  columnsName,
  idSelectedThing,
  onSelectedThings,
  nameID,
  listThings,
  children,
}: Props): JSX.Element => {
  
console.log("render DisplayListThings");

  const [stateSort, setStateSort] = useState<StateSortType>({
    columnForSorting: null,
    sortingType: "none",
  });
  const [stateFilter, setStateFilter] = useState<StateFilterType>({});

  sort(listThings, stateSort); // Тут sort мутирует listThings который приходит из пропсов, это нехорошо, пропсы должны быть readonly
  // TODO: Юр! Что делаем с мутацией
  const { resultListThings, noFilteringResult = null } = filter(
    listThings,
    stateFilter
  );

  if (listThings.length === 0) {
    return (
      <div className={s.defaultText}>{children || "Перечень отсутствует"}</div>
    );
  }
  return (
    <>
      <div className={s.blockTable}>
        <table className={s.tableThings}>
          <thead>
            <tr>
              {columnsName.map((name, id) => (
                <th key={id}>
                  <SortAndFilterBlock
                    nameButton={name}
                    nameParam={columnsForDisplay[id]}
                    stateSort={stateSort}
                    setStateSort={setStateSort}
                    setStateFilter={setStateFilter}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resultListThings.map((thing: any, id: any) => {
              return (
                <tr
                  key={id}
                  className={
                    thing[nameID] === idSelectedThing
                      ? s.selectedThing
                      : undefined
                  }
                  onClick={() => onSelectedThings(thing[nameID])}
                >
                  {columnsForDisplay.map((column, id2) => (
                    <td key={id2}>{thing[column]}</td>
                  ))}
                </tr>
              );
            })}
            {noFilteringResult}
          </tbody>
        </table>
      </div>
    </>
  );
};
