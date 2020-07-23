import React from 'react'
import Sidebar from '../components/sidebar'
import '../styles/Sidebar.css'
import ToContent from './tocexample'
 
const SideTest = () => {

    console.log(typeof ToContent)
    return (
        <Sidebar items={ToContent} />
        )
}

export default SideTest;