import"./Usersave.css";
import { useForm } from 'react-hook-form';
import { useRef, useState} from "react";
import gsap from "gsap";
import axios from "axios";


function Usersave(){
    const { register, handleSubmit, watch ,formState: { isDirty, errors }, } = useForm({});
    const [idcheck,setIdcheck] = useState(false)
    const check_id= watch("userId","")
    const password = watch("userPassword", "")


      const onsubmit = async dt => {
          await new Promise((r) => setTimeout(r, 1000));

          if (dt !== null && typeof dt === 'object') {
            delete dt.password_check
            console.log(JSON.stringify(dt))
            console.log('json으로 변환확인')

            axios.post('/Usersave', JSON.stringify(dt), {
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then((res) => {
              console.log(res); // result
              console.log('axios에 올라간 데이터')
              alert('전송됐네여')
            })
            .catch((error) => {
              console.error(error); // err
              console.log('axios 오류')
              alert('axios오류')
            });

          }else{
            alert('칸이 비었어요')
          }
      };

    async function ID_CHECK(id){
        // console.log(id)
        const id_ = {"userId":id}
        console.log(id_)
        setIdcheck(false)
        if(id!==undefined){
          try {
              const res = await axios.post('/Idcheck', JSON.stringify(id_), {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              console.log(res.data)
              console.log(res)
              res.data === true ? alert("사용가능한 아이디 입니다."): alert("아이디가 중복됩니다.")
              res.data === true ? setIdcheck(true) : setIdcheck(false)

            } catch (error) {
              alert('서버 통신 오류')
              console.log("사용불가")
              console.log(error)
              setIdcheck(false)
            }
          }
          else{
            setIdcheck(false)
            alert("아이디 입력란이 비어있습니다.")
          }
    }
 
    // -----------animation----------------

    const Ani_width = 332;

    const IDRef = useRef(null)
    const PWDRef = useRef(null)
    const PWDCHECKRef = useRef(null)
    const NAMERef = useRef(null)
    const NUMBERRef = useRef(null)

    const animationIn = (ref)=> {
      gsap.to(ref.current,{ 
        width:Ani_width,
        duration: 0.3,
        ease: "easeInOutBounce"})
    }
    const animationOut = (ref)=> {
      gsap.to(ref.current,{ 
        width:0,
        duration: 0.3,
        ease: "easeInOutBounce"})
    }

  return (
    <div className="container-join">
      
        <div>
            <form className='join-case' name='form' method='get' onSubmit={handleSubmit(onsubmit)}>
              <h1 id="회원가입">회원가입</h1>
                <div>
                  <div className="ani-div" ref={IDRef}></div>
                    <p>아이디</p>
                    <input type='text' name='userId' id="join-input" placeholder='아이디' onInput={e=>{e.preventDefault(); setIdcheck(true);}}
                    aria-invalid={!isDirty ? undefined : errors.userId ? (!idcheck ? "false" : "true") : "false"}
                    {...register("userId", {
                      required: "아이디는 필수 입력입니다.",
                      minLength:{
                        value:4,
                        message:"적어도 4자 이상 아이디를 사용하세요",
                      },
                    })}
                    onFocus={e=>{e.preventDefault(); animationIn(IDRef)}}
                    onBlur={e=>{e.preventDefault(); animationOut(IDRef)}}
                    />
                <button id="id-check-button" onClick={e=>{
                    e.preventDefault();
                    const pattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/]/;
                    if(check_id !== "" && check_id !== null && !pattern.test(check_id))
                      ID_CHECK(check_id);
                    else{
                      alert("특수문자나 공백은 안됩니다!")
                    }
                }}>중복 확인</button>
                </div>
                {errors.userId && <small role="alert" className='err_mess'>{errors.userId.message}</small>}
                {!errors.userId && check_id !== "" &&idcheck===false && <small role="alert" className='err_mess'>아이디 중복 체크를 완료하세요.</small>}
                <div>
                  <div className="ani-div" ref={PWDRef}></div>
                    <p>비밀번호</p>
                    <input type='password' name="userPassword" placeholder='비밀번호'
                       aria-invalid={!isDirty ? undefined : errors.input_pd ? "true" : "false"}
                       {...register("userPassword", {
                         required: "비밀번호는 필수 입력입니다.",
                         minLength: {
                           value: 8,
                           message: "8자리 이상 비밀번호를 사용하세요.",
                         }, 
                       })}
                      onFocus={e=>{e.preventDefault(); animationIn(PWDRef)}}
                      onBlur={e=>{e.preventDefault(); animationOut(PWDRef)}}
                    />
                </div>
                {errors.userPassword && <small role="alert" className='err_mess'>{errors.userPassword.message}</small>}
                
                <div>
                <div className="ani-div" ref={PWDCHECKRef}></div>
                    <p>비밀번호 재확인</p>
                    <input type='password' name="password_check" placeholder='비밀번호 재확인'
                   aria-invalid={!isDirty ? undefined : errors.password_check ? "true" : "false"}
                    {...register("password_check", {
                        validate: value => value === password|| '비밀번호가 일치하지 않습니다.',
                        required: "비밀번호체크는 필수 입니다.",
                      })}
                      onFocus={e=>{e.preventDefault(); animationIn(PWDCHECKRef)}}
                      onBlur={e=>{e.preventDefault(); animationOut(PWDCHECKRef)}}
                    />
                </div>
                {errors.password_check && <small role="alert" className='err_mess'>{errors.password_check.message}</small>}

                <div>
                <div className="ani-div" ref={NAMERef}></div>
                    <p>이름</p>
                    <input type='text' name="userName" placeholder='이름'
                     aria-invalid={!isDirty ? undefined : errors.userName ? "true" : "false"}
                     {...register("userName", {
                         required: "이름은 필수 입력입니다.",
                       })}
                       onFocus={e=>{e.preventDefault(); animationIn(NAMERef)}}
                      onBlur={e=>{e.preventDefault(); animationOut(NAMERef)}}
                    />
                </div>
                {errors.userName && <small role="alert" className='err_mess'>{errors.userName.message}</small>}


                <div>
                <div className="ani-div" ref={NUMBERRef}></div>
                    <p>학번</p>
                    <input type='text' name="studentNumber" placeholder='학번'
                     aria-invalid={!isDirty ? undefined : errors.studentNumber ? "true" : "false"}
                     {...register("studentNumber", {
                         required: "이름은 필수 입력입니다.",
                       })}
                       onFocus={e=>{e.preventDefault(); animationIn(NUMBERRef)}}
                      onBlur={e=>{e.preventDefault(); animationOut(NUMBERRef)}}
                    />
                </div>
                {errors.studentNumber && <small role="alert" className='err_mess'>{errors.studentNumber.message}</small>}


                <div id='student-number-join'>
                    {/* <p>학번</p>  */}
                    {/* <div>
                        <select id="student-number" name="studentNumber" aria-label="학번"
                         aria-invalid={!isDirty ? undefined : errors.studentNumber ? "true" : "false"}
                         {...register("studentNumber",{
                         required:"학번 선택은 필수입니다.",
                         pattern:{
                          value:{
                            value: /[0-9]{2}/,
                          }
                         }
                         
                        })}
                         >  <option value="">학번</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                        </select>
                    </div> */}
    
                    <div>
                        <select id="student-grade" name="studentGrade" aria-label="학번"
                         aria-invalid={!isDirty ? undefined : errors.studentGrade ? "true" : "false"}
                         {...register("studentGrade",{
                         required:"학년 선택은 필수입니다.",
                         pattern:{
                          value:{
                            value: /[0-9]{1}/,
                          }
                         }
                         
                        })}
                         >  <option value="">학년</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
          
                        </select>
                    </div>
                </div>
                {/* {errors.studentNumber && <small role="alert" className='err_mess'>{errors.studentNumber.message}</small>} */}
                {errors.studentGrade && <small role="alert" className='err_mess'>{errors.studentGrade.message}</small>}

                <input type="submit"value='가입하기' id="submitButton-save"></input>
            </form>
      </div>
      <div id='last'></div>
    </div>
  );
}

export default Usersave;
