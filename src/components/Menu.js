import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    const activeStyle = {
        color: 'black',
        fontWeight: 'bold'
    };

    return (
        <div>
            <h1>무바 홈</h1>
            <ul>
                <li><NavLink exact to="/admin/" activeStyle={activeStyle}>관리 홈</NavLink></li>
                <li><NavLink exact to="/admin/users" activeStyle={activeStyle}>사용자 관리</NavLink></li>
                <li>
                    <ul>
                        <p>업주 관리</p>
                        <li><NavLink exact to="/admin/owner" activeStyle={activeStyle}>결제 관리</NavLink></li>
                        <li><NavLink exact to="/admin/users" activeStyle={activeStyle}>상점 정보 관리</NavLink></li>
                        <li><NavLink exact to="/admin/users" activeStyle={activeStyle}>쿠폰 관리</NavLink></li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <p>챗봇 관리</p>
                        <li><NavLink exact to="/admin/users" activeStyle={activeStyle}>키워드 관리</NavLink></li>
                        <li><NavLink exact to="/admin/users" activeStyle={activeStyle}>Intent 관리</NavLink></li>
                        <li><NavLink exact to="/admin/users" activeStyle={activeStyle}>Entity 관리</NavLink></li>
                        <li><NavLink exact to="/admin/users" activeStyle={activeStyle}>Dialog 관리</NavLink></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default AdminMenu;