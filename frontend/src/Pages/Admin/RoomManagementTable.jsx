import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faUserPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./RoomManagementTable.css";
import { DNA } from "react-loader-spinner";

const RoomManagementTable = () => {
  const [rooms, setRooms] = useState([]);
  const [unassignedUsers, setUnassignedUsers] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRooms();
    fetchUnassignedUsers();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5111/api/rooms/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
    setLoading(false);
  };

  const fetchUnassignedUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5111/api/rooms/unassigned-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUnassignedUsers(
        response.data.map((user) => ({
          value: user._id,
          label: `${user.name} (${user.email})`,
        }))
      );
    } catch (error) {
      console.error("Error fetching unassigned users:", error);
    }
  };

  const handleCreateRoom = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5111/api/rooms/create",
        { roomNumber, capacity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchRooms();
      setShowForm(false);
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Room Created",
        text: "Room has been created successfully!",
      });
    } catch (error) {
      console.error("Error creating room:", error);
      Swal.fire({
        position: "bottom-end",
        icon: "error",
        title: "Error",
        text: "Failed to create room. Please try again.",
      });
    }
  };

  const handleUpdateRoom = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5111/api/rooms/update",
        { id: selectedRoom._id, roomNumber, capacity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchRooms();
      setShowForm(false);
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Room Updated",
        text: "Room has been updated successfully!",
      });
    } catch (error) {
      console.error("Error updating room:", error);
      Swal.fire({
        position: "bottom-end",
        icon: "error",
        title: "Error",
        text: "Failed to update room. Please try again.",
      });
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      await axios.delete(`http://localhost:5111/api/rooms/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchRooms();
      fetchUnassignedUsers();
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Room Deleted",
        text: "Room has been deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting room:", error);
      Swal.fire({
        position: "bottom-end",
        icon: "error",
        title: "Error",
        text: "Failed to delete room. Please try again.",
      });
    }
  };

  const handleAssignUsers = async () => {
    if (selectedUsers.length < 1) {
      Swal.fire({
        position: "bottom-end",
        icon: "error",
        title: "Error",
        text: "Please Select Users",
      });
      return;
    }
    try {
      const response = await axios.put(
        "http://localhost:5111/api/rooms/assign",
        {
          roomId: selectedRoom._id,
          userIds: selectedUsers.map((user) => user.value),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchRooms();
      fetchUnassignedUsers();
      setSelectedUsers([]);
      setShowForm(false);
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Users Assigned",
        text: "Users have been assigned to the room successfully!",
      });
    } catch (error) {
      console.error("Error assigning users to room:", error);
      const rm = rooms?.find((room) => room?._id == selectedRoom?._id);
      const space = rm?.capacity - rm?.assignedUsers?.length;
      if (rm && selectedUsers?.length > space) {
        Swal.fire({
          position: "bottom-end",
          icon: "error",
          title: "Error",
          text: `You can assigned only ${space} users in this room for now, because of it's capacity limit`,
        });
        return;
      }
      Swal.fire({
        position: "bottom-end",
        icon: "error",
        title: "Error",
        text: "Failed to assign users to room. Please try again.",
      });
    }
  };

  const handleRemoveUser = async (roomId, userId) => {
    try {
      const response = await axios.put(
        "http://localhost:5111/api/rooms/remove-user",
        { roomId, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchRooms();
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "User Removed",
        text: "User has been removed from the room successfully!",
      });
      fetchUnassignedUsers();
    } catch (error) {
      console.error("Error removing user from room:", error);
      Swal.fire({
        position: "bottom-end",
        icon: "error",
        title: "Error",
        text: "Failed to remove user from room. Please try again.",
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formType === "create") {
      handleCreateRoom();
    } else if (formType === "update") {
      handleUpdateRoom();
    } else if (formType === "assign") {
      handleAssignUsers();
    }
  };

  const styles = {
    removeBtn: {
      borderRadius: "100%",
      backgroundColor: "#FF474C",
      height: 28,
      width: 28,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      marginTop: 10,
    },
    loaderDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 150,
      width: "100%",
    },
    disabledBtn: {
      backgroundColor: "#ccc",
    },
  };

  return (
    <div className="room-management table">
      <h3 style={{ textAlign: "left" }}>Room Management</h3>

      <button
        className="create-btn"
        onClick={() => {
          setShowForm(true);
          setFormType("create");
        }}
      >
        Create Room
      </button>
      <table>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Capacity</th>
            <th>Assigned Users</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            rooms.map((room) => (
              <tr key={room._id}>
                <td>{room.roomNumber}</td>
                <td>{room.capacity}</td>
                <td>
                  {room.assignedUsers?.length > 0 ? (
                    room.assignedUsers.map((user, index) => {
                      return (
                        <div key={index?.toString()} className="assigned-user">
                          <span>
                            {user.name} ({user.email})
                          </span>
                          <button
                            className="remove-btn"
                            style={styles.removeBtn}
                            onClick={() => handleRemoveUser(room._id, user._id)}
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <h4 style={{ textAlign: "center" }}>
                      This Room is not assigned to anyone yet.
                    </h4>
                  )}
                </td>
                <td>
                  {room.capacity <= room.assignedUsers.length ? (
                    <span className="full-room">Full</span>
                  ) : (
                    <span className="available-room">
                      {room.capacity - room.assignedUsers.length} beds left
                    </span>
                  )}
                </td>
                <td>
                  <div className="btn-container">
                    <button
                      className="action-btn edit-btn"
                      onClick={() => {
                        setSelectedRoom(room);
                        setFormType("update");
                        setRoomNumber(room.roomNumber);
                        setCapacity(room.capacity);
                        setShowForm(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteRoom(room._id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    <button
                      className="action-btn assign-btn"
                      onClick={() => {
                        setSelectedRoom(room);
                        setFormType("assign");
                        setShowForm(true);
                      }}
                      disabled={room.capacity <= room.assignedUsers.length}
                      style={
                        room.capacity <= room.assignedUsers.length
                          ? styles.disabledBtn
                          : {}
                      }
                    >
                      <FontAwesomeIcon icon={faUserPlus} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <td colSpan={5}>
              <div style={styles.loaderDiv}>
                <DNA
                  visible={loading}
                  height="150"
                  width="150"
                  ariaLabel="dna-loading"
                  wrapperStyle={{}}
                  wrapperClass="dna-wrapper"
                />
              </div>
            </td>
          )}
        </tbody>
      </table>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowForm(false)}>
              &times;
            </span>
            <form onSubmit={handleFormSubmit}>
              {formType === "create" || formType === "update" ? (
                <>
                  <h2>
                    {formType === "create" ? "Create Room" : "Update Room"}
                  </h2>
                  <label>Room Number</label>
                  <input
                    type="text"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    required
                  />
                  <label>Capacity</label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    required
                  />
                  <button type="submit">
                    {formType === "create" ? "Create" : "Update"}
                  </button>
                </>
              ) : (
                <>
                  <h2>Assign Users to Room</h2>
                  <label>Select Users</label>
                  <div style={{ marginBottom: 18 }}>
                    <Select
                      isMulti
                      value={selectedUsers}
                      onChange={setSelectedUsers}
                      options={unassignedUsers}
                    />
                  </div>
                  <button type="submit">Assign</button>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomManagementTable;
