import React from "react";

export const UserProfileHeader = ({ user }) => {
  const { avatar, username } = user;

  return (
    <div className="profileHeader">
      <div className="avatar">
        <img src={avatar} />
      </div>

      <div className="information">
        <p>{username}</p>

        <p>Some information about you</p>
      </div>
    </div>
  );
};

export default UserProfileHeader;
