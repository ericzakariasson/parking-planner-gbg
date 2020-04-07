import * as React from "react"

type HtmlInputProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "id" | "value" | "placeholder"
>

interface InputProps extends HtmlInputProps {
  onChange: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputProps> = ({ onChange, ...props }) => {
  return (
    <input
      className="block bg-white shadow border rounded leading-tight py-3 px-3 w-full appearance-none focus:outline-none focus:shadow-outline"
      onChange={e => onChange(e.target.value, e)}
      {...props}
    />
  )
}
