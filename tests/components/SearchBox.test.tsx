import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import SearchBox from "../../src/components/SearchBox"

describe("SearchBox", () => {
  const renderSearchBox = () => {
    const handleSubmit = vi.fn()
    render(<SearchBox handleSubmit={handleSubmit} />)

    return {
      input: screen.getByPlaceholderText(/search/i),
      user: userEvent.setup(),
      handleSubmit: handleSubmit,
    }
  }

  it("should render an input field for searching", () => {
    const { input } = renderSearchBox()

    expect(input).toBeInTheDocument()
  })

  it("should call handleSubmit when Enter is pressed", async () => {
    const { input, handleSubmit, user } = renderSearchBox()

    const searchTerm = "SearchTerm"
    await user.type(input, searchTerm + "{enter}")

    expect(handleSubmit).toHaveBeenCalledWith(searchTerm)
  })

  it("should not call handleSubmit if input field is empty", async () => {
    const { input, handleSubmit, user } = renderSearchBox()

    await user.type(input, "{enter}")

    expect(handleSubmit).not.toHaveBeenCalled()
  })
})
