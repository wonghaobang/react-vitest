import { render, screen } from "@testing-library/react"
import ProductImageGallery from "../../src/components/ProductImageGallery"

describe("ProductImageGallery", () => {
  it("should render nothing if given an empty array", () => {
    // render: This is a function from React Testing Library that mounts your component onto a
    // virtual DOM for testing purposes. It returns an object containing various utilities, one of which is container.
    // container represents the DOM element wrapping the rendered output.
    const { container } = render(<ProductImageGallery imageUrls={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it("should render a list of images", () => {
    const imageUrls = ["url1", "url2"]

    render(<ProductImageGallery imageUrls={imageUrls} />)

    const images = screen.getAllByRole("img")
    expect(images).toHaveLength(2)
    imageUrls.forEach((url, index) => {
      expect(images[index]).toHaveAttribute("src", url)
    })
  })
})
