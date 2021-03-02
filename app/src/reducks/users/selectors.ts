import { createSelector } from 'reselect'

const usersSelector = (state: any) => state.users

export const getIsLogIn = createSelector(usersSelector, (state: any) => state.isLogIn)
export const getUserId = createSelector(usersSelector, (state: any) => state.uid)
export const getUsername = createSelector(usersSelector, (state: any) => state.username)
