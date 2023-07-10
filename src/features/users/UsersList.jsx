import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllUsers } from './userSlice'

const UsersList = () => {
  const users = useSelector(getAllUsers)

  const renderedUsers = users.map(user => (
    <li key={user.id} className='p-3 transition-all odd:bg-slate-200 hover:shadow-md'>
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>
  ))
  return (
		<section className="py-10">
			<div className="inline-flex items-center justify-between w-full gap-3 mb-8">
				<h2 className="text-4xl font-semibold">Posts List</h2>
				{/* <Link
					to={"/post"}
					className="px-6 py-3 font-medium bg-blue-700 rounded-lg text-slate-50 disabled:bg-blue-300"
				>
					+ New Post
				</Link> */}
			</div>
			<ul className=''>
        {renderedUsers}
      </ul>
		</section>
  )
}

export default UsersList