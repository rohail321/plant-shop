import {Form, Button} from 'react-bootstrap'
import axios from 'axios'
import React, { Component } from 'react'

class Register extends Component {
    state={
        userName:'',
        userFirstName:'',
        userLastName:'',
        userPassword:''
    }

    onChangeHandle=(e)=>{
        this.setState({[e.target.name]:e.target.value})
        console.log(this.state)
    }

    onSubmitHandle=(e)=>{
        console.log(this.state)
        e.preventDefault()
        axios.post('http://localhost:8080/registerNewUser', this.state)
        .then(res=>{
            console.log(res)
        })
    }

  render() {
    return (
        <Form style={{width:'50%', marginLeft:'450px', marginTop:'100px'}} onSubmit={this.onSubmitHandle} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name='userName' value={this.state.userName} onChange={this.onChangeHandle} />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="First Name" name='userFirstName' value={this.state.userFirstName} onChange={this.onChangeHandle} />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Last Name" name='userLastName' value={this.state.userLastName} onChange={this.onChangeHandle} />
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='userPassword' value={this.state.userPassword} onChange={this.onChangeHandle} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      )
  }
}

export default Register