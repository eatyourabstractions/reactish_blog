import React, { useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button } from 'reactstrap';
import { useState } from 'react';

import ThemeContext from './ThemeContext';

import { useRouter } from 'next/router'


const Layout = (props) => {
  
  const context = useContext(ThemeContext);
  const [color, setColor] = useState('#ffffff');
  const router = useRouter()
  const curr_path = router.pathname.split('/').pop()
  const display_home_btn = curr_path === 'front' ? 'hidden' : 'visible';
  const neuOne = {
    background: '#ffffff',
    boxShadow:  '11px 11px 0px #000000',
    titleColor: '#000000'
  };
  const neuTwo = {
    background: '#000000',
    boxShadow:  '11px 11px 0px #ffffff',
    titleColor: '#ffffff'
  };
  const [theme, setTheme] = useState(neuOne)
  
  //const ThemeContext = React.createContext(theme.boxShadow);

  const toggleColor = () =>{
   let nextToggle = color === '#ffffff'? '#000000' : '#ffffff';
   let neuTheme = color === '#ffffff'? neuTwo : neuOne;
   context.setColor(neuTheme);
   setColor(nextToggle);
   setTheme(neuTheme);
  }
  const backHome = () =>{
    router.push('/front')
  }
  return (
    <>
    <style>
      {`body { background-color: ${color};}
      .blog_title {font-size: 75px; color: white; };
      .profile {display: inline};
      `}
      </style>

    <Container > 
      <Row style={{background: 'black', paddingTop: '50px', borderRadius: '25px', ...theme}}>
      
        <Col md="12" className="d-flex justify-content-between">
          <div className="profile">
          <img src="/images/mike_profile.jpg" style={{borderRadius: '50%', width: '100px', height:'100px'}}/> 
          Michael Matos
          </div>
        <Button color="primary" onClick={toggleColor}>theme btn</Button>
        </Col>
        <Col md="12" style={{ height: '140px' }}>
          <h1 className="blog_title" style={{color: theme.titleColor}}>Eat your abstractions</h1>
          
          </Col>
      </Row>

      <Row  style={{background: color, paddingTop: '10px'}} className="mt-5">
        <Col md="12" >
    
       
          {props.children}
      
      

        </Col>
        
      </Row>
   
    </Container>
    </>
  
  );
}

export default Layout;
