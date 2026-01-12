import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AddUser.css";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

const API = "http://127.0.0.1:8000/configurations/users/";
const ROLE_MAP = {
  ADMIN: "1",
  SUPERVISOR: "2",
  AGENT: "3",
};

export default function AddUser() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const [count,setCount]= useState(0);
  const [form, setForm] = useState({
    email: "",
    phone_no: "",
    title: "",
    initial: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword:"",
    role: "",
  });

  // ================= FETCH USERS =================
  const fetchUsers = async (page = 1) => {
  try {
    const res = await axios.get(`${API}?page=${page}&page_size=5`);
    setUsers(res.data.data || []);
    setCount(res.data.count);
    setCurrentPage(res.data.current_page);
    setNextPage(res.data.next);
    setPrevPage(res.data.previous);
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to load users");
  }
};


  useEffect(() => {
    fetchUsers(1);
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= SUBMIT FORM =================
  const submitForm = async () => {
  try {
    const payload = { ...form };

    
    if (!editId) {
      // Create user
      if (!payload.password || !payload.confirmPassword) {
        toast.error("Password and Confirm Password are required");
        return;
      }

      if (payload.password !== payload.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    } else {
      // Edit user
      if (payload.password) {
        if (!payload.confirmPassword) {
          toast.error("Please confirm your password");
          return;
        }

        if (payload.password !== payload.confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
      }
    }

    // Never send confirmPassword to backend
    delete payload.confirmPassword;

    // If editing & password is empty, don't send it
    if (editId && !payload.password) {
      delete payload.password;
    }

    let res;

    if (editId) {
      res = await axios.put(`${API}${editId}/`, payload);
      toast.success(res.data.message || "User updated successfully");
    } else {
      res = await axios.post(API, payload);
      toast.success(res.data.message || "User created successfully");
    }

    setForm({
      email: "",
      phone_no: "",
      title: "",
      initial: "",
      first_name: "",
      last_name: "",
      password: "",
      confirmPassword: "",
      role: "",
    });

    setEditId(null);
    fetchUsers();

  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};


  // ================= EDIT USER =================
  const editUser = (user) => {
    setEditId(user.id);
    setForm({
      email: user.email || "",
      phone_no: user.phone_no || "",
      title: user.title || "",
      initial: user.initial || "",
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      password: "",
      confirmPassword:"",
      role: ROLE_MAP[user.role] || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ================= DELETE USER =================
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(`${API}${id}/`);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Delete failed",error);
    }
  };

  // ================= JSX =================
  return (
    <div className="add-user-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="add-user-card">
        <h2>Login Users</h2>

        <div className="user-form">
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input
                    name="phone_no"
                    placeholder="Phone"
                    value={form.phone_no}
                    onChange={handleChange}
                    required
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                  />

          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input name="initial" placeholder="Initial" value={form.initial} onChange={handleChange} required />
          <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} required />
          <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} />

          <input
            name="password"
            type="password"
            placeholder={editId ? "Leave blank to keep password" : "Password"}
            value={form.password}
            onChange={handleChange}
            required={!editId}
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder={editId ? "Leave blank to keep password" : "Confirm Password"}
            value={form.confirmPassword}
            onChange={handleChange}
            required={!editId}
          />


          <select name="role" value={form.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="3">Agent</option>
            <option value="2">Supervisor</option>
            <option value="1">Admin</option>
          </select>

          <button onClick={submitForm}>
            {editId ? "Update User" : "Create User"}
          </button>
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone No</th>
              <th>Email</th>
              <th>Role</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.first_name} {u.last_name}</td>
                  <td>{u.phone_no}</td>
                  <td>{u.email}</td>
                  <td>{u.role?.name || u.role}</td>
                  <td>
                    <button className="action-btn edit" onClick={() => editUser(u)}>
                      <FiEdit />
                    </button>
                  </td>
                  <td>
                    <button className="action-btn delete" onClick={() => deleteUser(u.id)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination */}
          {count > 5 &&<div className="pagination">
  <button
    disabled={!prevPage}
    onClick={() => fetchUsers(currentPage - 1)}
  >
    ⬅ Previous
  </button>

  <span>Page {currentPage}</span>

  <button
    disabled={!nextPage}
    onClick={() => fetchUsers(currentPage + 1)}
  >
    Next ➡
  </button>
</div>}

      </div>
    </div>
  );
}
