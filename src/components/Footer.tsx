import React from 'react'
import styled from 'styled-components'
import { FaSquareFacebook } from "react-icons/fa6";
import { SiInstagram } from "react-icons/si";
import { FaSpotify } from "react-icons/fa6";
import { SiApplemusic } from "react-icons/si";
import { Link } from 'react-router-dom';
import Logo from '../assets/logoWhiteLeft.png';
import { useWindowSize } from '../hooks/useWindowSize';

const Footer = () => {
    const windowSize = useWindowSize();

  return (
    <FooterContainer style={{ flexDirection: windowSize.width < 600 ? 'column' : 'row', height: windowSize.width < 600 ? '130px' : '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', padding: '10px' }}>
            <img src={Logo} style={{ width: '80px' }} />
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', fontSize: '15px', margin: '10px 5px 0 0' }}>
                <span style={{ marginRight: '5px'}}>© Dobromir Tsenov 2024.</span>
                <span>All rights reserved.</span>
            </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', paddingTop: '3px'}}>
            <Link to="https://www.facebook.com" target="_blank" rel="noreferrer" >
                <FaSquareFacebook style={{ fontSize: '22px', color: 'rgb(230, 230, 230)', margin: '0 10px', cursor: 'pointer'}} />
            </Link>
            <Link to="https://www.instagram.com" target="_blank" rel="noreferrer">
                <SiInstagram style={{ fontSize: '22px', color: 'rgb(230, 230, 230)', margin: '0 10px', cursor: 'pointer'}} />
            </Link>
            <Link to="https://open.spotify.com" target="_blank" rel="noreferrer">
                <FaSpotify style={{ fontSize: '22px', color: 'rgb(230, 230, 230)', margin: '0 10px', cursor: 'pointer'}} />
            </Link>
            <Link to="https://music.apple.com" target="_blank" rel="noreferrer">
                <SiApplemusic style={{ fontSize: '22px', color: 'rgb(230, 230, 230)', margin: '0 10px', cursor: 'pointer'}} />
            </Link>
        </div>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
    display: flex;
    height: 60px;
    justify-content: space-around;  
    align-items: center;
    background-color: rgb(50, 50, 50);
    color: rgb(230, 230, 230);
    width: 100%;
`
export default Footer