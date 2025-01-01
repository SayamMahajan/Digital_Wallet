import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BiHome, BiTransfer, BiArrowToBottom, BiUser, BiExit } from 'react-icons/bi';
import { axiosInstance } from '../utils/api';
import './Sidebar.css';

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation(); 

    const isActive = (path) => location.pathname === path;

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/api/auth/logout');
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="menu">
            <div className="logo">
                <img src="/images/ClickLogo.png" alt="Logo" />
            </div>
            <div className="menu--list">
                <Link
                    to="/"
                    className={`item ${isActive('/') ? 'active' : ''}`}
                >
                    <BiHome className="icon" />
                    Home
                </Link>
                <Link
                    to="/transactions"
                    className={`item ${isActive('/transactions') ? 'active' : ''}`}
                >
                    <BiTransfer className="icon" />
                    Transactions
                </Link>
                <Link
                    to="/request"
                    className={`item ${isActive('/request') ? 'active' : ''}`}
                >
                    <BiArrowToBottom className="icon" />
                    Request
                </Link>
                <Link
                    to="/profile"
                    className={`item ${isActive('/profile') ? 'active' : ''}`}
                >
                    <BiUser className="icon" />
                    Profile
                </Link>
                <button
                    className="item"
                    onClick={handleLogout}
                >
                    <BiExit className="icon" />
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
