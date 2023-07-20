// Extracted component from PostsList.jsx
import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"
import { Link } from "react-router-dom"

import { useSelector } from "react-redux"
import { selectPostById } from "./postSlice"

const PostsExcerpt = ({ postId }) => {
	const post = useSelector(state => selectPostById(state, postId))
	return (
		<article className="p-4 border-2 rounded-xl border-slate-300 md:min-h-[250px] flex flex-col">
			<Link to={`post/${post.id}`}>
				<h3 className="mb-1 text-xl font-medium line-clamp-2"> {post.title} </h3>
				<p className="text-slate-500 lineclamp-3"> {post.body.substring(0, 100)} </p>
			</Link>
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

// this allows component to not re-render if the props { post } doesn't change
// PostsExcerpt = React.memo(PostsExcerpt) 

export default PostsExcerpt
