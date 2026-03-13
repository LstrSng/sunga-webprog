import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My React App!</h1>
        <p>
          Name: Lester Sunga<br />
          Email: lstrsng@gmail.com<br />
          Other Personal Info: 
          <a href="https://github.com/LstrSng/sunga-webprog">
            https://github.com/LstrSng/sunga-webprog
          </a>
        </p>
      </header>
    </div>
  )
}

export default App