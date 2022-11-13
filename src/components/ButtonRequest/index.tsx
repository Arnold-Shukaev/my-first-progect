import { memo } from "react";
import style from "./ButtonRequest.module.scss";

type Props = {
  name: string;
  urlRequest: Request;
  onResult: (data: Record<string, string>[]) => void;
  onSelectedThing: (state: null) => void;
};

export function requestFriendsList(
  urlRequest: Request,
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

export const ButtonRequest = memo(
  ({ name, urlRequest, onResult, onSelectedThing }: Props): JSX.Element => {
    return (
      <button
        onClick={() =>
          requestFriendsList(urlRequest, onSelectedThing, onResult)
        }
        className={style.but}
      >
        {name}
      </button>
    );
  }
);
