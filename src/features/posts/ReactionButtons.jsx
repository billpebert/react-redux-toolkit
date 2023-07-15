import { useAddReactionMutation } from "./postSlice"

const reactionEmoji = {
	thumbsUp: "👍",
	wow: "😲",
	heart: "💖",
	rocket: "🚀",
	coffee: "☕",
}

const ReactionButtons = ({ post }) => {
	const [addReaction] = useAddReactionMutation()

	const dispatchReaction = () => {
		const newValue = post.reactions[name] + 1
		addReaction({
			postId: post.id,
			reactions: {
				...post.reactions,
				[name]: newValue,
			},
		})
	}
	// [name, emoji] = [key, value]
	const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
		return (
			<button
				key={name}
				type="button"
				className="text-sm text-slate-400"
				onClick={() => {
					const newValue = post.reactions[name] + 1
					addReaction({ postId: post.id, reactions: { ...post.reactions, [name]: newValue } })
				}}
			>
				{emoji} {post.reactions[name]}
			</button>
		)
	})

	return <div className="flex items-center gap-3 mt-3">{reactionButtons}</div>
}

export default ReactionButtons
