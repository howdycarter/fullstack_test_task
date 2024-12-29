import { useEffect, useState } from 'react'
import './App.css'
import { IUser } from './models'

import axios from "axios"
import { Loader } from './components/Loader'
import { User } from './components/User'
import { AddUserModal } from './components/AddUserModal'

function App() {
 
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [newUserOpen, setNewUserOpen] = useState(false)
  async function getUsers() {
      setLoading(true)
      const response = await axios.get<IUser[]>('http://localhost:8000/user-front/get-all')
      setUsers(response.data)
      setLoading(false)
  }
  async function getUsersByName(name: any) {

      setLoading(true)
      const response = await axios.get<IUser[]>(`http://localhost:8000/user-front/get-by-name?name=${name}`)
      setUsers(response.data)
      setLoading(false)
  }
  useEffect(() => {
      getUsers()
  }, [])
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
      const onScroll = (e: any) => {
          setScrollTop(e.target.documentElement.scrollTop);
      };
      window.addEventListener('scroll', onScroll)
  },[scrollTop]);

  return (
      <div  className=' flex flex-wrap'>
          {loading && <Loader/>}
          <div>{scrollTop}</div>
          {<div style={{width: "100%", textAlign: "center"}}><input
              style={{width: "300px",marginTop: "50px", height: "30px", background: "#ececec"}} value={name} onChange={(e) => {
              setName(e.target.value)

              getUsersByName(e.target.value)
          }}></input>
          <button onClick={() => setNewUserOpen(true)} style={{ marginLeft: '20px' }}>Add New User</button>
          </div>}
          <div className='items-container'>
            {users.map(user => <User user={user} key={user.id}/>)}
          </div>
          {newUserOpen && <AddUserModal onUserAdded={() => getUsers()} onClose={() => setNewUserOpen(false)}/>}
      </div>
  );
}

export default App
