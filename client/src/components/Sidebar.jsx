import React from 'react';
import { NavLink } from 'react-router-dom';
import userAuthStore from '../store/authStore';
import { minigame } from '../assets';


const Sidebar = () => {
   
   const {user}=userAuthStore()
  const menu = [
    { label: 'Quản lý người dùng', to: '/admin/users' },
    { label: 'Quản lý loại khóa học', to: '/admin/type-course' },
  ];

  return (
    <aside className="w-64 bg-blue-50 p-4">
      <div className="flex items-center gap-2 mb-4">
      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-400 relative">
                        <img
                            src={user.avatar || minigame}
                            alt="avatar preview"
                            className="object-cover w-full h-full"
                        />
                        
                    </div>
        <span className="font-semibold">{user.name}</span>
      </div>
      <ul className="space-y-2">
        {menu.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive ? 'bg-blue-100 font-semibold' : 'hover:bg-blue-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
