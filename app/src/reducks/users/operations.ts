import { push } from 'connected-react-router'
import { passwordMaxLength, isValidEmailFormat, isValidRequiredInput } from '../../util/form'
import { auth, firebaseTimestamp } from '../../firebase'
import { users } from '../../firebase/entity/user'
import { signInAction } from './actions'

export const logIn = (email: string, password: string) => {
  return async (dispatch: any) => {
    // validations
    if (!isValidRequiredInput(email, password)) {
      alert('必須項目が未入力です。')
      return false
    }

    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が不正です。もう1度お試しください。')
      return false
    }

    if (password.length < passwordMaxLength) {
      alert('パスワードは6文字以上で入力してください。')
      return false
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then(async (result) => {
        const user = result.user
        if (user) {
          const usersIns = new users()
          const data = (await usersIns.getData(user.uid)).data()
          if (!data) {
            console.info('不整合なデータ取得が行われました。')
            return
          }
          dispatch(
            signInAction({
              isSignedIn: true,
              role: data.role,
              uid: data.uid,
              username: data.username,
            })
          )
          dispatch(push('/'))
        }
      })
      .catch((error) => {
        alert('ログインに失敗しました。もう1度お試しください。')
        throw new Error(error)
      })
  }
}

export const signUp = (username: string, email: string, password: string, confirmPassword: string) => {
  return async (dispatch: any) => {
    // validations
    if (!isValidRequiredInput(username, email, password, confirmPassword)) {
      alert('必須項目が未入力です。')
      return false
    }

    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が不正です。もう1度お試しください。')
      return false
    }

    if (password !== confirmPassword) {
      alert('パスワードが一致しません。もう1度お試しください。')
      return false
    }

    if (password.length < passwordMaxLength) {
      alert('パスワードは6文字以上で入力してください。')
      return false
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        const user = result.user
        if (user) {
          const uid = user.uid
          const timestamp = firebaseTimestamp.now()

          const usersIns = new users()
          await usersIns.create(uid, {
            uid: uid,
            customerId: '',
            paymentMethodId: '',
            username: username,
            email: email,
            role: 'customer',
            createdAt: timestamp,
            updatedAt: timestamp,
          })

          dispatch(push('/'))
        }
      })
      .catch((error) => {
        alert('アカウント登録に失敗しました。もう1度お試しください。')
        throw new Error(error)
      })
  }
}
