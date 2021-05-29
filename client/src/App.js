import React, { Fragment } from 'react';
import './App.css';
import * as ReactBootStrap from "react-bootstrap";



//components
import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';

function App() {
  return (
    <Fragment>
      <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
  <ReactBootStrap.Navbar.Brand href="#home">GonzalesGustilo</ReactBootStrap.Navbar.Brand>
  
</ReactBootStrap.Navbar>
     <div className="container">
     <InputTodo />  
     <ListTodos/>
     </div>
   </Fragment>
  );
}

export default App;
