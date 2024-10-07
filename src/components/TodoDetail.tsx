import { useState } from "react"
import { Todo } from "../types/entities"

interface TodoDetailProps {
  todo: Todo
  onUpdate: (updatedTodo: Todo) => void
}

const TodoDetail: React.FC<TodoDetailProps> = ({ todo, onUpdate }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editTitle, setEditTitle] = useState<string>(todo.title)

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }

  // Save the updated todo
  const handleSaveClick = () => {
    const updatedTodo: Todo = { ...todo, title: editTitle }
    onUpdate(updatedTodo)
    setIsEditing(false)
  }

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
      ) : (
        <p>{todo.title}</p>
      )}

      <button onClick={handleEditClick}>{isEditing ? "Cancel" : "Edit"}</button>
      {isEditing && <button onClick={handleSaveClick}>Save</button>}
    </div>
  )
}

export default TodoDetail
