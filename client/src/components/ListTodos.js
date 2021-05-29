import React, {Fragment, useEffect, useState} from "react";
import EditTodo from "./EditTodo";



const ListTodos = () => {

  const [todos, setTodos] = useState([]);


  //delete function

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));

    } catch (err) {
      console.log(err.message);
    }
  }



  const getTodos = async () => {


    try {
      
      const response = await fetch("http://localhost:5000/todos")
      const jsonData = await response.json()

      setTodos(jsonData);

    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(()=> {
    getTodos();
  }, []);

 

  return <Fragment>
     <table class="table mt-5 text-center">
    <thead>
      <tr>
      <th>ID</th>
        <th>Description</th>
        <th>Day</th>
        <th>Time</th>
        <th>Edit</th>
        <th>Delete</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>

      {todos.map(todo =>(
        <tr key={todo.todo_id}>
          <td>{todo.todo_id}</td>
          <td>{todo.description}</td>
          <td>{todo.day}</td>
          <td>{todo.time}</td>
          <td><EditTodo todo={todo}/></td>
          <td><button className="btn btn-danger" onClick={()=>deleteTodo(todo.todo_id)}>
            Delete</button></td>
            <td>{todo.date}</td>
        </tr>
      ))}
     
    </tbody>
  </table>
  </Fragment>
};


export default ListTodos;