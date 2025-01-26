import '@/assets/styles/reset.css'
import Default from '@/layouts/default'
import { Routes, Route } from 'react-router'
import Home from '@/app/routes/Home/home'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Default />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
