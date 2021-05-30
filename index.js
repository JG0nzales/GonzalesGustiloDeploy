const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

//process .env.PORT
//process .env.NODE_ENV => production or undefined

// app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.static("./client/build")); 





//middleware
app.use(cors());
app.use(express.json());


if(process.env.NODE_ENV === "production"){
  //serve static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}

console.log(__dirname);
console.log(path.join(__dirname, "client/build"));


//routes

//create todos
app.post("/todos", async(req,res)=>{
  try {
    
    const { description, day, time } = req.body;
    const newTodo = await pool.query(`INSERT INTO todo (description, day, time, date) VALUES($1, $2, $3, current_date) RETURNING *`, 
    [description, day, time]
    );

    res.json(newTodo.rows[0]);

  } catch (err) {
    console.log(err.message);
  }
})

//get all todos
app.get("/todos", async(req,res)=>{
  try {
    
    const allTodos = await pool.query(`SELECT * FROM todo`);

    res.json(allTodos.rows);

  } catch (err) {
    console.log(err.message);
  }
})

//get a todo
app.get("/todos/:id", async(req,res)=>{
  try {
    
    const { id } = req.params;
    const todo = await pool.query(`SELECT * FROM todo WHERE todo_id = $1`, [id]);

    res.json(todo.rows[0]);

  } catch (err) {
    console.log(err.message);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//update date
app.put("/todos2/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET date = $1 WHERE todo_id = $2",
      [date, id]
    );

    res.json("Todo date was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.get("*", (req,res) =>{
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, ()=>{
  console.log(`server has started at port ${PORT}`);
});
