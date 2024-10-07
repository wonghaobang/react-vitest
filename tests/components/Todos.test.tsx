import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Todos from "../../src/components/Todos"

describe("Todos Component", () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.unstubAllGlobals()
  })

  it("adds a new todo after fetching existing todos", async () => {
    const user = userEvent.setup()

    // Mock the fetch responses
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: 1, title: "Todo 1", completed: false }],
      }) // First fetch returns "Todo 1"
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 2, title: "Todo 2", completed: false }),
      }) // Second fetch adds "Todo 2"

    vi.stubGlobal("fetch", fetchMock)

    render(<Todos />)

    expect(await screen.findByText("Todo 1")).toBeInTheDocument()

    await user.type(screen.getByPlaceholderText("Add new todo"), "Todo 2")
    await user.click(screen.getByRole("button", { name: "Add Todo" }))

    expect(await screen.findByText("Todo 2")).toBeInTheDocument()
  })

  it("handles fetch error", async () => {
    // Mock console.log to check if it was called
    const consoleLogMock = vi.spyOn(console, "log").mockImplementation(() => {})

    // Mock fetch to throw an error
    const fetchMock = vi.fn().mockRejectedValueOnce(new Error("Fetch error"))
    vi.stubGlobal("fetch", fetchMock)

    render(<Todos />)

    // Wait for console.log to be called
    await waitFor(() => {
      expect(consoleLogMock).toHaveBeenCalledWith(expect.any(Error))

      // Check that the logged error contains the correct message
      const loggedError = consoleLogMock.mock.calls[0][0] // First call, first argument
      expect(loggedError.message).toBe("Fetch error")
    })

    consoleLogMock.mockRestore()
  })

  it("updates the first todo when Save button is clicked", async () => {
    const user = userEvent.setup()

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { id: 1, title: "Todo 1", completed: false },
          { id: 2, title: "Todo 2", completed: true },
          { id: 3, title: "Todo 3", completed: false },
        ],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 1,
          title: "Updated Todo 1",
          completed: false,
        }),
      })

    vi.stubGlobal("fetch", fetchMock)

    // Render multiple todos
    render(<Todos />)

    const editButtons = await screen.findAllByRole("button", { name: "Edit" })

    // Click the first edit button
    await user.click(editButtons[0])

    // Get the input element for the first todo
    const inputElement = screen.getByDisplayValue("Todo 1")

    // Clear and type a new value
    await user.clear(inputElement)
    await user.type(inputElement, "Updated Todo 1")

    // Click the save button for the first todo
    const saveButton = screen.getByRole("button", { name: "Save" })
    await user.click(saveButton)

    // Wait for the todo to be updated and re-rendered
    await waitFor(() => {
      const firstUpdatedTodo = screen.getByText("Updated Todo 1", {
        exact: true,
      })
      expect(firstUpdatedTodo).toBeInTheDocument()
    })
  })
})
