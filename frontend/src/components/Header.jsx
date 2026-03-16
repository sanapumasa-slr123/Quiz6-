import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions/userActions';
import './Header.css';

const Header = () => {
    const { userInfo } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/signin');
    };

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">
                    <h2>ElectricalServices</h2>
                </Link>

                <nav className="nav">
                    <Link to="/" className="nav-link">Home</Link>

                    {userInfo ? (
                        <>
                            {userInfo.role === 'user' && (
                                <Link to="/apply" className="nav-link">Apply as Seller</Link>
                            )}
                            {userInfo.role === 'seller' && (
                                <Link to="/seller/dashboard" className="nav-link">Dashboard</Link>
                            )}
                            {userInfo.role === 'admin' && (
                                <Link to="/admin/users" className="nav-link">Admin Panel</Link>
                            )}
                            <Link to="/profile" className="nav-link">Profile</Link>
                            <button onClick={handleLogout} className="logout-btn">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/signin" className="nav-link">Sign In</Link>
                            <Link to="/register" className="nav-link register-link">Sign Up</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
