import { createContext, Dispatch, SetStateAction } from "react";

type CUCType = {
  currentUser: number | null;
  setCurrentUser: Dispatch<SetStateAction<number | null>> | null;
};

export const CurrentUserContext = createContext<CUCType>({
  currentUser: null,
  setCurrentUser: null,
});

export const openObjInStorage = (path: string): Record<string, any> => {
  let ObjectInLocalStorage;

  if (localStorage[path]) {
    ObjectInLocalStorage = JSON.parse(localStorage[path]);
  } else {
    switch (path) {
      case "messengerUsers":
        ObjectInLocalStorage = {
          idFromGoogle: {},
          passwords: {},
          email: {},
          allUsers: { countUsers: 0 },
        };
        break;
      default:
        ObjectInLocalStorage = {};
        break;
    }
  }

  localStorage.setItem(path, JSON.stringify(ObjectInLocalStorage));

  return ObjectInLocalStorage;
};

export const saveObjInStorage = (
  pathNewObj: string,
  newObjInLocalStorage: Record<string, any>
): void => {
  localStorage.setItem(pathNewObj, JSON.stringify(newObjInLocalStorage));
};
