import './App.css'
import CardStack from './components/CardStack/CardStack'
import Logo from './components/Logo'
import { ThemeProvider } from './components/ThemeProvider'
import { Button } from './components/ui/button'

function App() {

  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <main className='flex flex-col overflow-hidden'>
        {/* <Logo /> */}
        <CardStack />
      </main>
    </ThemeProvider>
  )
}

export default App
