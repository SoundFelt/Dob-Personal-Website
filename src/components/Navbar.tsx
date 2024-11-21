import NameBackground from '../assets/nameBackground.png';
import MobileNameBackground from '../assets/nameBackgroundMobile.png';
import Logo from '../assets/logo.png';
import LogoWhiteLeft from '../assets/logoWhiteLeft.png';
import styled from 'styled-components'
import { MdLibraryMusic } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Spin as Hamburger } from 'hamburger-react'

const Navbar = ({ pages, width }: { pages: { key: string, value: string, href: string }[], width: number }) => {
    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [pixelsFromTop, setPixelsFromTop] = useState(0);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [mobileMenuOpen])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80 || window.innerWidth < 1200) {
                setPixelsFromTop(window.scrollY);
            } else {
                setPixelsFromTop(0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            // Clean up the event listener on component unmount
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); 

  return (
    <div>
        <img src={width >= 768 ? NameBackground : MobileNameBackground} alt="Name background" style={{ width: '100%'}} />
        {/* <img src={Dob2} style={{ position: 'absolute', top: 0, width: '100%', height: '100%', opacity: 0.1, zIndex: 20}}/> */}
        <StyledNavbarContainer pixelsFromTop={pixelsFromTop}>
            <StyledNavbar mobileMenuOpen={mobileMenuOpen}>
                { !mobileMenuOpen ? <img src={Logo} alt="Logo" style={{ height: width >= 620 ? '50px' : '35px', cursor: 'pointer' }} onClick={() => navigate('/') } /> : <div/>}
                <div style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    { width >= 768 ? (
                        <>
                            { pages.map(page => (
                                <StyledPageLink key={page.key} href={page.href}>{page.value.toUpperCase()}</StyledPageLink>
                            ))}
                            <CTAButton>
                                Listen
                                <MdLibraryMusic style={{ marginLeft: '5px', fontSize: '18px' }} />
                            </CTAButton>
                          </>
                    ) : (
                        <>
                            <div/>
                            <Hamburger distance="sm" size={30} color={mobileMenuOpen ? 'white' : 'black'} toggled={mobileMenuOpen} toggle={setMobileMenuOpen}  />
                        </>
                    )}
                </div>
            </StyledNavbar>
        </StyledNavbarContainer>
          {mobileMenuOpen && (
              <MobileMenuContainer pixelsFromTop={pixelsFromTop}>
                  <img src={LogoWhiteLeft} alt="Logo" style={{ height: '55px', }} onClick={() => navigate('/')} />
                  <div style={{ width: '150px', margin: '10px 0 30px', height: '0.5px', backgroundColor: 'rgb(230,230,230)'}}/>
                  <div style={{ display: 'flex', height: '60%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
                    {pages.map(page => (
                        <StyledMobilePageLink key={page.key} href={page.href}>{page.value.toUpperCase()}</StyledMobilePageLink>
                    ))}
                    <CTAButton>
                        Listen
                        <MdLibraryMusic style={{ marginLeft: '5px', fontSize: '18px' }} />
                    </CTAButton>  
                  </div>
              </MobileMenuContainer>
          )}
    </div>
  )
}

const StyledNavbarContainer = styled.div<{ pixelsFromTop: number }>`
    maxWidth: 900px;
    min-height: 50px;
    position: ${({pixelsFromTop}) => pixelsFromTop > 80 ? 'fixed' : 'absolute'};
    display: flex;
    justify-content: center;
    left: 10px;
    right: 10px;
    top: ${({pixelsFromTop}) => pixelsFromTop > 80 ? '8px' : '90px'};
    z-index: 5;
    margin: 0 auto;
    @media (max-width: 1200px) {
        top: 10px;
        position: fixed;
    }
    @media (max-width: 400px) {
        height: 45px;
    }
`

const StyledNavbar = styled.div<{ mobileMenuOpen?: boolean }>`
    opacity: 0.97;
    border-radius: 50px;
    display: flex;
    width: 900px;
    justify-content: space-between;
    align-items: center;
    box-shadow: ${({ mobileMenuOpen }) => mobileMenuOpen ? '' : '7.9px 15.8px 15.8px hsl(0deg 0% 0% / 0.25)'};
    background-color: ${({ mobileMenuOpen }) => mobileMenuOpen ? 'transparent' : 'rgb(250, 250, 250)'};
    border: ${({ mobileMenuOpen }) => mobileMenuOpen ? '' : '1px solid rgb(200, 200, 200)'};
    padding: 10px 25px;
    @media (max-width: 768px) {
        opacity: 0.9;
    }
`

const StyledPageLink = styled.a`
    text-decoration: none !important;
    color: rgb(150, 150, 150);
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    &:hover {
        color: rgb(0, 0, 0);
    }    
`

const MobileMenuContainer = styled.div<{ pixelsFromTop: number }>`
    display: flex;
    z-index: 3;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: ${({pixelsFromTop}) => `${pixelsFromTop}px`};
    height: 100dvh;
    width: 100dvw;
    transition: 0.3s all;
    background-color: rgba(0, 0, 0, 0.7);
    overflow-y: hidden;
`
const StyledMobilePageLink = styled.a`
    text-decoration: none !important;
    color: rgb(245, 245, 245);
    font-size: 24px;
    font-weight: 400;
    cursor: pointer;
`

export const CTAButton = styled.div`
    border: 1.5px solid black;
    background-color: rgb(240, 240, 240);
    padding: 5px 20px 8px;
    display: flex;
    font-weight: 500;
    align-items: center;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        background-color: rgb(233, 233, 233);
        transform: scale(1.02);
    }
`

export default Navbar