import { Dispatch, MouseEvent } from "react";
import { ActionType, FriendsListType } from "../../pages/Friends";
import { Star } from "../Star";
import s from "./Stars.module.scss";

type Props = {
  listThings: FriendsListType;
  idThing: string;
  dispatchListThings: Dispatch<ActionType>;
};

function viewStars(countStars: number) {
  const arr = [];
  for (let i = 0; i < 5; i++) arr.push(<Star active={countStars > i} />);
  return arr;
}
export const Stars = ({ listThings, idThing, dispatchListThings }: Props) => {
  const countStars = +listThings[idThing].stars | 0;
  const arrStars = viewStars(countStars);

  const handlerClick = (e: MouseEvent<HTMLButtonElement>) => {
    const idButton = +(e.target as HTMLElement).closest("button")!.dataset
      .numButton!;
    if (idButton + 1 === +listThings[idThing].stars) {
      dispatchListThings({
        type: "update",
        idThing: idThing,
        nameProperty: "stars",
        newValue: "0",
      });
    } else {
      const countStars = String(idButton + 1);
      dispatchListThings({
        type: "update",
        idThing: idThing,
        nameProperty: "stars",
        newValue: countStars,
      });
    }
  };

  return (
    <div>
      {arrStars.map((star, id) => (
        <button
          key={id}
          data-num-button={id}
          className={s.button}
          onClick={(e) => handlerClick(e)}
        >
          {star}
        </button>
      ))}
    </div>
  );
};
