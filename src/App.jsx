
import { useState } from 'react';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {

  let [todoList, setTodoList] = useState([]);

  function submitTodo(e) {
    e.preventDefault();
    let todo = e.target.todo.value.trim();

    if (!todoList.includes(todo) && todo !== '') {
      let finalList = [...todoList, todo];
      setTodoList(finalList);
      toast.success('ToDo Added Successfully!', { autoClose: 3000 });
    } else if (todo == '') {
      // alert('Please Enter Any ToDo')
      toast.info('Please Enter Any ToDo!', { autoClose: 3000 });
    } else {
      // alert('ToDo Already Added')
      toast.warning('ToDo Already Added!', { autoClose: 3000 });
    }

    // to delete the input value after todo added
    e.target.todo.value = '';
  }

  let item = todoList.map((value, index) => {
    return (
      <List 
      key={index} 
      value={value}
      todoList={todoList}
      ind={index}
      setTodoList={setTodoList}
      />
    )
  })

  return (
    <>
      <div className="todo-app">
        <h1>ToDo App</h1>

        <form onSubmit={submitTodo}>
          <input type="text" name='todo' />
          <button>ADD</button>
        </form>

        <div className="todo-list">
          <ul>
            {item}
          </ul>
        </div>

      </div>
      {/* For Notification */}
      <ToastContainer />
    </>
  )
}

export default App


function List({value, todoList, ind, setTodoList}) {

  let deleteTodo = () => {
    let finalTodoList = todoList.filter((v, i) => i !== ind);  
    setTodoList(finalTodoList);
    toast.error('ToDo Deleted Successfully!', { autoClose: 2000 }); 
  }

  return (
    <li>{value} <span onClick={deleteTodo}>&times;</span></li>
  )
}