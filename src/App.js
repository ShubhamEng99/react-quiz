import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from './StartScreen';
import Question from './Question';
import NextQuestion from './NextQuestion';
import Progress from './Progress';
const initialState={
  questions:[],
  status:'loading',
  index:0,
  answer:null,
  points:0
};
function reducer(state,action){
   switch (action.type) {
    case "dataReceived":
      return {...state,questions:action.payload,status:"ready"}
    case "dataFailed":
      return {...state,status:"error"}  
    case "start":
      return {...state,status:"active"} 
    case "nextQuestion":
      return{...state,index:state.index+1,answer:null}  
    case "newAnswer":
      const question=state.questions.at(state.index)
      return {...state,answer:action.payload,
      points:question.correctOption === action.payload ? state.points+question.points : state.points
      }       
    default:
     throw new Error("unknown action");
   }
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  const {questions,status,index,answer,points}=state;
  const numQuestions=questions.length
  const total=questions.reduce((acc,el)=>acc+el.points,0)
  useEffect(()=>{
     fetch("http://localhost:8080/questions")
     .then(res=>res.json()
     .then(data=>dispatch({type:"dataReceived",payload:data})))
     .catch(err=>{throw new Error(err)})
  },[])
  return (
  <div className='app'>
    <Header />
    <Main>
     {status ==="loading" && <Loader />}
     {status ==="error" && <Error />}
     {status ==="ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch}  />}
     {status ==="active" && <>
     <Progress numQuestions={numQuestions} index={index} points={points} total={total} answer={answer}/>
     <Question question={questions[index]} dispatch={dispatch} answer={answer} /></>
  }
     <NextQuestion dispatch={dispatch} answer={answer} />
    </Main>
  </div>
  );
}

export default App;
