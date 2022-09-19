import { useContext } from "react";
import { CurrentUserContext, interactionLocalStorageShared } from "../../shared";
import s from "./ButtonAddFriend.module.scss";

type Props = {
  selectedThing: any;
};

export const ButtonAddFriend = ({ selectedThing }: Props) => {
  const {currentUser} = useContext(CurrentUserContext)
  
  function handlerClick() {
    let specialId: string =
      selectedThing.fName + selectedThing.sName + selectedThing._id;
    interactionLocalStorageShared(
      'specialStorage' + currentUser,
      (oldStorage, ...arg) => {
        oldStorage[arg[0][0]] = { ...arg[0][1] };
      },
      specialId,
      selectedThing
    );
  }

  return (
    <button onClick={handlerClick} className={s.but}>
      Добавить друга
    </button>
  );
};
