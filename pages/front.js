import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button } from 'reactstrap';
import { useState } from 'react';
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { useRouter } from 'next/router'

const Example = ({allPostsData}) => {
  const [color, setColor] = useState('lightgreen');
  const router = useRouter()
  const curr_path = router.pathname.split('/').pop()
  const display_home_btn = curr_path === 'front' ? 'hidden' : 'visible';
  const toggleColor = () =>{
    console.log(color)
   let nextToggle = color === 'lightblue'? 'lightgreen' : 'lightblue';
   setColor(nextToggle)
  }
  return (
    <>
    <style>
      {`body { background-color: ${color};}
      .blog_title {font-size: 75px; color: white; };
 
      `}
      </style>

    <Container > 
      <Row style={{background: 'black', paddingTop: '20px'}}>
        <Col md="12" className="d-flex justify-content-between">
        <Button color="secondary" style={{visibility: display_home_btn}}>back to home</Button>
        <Button color="primary" onClick={toggleColor}>theme btn</Button>

        </Col>
      </Row>
      <Row style={{background: color, height: '140px' }}>
        <Col md="12">
          <h1 className="blog_title">Eat your abstractions</h1>
          
          </Col>
      </Row>
      <Row  style={{background: color}}>
        <Col md="12" >

        <ul >
          {allPostsData.map(({ id, date, title }) => (
            <li  key={id} style={{fontSize: '2em', paddingBottom: '30px'}}>
            <Link href="/posts/[id]" as={`/posts/${id}`} >
              <a>{title}</a>
            </Link>
            <br />
            <small style={{fontSize:'20px'}}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>

        </Col>
        
      </Row>
   
    </Container>
    </>
  
  );
}

export default Example;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}