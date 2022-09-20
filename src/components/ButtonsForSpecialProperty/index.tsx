import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ActionType, FriendsListType } from "../../pages/Friends";
import { ActionButtonType, StateButtonType } from "../InputWithActivatingState";
import s from "./ButtonsForSpecialProperty.module.scss";
type Props = {
  idThing: string;
  listThings: FriendsListType;
  nameProperty: string;
  editableValue: string;
  setActiveProperty: Dispatch<SetStateAction<HTMLDivElement | null>>;
  dispatchStateButton: Dispatch<ActionButtonType[]>;
  stateButton: StateButtonType;
  setEditableValue: Dispatch<SetStateAction<string>>;
  dispatchListThings: Dispatch<ActionType>;
};

export const ButtonsForSpecialProperty = ({
  idThing,
  listThings,
  nameProperty,
  editableValue,
  setActiveProperty,
  dispatchStateButton,
  stateButton,
  setEditableValue,
  dispatchListThings,
}: Props): JSX.Element => {
  const [clearMode, setClearMode] = useState(false);
  const { beginEdited, readingNotSavedData, thisNotSaved } = stateButton;
  const haveNotNotSaveData = listThings[idThing][nameProperty + "NotSaved"]
    ? false
    : true;

  const setPropertyValue = (
    inNotSaved: boolean,
    savedValue: string = editableValue
  ) => {
    dispatchListThings({
      type: "update",
      idThing: idThing,
      nameProperty: nameProperty + (inNotSaved ? "NotSaved" : ""),
      newValue: savedValue,
    });
  };
  const validationNecessarySaveAndSaveInNotSaved = () => {
    if (!editableValue) return;
    if (editableValue === "") return;
    if (listThings[idThing][nameProperty + "NotSaved"] === editableValue)
      return;
    if (listThings[idThing][nameProperty] === editableValue) return;
    setPropertyValue(true);
  };
  const handlerClickSeeNotSaved = () => {
    dispatchStateButton([
      {
        key: "readingNotSavedData",
        value: true,
      },
    ]);
  };
  const handlerClickSaveNotSavedData = () => {
    if (thisNotSaved)
      setPropertyValue(false, listThings[idThing][nameProperty + "NotSaved"]);
    setEditableValue("");
    setPropertyValue(true, "");
    dispatchStateButton([
      { key: "readingNotSavedData", value: false },
      { key: "thisNotSaved", value: true },
    ]);
  };
  const handlerClickExit = () => {
    setActiveProperty(null);
    dispatchStateButton([
      { key: "beginEdited", value: false },
      { key: "readingNotSavedData", value: false },
      { key: "thisNotSaved", value: true },
    ]);
  };
  const handlerClickClearPropertyData = () => {
    dispatchStateButton([{ key: "beginEdited", value: false }]);
    setClearMode(false);
    setPropertyValue(false, "");
  };
  const handlerClickStartChange = () => {
    const textProperty = listThings[idThing][nameProperty] || "";
    setEditableValue(textProperty);
    dispatchStateButton([{ key: "beginEdited", value: true }]);
    document.getElementById(idThing + nameProperty)?.focus();
  };
  const handlerClickNotSaveChanges = () => {
    dispatchStateButton([{ key: "beginEdited", value: false }]);
    setEditableValue("");
    setPropertyValue(true, "");
  };
  const handlerClickSaveChanges = () => {
    dispatchStateButton([{ key: "beginEdited", value: false }]);
    setPropertyValue(false);
    setEditableValue("");
    setPropertyValue(true, "");
  };

  useEffect(() => {
    dispatchStateButton([
      { key: "beginEdited", value: false },
      { key: "readingNotSavedData", value: false },
      { key: "thisNotSaved", value: true },
    ]);
    if (clearMode) setClearMode(false);
  }, [idThing]);

  useEffect(() => {
    if (!beginEdited) return;
    validationNecessarySaveAndSaveInNotSaved();
  }, [editableValue]);

  //TODO: Юран! Видимо ты просто этого еще не видел )))   Переделывать видимо надо и уйти от тернарников
  return (
    <>
      {beginEdited ||
      clearMode ||
      haveNotNotSaveData ? null : readingNotSavedData ? (
        <>
          <div className={s.twoButton}>
            <button
              className={thisNotSaved ? undefined : s.save}
              onClick={() =>
                dispatchStateButton([{ key: "thisNotSaved", value: false }])
              }
            >
              Текущие
            </button>

            <button
              className={thisNotSaved ? s.save : undefined}
              onClick={() =>
                dispatchStateButton([{ key: "thisNotSaved", value: true }])
              }
            >
              Не сохраненные
            </button>
          </div>
          <button
            className={s.notSave}
            onClick={() => handlerClickSaveNotSavedData()}
          >
            Теперь будут эти данные
          </button>
        </>
      ) : (
        <button className={s.notSave} onClick={() => handlerClickSeeNotSaved()}>
          Тут есть не сохраненные данные
        </button>
      )}

      {readingNotSavedData || clearMode ? null : beginEdited ? (
        <>
          <button className={s.save} onClick={() => handlerClickSaveChanges()}>
            Сохранить изменения
          </button>

          <button
            className={s.notSave}
            onClick={() => handlerClickNotSaveChanges()}
          >
            Не! Не сохранять!
          </button>
        </>
      ) : !haveNotNotSaveData ? null : (
        <button onClick={() => handlerClickStartChange()}>Изменить</button>
      )}

      {readingNotSavedData ||
      beginEdited ||
      !haveNotNotSaveData ? null : clearMode ? (
        <>
          <button className={s.noClear} onClick={() => setClearMode(false)}>
            Ладно. Оставим пока.
          </button>

          <button
            className={s.repeat}
            onClick={() => handlerClickClearPropertyData()}
          >
            Все исчезнет без следа!!!
          </button>
        </>
      ) : (
        <button onClick={() => setClearMode(true)}>Очистить</button>
      )}

      <button onClick={() => handlerClickExit()}>
        Выйти из текущего блока
      </button>
    </>
  );
};
