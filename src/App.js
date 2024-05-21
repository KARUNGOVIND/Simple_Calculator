import React, { useReducer } from 'react'
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import './App.css';

export const ACTIONS={
  ADD_DIGITS :'add_digits',
  CHOOSE_OPERATION :'choose_operation',
  CLEAR :'clear',
  DELETE_DIGIT:'delete',
  EVALUATE:'evaluate'
}
function reducer(state,{type ,payload}){
  switch (type){
    case ACTIONS.ADD_DIGITS:
      if(state.overwrite)return{
        ...state,
        current:payload.digit,
        overwrite:false,
      }
      if(payload.digit=== "0" && state.current ==="0")
        return {
          state
        }
      if(payload.digit=== "." && state.current.includes("."))
        return {
          state
        }
      return{
        ...state,
        current:`${state.current || ""}${payload.digit}`,
      }
    case ACTIONS.CLEAR:
      return{}
    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite)return{
        ...state,
        overwrite:false,
        current:null
      }
      if(state.current==null)return state
      if(state.current.length===1)return{
        ...state,
        current:null,
      }
      return{
        ...state,
        current:state.current.slice(0,-1),
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.current==null && state.previous==null)return state
      if(state.current==null)return{
        ...state,
        operation:payload.operation,
      }
      if(state.previous==null)
        return{
          ...state,
          operation:payload.operation,
          previous:state.current,
          current:null,
        }
      case ACTIONS.EVALUATE:
        if(state.operation==null && state.previous==null && state.current==null)return state
        return{
          ...state,
          overwrite:true,
          operation:null,
          previous:null,
          current:evaluate(state),
        }
      return{
        ...state,
        previous:evaluate(state),
        operation:payload.operation,
        current:null,
      }
  }
  function evaluate({current,previous,operation}){
    const prev=parseFloat(previous)
    const cur=parseFloat(current)
    if(isNaN(cur) || isNaN(prev))return ""
    let computation=""
    switch(operation){
      case "+":
        computation=prev+cur
        break
      case "-":
        computation=prev-cur
        break
      case "*":
        computation=prev*cur
        break
      case "/":
        computation=prev/cur
        break
    }
    return computation.toString()
}



}
const App = () => {
  const [{current,previous,operation},dispatch]=useReducer(reducer,{})
  return (
    <div className='project'>
      <div className='output'> 
        <div className='previous'>{previous}{operation}</div>
        <div className='current'>{current}</div>
      </div>
        <button className='long'onClick={()=> dispatch({type:ACTIONS.DELETE_DIGIT})}>Del</button>
        <button onClick={()=> dispatch({type:ACTIONS.CLEAR})}> C</button>
        <OperationButton operation="+"dispatch={dispatch}/>
        <DigitButton digit="1"dispatch={dispatch}/>
        <DigitButton digit="2"dispatch={dispatch}/>
        <DigitButton digit="3"dispatch={dispatch}/>
        <OperationButton operation="*"dispatch={dispatch}/>
        <DigitButton digit="4"dispatch={dispatch}/>
        <DigitButton digit="5"dispatch={dispatch}/>
        <DigitButton digit="6"dispatch={dispatch}/>
        <OperationButton operation="-"dispatch={dispatch}/>
        <DigitButton digit="7"dispatch={dispatch}/>
        <DigitButton digit="8"dispatch={dispatch}/>
        <DigitButton digit="9"dispatch={dispatch}/>
        <OperationButton operation="/"dispatch={dispatch}/>
        <DigitButton digit="."dispatch={dispatch}/>
        <DigitButton digit="0"dispatch={dispatch}/>
        <button className='long' onClick={()=> dispatch({type:ACTIONS.EVALUATE})}>=</button>
    </div>
  )
}

export default App