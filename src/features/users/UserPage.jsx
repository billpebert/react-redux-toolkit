import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { selectUserById } from "./userSlice"
import { selectPostsByUser } from "../posts/postSlice"

const UserPage = () => {
	const { userId } = useParams()
	const user = useSelector((state) => selectUserById(state, Number(userId)))

	// const postForUser = useSelector(state => {
	//   const allPosts = selectAllPosts(state)
	//   return allPosts.filter(post => post.userId === Number(userId))
	// })

	const postForUser = useSelector((state) => selectPostsByUser(state, Number(userId)))

	const postTitles = postForUser.map((post) => (
		<li key={post.id} className="p-3 transition-all odd:bg-slate-200 hover:shadow-md">
			<Link to={`/post/${post.id}`}>{post.title}</Link>
		</li>
	))
	return (
		<section className="py-10">
			<div className="inline-flex items-center justify-between w-full gap-3 mb-8">
				<h2 className="text-4xl font-semibold">{user?.name}</h2>
			</div>
			<ol>{postTitles}</ol>
		</section>
	)
}

export default UserPage
