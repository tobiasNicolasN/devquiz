import { ReactNode } from "react"
import style from '../styles/Button.module.css'

interface IButtonProps {
    onClick?: (() => void | undefined) | undefined
    children?: ReactNode
    disabled?:boolean
    type?: string
}

function Button({children, onClick, disabled}: IButtonProps) {
  return (
    <button className={style.button} onClick={onClick} disabled={disabled}>{children}</button>
  )
}

export default Button