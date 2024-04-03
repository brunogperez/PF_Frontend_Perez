import React from 'react';
import ReactDOM from 'react-dom/client';
import { EcommerceFront } from './EcommerceFront';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <EcommerceFront />
      </BrowserRouter>
    </Provider>
  //</React.StrictMode>,
)

