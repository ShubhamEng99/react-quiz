import React from 'react'

const Progress = ({index,numQuestions,points,total,answer}) => {
  return (
    <header className='progress'>
        <progress max={numQuestions} value={index + Number(answer!==null)}></progress>
       <p>Question <strong>{index+1}</strong> / {numQuestions}</p>
       <p>points {points}/{total}</p>
    </header>
  )
}

export default Progress
