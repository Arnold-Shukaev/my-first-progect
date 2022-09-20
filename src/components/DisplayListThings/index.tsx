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
  setIdSelectedThings: Dispatch<SetStateAction<any>>; // Этот проп переделай в onSelect?: (thing: FriendItem) => void
  //ОК
  nameID: string;
  listThings: any[]; // Опиши тип для элементов списка, там же ничего сложного?)
  //ОК
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

  sort(listThings, stateSort); // Тут sort мутирует listThings который приходит из пропсов, это нехорошо, пропсы должны быть readonly
  // АА. Это к тому вопросу, почему передаю копию. Вопрос закрыт, или надо переделывать???
  const { resultListThings, noFilteringResult = null } = filter(
    listThings,
    stateFilter
  );

  if (listThings.length === 0) {
    return (
      <div className={s.defaultText}>{children || "Перечень отсутствует"}</div>
    );
  } else {
    // Тут else можно вообще убрать
    // ОК
    return (
      <>
        <div className={s.blockTable}>
          <table className={s.tableThings} onFocus={() => console.log(20) /* Что за странный вывод в консоль?)*/
        /*Экспериментальный))) Уберу. Обработчик тут вообще не нужен*/
        }>
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
