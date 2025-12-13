import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  /* 로그인 담당에서 변수 선언부 */

  // 로그인 유저 정보 변수
  user: null,
  // 로그인 상태 여부
  isAuthenticated: false,

  /* API 응답 함수들 */
  // 로그인 액션 (로그인 api 응답 받는 변수)
  login: (userData) =>
    set({
      user: userData,
      isAuthenticated: true,
    }),
  logout: (userData) =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}))
