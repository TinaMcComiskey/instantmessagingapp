import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleUserClick = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleCreateChat = () => {
    if (selectedUsers.length > 0) {
      createChat([user._id, ...selectedUsers]);
      setSelectedUsers([]); // Clear selected users after creating chat
    }
  };

  return (
    <>
      <button onClick={handleCreateChat} disabled={selectedUsers.length === 0}>
        New Chat
      </button>
      <div className="all-users">
        {potentialChats &&
          potentialChats.map((u, index) => {
            const isSelected = selectedUsers.includes(u._id);
            return (
              <div
                className={`single-user ${isSelected ? "selected" : ""}`}
                key={index}
                onClick={() => handleUserClick(u._id)}
              >
                {u.name}
                <span
                  className={
                    onlineUsers?.some((onlineUser) => onlineUser?.userId === u?._id)
                      ? "user-online"
                      : ""
                  }
                ></span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PotentialChats;
