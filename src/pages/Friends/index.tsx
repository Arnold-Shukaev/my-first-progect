import { Reducer, useEffect, useReducer, useState } from "react";
import { AvatarAndBasicInfo } from "../../components/AvatarAndBasicInfo";
import { ButtonsBlock } from "../../components/ButtonsBlock";

import { DisplayListThings } from "../../components/DisplayListThings";
import { SpecialPropertyFriend } from "../../components/SpecialPropertysFriend";
import { interactionLocalStorage } from "../../shared";
import s from "./Friends.module.scss";

type FriendType = {
  [param: string]: string;
};
export type FriendsListType = {
  [param: string]: FriendType;
};
export type StateType = {
  listFriends: FriendsListType;
};
export type ActionType =
  | {
      type: "update";
      idThing: string | null;
      nameProperty: string;
      newValue: string;
    }
  | {
      type: "remove";
      idThing: string | null;
    }
  | {
      type: "new";
    };

const reducer: Reducer<StateType, ActionType> = (state, action): StateType => {
  const { type } = action;
  switch (type) {
    case "new":
      if (!localStorage.specialStorage) return { listFriends: {} };

      let newList: FriendsListType = { listFriends: {} };
      try {
        newList = JSON.parse(localStorage.specialStorage);
      } catch {
        console.log("Вероятна проблема с localStorage.specialStorage");
        console.log(localStorage.specialStorage);
      }
      return { listFriends: newList };
    case "remove":
      if (action.idThing === null) {
        alert("Сначала выберите 'бывшего' для удаления");
        return state;
      }
      const newSpecialStorage = interactionLocalStorage(
        (oldStorage, ...arg) => {
          delete oldStorage[arg[0][0]];
        },
        action.idThing
      );
      return { listFriends: newSpecialStorage };
    case "update":
      const newSpecialStorageAdd = interactionLocalStorage(
        (oldStorage, ...arg) => {
          oldStorage[arg[0][0]][arg[0][1]] = arg[0][2];
        },
        action.idThing,
        action.nameProperty,
        action.newValue
      );
      return { listFriends: newSpecialStorageAdd };
    default:
      return { listFriends: {} };
  }
};
function arrayFromObject(obj: FriendsListType): { [param: string]: string }[] {
  const arr: { [param: string]: string }[] = [];
  for (let prop in obj) {
    let thing = obj[prop];
    thing._specialID = prop;
    arr.push(obj[prop]);
  }
  return arr;
}

const columnsForDisplay = ["fName", "sName"];
const columnsName = ["Имя", "Фамилия"];

const columnsForBasicInfo = [
  "age",
  "friends",
  "score",
  "fromCity",
  "placeWork",
  "email",
  "phone",
];
const columnsNameForBasicInfo = [
  "Возраст",
  "Друзья",
  "Оценка",
  "Проживает в",
  "Место работы",
  "email",
  "Телефон",
];

export const Friends = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, { listFriends: {} });
  const { listFriends } = state;
  const [activateAvatar, setActivateAvatar] = useState<boolean>(true);
  const [activateSpecialProperty, setSpecialProperty] =
    useState<HTMLDivElement | null>(null);

  const [specialIdSelectedThing, setSpecialIdSelectedThings] = useState<
    string | null
  >(null);
  const selectedThing =
    specialIdSelectedThing === null
      ? null
      : listFriends[specialIdSelectedThing] || null;
  useEffect(() => {
    dispatch({ type: "new" });
  }, []);

  return (
    <div className={s.maket}>
      <div
        className={
          activateSpecialProperty ? s.activateSpecialProperty : undefined
        }
      >
        <DisplayListThings
          columnsForDisplay={columnsForDisplay}
          columnsName={columnsName}
          idSelectedThing={specialIdSelectedThing}
          setIdSelectedThings={setSpecialIdSelectedThings}
          nameID={"_specialID"}
          listThings={arrayFromObject(listFriends)}
        >
          Заведите друзей для отображения данных
        </DisplayListThings>
      </div>
      <div>
        {!selectedThing ? null : (
          <>
            <AvatarAndBasicInfo
              selectedThing={selectedThing}
              activateStatus={activateAvatar}
              setActivateStatus={setActivateAvatar}
              paramForDisplay={columnsForBasicInfo}
              nameParamForDisplay={columnsNameForBasicInfo}
            />
            <SpecialPropertyFriend
              idThing={specialIdSelectedThing}
              activeProperty={activateSpecialProperty}
              setActiveProperty={setSpecialProperty}
              listThings={listFriends}
              dispatchListThings={dispatch}
            />
            {activateSpecialProperty ? null : (
              <ButtonsBlock
                idThing={specialIdSelectedThing}
                removerSelectedThing={dispatch}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
