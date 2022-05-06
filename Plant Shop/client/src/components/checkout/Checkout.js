import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import axios from 'axios'
import {CardElement,useStripe,useElements} from '@stripe/react-stripe-js'



const Checkout = () => {
    const [customer,setCustomer]=useState({
        firstName:"",
        lastName:"",
        email:""
     })

     const [shippingAddress,setShippingAddress]=useState({
        street:"",
        city:"",
        state:"",
        country:"",
        zipCode:""
     })
     const [billingAddress,setBillingAddress]=useState({
        street:"",
        city:"",
        state:"",
        country:"",
        zipCode:""
     })
     const [order,setOrder]=useState({
        totalPrice:0,
        totalQuantity:0
     })
     const [orderItem,setOrderItem]=useState([])
     const stripe=useStripe()
     const elements=useElements()

     const onSubmitHandle=(e)=>{
         e.preventDefault()
         let item=JSON.parse(localStorage.getItem('item'))
         let totalCost=0
         let reduce=item.reduce((a,b)=>{
           
           totalCost=b.unitPrice+totalCost

           return {
            totalPrice:totalCost,
            totalQuantity:item.length
          }
         },{})
         setOrder(reduce)
         console.log(order)
         setOrderItem(item)
         if(!stripe||!elements){
           return
         }

         const billingDetails = {
          name: e.target.firstName.value,
          email: e.target.email.value,
          address: {
            city: billingAddress.city,
            line1: billingAddress.street,
            state: billingAddress.state,
            postal_code: e.target.zipcode.value
          }
        };
        console.log(billingAddress)
         axios.post('http://localhost:8080/api/checkout/purchase',
         {customer,shippingAddress,billingAddress,order:reduce,orderItems:item})
         .then(res=>{
           console.log(res.data)
           axios.post('http://localhost:8080/api/checkout/payment',{
             amount:reduce.totalPrice*100,
             currency:'usd',
             payment_method_types:'card'
           })
           .then(ress=>{
             console.log(ress.data)
             console.log(ress.data.client_secret)
             stripe.createPaymentMethod({
              type: "card",
              card: elements.getElement("card"),
              billing_details: billingDetails
             })
             .then((response)=>{
               stripe.confirmCardPayment(ress.data.client_secret,{
                payment_method: response.paymentMethod.id

               })
               .then(()=>{
                 alert('Order completed')
               })
             })
           })
         })
     }
     const itemList=()=>{
      let item=JSON.parse(localStorage.getItem('item'))
      return item
     }

  return (
    <div>
     
    <Form style={{width:'50%', marginLeft:'450px', marginTop:'100px'}} onSubmit={onSubmitHandle} >
    { <ol >
       { itemList().map((item,i)=>( 
       
       <li >{item.name}{'             '} {item.unitPrice} </li>
   )) } </ol>
        
      }
      { <h3>Total Quantity: { itemList().length}</h3>}
{/* Customer Detail */}
    <Form.Label>
       <h2>Customer Detail</h2> 
    </Form.Label>
<Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Email address</Form.Label>
  <Form.Control type="email" placeholder="Enter email" name='email' value={customer.email} onChange={(e)=>{setCustomer((perv)=>({
      ...perv,
      email:e.target.value
  }))}}  />
</Form.Group>
<Form.Group className="mb-3" >
  <Form.Label>First Name</Form.Label>
  <Form.Control type="text" placeholder="First Name" name='firstName' value={customer.firstName}  onChange={(e)=>{setCustomer((perv)=>({
      ...perv,
      firstName:e.target.value
  }))}} />
</Form.Group>
<Form.Group className="mb-3" >
  <Form.Label>Last Name</Form.Label>
  <Form.Control type="text" placeholder="Last Name" name='lastName' value={customer.lastName}  onChange={(e)=>{setCustomer((perv)=>({
      ...perv,
      lastName:e.target.value
  }))}}  />
</Form.Group>

<Form.Label>
<h2>Shipping Address</h2> 
    </Form.Label>
<Form.Group className="mb-3" controlId="formBasicStreet">
  <Form.Label>Street</Form.Label>
  <Form.Control type="text" placeholder="Enter street" name='street' value={shippingAddress.state} onChange={(e)=>{setShippingAddress((perv=>({
      ...perv,
      street:e.target.value
  })))}}  />
</Form.Group>
<Form.Group className="mb-3" >
  <Form.Label>City</Form.Label>
  <Form.Control type="text" placeholder="Enter City" name='city' value={shippingAddress.city} onChange={(e)=>{setShippingAddress((perv=>({
      ...perv,
      city:e.target.value
  })))}} />
</Form.Group>
<Form.Group className="mb-3" >
  <Form.Label>State</Form.Label>
  <Form.Control type="text" placeholder="Enter State" name='state' value={shippingAddress.state} onChange={(e)=>{setShippingAddress((perv=>({
      ...perv,
      state:e.target.value
  })))}}  />
</Form.Group>

<Form.Group className="mb-3" >
  <Form.Label>Country</Form.Label>
  <Form.Control type="text" placeholder="Enter Country" name='country' value={shippingAddress.country}  onChange={(e)=>{setShippingAddress((perv=>({
      ...perv,
      country:e.target.value
  })))}} />
</Form.Group>

<Form.Group className="mb-3" >
  <Form.Label>Zip Code</Form.Label>
  <Form.Control type="text" placeholder="Enter Zip Code" name='zipcode' value={shippingAddress.zipCode} onChange={(e)=>{setShippingAddress((perv=>({
      ...perv,
      zipCode:e.target.value
  })))}}  />
</Form.Group>

<Form.Label>
<h2>Billing Address</h2> 
    </Form.Label>
<Form.Group className="mb-3" controlId="formBasicStreet">
  <Form.Label>Street</Form.Label>
  <Form.Control type="text" placeholder="Enter street" name='street' value={billingAddress.street} onChange={(e)=>{setBillingAddress(perv=>({...perv,street:e.target.value}))}}  />
</Form.Group>
<Form.Group className="mb-3" >
  <Form.Label>City</Form.Label>
  <Form.Control type="text" placeholder="Enter City" name='city' value={billingAddress.city} onChange={(e)=>{setBillingAddress(perv=>({...perv,city:e.target.value}))}}  />
</Form.Group>
<Form.Group className="mb-3" >
  <Form.Label>State</Form.Label>
  <Form.Control type="text" placeholder="Enter State" name='state' value={billingAddress.state} onChange={(e)=>{setBillingAddress(perv=>({...perv,state:e.target.value}))}}  />
</Form.Group>

<Form.Group className="mb-3" >
  <Form.Label>Country</Form.Label>
  <Form.Control type="text" placeholder="Enter Country" name='country' value={billingAddress.country}  onChange={(e)=>{setBillingAddress(perv=>({...perv,country:e.target.value}))}} />
</Form.Group>

<Form.Group className="mb-3" style={{marginBotton:'40px'}} >
  <Form.Label>Zip Code</Form.Label>
  <Form.Control type="text" placeholder="Enter Zip Code" name='zipcode' value={billingAddress.zipCode} onChange={(e)=>{setBillingAddress(perv=>({...perv,zipCode:e.target.value}))}}  />
</Form.Group>
<CardElement  />


<Button variant="primary" type="submit"  style={{marginTop:'40px'}}>
  Submit
</Button>

</Form>
</div>
  )
}

export default Checkout

