import {API_USER_URL} from "../configs/AppConfig";

let userData = {}

fetch(`${API_USER_URL}{users/10}`)
.then(res => {
  if (!res.ok) {
    throw new Error(`Ошибка в запросе данных пользователя: ${res.status}`)
  }
  return res.json()
})
  .then(data => {
    userData = data;
    console.log("Данные пользователя:", userData);
  })
  .catch((error) => {
    console.error("Ошибка при запросе:", error);
  });

