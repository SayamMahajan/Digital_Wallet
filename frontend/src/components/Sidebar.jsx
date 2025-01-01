import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BiHome, BiTransfer, BiArrowToBottom, BiBarChart , BiExit } from 'react-icons/bi';
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
                    to="/requests"
                    className={`item ${isActive('/requests') ? 'active' : ''}`}
                >
                    <BiArrowToBottom className="icon" />
                    Request
                </Link>
                <Link
                    to="/graphs"
                    className={`item ${isActive('/graphs') ? 'active' : ''}`}
                >
                    <BiBarChart  className="icon" />
                    Graphs
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
