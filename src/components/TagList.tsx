import { useEffect, useState } from "react"

const TagList = () => {
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    const fetchTags = async (): Promise<string[]> => {
      return new Promise((resolve) =>
        setTimeout(() => resolve(["tag1", "tag2", "tag3"]), 500)
      )
    }
    fetchTags().then((tags) => setTags(tags))
  }, [])

  return (
    <ul>
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  )
}

export default TagList
