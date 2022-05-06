import React, { Component } from 'react'
import CardView from './CardView'
import axios from 'axios'
import {Row,Col} from 'react-bootstrap'

export default class CardMain extends Component {

    state={products:[]}
    componentDidMount (){

        axios.get("http://localhost:8080/api/products").then((a)=>{
            this.setState({products:a.data._embedded.products})
          console.log(this.state)
        })
      }
  render() {
    return (
      <div>
           <Row className="justify-content-md-center">
                {this.state.products.map(product=>(
                    <Col md={3} key={product.sku} ><CardView product={product} /></Col>
                ))}
            </Row>

            </div>
    )
  }
}
