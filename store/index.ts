export const state = () => ({
  loggedIn: false,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken')
})

export type RootState = ReturnType<typeof state>
