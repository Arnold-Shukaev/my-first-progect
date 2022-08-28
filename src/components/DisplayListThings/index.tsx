import { Dispatch, SetStateAction, useState } from "react";
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
  idSelectedThing: string | number | null;
  setIdSelectedThings: Dispatch<SetStateAction<any>>;
  nameID: string;
  listThings: any[];
  children?: string;
};

export const DisplayListThings = ({
  columnsForDisplay,
  columnsName,
  idSelectedThing,
  setIdSelectedThings,
  nameID,
  listThings,
  children,
}: Props) => {
  const [stateSort, setStateSort] = useState<StateSortType>({
    columnForSorting: null,
    sortingType: "",
  });
  const [stateFilter, setStateFilter] = useState<StateFilterType>({});

  sort(listThings, stateSort);
  const { resultListThings, noFilteringResult = null } = filter(
    listThings,
    stateFilter
  );

  if (listThings.length === 0) {
    return (
      <div className={s.defaultText}>{children || "Перечень отсутствует"}</div>
    );
  } else {
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
                    onClick={() => setIdSelectedThings(thing[nameID])}
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
  }
};
