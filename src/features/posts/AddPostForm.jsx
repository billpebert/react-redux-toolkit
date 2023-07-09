import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNewPost } from "./postSlice"
import { getAllUsers } from "../users/userSlice"
import { useNavigate } from "react-router-dom"

const AddPostForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")
	const [userId, setUserId] = useState("")
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const users = useSelector(getAllUsers)

	const onTitleChange = (e) => setTitle(e.target.value)
	const onContentChange = (e) => setContent(e.target.value)
	const onAuthorChange = (e) => setUserId(e.target.value)

    // const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

    const onSavePost = (e) => {
        e.preventDefault()
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(createNewPost({title, body: content, userId})).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate('/')
            } catch (error) {
                console.error('Failed to create new post!', error)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }

    const usersList = users.map(user => (
        <option value={user.id} key={user.id}>
            {user.name}
        </option>
    ))

	return (
		<section className="py-10 w-full max-w-[500px] mx-auto">
			<h2 className="mb-5 text-4xl font-semibold">Add a New Post</h2>
			<form action="" className="flex flex-col gap-4" onSubmit={onSavePost}>
				<div className="flex flex-col gap-2">
					<label htmlFor="postTitle">Title</label>
					<input type="text" className="px-4 py-2 border rounded-lg border-slate-400 bg-slate-50" id="postTitle" name="postTitle" value={title} onChange={onTitleChange} />
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="postContent">Content</label>
					<input type="text" className="px-4 py-2 border rounded-lg border-slate-400 bg-slate-50" id="postContent" name="postContent" value={content} onChange={onContentChange} />
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="postContent">Select Author</label>
					<select name="postAuthor" id="postAuthor" value={userId} onChange={onAuthorChange} className="px-4 py-2 border rounded-lg border-slate-400 bg-slate-50">
                        <option value="" hidden></option>
                        {usersList}
                    </select>
				</div>
                <button type="submit" className="px-6 py-3 font-medium bg-blue-700 rounded-lg text-slate-50 disabled:bg-blue-300" disabled={!canSave}>Save Post</button>
			</form>
		</section>
	)
}

export default AddPostForm
