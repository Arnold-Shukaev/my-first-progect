import { Dispatch, SetStateAction } from "react";
import style from "./ButtonRequest.module.scss";

type Props = {
  name: string;
  urlRequest: string;
  handlerResponse: Dispatch<SetStateAction<any>>; // Убери этот проп
  setIdSelectedThing: Dispatch<SetStateAction<any>>; // И этот
  // Сделай такие пропы и в них передавай логику по сохранению результата в стейт и сбросу выбранного id
  // onResult?: (data: FriendItem[]) => void
  // onError?: (error: Error) => void
};

export const ButtonRequest = ({
  name,
  urlRequest,
  handlerResponse,
  setIdSelectedThing,
}: Props) => {
  function handlerClick() {
    fetch(urlRequest)
      .then((res) => res.json())
      .then((json) => {
        setIdSelectedThing(null);
        for (let i = 0; i < json.length; i++) {
          json[i]._id = i;
        }
        handlerResponse(json);
      });
  }

  return (
    <button onClick={handlerClick} className={style.but}>
      {name}
    </button>
  );
};
