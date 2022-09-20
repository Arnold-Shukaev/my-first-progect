export const interactionLocalStorage = ( // Ты сам то вспомнишь что тут происходит вообще?)
//АА. Вспомню. Эта функция в новой ветке уже доработана чутка. Смысл прост.
//Эта функция принимает функцию, которая будет применена к localStorage. ...arg - если нужно что-то передать в нее дополнительно
//Но мне тоже это порно не очень понравилось. Поковыряю еще
  action: (
    oldObjectSpecialStorage: { [prop: string]: { [prop: string]: string } },
    ...arg: any
  ) => void,
  ...args: any
) => {
  let newSpecialStorage;
  localStorage.specialStorage
    ? (newSpecialStorage = JSON.parse(localStorage.specialStorage))
    : (newSpecialStorage = {});
  action(newSpecialStorage, args);

  localStorage.setItem("specialStorage", JSON.stringify(newSpecialStorage));

  return newSpecialStorage;
};
