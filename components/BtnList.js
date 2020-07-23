import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import ThemeContext from './ThemeContext'

import 'bootstrap/dist/css/bootstrap.min.css';



const BtnList = (props) => {
  const allData = props.allData
  const series = allData.map( p => p.series);
  const {color} = useContext(ThemeContext);

  const filterPosts = (e) => {
    const who = e.target.name
    if(who === 'reset'){
      props.mainContent(allData)
    } else {
    props.mainContent(allData.filter(p => p.series === who))
    }
  }

  const reset = 
  <li key={'reset'}>
    <div >
    <Button name='reset' color="primary" onClick={(ev) => filterPosts(ev)} className="elevate" style={{ marginBottom: '1rem', width:'300px' }}>reset Content</Button>
    </div>
    </li>
    
  const listItems = series.map((name) =>
  <li key={name.toString()}>
    <div >
    <Button name={name} color="primary" onClick={(ev) => filterPosts(ev)} className="elevate" style={{ marginBottom: '1rem', width:'300px' }}>{name}</Button>
    </div>
    </li>
    );

    listItems.unshift(reset)
    
  return (
    <>
    <style>
      {` ul{list-style-type: none;}
        .elevate:hover{
          box-shadow: ${color.boxShadow};
        }
      `}
      </style>
    <ul>
      {listItems}
    </ul>
    </>
  );
}

export default BtnList;