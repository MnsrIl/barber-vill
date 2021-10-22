<!-- ## barber-vill   

[Взглянуть вживую](https://barber-vill.herokuapp.com)

Routes | point
------------ | -------------
/  | Content from cell 2
/barbers  | Content from cell 2
/login | Content in the second column

Возможности | Описание
------------ | -------------
Взаимодействие с Парикмахером  | Content from cell 2
Взаимодействие   | Content from cell 2
/login | Content in the second column -->

## barber-vill ✂️ [LINK][heroku-link] | [CODE][github-link]

App was developed by [people](#team) for people, who doesn't like their hairstyle's and would like to try something new :)

> * [About](#about)
> * [Feautures](#feautures)
> * [Technologies](#technologies)
> * [Business logic](#business-logic)
> * [Team](#team)

<div align='center'><img width="800" height="800" src="src.gif" alt="Demo View"></div>

<h2 align="center">About</h2>

<p align="center" fontSize="20">
  This project was build for people, who doesn't like standing in queue, like me <img alt="Busy" src="busyman.jpg" title="Busy Man">
  <br />
  Here you can choose the hairstyle, you'd like to wear and take the order on it right there
  <br />
  Just take a look, by following <a href="https://barber-vill.herokuapp.com">for the link</a>
</p>

<p>
  <h3> Основной список возможностей: </h3> <img align="right" width="500" height="auto" src="rotating-gif" alt="3d model gif">

- различные CRUD операции;
- взаимодействие с 3d "моделями" причёсок/бород
- взаимодействие клиента и парикмахера через: 
  - возможность оставить отзыв парикмахеру клиентом
  - возможность оставить заявку парикмахеру клиентом
  - возможность парикмахера обработать оставленную клиентом заявку
</p>


<!-- ![gif](https://github.com/thebestdevelopering/quadcopter/blob/main/client/public/1.gif?raw=true)
 -->
<!-- Поиск товара и вывод товара по категориям. -->

<!-- ![gif](https://github.com/thebestdevelopering/quadcopter/blob/main/client/public/2.gif?raw=true) -->

В данном проекте реализована следующая функциональность:

- Регистрация;
- Авторизация;
- Личный кабинет;
- Выгрузка изображений;
- Добавление новых заявок;
- Удаление добавленных постов;
- Редактирование добавленных постов;
- Вывод причёсок/бород по категориям
- Комментирование
- Карта
- 3D модели для причёсок/бород

При разработке проекта использованы следующие технологии:

- JS / React (Hooks);
- redux / redux-thunk / redux-logger для организации стейта;
- react-router-dom для роутинга;
- REST API, асинхронные запросы;
- classnames / Material-UI;
- NodeJS, Express.js, MongoDB,
- JWT авторизация, access token/cookie

## Запуск проекта

Для запуска проекта вам необходимо набрать команду в терминале:

```javascript
npm i
```
затем 
```javascript
cd client npm i
```

После набрать команду:

```javascript
cd .. npm run dev
```

## 💻 Project Concepts and Technologies: 

### Front: 

> - React, React-router-dom         (main "framework")
> - Redux, redux thunk (state manager)
> - Material UI   (UI/UX library)
> - Mapbox GL     (Map)
> - react-3d-viewer (For 3d models)
> - Luxon, date fns (For date)
> - Classnames, color, JS Cookie (other stuff)

---

### Back: 

> - Node.js
> - Express.js, express-fileupload
> - MongoDB (mongoose)
> - JWT, bcrypt (authorization system)
> - cors, dotenv (for server)
> - node-telegram-bot-api, nodemailer (other stuff)

## Технологии проекта

<p>
  <img alt="React" src="https://img.shields.io/badge/-React-45b8d8?style=for-the-badge&logo=react&logoColor=white" />
  <img alt="Github" src="https://img.shields.io/badge/-Github-black?style=for-the-badge&logo=github&logoColor=white" />
  <img alt="Redux" src="https://img.shields.io/badge/-Redux-430098?style=for-the-badge&logo=redux&logoColor=white" />
  <img alt="Redux-Thunk" src="https://img.shields.io/badge/-Redux_Thunk-white?style=for-the-badge&logo=Redux&logoColor=430098" />
   <img alt="React-Router" src="https://img.shields.io/badge/-React_Router-black?style=for-the-badge&logo=react-router&logoColor=orange" />
  <img alt="Prettier" src="https://img.shields.io/badge/-Prettier-grey?style=for-the-badge&logo=Prettier&logoColor=orange" />
  <img alt="git" src="https://img.shields.io/badge/-Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
  <img alt="Nodejs" src="https://img.shields.io/badge/-Nodejs-43853d?style=for-the-badge&logo=Node.js&logoColor=white" />
  <img alt="JavaScript" src="https://img.shields.io/badge/-JavaScript-yellow?style=for-the-badge&logo=JavaScript&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/-express-black?style=for-the-badge&logo=express&logoColor=white" />
    <img alt="MongoDB" src="https://img.shields.io/badge/-MongoDB-green?style=for-the-badge&logo=MongoDB&logoColor=white" />
    <img alt="EsLint" src="https://img.shields.io/badge/-EsLint-blue?style=for-the-badge&logo=EsLint&logoColor=white" />
    <img alt="JsonWebToken" src="https://img.shields.io/badge/-JsonWebToken-black?style=for-the-badge&logo=JsonWebToken&logoColor=white" />
    <img alt="MaterialUI" src="https://img.shields.io/badge/-MaterialUI-blue?style=for-the-badge&logo=MaterialUI&logoColor=white" />

  </p>
  
[github-link]: https://github.com/TheZiggie/barber-vill "Look around"
[heroku-link]: https://barber-vill.herokuapp.com "Link to the demo-version"
