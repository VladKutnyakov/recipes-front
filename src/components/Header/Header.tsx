import Search from "../Search/Search"
import styles from './header.module.css'

function Header () {
  return <>
    <header className={styles['header']}>
      <Search />
    </header>
  </>
}

export default Header