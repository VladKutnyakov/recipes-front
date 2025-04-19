import '@/assets/styles/reset.css'
import Default from '@/layouts/default'
import { Routes, Route } from 'react-router'
import Home from '@/app/routes/Home/home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Default />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
