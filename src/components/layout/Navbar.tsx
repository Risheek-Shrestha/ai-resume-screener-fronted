import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

function Navbar() {
    
const { user, logout, isAuthenticated } = useAuth();

    return (
       <nav className="navbar">
        <div className="navbar-brand">
            <a href="/" className="navbar-item">MyApp</a>
        </div>
        <div className="navbar-menu">
            {isAuthenticated ? (
                <>
                    <span className="navbar-item">Welcome, {user?.username}</span>
                    <button onClick={logout} className="navbar-item">Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login" className="navbar-item">Login</Link>
                    <Link to="/register" className="navbar-item">Register</Link>
                </>
            )}
        </div>
       </nav>
    );
}

export default Navbar;