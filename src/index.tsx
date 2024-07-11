import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import createSagaMiddleware from 'redux-saga';
import { configureStore, Tuple } from '@reduxjs/toolkit';
import appReducer from './features/appReducer';
import { Provider } from 'react-redux';
import rootSaga from './saga/appSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    appData: appReducer
  },
  middleware: () => new Tuple(sagaMiddleware)
})

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
