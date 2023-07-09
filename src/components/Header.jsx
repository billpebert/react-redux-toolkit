import { Link } from "react-router-dom"

const Header = () => {
	return (
		<header className="flex items-center justify-between px-20 py-5 text-white bg-blue-700">
			<h1 className="text-4xl font-medium">Redux Blog</h1>
			<nav className="flex items-center gap-5">
						<Link to="/" className="font-medium">Home</Link>
						<Link to="post" className="font-medium">Post</Link>
			</nav>
		</header>
	)
}

export default Header
