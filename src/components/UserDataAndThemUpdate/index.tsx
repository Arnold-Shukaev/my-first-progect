import { useContext, useState } from "react";
import {
  CurrentUserContext,
  openObjInStorage,
  saveObjInStorage,
} from "../../shared";
import { fieldForDisplayUser, nameForFieldUser } from "../../shared/constants";
import s from "./UserDataAndThemUpdate.module.scss";

export const UserDataAndThemUpdate = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [currentUserParams, setCurrentUserParams] = useState<
    Record<string, string>
  >(openObjInStorage("messengerUsers").allUsers[currentUser!]);
  const [editMode, setEditMode] = useState<boolean>(false);
  let textInButton = editMode ? "Сохранить" : "Изменить";

  const handlerChange = (elem: HTMLInputElement) => {
    const nameField: string = elem.dataset.fieldForDisplayUser!;
    const valueField = elem.value;

    let newCurrentUserParams = { ...currentUserParams };
    newCurrentUserParams[nameField] = valueField;
    setCurrentUserParams(newCurrentUserParams);
  };

  const handlerClick = () => {
    if (editMode) {
      const oldStorage = openObjInStorage("messengerUsers");
      oldStorage.allUsers[currentUser!] = currentUserParams;
      saveObjInStorage("messengerUsers", oldStorage);
    }
    setEditMode(!editMode);
  };

  const handlerCancel = () => {
    setEditMode(!editMode);
    setCurrentUserParams(
      openObjInStorage("messengerUsers").allUsers[currentUser!]
    );
  };
  // Юр! Опить таки тернарик долой?
  return (
    <>
      {fieldForDisplayUser.map((item, id) => (
        <div key={id} className={s.propertiesBlock}>
          <span>{nameForFieldUser[id]}:</span>
          <input
            className={editMode ? s.editInput : undefined}
            data-field-for-display-user={fieldForDisplayUser[id]}
            value={currentUserParams[item]}
            disabled={fieldForDisplayUser[id] === "email" ? true : !editMode}
            onChange={(e) => handlerChange(e.target)}
          />
        </div>
      ))}
      <button onClick={() => handlerClick()}>{textInButton}</button>
      {editMode ? (
        <button onClick={() => handlerCancel()}>Отмена</button>
      ) : null}
    </>
  );
};
