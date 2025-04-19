import styles from './default.module.css'
// import Header from '@/components/header/Header'
import { Outlet } from 'react-router'

function DefaultLayout () {
  return (
    <div className={styles.main}>
      {/* <Header /> */}
      <Outlet />
    </div>
  )
}

export default DefaultLayout
