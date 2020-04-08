import * as React from "react"

type ArrowDirection = "up" | "down"

interface IconProps {
  onClick?: () => void
  size?: number
  className?: string
}

interface ArrowIconProps extends IconProps {
  direction: ArrowDirection
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({
  direction,
  onClick,
  className,
  size = 24,
}) => {
  const props = {
    onClick,
    style: {
      height: size,
      width: size,
    },
    className,
  }
  switch (direction) {
    case "up":
      return (
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          {...props}
        >
          <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      )
    case "down":
      return (
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          {...props}
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      )
    default:
      return null
  }
}
