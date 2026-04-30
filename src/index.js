import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Content from "./components/Content";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const body = ReactDOM.createRoot(document.querySelector('body'));
body.render(
  <React.StrictMode>
      {
        <Content>
          <Sidebar />
          <div className={"main-content"}>
            <Header />
          </div>
        </Content>
      }
  </React.StrictMode>
);


reportWebVitals();
