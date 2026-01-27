import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/Button'
import PhoneModal from './components/PhoneModal'

function App() {
  const [count, setCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSavePhone = (phone: string) => {
    setPhoneNumber(phone)
  }

  return (
    <>
      <div>
        <Button onClick={handleOpenModal}>Open Phone Modal</Button>
        {phoneNumber && (
          <div style={{ marginTop: '10px', fontSize: '18px', color: '#333' }}>
            Phone Number: {phoneNumber}
          </div>
        )}
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <PhoneModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSavePhone}
        currentPhoneNumber={phoneNumber}
      />
    </>
  )
}

export default App
