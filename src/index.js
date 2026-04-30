import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Content from "./components/Content";
import Sidebar from "./components/Sidebar";

const body = ReactDOM.createRoot(document.querySelector('body'));
body.render(
  <React.StrictMode>
      {
        <Content>
          <Sidebar />
        </Content>
      }
  </React.StrictMode>
);


reportWebVitals();
