import { useState } from "react";
import { addUser } from "../services/userService";

function UserForm() {
  const [user, setUser] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitUser = (e) => {
    e.preventDefault();
    addUser(user).then(() => {
      alert("User added");
      setUser({ name: "", email: "" });
    });
  };

  return (
    <div className="container mt-4">
      <h3>Add User</h3>
      <form onSubmit={submitUser}>
        <input className="form-control mb-2"
               name="name"
               placeholder="Name"
               value={user.name}
               onChange={handleChange} />
        <input className="form-control mb-2"
               name="email"
               placeholder="Email"
               value={user.email}
               onChange={handleChange} />
        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}

export default UserForm;
