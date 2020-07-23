import React from 'react'
import Toc from 'react-auto-toc'
 
const ToContent = () => {
    const content = '# test \n your markdown Content # test2\n ## test3\n #### test4 \n';

  return (
     <Toc markdownText={content} />
  )
}

export default ToContent;