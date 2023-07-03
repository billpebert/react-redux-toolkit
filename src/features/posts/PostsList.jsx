import { useSelector } from "react-redux"
import { selectAllPosts } from "./postSlice"
import PostAuthor from "./postAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"

const PostsList = () => {
	const posts = useSelector(selectAllPosts)

	// sort data in reverse order [latest]
	const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))
	const renderedPosts = orderedPosts.map((post) => (
		<article key={post.id} className="p-4 border-2 rounded-xl border-slate-300 md:min-h-[200px] flex flex-col">
			<h3 className="mb-1 text-xl font-medium"> {post.title} </h3>
			<p className="text-slate-500"> {post.content.substring(0, 100)} </p>
			<p className="mt-5 text-sm text-slate-500 md:mt-auto ms-auto">
				<PostAuthor userId={post.userId}/>
				&nbsp; | &nbsp;
				<TimeAgo timestamp={post.date} />
			</p>
			<div className="ms-auto">
				<ReactionButtons post={post} />
			</div>
		</article>
	))
	return (
		<section className="py-10">
			<h2 className="mb-5 text-4xl font-semibold">Posts List</h2>
			<div className="grid grid-cols-2 gap-4 md:grid-cols-3">{renderedPosts}</div>
		</section>
	)
}

export default PostsList
