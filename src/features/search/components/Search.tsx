import { useState } from 'react'
import styles from '../assets/Search.module.css'

function Search () {

  const [searchStr, setSearchStr] = useState('')

  function Dropdown () {
    const items = ['Вариант 1', 'Вариант 2', 'Вариант 3']

    function DropdownItem ({ item }: { item: string }) {
      return <li className={styles['dropdown-list__item']}>{ item }</li>
    }

    return <>
      <div className={styles['search__dropdown']}>
      {
        items.length > 0
        ? <ul className={styles['dropdown-list']}>
            { items.map(item => <DropdownItem item={item} />) }
          </ul>
        : <div>Пусто</div>
      }
      </div>
    </>
  }

  return <>
    <div className={styles['search']}>
      <div className={styles['search__input-wrapper']}>
        <input className={styles['search__input']} onChange={event => setSearchStr(event.currentTarget.value)} />
      </div>
      { searchStr && <Dropdown /> }
    </div>
  </>
}

export default Search