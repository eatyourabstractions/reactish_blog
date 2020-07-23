import '../styles/global.css'


import ThemeContext from '../components/ThemeContext';
import { useState } from 'react';
export default function App({ Component, pageProps }) {
  const init = {
    background: '#ffffff',
    boxShadow:  '11px 11px 0px #000000',
    titleColor: '#000000'
  }
  const [color, setColor] = useState(init)
    return( 
    <ThemeContext.Provider value={{color, setColor}} >
      <Component {...pageProps} /> 
    </ThemeContext.Provider>
    )
  }
  

/*
import App from 'next/app';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeContext.Provider value="#ff6347">
        <Component {...pageProps} />
      </ThemeContext.Provider>
    );
  }
}

export default MyApp;
*/