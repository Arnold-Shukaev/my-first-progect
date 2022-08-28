import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ActionType, FriendsListType } from "../../pages/Friends";
import s from "./ButtonsForSpesialProperty.module.scss";

type Props = {
  idThing: string;
  nameProperty: string;
  editableValue: string;
  setActiveProperty: Dispatch<SetStateAction<HTMLDivElement | null>>;
  setTextBeginEdited: Dispatch<SetStateAction<boolean>>;
  textBeginEdited: boolean;
  setEditableValue: Dispatch<SetStateAction<string>>;
  listThings: FriendsListType;
  dispatchListThings: Dispatch<ActionType>;
  readingNotSavedData: boolean;
  setReadingNotSavedData: Dispatch<SetStateAction<boolean>>;
};

let latelyRecord = Date.now();
export const ButtonsForSpecialProperty = ({
  idThing,
  nameProperty,
  editableValue,
  setActiveProperty,
  setTextBeginEdited,
  textBeginEdited,
  setEditableValue,
  listThings,
  dispatchListThings,
  readingNotSavedData,
  setReadingNotSavedData,
}: Props) => {
  const [repeatClear, setRepeatClear] = useState(false);

  function clearNoSave() {
    dispatchListThings({
      type: "update",
      idThing: idThing,
      nameProperty: nameProperty + "NoSave",
      newValue: "",
    });
  }
  function setEditableValueIn(inNoSave: boolean) {
    dispatchListThings({
      type: "update",
      idThing: idThing,
      nameProperty: nameProperty + (inNoSave ? "NoSave" : ""),
      newValue: editableValue,
    });
  }
  function validationNecessarySaveAndSaveInNoSave() {
    if (!editableValue) return;
    if (editableValue === "") return;
    if (listThings[idThing]?.[nameProperty + "NoSave"] === editableValue)
      return;

    console.log("Сохраняю");
    setEditableValueIn(true);
  }

  const handlerClickSeaNoSaved = () => {};
  const handlerClickSeeNoSaved = () => {
    setReadingNotSavedData(true);
    setTextBeginEdited(true);
  };

  useEffect(() => {
    if (textBeginEdited) setTextBeginEdited(false);
    if (repeatClear) setRepeatClear(false);
    setReadingNotSavedData(false);
  }, [idThing]);

  useEffect(() => {
    if (Date.now() - latelyRecord < 3000) return;
    latelyRecord = Date.now();
    if (!textBeginEdited) return;
    validationNecessarySaveAndSaveInNoSave();
  }, [editableValue]);

  console.log(listThings.idThing);
  return (
    <>
      {readingNotSavedData ? null :
      !listThings[idThing][nameProperty + "NoSave"] ? null :
      listThings[idThing][nameProperty + "NoSave"] === "" ? null : (
        <button onClick={() => handlerClickSeeNoSaved()}>
          Тут есть не сохраненные изменения
        </button>
      )}

      {!readingNotSavedData ? null : (
        <>
          <button></button>
          <button></button>
          <button></button>
        </>
      )}

      {!textBeginEdited ? null : (
        <div>
          <button
            onClick={() => {
              setTextBeginEdited(false);
              setEditableValueIn(false);
              if (!editableValue) return;
              if (editableValue === "") return;
              clearNoSave();
            }}
          >
            Сохранить изменения
          </button>

          <button
            onClick={() => {
              setTextBeginEdited(false);
              if (!editableValue) return;
              if (editableValue === "") return;
              clearNoSave();
            }}
          >
            Не! Не сохранять!
          </button>
        </div>
      )}

      <button
        onClick={() => {
          setEditableValue(listThings[idThing][nameProperty]);
          setTextBeginEdited(true);
          document.getElementById(idThing + nameProperty)?.focus();
        }}
      >
        Изменить
      </button>

      {!repeatClear ? null : (
        <button
          className={s.noClear}
          onClick={() => {
            setRepeatClear(false);
          }}
        >
          Ладно. Оставим пока.
        </button>
      )}
        <button
        className={repeatClear ? s.repeat : undefined}
        onClick={() => {
          if (!repeatClear) {
            setRepeatClear(true);
          } else {
            setTextBeginEdited(false);
            setRepeatClear(false);
            dispatchListThings({
              type: "update",
              idThing: idThing,
              nameProperty: nameProperty,
              newValue: "",
            });
          }
        }}
      >
        {repeatClear ? "Все изчезнет без следа!!!" : "Очистить"}
      </button>

      <button
        onClick={() => {
          setActiveProperty(null);
          setTextBeginEdited(false);

          validationNecessarySaveAndSaveInNoSave();
        }}
      >
        Выйти из текущего блока
      </button>
    </>
  );
  
};
