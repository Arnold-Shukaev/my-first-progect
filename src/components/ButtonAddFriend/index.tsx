import { useContext } from "react";
import {
  CurrentUserContext,
  openObjInStorage,
  saveObjInStorage,
} from "../../shared";
import s from "./ButtonAddFriend.module.scss";

type Props = {
  selectedThing: Record<string, string>; // Тип
  //АА. Исправлен с any
};

export const ButtonAddFriend = ({ selectedThing }: Props) => {
  const { currentUser } = useContext(CurrentUserContext);

  function handlerClick() {
    let specialId: string =
      selectedThing.fName + selectedThing.sName + selectedThing._id;

    //   interactionLocalStorageShared(
    //   'specialStorage' + currentUser,
    //   (oldStorage, ...arg) => {
    //     oldStorage[arg[0][0]] = { ...arg[0][1] }; // Какая-то дичь, это должно быть проще =)
    //     //Постараюсь расковырять!!!!!!!!!!!!!!!!!!
    //   },
    //   specialId,
    //   selectedThing
    // );
    // НОВАЯ РЕАЛИЗАЦИЯ
    const storageUserFriends = openObjInStorage("specialStorage" + currentUser);
    storageUserFriends[specialId] = { ...selectedThing };
    saveObjInStorage("specialStorage" + currentUser, storageUserFriends);
  }

  return (
    <button onClick={handlerClick} className={s.but}>
      Добавить друга
    </button>
  );
};
