import { useState } from 'react';
import axios from "axios";

export function AddUserModal({ onUserAdded, onClose }: { onUserAdded: () => void, onClose: () => void }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e: any) {
        e.preventDefault();
        setError("");

        const response = await axios.post('http://localhost:8000/user-front/add', {
            name,
            email,
            password,
        });

        if (response.status === 201) {
            onUserAdded();  
            onClose();
            setName("");
            setEmail("");
            setPassword("");
        } else {
            setError("Failed to add user");
        }
    }

    return (
      <div className="modal">
      <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Add User</h2>
          <form onSubmit={handleSubmit}>
              <div>
                  <input
                      type="text"
                      className='form-input'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                  />
              </div>
              <div>
                  <input
                      type="text"
                      className='form-input'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                  />
              </div>
              <div>
                  <input
                      type="text"
                      className='form-input'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                  />
              </div>
              <button type="submit">Submit</button>
              {error && <div className="error">{error}</div>}
          </form>
      </div>
      </div>
    );
}
