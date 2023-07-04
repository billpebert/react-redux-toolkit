import AddPostForm from "./features/posts/AddPostForm"
import PostsList from "./features/posts/PostsList"

function App() {
	return (
		<>
			<main className="container">
                <AddPostForm/>
                <PostsList/>
            </main>
		</>
	)
}

export default App
