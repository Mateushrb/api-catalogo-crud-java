import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Styles from './Styles/Main/App.module.scss'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import MainContent from './components/Pages/MainContent/MainContent'
import GestaoContent from './components/Pages/Gestao/GestaoContent'
import EstoqueContent from './components/Pages/Estoque/EstoqueContent'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <BrowserRouter>
      <div className={Styles.Container}>
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/gestao" element={<GestaoContent />} />
          <Route path="/estoque" element={<EstoqueContent />} />
        </Routes>
        <Footer className={Styles.Container__footer} />
      </div>
      </BrowserRouter>
    </>
  )
}

export default App