import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {Nav, Container, Navbar, Form,  Button, FormControl} from "react-bootstrap"

export default class NavbarCom extends Component {
  state={
    name:'',
    isLogin:false
  }
  componentDidMount(){
    let user=localStorage.getItem('user')
    console.log(user)
    console.log(localStorage.getItem('user'))
    if(localStorage.getItem('user')) this.setState({name:user,isLogin:true})

  }

  onClickHandle=()=>{
    localStorage.clear()
    this.setState({name:'',isLogin:'false'})
    console.log(this.state)
  }
  render() {
    return (
      <>
        <Navbar bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand  style={{color:'white'}} >Plant Webshop</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link to={"/"} style={{color:'white'}} >Home</Link>
              
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            {this.state.isLogin?<Link to={"/"} style={{color:'white',marginLeft:'10px'}} >Welcome {this.state.name}</Link>:''}
           {!this.state.isLogin?<Link  to={"/login"} style={{color:'white',marginLeft:'10px'}} >Login</Link>
           :   <Link to={"/"} style={{color:'white',marginLeft:'10px'}} onClick={this.onClickHandle} >Logout</Link>}
           {this.state.isLogin?'':<Link to={"/register"} style={{color:'white',marginLeft:'10px'}} >Register</Link>}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {this.props.children}
      </>
    )
  }
}
