import { Dispatch, SetStateAction, useContext, useRef } from "react";
import { CurrentUserContext } from "../../shared";
import { Authorization } from "../Authorization";
import s from "./HelloGuest.module.scss";

type Props = {
  setRegistration: Dispatch<SetStateAction<boolean>>;
};

export const HelloGuest = ({ setRegistration }: Props): JSX.Element => {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const revEmailUser = useRef<HTMLInputElement>(null);
  const revPasswordUser = useRef<HTMLInputElement>(null);
  //TODO: Юр! Что скажешь тут по поводу Ref
  const messageOfError = () => {
    const messageDiv = document.createElement("div");
    messageDiv.className = s.messageDiv;
    messageDiv.textContent = "Неверный email или пароль! Попробуйте еще раз.";
    (revEmailUser.current as HTMLInputElement)!
      .closest("div")!
      .append(messageDiv);

    setTimeout(() => messageDiv.remove(), 2000);
  };

  const onClickComeIn = () => {
    let failed = false;

    const userPassword = (revPasswordUser.current as HTMLInputElement).value;
    const userEmail = (revEmailUser.current as HTMLInputElement).value;

    const storage = JSON.parse(localStorage.messengerUsers);
    if (!storage) failed = true;

    const storageEmail = storage.email;
    if (!storageEmail) failed = true;

    let numUser: number = storageEmail[userEmail];
    if (!numUser) {
      failed = true;
    } else if (storage.allUsers[numUser].password !== userPassword) {
      failed = true;
    } else {
      setCurrentUser!(numUser);
      return;
    }

    if (failed) messageOfError();
  };
  //TODO: удали спец кнопку на localStorage
  return (
    <>
      <h3>Привет. Тебе необходимо войти!</h3>

      <div>
        <input ref={revEmailUser} type="text" id="email" required></input>
        <label htmlFor="email">Email</label>
      </div>
      <div>
        <input
          ref={revPasswordUser}
          type="password"
          id="password"
          required
        ></input>
        <label htmlFor="password">Пароль</label>

        <button onClick={() => onClickComeIn()}>Войти</button>
        <Authorization />
        <button onClick={() => setRegistration(true)}>
          Или зарегистрируйся
        </button>

        <br></br>
        <br></br>
        <button
          onClick={() => console.log(JSON.parse(localStorage.messengerUsers))}
        >
          Подглядеть localStorage
        </button>
      </div>
    </>
  );
};
