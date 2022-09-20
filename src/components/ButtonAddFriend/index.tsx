import { useContext } from "react";
import {
  CurrentUserContext,
  openObjInStorage,
  saveObjInStorage,
} from "../../shared";
import s from "./ButtonAddFriend.module.scss";

type Props = {
  selectedThing: Record<string, string>;
};

export const ButtonAddFriend = ({ selectedThing }: Props): JSX.Element => {
  const { currentUser } = useContext(CurrentUserContext);

  function handlerClick() {
    let specialId: string =
      selectedThing.fName + selectedThing.sName + selectedThing._id;

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
