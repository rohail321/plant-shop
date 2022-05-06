import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
const stripePromise=loadStripe('pk_test_51KqDQ9LLqZKiUeIITuqGl6kouZMvXyQUjOkaedWMqlaOYBeWko71tI78dtvMw7krt5Kxic5EcI28pRmizCeTJ7nn00YbtiKsQL')



ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
  <Elements stripe={stripePromise}>
    <App />
    </Elements>
  </React.StrictMode>,
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
