import React,{useEffect,useState} from 'react'
import {Card,Button} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
const ProductDescription = ({product}) => {
    const [prod,setProd]=useState([])
    const [cart, setCart] = useState(0);
    const [total, setTotal] = useState(0);
    const [cartItem, setCartItem] = useState([]);


    const param=useParams()
    
    
    
    const filterRes=()=>{
        const res=product.filter(singleProduct=>(
            param.sku===singleProduct.sku
        ))

        return res[0]
    }

    const AddToCart=()=>{
      let item=[]
      for(let i=0;i<cart;i++){
        item[i]=prod
        setCartItem(item)
      }
      item.map(b=>{
        setTotal(item.length*b.unitPrice)
      })
      if(localStorage.getItem('item')){
        let updateItem=JSON.parse(localStorage.getItem('item'))
        console.log(updateItem)
        let newArray=[...item,...updateItem]
        console.log(newArray)

        localStorage.setItem('item',JSON.stringify(newArray))
      }
      else{
        localStorage.setItem('item',JSON.stringify(item))
      }
     
      console.log(JSON.parse(localStorage.getItem('item')))
    }



    useEffect(()=>{
      let data=filterRes()
      setProd(data?data:"")
      
    },)

    console.log(cartItem)
   
    return (
        <>
        <Card style={{width:'30%', height:'50%'}} >
          <Card.Img variant="top" src={prod.imageUrl} style={{width:'100%', height:'300px'}} />
          <Card.Body>
              <Card.Title>
                  {prod.name}
              </Card.Title>
            <Card.Text>
              {prod.description}
            </Card.Text>
            <Card.Subtitle>
                {prod.unitPrice}
            </Card.Subtitle>
            <Card.Subtitle>
                Stock: {prod.unitsInStock?"available":"Not available"}
            </Card.Subtitle>
            <Button style={{marginTop:'10px'}} onClick={()=>{
                setCart(cart+1)
            }} >Add</Button>
             <Button style={{marginTop:'10px'}} onClick={()=>{
                setCart(cart=== 0 ? 0 :cart-1)
                let a =cartItem
                setTotal(total===0?0:total-prod.unitPrice)
                
            }} >Remove</Button>
             <Button style={{marginTop:'10px'}} onClick={AddToCart} > Add to Cart</Button>
            {cart===0?'':prod.unitPrice*cart}
          </Card.Body>
          <h3 style={{color:'burlywood', marginLeft:'15px'}} >Quantity: {cartItem.length}</h3>
        </Card>
        <br />
      </>
    )
}

export default ProductDescription