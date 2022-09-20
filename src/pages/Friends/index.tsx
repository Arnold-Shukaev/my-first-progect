import { Reducer, useContext, useEffect, useReducer, useState } from "react";
import { AvatarAndBasicInfo } from "../../components/AvatarAndBasicInfo";
import { ButtonsBlock } from "../../components/ButtonsBlock";

import { DisplayListThings } from "../../components/DisplayListThings";
import { NotCurrentUser } from "../../components/NotCurrentUser";
import { SpecialPropertyFriend } from "../../components/SpecialPropertysFriend";
import {
  CurrentUserContext,
  openObjInStorage,
  saveObjInStorage,
} from "../../shared";
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
  const { currentUser } = useContext(CurrentUserContext);

  const reducer: Reducer<StateType, ActionType> = (
    state,
    action
  ): StateType => {
    const storage = localStorage["specialStorage" + currentUser];

    const { type } = action;
    switch (type) {
      case "new":
        if (!storage) return { listFriends: {} };

        let newList: FriendsListType = { listFriends: {} };
        try {
          newList = JSON.parse(storage);
        } catch {
          console.log(
            "Вероятна проблема с localStorage.specialStorage..." + currentUser
          );
          console.log(storage);
        }
        return { listFriends: newList };
      case "remove":
        if (action.idThing === null) {
          alert("Сначала выберите 'бывшего' для удаления");
          return state;
        }
        const storageUser = openObjInStorage("specialStorage" + currentUser)
        delete storageUser[action.idThing]
        saveObjInStorage("specialStorage" + currentUser, storageUser)
        return { listFriends: storageUser };

      case "update":
        if (action.idThing === null) return state;
        const storageUserAdd = openObjInStorage("specialStorage" + currentUser)
        storageUserAdd[action.idThing][action.nameProperty] = action.newValue;
        saveObjInStorage("specialStorage" + currentUser, storageUserAdd)
        return { listFriends: storageUserAdd };
      default:
        return { listFriends: {} };
    }
  };

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

  if (currentUser === null) {
    return <NotCurrentUser />;
  } else {
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
            onSelectedThings={setSpecialIdSelectedThings}
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
  }
};
