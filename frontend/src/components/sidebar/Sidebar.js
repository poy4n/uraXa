import React from 'react';

import './Sidebar.css';

const reverse = (event) => {
  const sidebar = document.querySelector('div.sidebar');
  sidebar.classList.toggle('sidebar--expand');
  event.target.classList.toggle('reverse');
}

export const Sidebar = () => {
  return(
    <div className="sidebar">
      <div className="post-list">   
        
      </div>
      <span className="arrow" onClick={reverse}>></span>
    </div>
  );
}