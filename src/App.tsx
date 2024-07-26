import './App.css'
import CardStack from './components/CardStack/CardStack'
import { ThemeProvider } from './components/ThemeProvider'

function App() {

  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <main className='flex flex-col overflow-hidden overflow-x-hidden overflow-y-hidden'>
        {/* <Logo /> */}
        <CardStack />
      </main>
    </ThemeProvider>
  )
}

export default App
