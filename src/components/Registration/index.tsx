import {
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  CurrentUserContext,
  openObjInStorage,
  saveObjInStorage,
} from "../../shared";
import s from "./Registration.module.scss";

type Props = {
  setRegistrationStarted: Dispatch<SetStateAction<boolean>>;
};
type settingsType = [RefObject<HTMLInputElement>, string, string][];

export const Registration = ({ setRegistrationStarted }: Props) => {
  const [stateNotValid, setStateNotValid] = useState<
    [HTMLInputElement, string][]
  >([]);

  const { setCurrentUser } = useContext(CurrentUserContext);

  const refFName = useRef<HTMLInputElement>(null);
  const refSName = useRef<HTMLInputElement>(null);
  const refEMail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const refImgUrl = useRef<HTMLInputElement>(null); // TODO: Разобраться с заливанием фото

  const settings: settingsType = [
    [refFName, "text", "Имя"],
    [refSName, "text", "Фамилия"],
    [refEMail, "text", "email"],
    [refPassword, "password", "Пароль"],
    [refImgUrl, "text", "Аватар"],
  ];

  const handlerClick = () => {
    const FName = refFName.current;
    const SName = refSName.current;
    const EMail = refEMail.current;
    const Password = refPassword.current;

    const valid = checkValid(FName!, SName!, EMail!, Password!);
    if (!valid) return;

    const { thisNewUser, idUser } = checkAndCreateNewUser(
      FName!,
      SName!,
      EMail!,
      Password!
    );

    if (thisNewUser) {
      setCurrentUser!(idUser);
    } else {
      alert("Текущий не установлен");
    }
  };

  function checkValid(
    FName: HTMLInputElement,
    SName: HTMLInputElement,
    EMail: HTMLInputElement,
    Password: HTMLInputElement
  ): boolean {
    const notValid: [HTMLInputElement, string][] = [];

    if (!FName.value.match(/^[A-Za-z0-9А-Яа-яёЁ]{2,10}$/))
      notValid.push([FName, "Длинна имени от 2 до 10 букв или цифр"]);

    if (!SName.value.match(/^[A-Za-z0-9А-Яа-яёЁ]{2,10}$/))
      notValid.push([SName, "Длинна фамилии от 2 до 10 букв или цифр"]);

    if (!EMail.value.match(/^[A-Za-z0-9_.-]+@[A-Za-z]+(\.[A-Za-z]+)+$/))
      notValid.push([
        EMail,
        "Email должен состоять из латинских букв, цифр и знаков '_ - .', содержать '@' и домен",
      ]);

    let comment = "";
    if (!Password.value.match(/^.{5,15}$/))
      comment =
        comment +
        "Длинна пароля от 5 до 15 латинских букв, цифр и спецсимволов (не менее 1 из категории). ";
    if (!Password.value.match(/[A-Za-z]/))
      comment = comment + "В пароле отсутствуют латинские буквы. ";
    if (!Password.value.match(/\d/))
      comment = comment + "В пароле отсутствуют цифры. ";
    if (!Password.value.match(/[^\w_]/))
      comment = comment + "В пароле отсутствуют спецсимволы.";

    if (comment !== "") notValid.push([Password, comment]);
    // TODO: Перенос строки в замечаниях к заполнению строк
    setStateNotValid(notValid);

    if (notValid.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  function checkAndCreateNewUser(
    FName: HTMLInputElement,
    SName: HTMLInputElement,
    EMail: HTMLInputElement,
    Password: HTMLInputElement
  ) {
    let numUser: number | null = null;
    let thisNewUser = false;

    const storageUsers = openObjInStorage("messengerUsers");
    if (storageUsers.email[EMail.value]) {
      alert(
        "Пользователь с таким email ужу зарегистрирован (this Placeholder)"
      ); //TODO: Сделать placeholder
    } else {
      numUser = storageUsers.allUsers.countUsers + 1;
      storageUsers.allUsers.countUsers += 1;

      storageUsers.passwords[Password.value] = numUser;
      storageUsers.email[EMail.value] = numUser;

      storageUsers.allUsers[numUser!] = {
        fName: FName.value,
        sName: SName.value,
        name: FName.value + " " + SName.value,
        email: EMail.value,
        imgUrl: null,
        idInGoogle: "notGoogle",
        password: Password.value,
      };
      thisNewUser = true;
    }
    saveObjInStorage("messengerUsers", storageUsers);

    return { thisNewUser, idUser: numUser };
  }

  useEffect(() => {
    stateNotValid.map((rule) => {
      const elemForm = rule[0];
      const textError = rule[1];

      const indicatorElement = document.createElement("div");
      indicatorElement.className = s.indicatorInvalided;
      indicatorElement.textContent = "i";
      indicatorElement.dataset.notValidRegistration = "true";

      const errorDiv = document.createElement("div");
      errorDiv.textContent = textError;
      errorDiv.className = s.messageInvalid;

      indicatorElement.addEventListener("pointerover", () =>
        indicatorElement.append(errorDiv)
      );
      indicatorElement.addEventListener("pointerout", () => errorDiv.remove());

      elemForm.closest("div")!.append(indicatorElement);
    });
    return () => {
      const elements = document.querySelectorAll(
        'div[data-not-valid-registration^="true"]'
      );
      elements.forEach((elem) => elem.remove());
    };
  }, [stateNotValid]);

  //Надо сделать проверку регистрации

  return (
    <>
      <h3>Регистрация нового пользователя</h3>
      <div>
        <form>
          {settings.map((item, id) => (
            <div key={id}>
              <input ref={item[0]} type={item[1]} required></input>
              <label htmlFor="name">{item[2]}</label>
            </div>
          ))}
          <button type="button" onClick={handlerClick}>
            Создать
          </button>
        </form>
        <button onClick={() => setRegistrationStarted(false)}>Вернуться</button>
      </div>
    </>
  );
};
