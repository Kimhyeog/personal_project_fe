import clsx from 'clsx'

const SignInputBox = ({
  label,
  register,
  name,
  error,
  type = 'text',
  placeholder,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={clsx(`grid grid-cols-12 items-center border border-gray-300 px-4 py-3`, className)}
    >
      <div className="col-span-3 text-sm text-gray-700">{label}</div>
      <div className="col-span-9 text-sm text-gray-500">
        <Input type={type} placeholder={placeholder} {...register(name)} {...props} />
        {error && <p className="m-1 text-xs text-red-500">{error.message}</p>}
        {children}
      </div>
    </div>
  )
}

export default SignInputBox
