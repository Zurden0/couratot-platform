import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

// компоненты
import Content from "./components/Content";
import Login from "./components/Login";
import ProfileHeader from "./components/ProfileHeader";
import ProfileGeneralUserInfo from "./components/ProfileGeneralUserInfo";
import Article from "./components/Article";
import Header from "./components/Header";
import Router from "./router";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// вспомогающие функции
import {getArticlesData} from "./components/Article";


function ProfilePage() {
  // сделать валидацию на авторизацию
  return (
    <Content>
      <div className="main-content">
        <ProfileHeader>
          <ProfileGeneralUserInfo
            full_name="Герман"
            login="@german"
            bio_content="Пользователь еще не оставил информацию о себе..."
          />
        </ProfileHeader>
      </div>
    </Content>
  )
}

function MainPage() {
  const articlesData = getArticlesData();

  return (
    <>
      <Header/>
      <Nav/>
      <Content>

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
        "/profile": <ProfilePage/>,
        "/": <MainPage/>,
        "/login": <LoginPage/>,
        "*": <NotFoundPage/>,
      }}
    />
  </React.StrictMode>
);


reportWebVitals();
