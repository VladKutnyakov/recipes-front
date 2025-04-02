import { useState } from 'react'
import styles from '../assets/Search.module.css'

function Search () {
  const [searchStr, setSearchStr] = useState('')
  const [isShowDropdown, setIsShowDropdown] = useState(false)

  function search (item: string) {
    setSearchStr(item)
  }

  function Dropdown () {
    const items = ['Вариант 1', 'Вариант 2', 'Вариант 3']

    function DropdownItem ({ item }: { item: string }) {
      return <>
        <li
          className={styles['dropdown-list__item']}
          onClick={() => { search(item) }}
        >
          { item }
        </li>
      </>
    }

    return <>
      <div className={styles.search__dropdown}>
        {
          items.length > 0
            ? <ul className={styles['dropdown-list']}>
              { items.map(item => <DropdownItem item={item} key={item} />) }
            </ul>
            : <div>Пусто</div>
        }
      </div>
    </>
  }

  return <>
    <div className={styles.search}>
      <div className={styles['search__input-wrapper']}>
        <input
          className={styles.search__input}
          value={searchStr}
          onChange={event => { setSearchStr(event.currentTarget.value) }}
          onFocus={() => { setIsShowDropdown(true) }}
        />
      </div>
      { isShowDropdown && searchStr && <Dropdown /> }
    </div>
  </>
}

export default Search