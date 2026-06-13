import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

// компоненты
import Content from "./components/Content";
import Login from "./components/Login";
import Article from "./components/Article";
import Header from "./components/Header";
import Router from "./router";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ArticleFilters from "./components/ArticleFilters";

// вспомогающие функции
import {getArticlesData} from "./components/Article";


function ProfilePage() {
  // сделать валидацию на авторизацию
  return (
    <>
      <Header/>
      <Content>
        <div className="main-content">

        </div>
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
      <Nav/>
      <ArticleFilters
        filterArticleData={setArticlesData}
        articlesData={localArticleData}
      />
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
