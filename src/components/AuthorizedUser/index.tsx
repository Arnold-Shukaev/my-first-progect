import { useContext, useState } from "react";
import { GoogleLogout } from "react-google-login";
import { CurrentUserContext } from "../../shared";
import s from "./AuthorizedUser.module.scss";

export const AuthorizedUser = (): JSX.Element => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [stateInfoBlock, setStateInfoBlock] = useState<boolean>(true);
  const currentUserParams = JSON.parse(localStorage.messengerUsers).allUsers[
    currentUser!
  ];
  const onLogoutSuccess = () => {
    setCurrentUser!(null);
  };
  const userHaveImg = currentUserParams.imgUrl !== null;

  //TODO: добить окно профиля
  //TODO: Юр! Опять - долой тернарник?
  return (
    <div className={s.layout}>
      <div className={s.grid}>
        <div className={s.first}>
          <div className={s.imageUser}>
            {userHaveImg ? (
              <div
                style={{ backgroundImage: `url(${currentUserParams.imgUrl})` }}
              ></div>
            ) : (
              <div>А где же фото?! Ё-моё!</div>
            )}
          </div>
          <div className={s.nameUser}>
            {currentUserParams.fName + " " + currentUserParams.sName}
          </div>
        </div>
        <div className={s.second}>
          <button onClick={() => setStateInfoBlock(!stateInfoBlock)}>
            {stateInfoBlock
              ? `Про меня \u27B3 Про друзей`
              : "Про друзей \u27B3 Про меня"}
          </button>
          {stateInfoBlock ? (
            <div>
              Сведения о пользователе. Добавить возможность правки данных
            </div>
          ) : (
            <div>Иные сведения</div>
          )}
        </div>
        <div>
          <GoogleLogout
            clientId="813890704811-d4qgdlm071bh5lm63eqbq3i8oo0upp0q.apps.googleusercontent.com"
            buttonText="Выйти из аккаунта"
            onLogoutSuccess={onLogoutSuccess}
          ></GoogleLogout>
        </div>
      </div>
    </div>
  );
};
