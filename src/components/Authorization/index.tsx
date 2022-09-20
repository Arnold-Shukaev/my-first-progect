import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useContext, useEffect } from "react";
import {
  CurrentUserContext,
  openObjInStorage,
  saveObjInStorage,
} from "../../shared";

type UserType = {
  thisNewUser: boolean;
  idUser: number;
};

const checkingAndCreateUserFromGoogle = (res: any): UserType => {
  let thisNewUser = false;
  let numUser = 0;

  const storageUsers = openObjInStorage("messengerUsers");

  const idInGoogle = String(res.Ca);

  if (storageUsers.idFromGoogle[idInGoogle]) {
    numUser = storageUsers.idFromGoogle[idInGoogle];
    alert(
      "Да. Уже есть в базе. Authorization. номер - " +
        storageUsers.idFromGoogle[idInGoogle]
    );
  } else {
    numUser = storageUsers.allUsers.countUsers + 1;
    storageUsers.allUsers.countUsers += 1;

    const password = [];
    for (let i = 0; i < 10; i++) {
      password.push(Math.round(Math.random() * 10));
    }

    const fName = res.profileObj.givenName;
    const sName = res.profileObj.familyName;
    const name = res.profileObj.name;
    const email = res.profileObj.email;
    const imgUrl = res.profileObj.imageUrl;

    storageUsers.passwords[password.join("")] = numUser;
    storageUsers.idFromGoogle[idInGoogle] = numUser;
    storageUsers.email[email] = numUser;

    storageUsers.allUsers[numUser] = {
      fName,
      sName,
      name,
      email,
      imgUrl,
      idInGoogle,
      password: password.join(""),
    };
    thisNewUser = true;
  }

  saveObjInStorage("messengerUsers", storageUsers)
  return { thisNewUser, idUser: numUser };
};

export const Authorization = () => {
  const { setCurrentUser } = useContext(CurrentUserContext);

  const clientId =
    "813890704811-d4qgdlm071bh5lm63eqbq3i8oo0upp0q.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: clientId,
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const onSuccess = (res: any) => {
    const { thisNewUser, idUser } = checkingAndCreateUserFromGoogle(res);
    if (thisNewUser)
      alert(
        "На вашу почту отправлено письмо с персональным кодом. НЕ ДОРАБОТАНО!!!!!"
      ); // TODO:Разобраться с отправкой письма
    setCurrentUser!(idUser);
  };
  const onFailure = () => {
    console.log("Плохо");
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Войти через Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
    />
  );
};
