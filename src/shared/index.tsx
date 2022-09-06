export const interactionLocalStorage = ( // Ты сам то вспомнишь что тут происходит вообще?)
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
