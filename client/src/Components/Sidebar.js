import React from 'react';
import { NavLink } from 'react-router-dom';
import { LuListTodo } from "react-icons/lu";

const Sidebar = () => {
  const dataList = [
    { label: 'Todo', icon: <LuListTodo />, path: '/' },
  ];

  return (
    <div
      className={`w-64 bg-white text-black h-full p-5 transition-transform duration-300 lg:translate-x-0`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-semibold`}>Dashboard</h2>
      </div>

      <ul>
        {dataList.map((item, index) => (
          <li key={index} className="mb-3">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 text-lg py-2 px-3 rounded-lg 
                ${isActive ? 'bg-primary-100 border-l-4 border-blue-400' : 'hover:bg-primary-100 hover:border-l-4 hover:border-blue-400'}`
              }
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Sidebar;
