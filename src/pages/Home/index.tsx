import { useContext, useEffect, useState } from "react";
//Ю?. Неиспользуемые импорты
//АА. Ага. Не подчистил пока. Проверю все. Просто уже раза 3 делал по разному)))
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

// Когда уходишь со страницы Home - список пропадает. Выглядит не очень. Давай сделаем чтобы
// 1. Заходишь на Home - список первый раз запрашивается сам, без нажатия на кнопку
// 2. При нажатии на кнопку список обновляется
// 3. Список не меняется при переходе на другие страницы и возвращении на Home

//TODO: БУДЕТ СДЕЛАНО
//Как ты относишься к такой реализации. Тупо через внешнюю переменную с последующим применением в useEffect (см. ниже)
//Или лучше, state в App? Или можно еще хранить в storage последний выбранный лист друзей.
// Серьёзный минус тут - видно перерисовку таблицы дважды при первом входе (Кстати, как это можно при такой реализации убрать) Вроде сам уже убрал, но так себе вариантик
// Второй, но не критический минус - При смене аккаунта без перезагрузки страницы сохраняется тот же список. Хотя это не принципиально
//(пока не созданы критерии авто-подборки друзей)

let currentNewFriendsList: Record<string, string>[] = [];       //Типо переменная

let thisRepeatRequest = false; // Придумал такую защитку от двойной отрисовки


export const Home = (): JSX.Element => {
  const { currentUser } = useContext(CurrentUserContext);

  const [listPeopleStorage, setListPeopleStorage] = useState<
    Record<string, string>[]
  >([]); //TODO: УЖЕ Изменен тип с any
  const [idSelectedPerson, setIdSelectedPerson] = useState<string | null>(null);
  let selectedPerson: Record<string, string> | null =
    idSelectedPerson === null ? null : listPeopleStorage[+idSelectedPerson];

  useEffect(() => {                                             //  И реализация взаимодействия с переменной currentNewFriendsList
    if (currentUser === null) return;

    if (listPeopleStorage.length > 0) {
      currentNewFriendsList = listPeopleStorage;
      return;
    }

    if (currentNewFriendsList.length > 0) {
      setListPeopleStorage(currentNewFriendsList);
      return;
    }

    //                                                              ЗАЩИТА от двойной отрисовки
    if (thisRepeatRequest) return;
    thisRepeatRequest = true;
    setTimeout( () => thisRepeatRequest = false, 1000 )

    requestFriendsList(
      urlRequest.toString(),
      setIdSelectedPerson,
      setListPeopleStorage
    );
  });

  if (currentUser === null) {
    return <NotCurrentUser />;
  } else {
    return (
      <div className={style.maket}>
        <div>
          <ButtonRequest
            name="Найти новых друзей"
            urlRequest={urlRequest.toString()}
            onResult={setListPeopleStorage}
            onSelectedThing={setIdSelectedPerson}
          />
          <DisplayListThings
            columnsForDisplay={columnsForDisplay}
            columnsName={nameForColumns}
            idSelectedThing={idSelectedPerson}
            onSelectedThings={setIdSelectedPerson}
            nameID={"_id"}
            listThings={[...listPeopleStorage]}
            //Почему не просто listPeopleStorage? Зачем в новый массив оборачивать?
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
  }
};
