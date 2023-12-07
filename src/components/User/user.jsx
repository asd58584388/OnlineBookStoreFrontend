import React from 'react';
import UserBookList from './UserBookList';

const User = ({booklists,token}) => {
  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      <h3>Booklists</h3>
      <UserBookList booklists={booklists} token={token} />
    </div>
  );
};

export default User;
