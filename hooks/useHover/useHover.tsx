import React from "react"

const useHover = ({ delay = 0 }) => {
    const [isHovering, setIsHovering] = React.useState(false)
    const timeoutRef = React.useRef<NodeJS.Timeout>()
  
    const hoverProps = React.useMemo(() => ({
      onMouseEnter: () => {
        timeoutRef.current = setTimeout(() => setIsHovering(true), delay)
      },
      onMouseLeave: () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        setIsHovering(false)
      }
    }), [delay])
  
    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }, [])
  
    return { isHovering, hoverProps }
  }

  export default useHover