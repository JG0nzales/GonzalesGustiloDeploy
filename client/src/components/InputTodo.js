import React, {Fragment, useState} from "react";



const InputTodo = () => {

  const [description, setDescription] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");


  const onSubmitForm = async e => {
    e.preventDefault();
    try {
     const body = {description, day, time};
     const response = await fetch("/todos", {
       method: "POST",
       headers: {"Content-Type": "application/json"},
       body: JSON.stringify(body)
     });
 
     window.location = "/";

    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment><h1 className="text-center mt-5">Pern Todo List</h1>
    <form className="d-flex mt-5" onSubmit = {onSubmitForm}>
      <input placeholder="Todo" type="text" className="form-control mr-4" value = {description} onChange = {e => 
      setDescription(e.target.value)}/> 

        <input placeholder="Day" type="text" className="form-control mr-4" value = {day} onChange = {e => 
      setDay(e.target.value)}/> 

        <input placeholder="Time" type="text" className="form-control mr-4" value = {time} onChange = {e => 
      setTime(e.target.value)}/> 
      
      <button className="btn btn-success"> Add </button> 
    </form>

    </Fragment>
  );
  };
export default InputTodo;