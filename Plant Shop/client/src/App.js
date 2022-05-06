import React, { Component } from 'react'
import NavbarCom from './components/layout/navbar/NavbarCom'
import CardMain from './components/layout/card/CardMain'
import axios from 'axios'
import {
  Routes,
  Route,
} from "react-router-dom";
import MainView from './components/mainview/MainView';
import ProductDescription from './components/layout/product/ProductDescription';
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';
import Checkout from './components/checkout/Checkout';


class App extends Component {
  state={products:[]}
    componentDidMount (){
      console.log(localStorage.getItem('user'))
        axios.get("http://localhost:8080/api/products").then((a)=>{
            this.setState({products:a.data._embedded.products})
          console.log(this.state)
        })
      }
  render() {
    return (
      <div>
        {<NavbarCom/>}
        <Routes>
        <Route path="/" element={<MainView/>} />
        <Route path={`/product/:sku`} element={<ProductDescription product={this.state.products} />}  />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/checkout" element={<Checkout/>} />
        </Routes>
        </div>
    )
  }
}

export default App