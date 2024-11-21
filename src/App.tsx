import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import styled from 'styled-components'
import Navbar from './components/Navbar'
import Testimonials from './pages/Testimonials'
import Calendar from './pages/Calendar'
import Footer from './components/Footer'

function App() {
  const PAGES = [
    { key: 'calendar', value: 'Calendar', href: '/' },
    { key: 'about', value: "About", href: '/about' },
    { key: 'recordings', value: "Recordings", href: '/recordings' },
    { key: 'contact', value: "Contact", href: '/contact' }
  ]

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [page, setPage] = useState('home');

  return (
    <StyledContainer>
      <Navbar pages={PAGES} width={width}/>
      <Testimonials width={width} />
      <Calendar/>
      <Footer />
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  min-height: 100dvh;
  background-color: #f4f4f5;
`

export default App
