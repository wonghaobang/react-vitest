import { render, screen } from "@testing-library/react"
import { User } from "../../src/types/entities"
import UserList from "../../src/components/UserList"

describe("UserList", () => {
  it("should render no users when the users array is empty", () => {
    render(<UserList users={[]} />)

    expect(screen.getByText(/no users/i)).toBeInTheDocument()
    screen.debug()
  })

  it("should render a list of users", () => {
    const users: User[] = [
      { id: 1, name: "Peter" },
      { id: 2, name: "John" },
    ]

    render(<UserList users={users} />)

    users.forEach((user) => {
      const link = screen.getByRole("link", { name: user.name })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute("href", `/users/${user.id}`)
    })
    screen.debug()
  })
})
