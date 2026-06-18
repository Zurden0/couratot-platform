import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

// компоненты основные
import Content from "./components/Content";
import Header from "./components/Header";
import Router from "./router";
import Footer from "./components/Footer";

// компоненты логина
import Login from "./components/Login";

// компоненты главной страницы
import Nav from "./components/Nav";
import Article from "./components/Article";
import ArticleFilters from "./components/ArticleFilters";
import {getArticlesData} from "./components/Article";

// компоненты профиля
import UserProfileCard from "./components/UserProfileCard";
import UserProfileData from "./components/UserProfileData";
import ProfileRelatives from "./components/ProfileRelatives";
import RelativeProfileData from "./components/RelativeProfileData";
import {getUserInfo} from "./components/UserProfileCard";

function ProfilePage() {
  const [userData, setUserData] = useState(getUserInfo())
  // сделать валидацию на авторизацию
  return (
    <>
      <Header/>
      <Content>
        <UserProfileCard
          userData={userData}
        />
        <Nav
          navOptionsList={[
            {
              name: "Профиль",
              url: "/profile"
            },
            {
              name: "Родственики",
              url: "/profile/relatives"
            },
            {
              name: "Зачетная книжка",
              url: ""
            },
            {
              name: "Достижения",
              url: ""
            },
            {
              name: "Выйти",
              url: "",
              className: "login"
            }
          ]}/>
        {TargetMode}
      </Content>
      <Footer/>
    </>

  )
}

function MainPage() {
  const localArticleData = getArticlesData();
  const [articlesData, setArticlesData] = useState(localArticleData);

  return (
    <>
      <Header/>
      <Content>
        <Nav
          navOptionsList={[
            {
              name: "Главная",
              url: "/"
            },
            {
              name: "Профиль",
              url: "/profile"
            },
            {
              name: "Группы",
              url: ""
            },
            {
              name: "Создать пост",
              url: ""
            },
            {
              name: "Администрирование",
              url: ""
            },
            {
              name: "Войти",
              url: "/login",
              className: "login"
            }
          ]}/>
        <ArticleFilters
          filterArticleData={setArticlesData}
          articlesData={localArticleData}
        />
        <div className="main-content">
          {
            articlesData.map(data =>
              <Article
                key={data.id}
                articleData={data}
              />)
          }
        </div>
      </Content>
      <Footer/>
    </>
  )
}

function LoginPage() {
  return (
    <Login/>
  )
}

function NotFoundPage() {
  return (
    <div>404 — Страница не найдена</div>
  )
}

const body = ReactDOM.createRoot(document.querySelector('body'));
body.render(
  <React.StrictMode>
    <Router
      routes={{
        "/": <MainPage/>,
        "/login": <LoginPage/>,

        "/profile": <ProfilePage TargetMode={<UserProfileData/>}/>,
        "/profile/relatives": <ProfilePage TargetMode={<ProfileRelatives/>}/>,
        "/profile/relatives/:id": <ProfilePage TargetMode={<RelativeProfileData/>}/>,
        "*": <NotFoundPage/>,
      }}
    />
  </React.StrictMode>
);


reportWebVitals();
