import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import PhoneModal from './components/PhoneModal'
import Button from './components/Button'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { increment, setModalOpen, setPhoneNumber } from './store/appSlice'

function App() {
  const dispatch = useAppDispatch()
  const { count, isModalOpen, phoneNumber } = useAppSelector((state) => state.app)

  const handleOpenModal = () => {
    dispatch(setModalOpen(true))
  }

  const handleCloseModal = () => {
    dispatch(setModalOpen(false))
  }

  const handleSavePhone = (phone: string) => {
    dispatch(setPhoneNumber(phone))
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
        <button onClick={() => dispatch(increment())}>
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
