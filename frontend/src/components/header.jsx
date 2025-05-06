import { Link } from "react-router-dom";

export default function Header(){
    return (
        <header>
            <h1>Events Now</h1>
            <nav className="nav-bar" >
                <Link to="/">Home </Link>
                <Link to="/events">All Events </Link>
            </nav>
        </header>
    )

}