import React from 'react'
import styles from './Button.module.css'

interface Props {
  children?: React.ReactNode,
  onClick?: React.EventHandler<React.MouseEvent>
}

function Button ({ children, onClick }: Props) {
  return <button className={styles.button} onClick={onClick}>{ children }</button>
}

export default Button