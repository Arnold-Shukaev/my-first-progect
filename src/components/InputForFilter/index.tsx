import { Dispatch, SetStateAction, useRef } from "react";
import { StateFilterType } from "../SortAndFilterBlock";
import s from "./InputForFilter.module.scss";

type Props = {
  nameButton: string;
  nameParam: string;
  setStateFilter: Dispatch<SetStateAction<StateFilterType>>;
};

export const InputForFilter = ({
  nameButton,
  nameParam,
  setStateFilter,
}: Props) => {
  const lengthInput = nameButton.length - 1;
  const refInput = useRef<HTMLInputElement>(null);

  function hendlerChange() {
    setStateFilter((prevMap) => {
      let newState = Object.assign({}, prevMap);
      newState[nameParam] = refInput.current!.value;
      return newState;
    });
  }

  return (
    <div className={s.sortBlockInput}>
      <input
        ref={refInput}
        size={lengthInput}
        className={s.sortInput}
        type="text"
        id={nameParam + "Input"}
        required
        onChange={hendlerChange}
      ></input>
      <label htmlFor={nameParam + "Input"}>{nameButton}</label>
    </div>
  );
};
