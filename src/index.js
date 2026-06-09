import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Content from "./components/Content";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import ProfileHeader from "./components/ProfileHeader";
import ProfileGeneralUserInfo from "./components/ProfileGeneralUserInfo";

import Router from "./router";
import { navigate } from "./router";

function ProfilePage() {
  // сделать валидацию на авторизацию
  return (
    <Content>
      <Sidebar />
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
