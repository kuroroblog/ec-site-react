import { userTypes } from './types'

export const LOG_IN = 'LOG_IN'
export const logInAction = (
  userState: userTypes
): {
  type: string
  payload: userTypes
} => {
  return {
    type: LOG_IN,
    payload: userState,
  }
}

export const LOG_OUT = 'LOG_OUT'
export const logOutAction = (
  userState: userTypes
): {
  type: string
  payload: userTypes
} => {
  return {
    type: LOG_OUT,
    payload: userState,
  }
}
