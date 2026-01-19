import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/userService";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    getUsers().then(res => setUsers(res.data));
  };

  const removeUser = (id) => {
    deleteUser(id).then(loadUsers);
  };

  return (
    <div className="container mt-4">
      <h3>User List</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button className="btn btn-danger btn-sm"
                        onClick={() => removeUser(u.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
