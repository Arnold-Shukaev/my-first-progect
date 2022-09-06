import { interactionLocalStorage } from "../../shared";
import s from "./ButtonAddFriend.module.scss";

type Props = {
  selectedThing: any; // Тип
};

export const ButtonAddFriend = ({ selectedThing }: Props) => {
  function handlerClick() {
    let specialId: string =
      selectedThing.fName + selectedThing.sName + selectedThing._id;
    interactionLocalStorage(
      (oldStorage, ...arg) => {
        oldStorage[arg[0][0]] = { ...arg[0][1] }; // Какая-то дичь, это должно быть проще =)
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
