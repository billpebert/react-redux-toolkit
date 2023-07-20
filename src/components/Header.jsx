// import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
// import { getCount, increaseCount } from "../features/posts/postSlice"

const Header = () => {
	// const dispatch = useDispatch()
	// const count = useSelector(getCount)

	return (
		<header className="flex items-center justify-between px-20 py-5 text-white bg-blue-700">
			<h1 className="text-4xl font-medium">Redux Blog</h1>
			<nav className="flex items-center gap-5">
						<Link to="/" className="font-medium">Home</Link>
						<Link to="post" className="font-medium">Post</Link>
						<Link to="user" className="font-medium">Users</Link>
						{/* <button type="button" onClick={() => dispatch(increaseCount())} className="px-3 py-1 text-black rounded-md bg-slate-100">
							{count}
						</button> */}
			</nav>
		</header>
	)
}

export default Header
