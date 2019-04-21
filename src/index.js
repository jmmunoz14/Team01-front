import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {IntlProvider, addLocaleData} from 'react-intl';
import localeEnMessages from './locales/en';
import localeEsMessages from './locales/es';
import esLocaleData from 'react-intl/locale-data/es';
import enLocaleData from 'react-intl/locale-data/en';



addLocaleData(esLocaleData);
addLocaleData(enLocaleData);


function langSelector(){
    if (window.navigator.language==="en") {
         return (localeEnMessages);
    }else{
         return localeEsMessages;
    }
 
 }
 
 ReactDOM.render(
     <IntlProvider locale={window.navigator.language} messages= {langSelector()}>
         <App />
     </IntlProvider>, document.getElementById("root")
 );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
