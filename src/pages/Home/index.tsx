import { useContext, useState } from "react";
import { ButtonRequest } from "../../components/ButtonRequest";
import { DisplayItemCard } from "../../components/DisplayItemCard";
import { DisplayListThings } from "../../components/DisplayListThings";
import { NotCurrentUser } from "../../components/NotCurrentUser";
import { CurrentUserContext } from "../../shared";
import style from "./Home.module.scss";

// Настройка запроса
const urlParams = {
  rows: 20,
  fName: "{firstName}",
  sName: "{lastName}",
  age: "{numberRange|16, 85}",
  friends: "{numberRange|0, 999}",
  score: "{numberRange|0, 5}",
  placeWork: "{business}",
  email: "{email}",
  phone: "{phone|format}",
  fromCity: "{city}",
};

// const urlRequest = 'http://filltext.com/?' + Object.entries(urlParams).map( param => `${param[0]}=${param[1]}`).join('&') ;
// Тут проще и правильней будет сделать так, чтобы не возиться c подстановкой значение в строку
const urlRequest = new URL("http://filltext.com");
Object.entries(urlParams).forEach(([key, value]) => {
  urlRequest.searchParams.append(key, String(value));
});

// Настройки параметров списка людей DisplayListThings
const columnsForDisplay = ["fName", "sName", "age", "friends", "score"];
const nameForColumns = ["Имя", "Фамилия", "Возраст", "Друзья", "Оценка"];

// Настройки параметров карточки человека DisplayItemCard
const fieldForDisplay = [
  "fName",
  "sName",
  "age",
  "friends",
  "score",
  "fromCity",
  "placeWork",
  "email",
  "phone",
];
const nameForField = [
  "Имя",
  "Фамилия",
  "Возраст",
  "Друзья",
  "Оценка",
  "Проживает в",
  "Место работы",
  "email",
  "Телефон",
];

export const Home = (): JSX.Element => {
  const { currentUser } = useContext(CurrentUserContext);

  const [listPeopleStorage, setListPeopleStorage] = useState<any[]>([]);
  const [idSelectedPerson, setIdSelectedPerson] = useState<number | null>(null);
  let selectedPerson =
    idSelectedPerson === null ? null : listPeopleStorage[idSelectedPerson];

  if (currentUser === null) {
    return <NotCurrentUser />;
  } else {
    return (
      <div className={style.maket}>
        <div>
          <ButtonRequest
            name="Найти новых друзей"
            urlRequest={urlRequest.toString()}
            handlerResponse={setListPeopleStorage}
            setIdSelectedThing={setIdSelectedPerson}
          />
          <DisplayListThings
            columnsForDisplay={columnsForDisplay}
            columnsName={nameForColumns}
            idSelectedThing={idSelectedPerson}
            setIdSelectedThings={setIdSelectedPerson}
            nameID={"_id"}
            listThings={[...listPeopleStorage]}
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
  }
};
