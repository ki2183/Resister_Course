import { Controller } from 'react-hook-form'
import './question_input.css'
import { useForm } from 'react-hook-form';
function MakeQuesitonInput(probs){
    
    const title = probs.title
    const name = probs.input_name
    const control = probs.control

    // const {control, register, handleSubmit, watch ,formState: { isDirty, errors }, } = useForm({});
    
    // const handleRadioChange = (event) => {
    //     event.preventDefault(); // 라디오 버튼의 기본 동작 막기
    //     const value = event.target.value;
    //     console.log('선택된 값:', value);
    //   };
    console.log(control)
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

                             <Controller
                                name={name} 
                                control={control} 
                                defaultValue="" 
                                rules={{ required: 'This field is required',
                                validate: (value) => value !== "" && value !== null || "This field is required", }} // 유효성 검사 규칙 (옵션)
                                render={({ field, fieldState }) => (
                                    <div className='frame-card-question-score'>
                                        <span className='outline-span'>
                                            <input
                                                id={`first-radio-${name}`}
                                                className='first-radio'
                                                name={name}
                                                type="radio"
                                                value="1"
                                                onChange={field.onChange}
                                                checked={field.value === "1"}
                                            />
                                            <label htmlFor={`first-radio-${name}`} className='label first-label' ></label>
                                        </span>
                           
                                        <span className='outline-span'>
                                        <input
                                            id={`second-radio-${name}`}
                                            className='second-radio'
                                            name={name}
                                            type="radio"
                                            value="2"
                                            onChange={field.onChange}
                                            checked={field.value === "2"}

                                        />
                                        <label htmlFor={`second-radio-${name}`} className='label second-label'></label>
                                        </span>

                                        <span className='outline-span'>
                                        <input
                                            id={`third-radio-${name}`}
                                            className='third-radio'
                                            name={name}
                                            type="radio"
                                            value="3"
                                            onChange={field.onChange}
                                            checked={field.value === "3"}

                                        />
                                        <label htmlFor={`third-radio-${name}`} className='label third-label'></label>
                                        </span>

                                        <span className='outline-span'>
                                        <input
                                            id={`fourth-radio-${name}`}
                                            className='fourth-radio'
                                            aria-label="매우 동의합니다"
                                            name={name}
                                            type="radio"
                                            value="4"
                                            onChange={field.onChange}
                                            checked={field.value === "4"}
                                        />
                                        <label htmlFor={`fourth-radio-${name}`} className='label fourth-label'></label>
                                        </span>

                                        <span className='outline-span'>
                                        <input
                                            id={`fifth-radio-${name}`}
                                            className='fifth-radio'
                                            name={name}
                                            type="radio"
                                            value="5"
                                            onChange={field.onChange}
                                            checked={field.value === "5"}

                                        />
                                        <label htmlFor={`fifth-radio-${name}`} className='label fifth-label'></label>
                                        </span>
                                    </div>
                                )}
                            />

                        </div>
                        <span>좋다</span>

                </div>     
                
        </div>
    )
}

export default MakeQuesitonInput














{/* <span className='outline-span'>
                                <input
                                    id={`first-radio-${name}`}
                                    className='first-radio'
                                    name={name}
                                    type="radio"
                                    value="1"
                                    // onChange={handleRadioChange}
                                />
                                <label htmlFor={`first-radio-${name}`} className='label first-label' ></label>
                            </span>
                           
                            <span className='outline-span'>
                            <input
                                id={`second-radio-${name}`}
                                className='second-radio'
                                name={name}
                                type="radio"
                                value="2"
                                // onChange={handleRadioChange}
                            />
                            <label htmlFor={`second-radio-${name}`} className='label second-label'></label>
                            </span>

                            <span className='outline-span'>
                            <input
                                id={`third-radio-${name}`}
                                className='third-radio'
                                name={name}
                                type="radio"
                                value="3"
                                // onChange={handleRadioChange}
                            />
                            <label htmlFor={`third-radio-${name}`} className='label third-label'></label>
                            </span>

                            <span className='outline-span'>
                            <input
                                id={`fourth-radio-${name}`}
                                className='fourth-radio'
                                aria-label="매우 동의합니다"
                                name={name}
                                type="radio"
                                value="4"
                                // onChange={handleRadioChange}
                            />
                            <label htmlFor={`fourth-radio-${name}`} className='label fourth-label'></label>
                            </span>

                            <span className='outline-span'>
                            <input
                                id={`fifth-radio-${name}`}
                                className='fifth-radio'
                                name={name}
                                type="radio"
                                value="5"
                                // onChange={handleRadioChange}
                            />
                            <label htmlFor={`fifth-radio-${name}`} className='label fifth-label'></label>
                            </span> */}