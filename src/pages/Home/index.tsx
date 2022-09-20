import { Reducer, useReducer, useState, useEffect, useCallback } from "react"; // Неиспользуемые импорты
//АА. Ага. Не подчистил пока. Проверю все. Просто уже раза 3 делал по разному)))
import { ButtonRequest } from "../../components/ButtonRequest";
import { DisplayItemCard } from "../../components/DisplayItemCard";
import { DisplayListThings } from "../../components/DisplayListThings";
import style from "./Home.module.scss";

// Настройка запроса
const urlParams = { // Вынеси вот эти все параметры в отдельный файл в корень, типа constants.ts
  //TODO: СДЕЛАТЬ!!!!!
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

//TODO: Проверить!!!! Вроде учел уже!

const urlRequest = new URL('http://filltext.com');
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

// Когда уходишь со страницы Home - список пропадает. Выглядит не очень. Давай сделаем чтобы
// 1. Заходишь на Home - список первый раз запрашивается сам, без нажатия на кнопку
// 2. При нажатии на кнопку список обновляется
// 3. Список не меняется при переходе на другие страницы и возвращении на Home

//TODO: БУДЕТ СДЕЛАНО

export const Home = (): JSX.Element => {
  const [listPeopleStorage, setListPeopleStorage] = useState<any[]>([]);
  const [idSelectedPerson, setIdSelectedPerson] = useState<number | null>(null);
  let selectedPerson =
    idSelectedPerson === null ? null : listPeopleStorage[idSelectedPerson];

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
          listThings={[...listPeopleStorage]} //Почему не просто listPeopleStorage? Зачем в новый массив оборачивать?
          //АА. Специально отдаю копию, чтобы у DisplayListThings не было возможности исправить оригинал хранилища (защита от очумелых рук. Типо тут мой сервак) 
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
