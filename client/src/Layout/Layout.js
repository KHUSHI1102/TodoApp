import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';

const DefaultLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto bg-gray-500/5">
        <main>
          <div className="mx-auto max-w-screen-2xl p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
