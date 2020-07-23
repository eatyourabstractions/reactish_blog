import Layout from '../components/layout'
import Link from 'next/link'
import Date from '../components/date'
import { getSortedPostsData } from '../lib/posts'
import React, { useContext, useState } from 'react';
import ThemeContext from '../components/ThemeContext'
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import BtnList from '../components/BtnList'
// 11px 11px 22px #bebec9, -11px -11px 22px #ffffff
 const Hogar = props => {
  const [showThesePosts, setPosts]= useState(props.allPostsData)
 
  const {color} = useContext(ThemeContext);
    return (
       <>
        <Layout>
          <style>
            {`.neumorph:hover {
                padding: 10px;
                border-radius: 25px;
                border: 1px solid ${color.titleColor};
                background-color: ${color.background};
                box-shadow: ${color.boxShadow}; 
                ul {
                  list-style-type: none;
              }
                
                `}
          </style>
 
        <Container>
          <Row>
          <Col md="8">
            <ul >
          {showThesePosts.map(({ id, date, title }) => (
            <li  key={id} style={{fontSize: '2em', paddingBottom: '30px', marginBottom: '10px'}} className="neumorph">
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
        <Col md="4">
          <BtnList allData={props.allPostsData} mainContent={setPosts}/>

        </Col>
        </Row>

        </Container>
        </Layout>
        </>
    )
}

export default Hogar;

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
      props: {
        allPostsData
      }
    }
  }