import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Content from "./components/Content";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import GeneralUserInfo from "./components/GeneralUserInfo";

import Router from "./router";
import { navigate } from "./router";

function ProfilePage() {
  // сделать валидацию на авторизацию
  return (
    <Content>
      <Sidebar />
      <div className="main-content">
        <Header>
          <GeneralUserInfo
            full_name="Герман"
            login="@german"
            bio_content="Пользователь еще не оставил информацию о себе..."
          />
        </Header>
      </div>
    </Content>
  )
}

function LoginPage() {
  return (
    <Login />
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
        "/profile": <ProfilePage />,
        "/login": <LoginPage />,
        "*": <NotFoundPage />,
      }}
    />
  </React.StrictMode>
);




reportWebVitals();
