import './App.css'
import { ThemeProvider } from './components/ThemeProvider'
import { UserPrefsProvider } from './lib/UserContext'
import { RouterProvider } from 'react-router-dom'
import router from './components/Home'
import axios from 'axios'


axios.defaults.withCredentials = true
function App() {


  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <UserPrefsProvider>
        <main className='flex flex-col overflow-hidden overflow-x-hidden overflow-y-hidden'>
          <RouterProvider router={router} />
        </main>
      </UserPrefsProvider>
    </ThemeProvider>
  )
}

export default App
