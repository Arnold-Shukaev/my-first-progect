export const urlRequest = new Request(
  "https://api.json-generator.com/templates/0-Z1hAZLqPBb/data",
  {
    headers: {
      Authorization: "Bearer jnc9vbdlqzhr3tesva1h3cxqg0hmcwn61wai3hyq",
    },
  }
);

// export const urlRequest = (): Request => dataRequest;

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

export const fieldForDisplayUser = [
  "fName",
  "sName",
  "age",
  "fromCity",
  "placeWork",
  "email",
  "phone",
];
export const nameForFieldUser = [
  "Имя",
  "Фамилия",
  "Возраст",
  "Место жительства",
  "Место работы",
  "email",
  "Телефон",
];
