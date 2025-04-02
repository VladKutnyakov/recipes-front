import Search from "@/features/search/components/Search"
import styles from './Header.module.css'

function Header () {
  return <>
    <header className={styles.header}>
      <Search />
    </header>
  </>
}

export default Header