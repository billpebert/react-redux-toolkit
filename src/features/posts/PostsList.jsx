import { useSelector, useDispatch } from "react-redux"
import { selectAllPosts, getPostsError, getPostsStatus, fetchPosts } from "./postSlice"
import { useEffect } from "react"
import PostsExcerpt from "./PostsExcerpt"

const PostsList = () => {
	const dispatch = useDispatch()
	const posts = useSelector(selectAllPosts)
	const postStatus = useSelector(getPostsStatus)
	const postsError = useSelector(getPostsError)

	useEffect(() => {
		if(postStatus === 'idle') {
			dispatch(fetchPosts())
		}
	}, [postStatus, dispatch])

	// sort data in reverse order [latest]
	// const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))
	// const renderedPosts = orderedPosts.map((post) => (
		
	// ))
	let content
	if (postStatus === 'loading') {
		content = <p className="text-xl font-medium animate-bounce">Loading...</p>
	} else if (postStatus === 'succeeded') {
		const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))
		content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
	} else if (postStatus === 'failed') {
		content = <p>error! {postsError}</p>
	}

	return (
		<section className="py-10">
			<h2 className="mb-5 text-4xl font-semibold">Posts List</h2>
			<div className="grid grid-cols-2 gap-4 md:grid-cols-3">{content}</div>
		</section>
	)
}

export default PostsList
