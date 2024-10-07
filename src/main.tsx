import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import TermsAndConditions from "./components/TermsAndConditions.tsx"
import Greet from "./components/Greet.tsx"
import UserAccount from "./components/UserAccount.tsx"
import UserList from "./components/UserList.tsx"
import ProductImageGallery from "./components/ProductImageGallery.tsx"
import ExpandableText from "./components/ExpandableText.tsx"
import TagList from "./components/TagList.tsx"
import SearchBox from "./components/SearchBox.tsx"
import Todos from "./components/Todos.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Greet /> */}
    {/* <UserAccount user={{ id: 1, name: "John", isAdmin: true }} /> */}
    {/* <UserList
      users={[
        { id: 1, name: "Peter" },
        { id: 2, name: "John" },
      ]}
    /> */}
    {/* <ProductImageGallery imageUrls={["url1", "url2"]} /> */}
    {/* <TermsAndConditions /> */}
    {/* <ExpandableText text={"a".repeat(500)} /> */}
    {/* <TagList /> */}
    {/* <SearchBox handleSubmit={(text) => console.log(text)} /> */}
    <Todos />
  </StrictMode>
)
