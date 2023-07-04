// Extracted component from PostsList.jsx
import PostAuthor from "./postAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"

const PostsExcerpt = ({ post }) => {
	return (
		<article className="p-4 border-2 rounded-xl border-slate-300 md:min-h-[250px] flex flex-col">
			<h3 className="mb-1 text-xl font-medium line-clamp-2"> {post.title} </h3>
			<p className="text-slate-500 lineclamp-3"> {post.body.substring(0, 100)} </p>
			<p className="mt-5 text-sm text-slate-500 md:mt-auto ms-auto">
				<PostAuthor userId={post.userId} />
				&nbsp; | &nbsp;
				<TimeAgo timestamp={post.date} />
			</p>
			<div className="ms-auto">
				<ReactionButtons post={post} />
			</div>
		</article>
	)
}

export default PostsExcerpt
