import { useState, useEffect, ChangeEvent } from "react"
import TodoDetail from "./TodoDetail"
import { Todo } from "../types/entities"

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodoTitle, setNewTodoTitle] = useState<string>("")
  const [newTodoCompleted, setNewTodoCompleted] = useState<boolean>(false)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        )
        const data = await response.json()
        setTodos(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTodos()
  }, [])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value)
  }

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoCompleted(e.target.checked)
  }

  const handleAddTodo = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          body: JSON.stringify({
            title: newTodoTitle,
            completed: newTodoCompleted,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      if (!response.ok) {
        throw new Error("Failed to add todo")
      }
      const newTodo = await response.json()
      setTodos((prev) => [...prev, newTodo])
      setNewTodoTitle("")
      setNewTodoCompleted(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            id: updatedTodo.id,
            title: updatedTodo.title,
            completed: updatedTodo.completed,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      if (!response.ok) {
        throw new Error("Failed to update todo")
      }
      const data = await response.json()
      const updatedTodos = todos.map((todo) =>
        todo.id === data.id ? data : todo
      )
      setTodos(updatedTodos)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Todos</h1>
      <input
        type="text"
        value={newTodoTitle}
        onChange={handleInputChange}
        placeholder="Add new todo"
      />
      <label>
        <input
          type="checkbox"
          checked={newTodoCompleted}
          onChange={handleCheckboxChange}
        />
        Completed
      </label>
      <button onClick={handleAddTodo}>Add Todo</button>

      <div>
        {todos.map((todo) => (
          <TodoDetail key={todo.id} todo={todo} onUpdate={handleUpdateTodo} />
        ))}
      </div>
    </div>
  )
}

export default Todos
