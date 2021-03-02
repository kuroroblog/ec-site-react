import { useSelector, useDispatch } from 'react-redux'
import { getUsername, getUserId } from '../reducks/users/selectors'
import { logOut } from '../reducks/users/operations'

const Home = () => {
  const selector = useSelector((state) => state)
  const username = getUsername(selector)
  const userId = getUserId(selector)
  const dispatch = useDispatch()
  return (
    <div>
      <h2>Home</h2>
      <p>{username}</p>
      <p>{userId}</p>
      <button onClick={() => dispatch(logOut())}>ボタン</button>
    </div>
  )
}

export default Home
