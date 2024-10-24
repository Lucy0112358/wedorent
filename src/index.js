import React from "react";
import ReactDOM from "react-dom/client";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter } from 'react-router-dom';
import Feature from './feature-module/Feature.jsx';
import 'aos/dist/aos.css';
import '../src/style/icons/fontawesome/css/all.min.css';
import '../src/style/icons/fontawesome/css/fontawesome.min.css'
import { Provider } from 'react-redux';
import store from './core/data/redux/store.jsx';
import '../src/style/icons/feather/css/iconfont.css'
import '../src/style/scss/main.scss'
import './../src/index.css'
import '../src/style/icons/boxicons/css/boxicons.min.css'
import { base_path } from "./environment.jsx";



const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store} >
        <BrowserRouter basename={base_path}>
          <Feature />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Element with id 'root' not found.");
}
