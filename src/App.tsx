import './App.css'
import Login from './components/Auth/Login'
import CardStack from './components/CardStack/CardStack'
import { ThemeProvider } from './components/ThemeProvider'
import useAuth from './hooks/useAuth'
import { UserPrefsProvider } from './lib/UserContext'


function App() {
  const { user } = useAuth()

  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <UserPrefsProvider>
        <main className='flex flex-col overflow-hidden overflow-x-hidden overflow-y-hidden'>
          {!user ?
            <Login />
            :
            <CardStack />
          }
        </main>
      </UserPrefsProvider>
    </ThemeProvider>
  )
}

export default App
