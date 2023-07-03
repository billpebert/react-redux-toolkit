import { useDispatch } from "react-redux"
import { reactionAdded } from "./postSlice"

const reactionEmoji = {
	thumbsUp: "👍",
	wow: "😲",
	heart: "💖",
	rocket: "🚀",
	coffee: "☕",
}

const ReactionButtons = ({ post }) => {
	const dispatch = useDispatch()
    // [name, emoji] = [key, value]
	const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
		return (
			<button
				key={name}
				type="button"
				className="text-sm text-slate-400"
				onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}
			>
				{emoji} {post.reactions[name]}
			</button>
		)
	})

    return <div className="flex items-center gap-3 mt-3">{reactionButtons}</div>
}

export default ReactionButtons
