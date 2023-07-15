import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { selectUserById } from "./userSlice"
import { useGetPostsByUserIdQuery } from "../posts/postSlice"

const UserPage = () => {
	const { userId } = useParams()

	const user = useSelector((state) => selectUserById(state, Number(userId)))

	const { data: postForUser, isLoading, isError, isSuccess, error } = useGetPostsByUserIdQuery(userId)

	let content
	if (isLoading) {
		content = <p>Loading ...</p>
	} else if (isSuccess) {
		const { ids, entities } = postForUser
		content = ids.map((id) => (
			<li key={id} className="p-3 transition-all odd:bg-slate-200 hover:shadow-md">
				<Link to={`/post/${id}`}>{entities[id].title}</Link>
			</li>
		))
	} else if (isError) {
		content = <p> {error}</p>
	}

	return (
		<section className="py-10">
			<div className="inline-flex items-center justify-between w-full gap-3 mb-8">
				<h2 className="text-4xl font-semibold">{user?.name}</h2>
			</div>
			<ol>{content}</ol>
		</section>
	)
}

export default UserPage
