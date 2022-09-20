// Настройка запроса
export const urlParams = { // Вынеси вот эти все параметры в отдельный файл в корень, типа constants.ts
  //TODO: СДЕЛАТЬ!!!!!
  rows: 20,
  fName: "{firstName}",
  sName: "{lastName}",
  age: "{numberRange|16, 85}",
  friends: "{numberRange|0, 999}",
  score: "{numberRange|0, 5}",
  placeWork: "{business}",
  email: "{email}",
  phone: "{phone|format}",
  fromCity: "{city}",
};

// const urlRequest = 'http://filltext.com/?' + Object.entries(urlParams).map( param => `${param[0]}=${param[1]}`).join('&') ;
// Тут проще и правильней будет сделать так, чтобы не возиться c подстановкой значение в строку
//TODO: Проверить!!!! Вроде учел уже!
export const urlRequest = new URL("http://filltext.com");
Object.entries(urlParams).forEach(([key, value]) => {
  urlRequest.searchParams.append(key, String(value));
});

// Настройки параметров списка людей DisplayListThings
export const columnsForDisplay = ["fName", "sName", "age", "friends", "score"];
export const nameForColumns = ["Имя", "Фамилия", "Возраст", "Друзья", "Оценка"];

// Настройки параметров карточки человека DisplayItemCard
export const fieldForDisplay = [
  "fName",
  "sName",
  "age",
  "friends",
  "score",
  "fromCity",
  "placeWork",
  "email",
  "phone",
];
export const nameForField = [
  "Имя",
  "Фамилия",
  "Возраст",
  "Друзья",
  "Оценка",
  "Проживает в",
  "Место работы",
  "email",
  "Телефон",
];