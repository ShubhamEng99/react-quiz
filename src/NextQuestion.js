import React from 'react'

const NextQuestion = ({dispatch,answer}) => {
    if(answer === null){
        return null
    }
  return (
    <button className='btn btn-ui' onClick={()=>dispatch({type:"nextQuestion"})}>Next</button>
  )
}

export default NextQuestion
