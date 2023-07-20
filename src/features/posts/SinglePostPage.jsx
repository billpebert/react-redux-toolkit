import { useSelector } from "react-redux"
import { selectPostById } from "./postSlice"
import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const SinglePostPage = () => {
	// retrieve post ID
	const { postId } = useParams()
	const post = useSelector((state) => selectPostById(state, Number(postId)))
	// console.log('posts:'  + useSelector(state => state))
	if (!post) {
		return (
			<section className="container py-10">
				<h2 className="text-3xl font-semibold">Post not found here!</h2>
			</section>
		)
	}

	return (
		<>
			<div className="flex justify-end my-5">
				<Link
					to={`/post/edit/${post.id}`}
					className="px-6 py-3 font-medium bg-blue-700 rounded-lg text-slate-50 disabled:bg-blue-300"
				>
					Modify this post
				</Link>
			</div>

			<article className="p-4 border-2 rounded-xl border-slate-300 md:min-h-[250px] flex flex-col mt-5">
				<h3 className="mb-1 text-xl font-medium line-clamp-2"> {post.title} </h3>
				<p className="text-slate-500 lineclamp-3"> {post.body} </p>
				<p className="mt-5 text-sm text-slate-500 md:mt-auto ms-auto">
					<PostAuthor userId={post.userId} />
					&nbsp; | &nbsp;
					<TimeAgo timestamp={post.date} />
				</p>
				<div className="ms-auto">
					<ReactionButtons post={post} />
				</div>
			</article>
		</>
	)
}

export default SinglePostPage
