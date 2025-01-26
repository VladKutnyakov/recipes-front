import '@/assets/styles/reset.css'
import styles from './App.module.css'
import Header from '@/components/Header/Header'

function App() {
  return (
    <>
      <div className={styles['main']}>
        <Header />
      </div>
    </>
  )
}

export default App
