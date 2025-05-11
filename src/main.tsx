import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import '@radix-ui/themes/styles.css'
import App from '@/app/App'
import { Theme } from '@radix-ui/themes'

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <BrowserRouter>
      <Theme>
        <App />
      </Theme>
    </BrowserRouter>
  )
}
