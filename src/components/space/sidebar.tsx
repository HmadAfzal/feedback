import { Globe2, Heart, Inbox } from 'lucide-react';
import React, { useState } from 'react';

const Sidebar = ({ setSideBarOption }: { setSideBarOption: (option: string) => void }) => {
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
      ],
    },
  ];

  const handleSetItems = (option: string) => {
    setActiveItem(option);
    setSideBarOption(option);  // Pass the selected option to the parent component
  };

  return (
    <div className="w-[20%] p-6">
      {menuItems.map((menu, index) => (
        <div key={index} className="mb-8">
          <h4 className="font-semibold text-lg pb-4 text-card-foreground ">
            {menu.title}
          </h4>
          <div className="mt-4 space-y-2">
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
                <span className="mr-3">{option.icon}</span>
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
