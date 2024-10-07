import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import Pagination from "../../src/components/Pagination"

describe("Pagination", () => {
  beforeEach(() => {
    vi.mock("../../src/utils/utils", () => {
      return {
        range: () => [1, 2, 3, 4, 5],
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it("renders correct pagination", () => {
    render(
      <Pagination total={50} limit={10} currentPage={1} selectPage={vi.fn()} />
    )
    expect(screen.getAllByTestId("page-container").length).toBe(5)
    expect(screen.getAllByTestId("page-container")[0]).toHaveTextContent("1")
  })

  it("should emit clicked page", async () => {
    // const handleClick = vi.fn()
    const handleClick = vi.fn(() => {
      console.log("Mock function called!")
    })
    render(
      <Pagination
        total={50}
        limit={10}
        currentPage={1}
        selectPage={handleClick}
      />
    )

    await userEvent.click(screen.getAllByTestId("page-container")[0])
    expect(handleClick).toHaveBeenCalledOnce()
  })
})
