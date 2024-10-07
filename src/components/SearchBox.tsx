import { useState } from "react"

interface Props {
  handleSubmit: (text: string) => void
}

const SearchBox = ({ handleSubmit }: Props) => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && searchTerm) handleSubmit(searchTerm)
        }}
      />
    </div>
  )
}

export default SearchBox
