import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

// компоненты основные
import Content from "./components/Content";
import Header from "./components/Header";
import Router, {navigate} from "./router";
import Footer from "./components/Footer";

// компоненты логина
import Login from "./components/Login";
import LogOut from "./components/LogOut";

// компоненты главной страницы
import Nav from "./components/Nav";
import Article from "./components/Article";
import ArticleFilters from "./components/ArticleFilters";
import {getArticlesData} from "./components/Article";

// компоненты профиля
import UserProfileCard from "./components/UserProfileCard";
import UserProfileData, {getUserData} from "./components/UserProfileData";
import ProfileRelatives from "./components/ProfileRelatives";
import Achievement from "./components/Achievement";
import {getUserInfo} from "./components/UserProfileCard";

// компоненты админ панели
import AdminUsers from "./components/AdminUsers";
import AdminGroups from "./components/AdminGroups";


const authValidator = async () => {
  const res = await fetch(
    "/server/validators/getUserAuth.php", {
      method: "GET",
      credentials: "include"
    }
  );

  return await res.text()
}

const roleValidator = async () => {
  const res = await fetch(
    "/server/validators/getUserRole.php", {
      method: "GET",
      credentials: "include"
    }
  );

  return await res.text()
}


function ProfilePage({TargetMode}) {
  const [userData, setUserData] = useState(getUserInfo());
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
              name: "Достижения",
              url: "/profile/achievement"
            },
            {
              name: "Выйти",
              url: "/logout",
              className: "login"
            }
          ]}/>
        {TargetMode}
      </Content>
      <Footer/>
    </>

  )
}


function AdminPage({TargetMode}) {
  const [navOptionsList, setNavOption] = useState([]);
  useEffect(() => {
    roleValidator().then(role => {
      if (role === "admin") {
        setNavOption([
          {
            name: "Пользователи",
            url: "/admin/users"
          },
          {
            name: "Группы",
            url: "/admin/groups"
          }
        ]);
      }

      if (role === "curator") {
        setNavOption([
          {
            name: "Группы",
            url: "/admin/groups"
          }
        ]);
      }

      if (role === "student") {
        navigate("/");
      }
    });
  }, []);
  return (
    <>
      <Header/>
      <Content>
        <Nav navOptionsList={navOptionsList}/>
        {TargetMode}
      </Content>
      <Footer/>
    </>

  )
}


function MainPage() {
  const [articlesData, setArticlesData] = useState([]);
  const [localArticleData, setLocalArticleData] = useState([]);
  const [navOptionList, setNavOption] = useState([]);

  useEffect(() => {
    authValidator().then(text => {
      if (!text) {
        navigate("/login");
        return;
      }

      roleValidator().then(role => {
        if (role === "admin") {
          setNavOption([
            {name: "Главная", url: "/"},
            {name: "Группы", url: "/admin/groups"},
            {name: "Администрирование", url: "/admin"},
            {name: "Выйти", url: "/logout", className: "login"}
          ]);
        }

        if (role === "curator") {
          setNavOption([
            {name: "Главная", url: "/"},
            {name: "Группы", url: "/admin/groups"},
            {name: "Выйти", url: "/logout", className: "login"}
          ]);
        }

        if (role === "student") {
          setNavOption([
            {name: "Главная", url: "/"},
            {name: "Профиль", url: "/profile"},
            {name: "Выйти", url: "/logout", className: "login"}
          ]);
        }
      });
    });

    getArticlesData().then(data => {
      setLocalArticleData(data);
      setArticlesData(data);
    });
  }, []);

  return (
    <>
      <Header/>
      <Content>
        <Nav
          navOptionsList={navOptionList}/>
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
        "/logout": <LogOut/>,

        "/profile": <ProfilePage TargetMode={<UserProfileData/>}/>,
        "/profile/relatives": <ProfilePage TargetMode={<ProfileRelatives/>}/>,
        "/profile/achievement": <ProfilePage TargetMode={<Achievement/>}/>,

        "/admin": <AdminPage TargetMode={<AdminUsers/>}/>,
        "/admin/users": <AdminPage TargetMode={<AdminUsers/>}/>,
        "/admin/groups": <AdminPage TargetMode={<AdminGroups/>}/>,

        "*": <NotFoundPage/>,
      }}
    />
  </React.StrictMode>
);


reportWebVitals();
