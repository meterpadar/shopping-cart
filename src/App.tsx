import { Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { Store } from './pages/Store'
import { About } from './pages/About'

import { Nav } from './components/Nav'

import { Box } from '@chakra-ui/react'

import { ShoppingCartProvider } from './context/ShoppingCartContext'

function App() {
  return (
    <ShoppingCartProvider>
      <Nav />
      <Box>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/store' element={<Store />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Box>
     
    </ShoppingCartProvider>
  )
}

export default App
