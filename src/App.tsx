import './App.css'
import CardStack from './components/CardStack/CardStack'
import { ThemeProvider } from './components/ThemeProvider'
import { UserPrefsProvider } from './lib/UserContext'

function App() {

  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <UserPrefsProvider>
        <main className='flex flex-col overflow-hidden overflow-x-hidden overflow-y-hidden'>
          {/* <Logo /> */}
          <CardStack />
        </main>
      </UserPrefsProvider>
    </ThemeProvider>
  )
}

export default App
