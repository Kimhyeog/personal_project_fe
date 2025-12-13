// src/lib/schemas.js
import { z } from 'zod'

// 1. 로그인 스키마
export const loginSchema = z.object({
  userId: z.string().min(1, { message: '아이디를 입력해주세요.' }),
  password: z.string().min(1, { message: '비밀번호를 입력하세요.' }),
})

// 2. [공통] 기본 필드 정의 (Refine 없이 객체만 정의)
// .refine()을 여기서 붙이지 않고, 변수 분리
const baseSignupObject = z.object({
  nickname: z
    .string()
    .min(2, { message: '닉네임은 2글자 이상이어야 합니다.' })
    .max(10, { message: '닉네임은 10글자 이하여야 합니다.' }),

  userId: z
    .string()
    .min(4, { message: '아이디는 4글자 이상이어야 합니다.' })
    .max(20, { message: '아이디는 20글자 이하여야 합니다.' })
    .regex(/^[a-zA-Z0-9]+$/, { message: '영문자와 숫자만 입력 가능합니다.' }),

  password: z
    .string()
    .min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
    .regex(/[a-zA-Z]/, { message: '영문자를 포함해야 합니다.' })
    .regex(/[0-9]/, { message: '숫자를 포함해야 합니다.' }),

  confirmPassword: z.string(),

  blogName: z.string().min(1, { message: '블로그 이름을 입력해주세요.' }),
  blogSlug: z
    .string()
    .min(4, { message: '블로그 주소는 4글자 이상이어야 합니다.' })
    .regex(/^[a-z0-9-]+$/, {
      message: '영문 소문자, 숫자, 하이픈(-)만 사용 가능합니다.',
    }),
})

// 3. [서버/기본용] 스키마 생성 (여기서 비밀번호 확인 refine 추가)
export const signupSchema = baseSignupObject.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  },
)

// 4. [클라이언트 폼용] 스키마 생성 (Base를 확장 후 refine 추가)
export const signupFormSchema = baseSignupObject
  .extend({
    userId: z
      .string()
      .min(4, { message: '아이디는 4글자 이상이여야 한다.' })
      .regex(/^[a-zA-Z0-9]+$/, { message: '영문자와 숫자만 입력 가능합니다.' })
      .refine(
        async (userId) => {
          // [수정 포인트 1] 형식이 맞지 않으면 중복체크를 '통과(true)' 시켜야 합니다.
          // 이유: 여기서 false를 리턴하면 "4글자 이상이어야 합니다" 에러 대신
          // "이미 사용 중인 아이디입니다"라는 엉뚱한 에러 메시지가 우선순위를 덮어버릴 수 있습니다.
          if (userId.length < 4 || !/^[a-zA-Z0-9]+$/.test(userId)) {
            return true // "중복 아님(통과)"으로 처리 -> 앞선 .min, .regex 에러가 표시됨
          }

          // [수정 포인트 2] 테스트를 위해 특정 아이디는 '중복(false)'으로 처리해봐야 합니다.
          await new Promise((resolve) => setTimeout(resolve, 500))

          // 예: 'admin'이나 'test1234'라고 치면 중복 에러가 뜨도록 설정
          const isDuplicate = ['admin', 'test1234'].includes(userId)

          return !isDuplicate // 중복이면 false(에러), 아니면 true(통과)
        },
        { message: '이미 사용 중인 아이디입니다.' },
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })
