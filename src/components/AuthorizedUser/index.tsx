import { useContext, useState } from "react";
import { GoogleLogout } from "react-google-login";
import { CurrentUserContext, openObjInStorage } from "../../shared";
import { UpdateImageUser } from "../UpdateImageUser";
import { UserDataAndThemUpdate } from "../UserDataAndThemUpdate";
import s from "./AuthorizedUser.module.scss";

export const AuthorizedUser = (): JSX.Element => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [stateInfoBlock, setStateInfoBlock] = useState<boolean>(true);
  const [startUpdateImage, setStartUpdateImage] = useState<boolean>(false);

  const currentUserParams =
    openObjInStorage("messengerUsers").allUsers[currentUser!];
  const userHaveImg = currentUserParams.imgUrl !== null;

  const onLogoutSuccess = () => {
    setCurrentUser!(null);
  };

  //TODO: добить окно профиля
  //TODO: Юр! Опять - долой тернарник?
  return (
    <div className={s.layout}>
      <UpdateImageUser
        stateUpdate={startUpdateImage}
        onStarted={setStartUpdateImage}
      />
      <div className={s.grid}>
        <div className={s.first}>
          <div
            className={s.imageUser}
            onClick={() => setStartUpdateImage(true)}
          >
            {userHaveImg ? (
              <div
                style={{ backgroundImage: `url(${currentUserParams.imgUrl})` }}
              ></div>
            ) : (
              <div>Без Гугла нет image</div>
            )}
          </div>
          <div className={s.nameUser}>
            {currentUserParams.fName + " " + currentUserParams.sName}
          </div>
        </div>
        <div>
          <button
            className={stateInfoBlock ? s.activeButton : undefined}
            onClick={() => setStateInfoBlock(true)}
          >
            Про меня
          </button>
          <button
            className={stateInfoBlock ? undefined : s.activeButton}
            onClick={() => setStateInfoBlock(false)}
          >
            Про что-то еще
          </button>
        </div>
        <div>
          {stateInfoBlock ? (
            <UserDataAndThemUpdate />
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
