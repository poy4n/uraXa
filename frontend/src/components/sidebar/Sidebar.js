import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../UserContext';

import './Sidebar.css';

export const Sidebar = () => {
  const { data, setData} = useContext(UserContext);
  const { login } = useContext(UserContext);

  const sidebarToggle = (event) => {
    const sidebar = document.querySelector('div.sidebar');
    sidebar.classList.toggle('sidebar--expand');
    event.target.classList.toggle('reverse');
  }

  // useEffect(
  //   () => {
  //     let url = `/api/post/email?email=${email}&token=${token}`;

  //     const requestOptions = {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' }
  //     };

  //     fetch(url, requestOptions)
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         setData(data.posts);
  //       })
  //       .catch((err) => {
  //         console.log(err.error);
  //       })
  //   },
  //   [ login ]
  // );

  return(
    <div className="sidebar">
      <div className="post-list">   
        {data &&
          data.map((post, index) => {
            return(
              <div key={index} className="hub-posts--sidebar">
                <img src={post.image} />
                <p className="hub-posts--sidebar_text">{post.text}</p>
              </div>
            )
          })
        }
      </div>
      <span className="arrow" onClick={sidebarToggle}>></span>
    </div>
  );
}