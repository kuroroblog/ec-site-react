import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listenAuthState } from './reducks/users/operations'
import { getIsLogIn } from './reducks/users/selectors'

const Auth = ({ children }: any) => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const isLogIn = getIsLogIn(selector)

  // renderした後に再度動作させたいものをcallback関数にて処理するもの。
  useEffect(() => {
    if (!isLogIn) {
      dispatch(listenAuthState())
    }
  }, [])

  if (!isLogIn) {
    // 子要素も返さず、何もしない。render後に副次関数としてuseEffectする。
    return <></>
  } else {
    // そのまま子要素を返す。
    return children
  }
}
export default Auth
