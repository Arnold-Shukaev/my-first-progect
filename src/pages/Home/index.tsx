import { useContext, useEffect, useState } from "react";
import {
  ButtonRequest,
  requestFriendsList,
} from "../../components/ButtonRequest";
import { DisplayItemCard } from "../../components/DisplayItemCard";
import { DisplayListThings } from "../../components/DisplayListThings";
import { NotCurrentUser } from "../../components/NotCurrentUser";
import { CurrentUserContext } from "../../shared";
import {
  urlRequest,
  columnsForDisplay,
  nameForColumns,
  fieldForDisplay,
  nameForField,
} from "../../shared/constants";
import style from "./Home.module.scss";

//TODO: Юр! Что с реализацией хранения currentNewFriendsList
let currentNewFriendsList: Record<string, string>[] = [];
let thisRepeatRequest = false;

export const Home = (): JSX.Element => {
  const { currentUser } = useContext(CurrentUserContext);

  const [listPeopleStorage, setListPeopleStorage] = useState<
    Record<string, string>[]
  >([]);
  const [idSelectedPerson, setIdSelectedPerson] = useState<string | null>(null);

console.log("render Home")

  let selectedPerson: Record<string, string> | null =
    idSelectedPerson === null ? null : listPeopleStorage[+idSelectedPerson];

  useEffect(() => {
    if (currentUser === null) return;

    if (listPeopleStorage.length > 0) {
      currentNewFriendsList = listPeopleStorage;
      return;
    }

    if (currentNewFriendsList.length > 0) {
      setListPeopleStorage(currentNewFriendsList);
      return;
    }

    if (thisRepeatRequest) return;
    thisRepeatRequest = true;
    setTimeout(() => (thisRepeatRequest = false), 1000);

    requestFriendsList(
      urlRequest(),
      setIdSelectedPerson,
      setListPeopleStorage
    );
  });

  if (currentUser === null) {
    return <NotCurrentUser />;
  }
  return (
    <div className={style.layout}>
      <div>
        <ButtonRequest 
          name="Найти новых друзей"
          urlRequest={urlRequest()}
          onResult={setListPeopleStorage}
          onSelectedThing={setIdSelectedPerson}
        />
        <DisplayListThings
          columnsForDisplay={columnsForDisplay}
          columnsName={nameForColumns}
          idSelectedThing={idSelectedPerson}
          onSelectedThings={setIdSelectedPerson}
          nameID={"_id"}
          listThings={[...listPeopleStorage]} //TODO: Юр! Что делаем с диструктуризацией в проп
        >
          Нажмите "Найти новых друзей" для отображения данных
        </DisplayListThings>
      </div>
      <div>
        <DisplayItemCard
          fieldForDisplay={fieldForDisplay}
          nameForField={nameForField}
          selectedThing={selectedPerson}
        />
      </div>
    </div>
  );
};
