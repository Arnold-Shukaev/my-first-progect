import { createContext, Dispatch, SetStateAction } from "react";

type CUCType = {
  currentUser: number | null;
  setCurrentUser: Dispatch<SetStateAction<any>> | null;
};

export const CurrentUserContext = createContext<CUCType>({
  currentUser: null,
  setCurrentUser: null,
});

export const interactionLocalStorageShared = (// Ты сам то вспомнишь что тут происходит вообще?)
//АА. Вспомню. Эта функция в новой ветке уже доработана чутка. Смысл прост.
//Эта функция принимает функцию, которая будет применена к localStorage. ...arg - если нужно что-то передать в нее дополнительно
//Но мне тоже это порно не очень понравилось. Поковыряю еще
//TODO:формула
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

export const openObjInStorage = (
  path: string,
): Record<string,any> => {
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

export const saveObjInStorage = (pathNewObj: string, newObjInLocalStorage: Record<string,any>): void => {
  localStorage.setItem(pathNewObj, JSON.stringify(newObjInLocalStorage));
}


