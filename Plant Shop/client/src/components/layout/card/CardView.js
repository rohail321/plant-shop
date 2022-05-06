import React from 'react'
import {Link} from 'react-router-dom'
import './card.css'

const CardView = ({product}) => {
  return (
    <div className='container'>
      {/* <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={product.imageUrl} />
    <Card.Body>
      <Card.Title> {product.name} </Card.Title>
      <Card.Text>
        {product.description}
      </Card.Text>
      <Card.Subtitle style={{padding:"20px"}}>Cost per product:  {product.unitPrice} </Card.Subtitle>
      <Card.Subtitle style={{padding:"20px"}}> Current Stock Count:  {product.unitsInStock} </Card.Subtitle>
     
          <Link to={`/product/${product.sku}`} > <Button variant="primary"> More </Button></Link>
      
    </Card.Body>
  </Card> */}
  <div className="card">
    <img src={product.imageUrl} alt="" />
    <div className="card-body">
      <div className="row">
        <div className="card-title">
          <h4> {product.name} </h4>
          <h3> <i class="bi bi-tag-fill"></i> {product.unitPrice} </h3>
          <h3>  {product.unitsInStock} </h3>
        </div>
        <div className="view-btn">
        <Link to={`/product/${product.sku}`} > More Detail</Link>
        </div>
      </div>
      <hr />
      <p>
      {product.description}
      </p>
     
    </div>
  </div>
  </div>
  )
}

export default CardView