import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // useNavigate for redirecting
import { BiHome, BiTransfer, BiArrowToBottom, BiUser, BiExit } from 'react-icons/bi';
import {axiosInstance} from '../utils/api';
import './Sidebar.css';

function Sidebar() {
    const [activeItem, setActiveItem] = useState('home');
    const navigate = useNavigate();  

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

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
                    to="/home"
                    className={`item ${activeItem === 'home' ? 'active' : ''}`}
                    onClick={() => handleItemClick('home')}
                >
                    <BiHome className="icon" />
                    Home
                </Link>
                <Link
                    to="/transactions"
                    className={`item ${activeItem === 'transactions' ? 'active' : ''}`}
                    onClick={() => handleItemClick('transactions')}
                >
                    <BiTransfer className="icon" />
                    Transactions
                </Link>
                <Link
                    to="/request"
                    className={`item ${activeItem === 'request' ? 'active' : ''}`}
                    onClick={() => handleItemClick('request')}
                >
                    <BiArrowToBottom className="icon" />
                    Request
                </Link>
                <Link
                    to="/profile"
                    className={`item ${activeItem === 'profile' ? 'active' : ''}`}
                    onClick={() => handleItemClick('profile')}
                >
                    <BiUser className="icon" />
                    Profile
                </Link>
                <button
                    className={`item ${activeItem === 'logout' ? 'active' : ''}`}
                    onClick={handleLogout}>
                    <BiExit className="icon" />
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
