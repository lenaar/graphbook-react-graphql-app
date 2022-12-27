import React from "react";
import AvatarModal from "../avatarModal";

const UserBar = ({ user }) => {
  if (!user) return null;
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="user">
      <img src={user.avatar} onClick={() => showModal()} />
      <AvatarModal isOpen={isOpen} showModal={showModal} />
      <span>{user.username}</span>
    </div>
  );
};

export default UserBar;
