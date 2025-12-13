import React from 'react'

const AuthErrortextBox = ({ error }) => {
  if (!error) return null

  return (
    <div className="col-span-9">
      {errors.blogSlug && <p className="text-xs text-red-500">{errors.blogSlug.message}</p>}
    </div>
  )
}

export default AuthErrortextBox
