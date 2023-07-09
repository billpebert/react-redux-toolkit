import { Route, Routes } from "react-router-dom"
import AddPostForm from "./features/posts/AddPostForm"
import PostsList from "./features/posts/PostsList"
import Layout from "./components/Layout"
import SinglePostPage from "./features/posts/SinglePostPage"
import EditPostForm from "./features/posts/EditPostForm"

// Tutorial https://www.youtube.com/watch?v=NqzdVN2tyvQ&t=5661s&ab_channel=DaveGray
// 1:41:50
function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<PostsList />} />
				<Route path="post">
					<Route index element={<AddPostForm />} />
					<Route path=":postId" element={<SinglePostPage />} />
					<Route path="edit/:postId" element={<EditPostForm />} />
				</Route>
			</Route>
		</Routes>
	)
}

export default App
