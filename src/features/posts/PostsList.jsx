import { useSelector } from "react-redux"
import { selectPostIds } from "./postSlice"
import PostsExcerpt from "./PostsExcerpt"
import { Link } from "react-router-dom"
import { useGetPostsQuery } from "./postSlice"

const PostsList = () => {

	const {isLoading, isSuccess, isError, error} = useGetPostsQuery()
	const orderedPostIds = useSelector(selectPostIds)
	let content

	if (isLoading) {
		content = <p className="text-xl font-medium animate-bounce">Loading...</p>
	} else if (isSuccess) {
		// const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
		// content = orderedPosts.map((post) => <PostsExcerpt key={post.id} post={post} />)

		content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
	} else if (isError) {
		content = <p>error! {postsError}</p>
	}

	return (
		<section className="py-10">
			<div className="inline-flex items-center justify-between w-full gap-3 mb-8">
				<h2 className="text-4xl font-semibold">Posts List</h2>
				<Link
					to={"/post"}
					className="px-6 py-3 font-medium bg-blue-700 rounded-lg text-slate-50 disabled:bg-blue-300"
				>
					+ New Post
				</Link>
			</div>
			<div className="grid grid-cols-2 gap-4 md:grid-cols-3">{content}</div>
		</section>
	)
}

export default PostsList
