export default function AuthLayout({ children }) {
  return (
    // 1. 전체 배경 (화면 꽉 차게, 회색 배경, 내용을 정중앙으로)
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      {/* 2. 내부 컨테이너 (폼의 최대 너비 제한) */}
      <div className="w-full space-y-8">
        {/* (선택 사항) 로고나 타이틀을 여기에 넣으면 두 페이지 모두에 뜹니다 */}
        {/* <div className="text-center font-bold text-2xl">My Blog Service</div> */}

        {/* 3. 실제 페이지 내용 (로그인 폼 or 회원가입 폼)이 들어가는 자리 */}
        {children}
      </div>
    </div>
  )
}
