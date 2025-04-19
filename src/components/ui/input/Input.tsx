import { HTMLInputTypeAttribute } from 'react'
import styles from './Input.module.css'

interface Props {
  type?: HTMLInputTypeAttribute,
}

function Input (props: Props) {
  return <input className={styles.input} type={props.type} />
}

export default Input