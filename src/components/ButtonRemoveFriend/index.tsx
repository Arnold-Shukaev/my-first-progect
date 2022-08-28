import { Dispatch } from "react";
import { ActionType } from "../../pages/Friends";
import s from "./ButtonRemoveFriend.module.scss";

type Props = {
  idThing: string | null;
  removerSelectedThing: Dispatch<ActionType>;
};

export const ButtonRemoveFriend = ({
  idThing,
  removerSelectedThing,
}: Props) => {
  if (idThing === null) return <></>;
  return (
    <button
      onClick={() => removerSelectedThing({ type: "remove", idThing: idThing })}
      className={s.but}
    >
      Удалить негодяя!
    </button>
  );
};
