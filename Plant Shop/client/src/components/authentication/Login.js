import React, {useState} from 'react'
import axios from 'axios'
import {Form, Button} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

export const Login = () => {
    let [userName, setuserName]=useState('')
    let [userPassword, setuserPassword]=useState('')

    let navigate = useNavigate();


    
   const onSubmitHandle=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:8080/authenticate',{userName, userPassword} )
        .then(res=>{
            let name=res.data.user.userFirstName
            localStorage.setItem('user',name)
            console.log(localStorage.getItem('user'))

            navigate('/')
        })
    }
    
    return (
        <Form style={{width:'50%', marginLeft:'450px', marginTop:'100px'}} onSubmit={onSubmitHandle} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name='userName' value={userName} onChange={(e)=>{setuserName(e.target.value)}} />
        </Form.Group>     
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='userPassword' value={userPassword} onChange={(e)=>{setuserPassword(e.target.value)}} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
}


export default Login




