import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TodoDetail from "../../src/components/TodoDetail"

describe("TodoDetail Component", () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.unstubAllGlobals()
  })

  const mockTodo = { id: 1, title: "Test Todo", completed: false }
  const mockOnUpdate = vi.fn()

  it("renders the TodoDetail component", () => {
    render(<TodoDetail todo={mockTodo} onUpdate={mockOnUpdate} />)

    expect(screen.getByText("Test Todo")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument()
  })

  it("enters edit mode when Edit button is clicked", async () => {
    const user = userEvent.setup()
    render(<TodoDetail todo={mockTodo} onUpdate={mockOnUpdate} />)

    await user.click(screen.getByRole("button", { name: "Edit" }))

    expect(screen.getByDisplayValue("Test Todo")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument()
  })

  it("updates todo when Save button is clicked", async () => {
    const user = userEvent.setup()
    const { rerender } = render(
      <TodoDetail todo={mockTodo} onUpdate={mockOnUpdate} />
    )

    // Enter edit mode
    await user.click(screen.getByRole("button", { name: "Edit" }))

    // Update the todo title
    const inputElement = screen.getByDisplayValue("Test Todo")
    await user.clear(inputElement)
    await user.type(inputElement, "Updated Todo")
    await user.click(screen.getByRole("button", { name: "Save" }))

    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...mockTodo,
      title: "Updated Todo",
    })

    // Simulate the onUpdate function being called and state updating
    const updatedTodo = { ...mockTodo, title: "Updated Todo" }
    rerender(<TodoDetail todo={updatedTodo} onUpdate={mockOnUpdate} />) // Re-render component with updated todo

    // Check if the component re-renders and displays the updated title
    expect(screen.getByText("Updated Todo")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument()
  })

  it("cancels edit mode when Cancel button is clicked", async () => {
    const user = userEvent.setup()
    render(<TodoDetail todo={mockTodo} onUpdate={mockOnUpdate} />)

    await user.click(screen.getByRole("button", { name: "Edit" }))
    const inputElement = screen.getByDisplayValue("Test Todo")
    await user.clear(inputElement)
    await user.type(inputElement, "Updated Todo")
    await user.click(screen.getByRole("button", { name: "Cancel" }))

    expect(screen.getByText("Test Todo")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument()
    expect(screen.queryByDisplayValue("Updated Todo")).not.toBeInTheDocument()
    expect(mockOnUpdate).not.toHaveBeenCalled()
  })
})
