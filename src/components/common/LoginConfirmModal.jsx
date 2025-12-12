'use client'

import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useModalStore } from '@/stores/useModalStore'

export default function LoginConfirmModal() {
  const { isOpen, closeModal } = useModalStore()

  return (
    <Dialog.Root open={isOpen} onOpenChange={closeModal}>
      {/* 1. Portal: body 태그로 순간이동 */}
      <Dialog.Portal>
        {/* 2. Overlay: 뒷배경 (애니메이션 제거함) */}
        {/* z-index 50, 검은색 50% 투명도 */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />

        {/* 3. Content: 하얀 박스 (애니메이션 제거함) */}
        {/* 화면 정중앙 배치: top-1/2 left-1/2 -translate... */}
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
          {/* 4. 필수 접근성 태그 */}
          <Dialog.Title className="text-lg font-bold">로그인이 필요합니다</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-500">
            로그인 페이지로 이동하시겠습니까?
          </Dialog.Description>

          {/* 버튼 영역 */}
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={closeModal}>
              취소
            </Button>
            <Link href="/login" passHref>
              {/* Link 내부 클릭 시 모달 닫히게 처리 */}
              <Button size="sm" onClick={closeModal}>
                로그인하러 가기
              </Button>
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
