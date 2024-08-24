import React, { useState } from 'react';
import { Globe2, Heart, Inbox, NotebookText } from 'lucide-react';

interface SidebarProps {
  setSideBarOption: (option: string) => void;
  sidebarOpen: boolean; // Prop to control sidebar visibility
  setSidebarOpen: (open: boolean) => void; // Prop to close the sidebar
}

const Sidebar: React.FC<SidebarProps> = ({ setSideBarOption, sidebarOpen, setSidebarOpen }) => {
  const [activeItem, setActiveItem] = useState('All');

  const menuItems = [
    {
      title: 'Inbox',
      options: [
        { name: 'All', id: 'all', icon: <Inbox size={18} /> },
        { name: 'Liked', id: 'liked', icon: <Heart size={18} /> },
      ],
    },
    {
      title: 'Integrations',
      options: [
        { name: 'Embed to your site', id: 'embed', icon: <Globe2 size={18} /> },
        { name: 'Get API', id: 'getapi', icon: <NotebookText size={18} /> },
      ],
    },
  ];

  const handleSetItems = (option: string) => {
    setActiveItem(option);
    setSideBarOption(option);
    setSidebarOpen(false);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:w-[20%] dark:bg-[#121212] bg-[#FFFFFF] p-6 md:p-4`}
    >
      {menuItems.map((menu, index) => (
        <div key={index} className='mb-8'>
          <h4 className='font-semibold text-lg pb-4 text-card-foreground'>
            {menu.title}
          </h4>
          <div className='mt-4 space-y-2'>
            {menu.options.map((option) => (
              <p
                key={option.id}
                className={`font-medium text-sm py-2 pl-4 flex items-center cursor-pointer rounded-md transition-colors duration-200 
                ${
                  activeItem === option.name
                    ? 'bg-primary text-primary-foreground shadow-inner'
                    : 'hover:bg-muted text-muted-foreground hover:pl-5'
                }`}
                onClick={() => handleSetItems(option.name)}
              >
                <span className='mr-3'>{option.icon}</span>
                {option.name}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
