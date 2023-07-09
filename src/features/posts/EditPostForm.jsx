import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectPostById, updatePost, deletePost } from "./postSlice"
import { useParams, useNavigate } from "react-router-dom"
import { getAllUsers } from "../users/userSlice"

const EditPostForm = () => {
	const { postId } = useParams()
	const navigate = useNavigate()

	const post = useSelector((state) => selectPostById(state, Number(postId)))
	const users = useSelector(getAllUsers)

	const [title, setTitle] = useState(post?.title)
	const [content, setContent] = useState(post?.body)
	const [userId, setUserId] = useState(post?.userId)
	const [requestStatus, setRequestStatus] = useState("idle")

	const dispatch = useDispatch()

	if (!post) {
		return (
			<section>
				<h2>Post not found!</h2>
			</section>
		)
	}

	const onTitleChange = (e) => setTitle(e.target.value)
	const onContentChange = (e) => setContent(e.target.value)
	const onAuthorChange = (e) => setUserId(Number(e.target.value))

	// const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
	const canSave = [title, content, userId].every(Boolean) && requestStatus === "idle"

	const onSavePostClicked = () => {
		if (canSave) {
			try {
				setRequestStatus("pending")
				dispatch(
					updatePost({
						id: post.id,
						title,
						body: content,
						userId,
						reactions: post.reactions,
					})
				).unwrap()

				setTitle("")
				setContent("")
				setUserId("")
				navigate(`/post/${postId}`)
			} catch (error) {
				console.log(error)
			} finally {
				setRequestStatus("idle")
			}
		}
	}

	const userOptions = users.map((user) => (
		<option key={user.id} value={user.id}>
			{user.name}
		</option>
	))

  const onDeletePostClicked = () => {
    try {
      setRequestStatus('pending')
      dispatch(
        deletePost({ id: post.id })
      ).unwrap()
      setTitle("")
				setContent("")
				setUserId("")
				navigate('/')
    } catch (error) {
      console.error('Failed to delete the post', error)
    } finally {
      setRequestStatus('idle')
    }
  }

	// console.log(userId)

	return (
		<section className="py-10 w-full max-w-[500px] mx-auto">
			<h2 className="mb-5 text-4xl font-semibold">Edit Post</h2>
			<form action="" className="flex flex-col gap-4" onSubmit={onSavePostClicked}>
				<div className="flex flex-col gap-2">
					<label htmlFor="postTitle">Title</label>
					<input
						type="text"
						className="px-4 py-2 border rounded-lg border-slate-400 bg-slate-50"
						id="postTitle"
						name="postTitle"
						value={title}
						onChange={onTitleChange}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="postContent">Content</label>
					<input
						type="text"
						className="px-4 py-2 border rounded-lg border-slate-400 bg-slate-50"
						id="postContent"
						name="postContent"
						value={content}
						onChange={onContentChange}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="postContent">Select Author</label>
					<select
						name="postAuthor"
						id="postAuthor"
						onChange={onAuthorChange}
						className="px-4 py-2 border rounded-lg border-slate-400 bg-slate-50"
						defaultValue={userId}
					>
						<option value="" hidden></option>
						{userOptions}
					</select>
				</div>
				<button
					type="submit"
					className="px-6 py-3 font-medium bg-blue-700 rounded-lg text-slate-50 disabled:bg-blue-300"
					disabled={!canSave}
				>
					Update Post
				</button>
				<button
					type="button"
					className="px-6 py-3 font-medium rounded-lg bg-rose-700 text-slate-50 disabled:bg-blue-300"
					disabled={!canSave}
          onClick={onDeletePostClicked}
				>
					Delete Post
				</button>
			</form>
		</section>
	)
}

export default EditPostForm
