import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { collections } from '@/data/artworks';

const SubNav: React.FC = () => {
  const location = useLocation();

  return (
    <div className="overflow-x-auto py-1">
      <nav className="items-center flex gap-2 flex-wrap">
        <NavLink
          to="/works"
          className={({ isActive }) =>
            `block  rounded border md:border-0 py-2 px-4 text-sm whitespace-nowrap ${
              isActive && location.pathname === '/works'
                ? 'text-black font-bold'
                : 'text-foreground hover:text-black transition-colors'
            }`
          }
        >
          All Works
        </NavLink>
        {collections.map((collection) => (
          <NavLink
            key={collection}
            to={`/works/collection/${collection.toLowerCase().replace(/\s+/g, '-')}`}
            className={({ isActive }) =>
              `block rounded border md:border-0 py-2 px-4 text-sm whitespace-nowrap ${
                isActive ? 'text-black font-bold' : 'text-foreground hover:text-black transition-colors'
              }`
            }
            onClick={() => window.scrollTo(0, 0)}
          >
            {collection}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default SubNav;
