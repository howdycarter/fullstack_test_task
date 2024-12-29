import { IUser } from '../models'

interface UserProps {
  user: IUser
}

export function User(props: UserProps) {

  return(
    <div
      className='card'
    >
      <img style={{ width: '50px', height: '50px' }} src="http://localhost:8000/user-logo.png" alt="" />
      <h2 className='name'>{props.user.name}</h2>
      <p>{props.user.email}</p>
      <p>{props.user.password}</p>
    </div>
  )
}