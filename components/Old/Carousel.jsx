import React, { useEffect, useState, useRef, useCallback, useReducer } from 'react'
import styles from './Carousel.module.scss'

const initialState = {
  currentIndex: 0,
  previousIndex: 0,
  nextIndex: 1,
  clockwise: true,
}

const ACTIONS = {
  CURRENT_INDEX: 'current-index',
  PREV_INDEX: 'prev-index',
  ROT_CLOCKWISE: 'rot-clockwise',
  NEXT_INDEX: 'next-index',
  ACTIVE_ACW: 'active-acw',
  IDLE_ACW: 'idlep-acw',
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CURRENT_INDEX:
      return {...state, currentIndex: action.payload} //is active index = to current index? then default
    case ACTIONS.PREV_INDEX:
      return  {...state, previousIndex: state.currentIndex} //previous current index
    case ACTIONS.ROT_CLOCKWISE: //if current index = current index 
      return {...state, clockwise: action.payload}
    case ACTIONS.NEXT_INDEX:
      return {...state, nextIndex: state.previousIndex + 2} //current index + 1
    case ACTIONS.ACTIVE_ACW:
      return state
    case ACTIONS.IDLE_ACW:
      return state
    default:
      return state
  }
}

function Carousel() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const rotRef = useRef();
  const arr = [1, 2, 3, 4, 5, 6];
  
  const nextClick = () => {
    //determine new current index
    const isLastIndex = state.currentIndex === arr.length - 1; //determining if the last index in array is the current index
    const newIndex = isLastIndex ? 0 : state.currentIndex + 1; //if the current index = last index in array, new index = 0, otherwise increase current index by 1 - could be next click action
    
    dispatch({ type: ACTIONS.ROT_CLOCKWISE, payload: true});
    dispatch({ type: ACTIONS.PREV_INDEX}); //update previous index state
    dispatch({ type: ACTIONS.NEXT_INDEX}); //update previous index state
    dispatch({ type: ACTIONS.CURRENT_INDEX, payload: newIndex}); //update the current index state
    console.log('clockwise = ' + state.clockwise)
    //console.log('anticlockwise = ' + state.rotation.antiClockwise)
    //
    //i === currentIndex && !clickedPrev && !clickedSlide || i === currentIndex && clickedSlide ? styles.items__nextout : styles.items
    //activecw = currentindex && nextclick || currentindex && slideclick
  }

  const prevClick = () => {
    const isFirstIndex = state.currentIndex === 0; //first index = 0
    const newIndex = isFirstIndex ? arr.length - 1 : state.currentIndex - 1; //if current index = first index, new index = last index, otherwise decrease current index by 1 - could be prev click action
    
    dispatch({ type: ACTIONS.ROT_CLOCKWISE, payload: false});
    dispatch({ type: ACTIONS.PREV_INDEX});
    dispatch({ type: ACTIONS.NEXT_INDEX});
    dispatch({ type: ACTIONS.CURRENT_INDEX, payload: newIndex});
    console.log('clockwise should be false = ' + state.clockwise)
    //console.log('anticlockwise should be true = ' + state.rotation.antiClockwise)
  }

  const newStyles /*onstatechange*/ = () => {
    //const activecw = arrMap.key === state.currentIndex ? styles.item_|| arrMap.key === state.slideClick

    //i === state.currentIndex ? dispatch activecw (next click)
    //i === state.currentIndex ? dispatch activeacw: null(prev click)
    //i === state.previousIndex ? dispatch idlecw : null (next click)
    //i === state.previousIndex ? dispatch idleacw : 

    //const imgIndex = arrMap.key;
    //switch (imageIndex) {
        //case state.currentIndex:
      //return dispatch({type: "ACTIONS.ACTIVE_CW", payload: imgIndex});
    //}

    //need it to be className: {index: , style: }
  }
  
  const prevIndex = () => {
    
  }

  //const arrMap = arr.map((item, i) => (
      //<><div key={i} ref={rotRef} className={`${i === state.classes ? state.style.activecw : state.style}`} style={{ "--i": item }}>{item}</div></> //could add index as an attribute
  //))

  return (
    <div className='m-auto'>
      <div className='fixed top-0 z-30'>
        <button onClick={prevClick}>back</button>
        <button onClick={nextClick}>next | current index = ({state.currentIndex}) prev index = ({state.previousIndex}) next index = ({state.nextIndex})</button>
        <div className={styles.circle} style={{"--total": 2}}>
          {arr.map((item, i) => {
            return (
              <><div key={i} ref={rotRef} className={
                i === state.currentIndex && state.clockwise ? styles.item__activecw
                : i === state.currentIndex && !state.clockwise ? styles.item__activeacw 
                : i === state.previousIndex && state.clockwise ? styles.item__idlecw
                : i === state.previousIndex && !state.clockwise ? styles.item__idleacw
                : styles.item__default} style={{ "--i": item }}>{item}</div>
            </>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Carousel