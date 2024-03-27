import { useEffect, useState } from 'react';
import './question_frame.css'


export default function Question_frame({quest_info,number,Change_Animation_Num,item,Change_Value}){

    const [css,setCss] = useState(['NoneActive','NoneActive','NoneActive','NoneActive','NoneActive'])
    const defaultCss = ['NoneActive','NoneActive','NoneActive','NoneActive','NoneActive']
    useEffect(()=>{
        // console.log(item.value)
        // console.log(css)
    },[css])

    useEffect(()=>{
        // console.log('quest_info',quest_info)
        // console.log('number',number)
        // console.log('Change_Animation_Num',Change_Animation_Num)
        // console.log('item',item)
        // console.log('Change_Value',Change_Value)
    },[])

    useEffect(()=>{
        // console.log(item.value)
    
        item.value === 0 ? setCss(defaultCss) : setCss((val)=>{
            const css_ = [...defaultCss]
            // console.log(val)
            // console.log(css_[item.value-1])
            css_[item.value-1] = 'Active'
            // css_[val[item.value-1]] = 'Active'
            // console.log(css_)
            // console.log("asdasdasdasdasdasdasdads")
            return css_
        })
    },[quest_info])

    return (
        <div className='container-frame-question'>
            <span>{item.question}</span>
            <div className='frame-question-in'>
                <span style={{width:"40px", textAlign: 'center'}}>아니다</span>
                <div className='frame-question-val'>
                    <span className={`fst-button question-span ${css[0]}`} onClick={e=>{
                        e.preventDefault();
                        Change_Animation_Num(number)
                        Change_Value(number,1)
                    }}>
                        <button></button>
                    </span>
                    <span className={`sec-button question-span ${css[1]}`} onClick={e=>{
                        e.preventDefault();
                        Change_Animation_Num(number)
                        Change_Value(number,2)
                    }}>
                        <button></button>
                    </span>
                    <span className={`trd-button question-span ${css[2]}`} onClick={e=>{
                        e.preventDefault();
                        Change_Animation_Num(number)
                        Change_Value(number,3)
                    }}>
                        <button></button>
                    </span>
                    <span className={`for-button question-span ${css[3]}`} onClick={e=>{
                        e.preventDefault();
                        Change_Animation_Num(number)
                        Change_Value(number,4)
                    }}>
                        <button></button>
                    </span>
                    <span className={`fif-button question-span ${css[4]}`} onClick={e=>{
                        e.preventDefault();
                        Change_Animation_Num(number)
                        Change_Value(number,5)
                    }}>
                        <button></button>
                    </span>
                </div>
                <span style={{width:"40px", textAlign: 'center'}}>맞다</span>
            </div>
        </div>
    )
}


