import style from "./ButtonRequest.module.scss";

type Props = {
  name: string;
  urlRequest: string;
  // handlerResponse: Dispatch<SetStateAction<any>>; // Убери этот проп
  onResult: (data: Record<string, string>[]) => void;
  onSelectedThing: (state: null) => void; // И этот
  // Сделай такие пропы и в них передавай логику по сохранению результата в стейт и сбросу выбранного id
  // onResult?: (data: FriendItem[]) => void
  // onError?: (error: Error) => void

  //АА. Тут я маленько не допер!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //Вроде допер. Но обработчика ошибки тут нет
};

export function requestFriendsList(
  urlRequest: string,
  onSelectedThing: (state: null) => void,
  onResult: (data: Record<string, string>[]) => void
) {
  fetch(urlRequest)
    .then((res) => res.json())
    .then((json) => {
      onSelectedThing(null);
      for (let i = 0; i < json.length; i++) {
        json[i]._id = i;
      }
      onResult(json);
    });
}

export const ButtonRequest = ({
  name,
  urlRequest,
  onResult,
  onSelectedThing,
}: Props) => {
  return (
    <button
      onClick={() => requestFriendsList(urlRequest, onSelectedThing, onResult)}
      className={style.but}
    >
      {name}
    </button>
  );
};
