import { useEffect, useReducer, useRef, useState } from 'react'
import './question_condition.css'
import { DndProvider, useDrag, useDrop } from 'react-dnd';

export default function Question_condition(probs){

    const InputValRef = useRef(null)


    return (
        <div className='frame-quetion-condition' ref={probs.FstConditionRef}>
            <div className='title-question-condition'>
                <span>이번학기에 들을 학점을 선택해주세요</span>
                <span>⚠ 학점은 범위입니다...</span>
            </div>
            <input ref={InputValRef} className='question-condition' type="range" min="12" max="21.5" defaultValue={18} id="myRange" step="0.5" 
                onChange={e=>{
                    e.preventDefault()
                    probs.handleRangeChange(e)
                }}

            />
            <span>{probs.credit}</span>
        </div>
    )
}

