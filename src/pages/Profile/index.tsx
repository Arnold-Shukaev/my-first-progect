import { useContext, useState } from "react";
import { AuthorizedUser } from "../../components/AuthorizedUser";
import { HelloGuest } from "../../components/HelloGuest";
import { Registration } from "../../components/Registration";
import { CurrentUserContext } from "../../shared";
import s from "./Profile.module.scss";

export const Profile = (): JSX.Element => {
  const [registrationStarted, setRegistrationStarted] =
    useState<boolean>(false);
  const { currentUser } = useContext(CurrentUserContext);

  if (currentUser !== null) return <AuthorizedUser />;
  return (
    <div className={s.model}>
      {registrationStarted ? (
        <Registration setRegistrationStarted={setRegistrationStarted} />
      ) : (
        <HelloGuest setRegistration={setRegistrationStarted} />
      )}
    </div>
  );
};
