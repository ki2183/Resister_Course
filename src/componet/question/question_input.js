import './question_input.css'

function MakeQuesitonInput(probs){
    
    const title = probs.title
    const name = probs.input_name
    
    const handleRadioChange = (event) => {
        event.preventDefault(); // 라디오 버튼의 기본 동작 막기
        const value = event.target.value;
        console.log('선택된 값:', value);
      };

    return (
        <div className='card-questionAll'>
                <div className='card-question-info'>
                    <span className='card-question-info-span'>
                        {title}
                    </span>        
                </div>

                <div className='card-question-score'>
                    <span>싫다</span>
                        <div className='frame-card-question-score'>
                            
                        
                            <span className='outline-span'>
                                <input
                                    id="first-radio"
                                    name={name}
                                    type="radio"
                                    value="1"
                                    // onChange={handleRadioChange}
                                    onChange={e=>{e.preventDefault()}}
                                    onClick={e=>{e.preventDefault()}}
                                />
                                <label htmlFor="first-radio" className='label first-label' ></label>
                            </span>

                            <span className='outline-span'>
                            <input
                                id="second-radio"
                                name={name}
                                type="radio"
                                value="2"
                                onChange={e=>{e.preventDefault()}}
                            />
                            <label htmlFor="second-radio" className='label second-label'></label>
                            </span>

                            <span className='outline-span'>
                            <input
                                id="third-radio"
                                name={name}
                                type="radio"
                                value="3"
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="third-radio" className='label third-label'></label>
                            </span>

                        <span className='outline-span'>
                        <input
                            id="fourth-radio"
                            aria-label="매우 동의합니다"
                            name={name}
                            type="radio"
                            value="4"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="fourth-radio" className='label fourth-label'></label>
                        </span>

                        <span className='outline-span'>
                        <input
                            id="fifth-radio"
                            name={name}
                            type="radio"
                            value="5"
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="fifth-radio" className='label fifth-label'></label>
                        </span>

                
                                
                </div>
                    <span>좋다</span>
                </div>         
        </div>
    )
}

export default MakeQuesitonInput