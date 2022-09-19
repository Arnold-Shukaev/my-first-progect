import { createContext, Dispatch, SetStateAction } from "react";

type CUCType = {
  currentUser: number | null;
  setCurrentUser: Dispatch<SetStateAction<any>> | null;
};

export const CurrentUserContext = createContext<CUCType>({
  currentUser: null,
  setCurrentUser: null,
});

export const interactionLocalStorageShared = (
  path: string,
  action: (
    oldObjectInLS: { [prop: string]: { [prop: string]: any } },
    ...arg: any
  ) => void,
  ...args: any
) => {
  let newObjectInLS;

  if (localStorage[path]) {
    newObjectInLS = JSON.parse(localStorage[path]);
  } else {
    switch (path) {
      case "messengerUsers":
        newObjectInLS = {
          idFromGoogle: {},
          passwords: {},
          email: {},
          allUsers: { countUsers: 0 },
        };
        break;
      default:
        newObjectInLS = {};
        break;
    }
  }
  action(newObjectInLS, args);

  localStorage.setItem(path, JSON.stringify(newObjectInLS));

  return newObjectInLS;
};
