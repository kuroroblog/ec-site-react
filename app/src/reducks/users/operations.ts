import { push } from 'connected-react-router'
import { passwordMaxLength, isValidEmailFormat, isValidRequiredInput } from '../../util/form'
import { auth, firebaseTimestamp } from '../../firebase'
import { users } from '../../firebase/entity/user'
import { logInAction, logOutAction } from './actions'

export const listenAuthState = () => {
  return async (dispatch: any) => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        await firebaseAuthLogin(user, dispatch)
      } else {
        dispatch(push('/login'))
      }
    })
  }
}

export const firebaseAuthLogin = async (user: any, dispatch: any): Promise<void> => {
  if (user) {
    const usersIns = new users()
    const data = (await usersIns.getData(user.uid)).data()
    if (!data) {
      console.info('不整合なデータ取得が行われました。')
      return
    }
    dispatch(
      logInAction({
        isLogIn: true,
        role: data.role,
        uid: data.uid,
        username: data.username,
      })
    )
  }
}

export const logIn = (email: string, password: string) => {
  return async (dispatch: any) => {
    // validations
    if (!isValidRequiredInput(email, password)) {
      alert('必須項目が未入力です。')
      return false
    }

    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が不正です。')
      return false
    }

    if (password.length < passwordMaxLength) {
      alert('パスワードは6文字以上で入力してください。')
      return false
    }

    await auth.signInWithEmailAndPassword(email, password).catch((error) => {
      /**
       * @todo ログインに失敗した場合の処理を行う。
       * @todo email,
       */
      alert('ログインに失敗しました。もう1度お試しください。')
      throw new Error(error)
    })
    dispatch(push('/'))
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
      alert('メールアドレスの形式が不正です。')
      return false
    }

    if (password !== confirmPassword) {
      alert('パスワードと確認用パスワードが一致しません。')
      return false
    }

    if (password.length < passwordMaxLength) {
      alert('パスワードは6文字以上で入力してください。')
      return false
    }

    const result = await auth.createUserWithEmailAndPassword(email, password).catch((error) => {
      /**
       * @todo アカウント登録に失敗した場合の処理を行う。
       * @todo アカウント重複
       */
      alert('アカウント登録に失敗しました。もう1度お試しください。')
      throw new Error(error)
    })

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

      dispatch(push('/login'))
    }
  }
}

export const logOut = () => {
  return async (dispatch: any) => {
    await auth.signOut()
    dispatch(
      logOutAction({
        isLogIn: false,
        role: '',
        uid: '',
        username: '',
      })
    )
    dispatch(push('/login'))
  }
}

export const resetPassword = (email: string) => {
  return async (dispatch: any) => {
    // validations
    if (!isValidRequiredInput(email)) {
      alert('必須項目が未入力です。')
      return false
    }
    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が不正です。')
      return false
    }
    await auth.sendPasswordResetEmail(email).catch(() => {
      alert('パスワードリセットに失敗しました。通信環境が適切な場所にて再度実行ください。')
    })
    alert('入力されたメールアドレスへリセット用パスワードのメールを送信しました。')
    dispatch(push('/login'))
  }
}
