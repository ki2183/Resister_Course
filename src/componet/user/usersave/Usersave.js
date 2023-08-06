import"./Usersave.css";
import { useForm } from 'react-hook-form';
// import axios from "axios";
import { useState} from "react";

function Usersave(){
    const { register, handleSubmit, watch ,formState: { isDirty, errors }, } = useForm({});
    const [idcheck,setIdcheck] = useState(true)
    const check_id= watch("username","")
    const password = watch("password", "")


    // const [tf ,setTF] = useState(false)

      const onsubmit = async dt => {
          await new Promise((r) => setTimeout(r, 1000));
          delete dt.password_check

          console.log(JSON.stringify(dt))
          alert(JSON.stringify(dt))
    
      };

    async function ID_CHECK(id){
        console.log(id)
        setIdcheck(false)
        // if(id!==undefined){
        //   try {
        //       const res = await axios.get(`/users/${id}/check-username`);
        //       // alert(res.data.data)

        //       !res.data.data ? alert("사용가능한 아이디 입니다."): alert("아이디가 중복됩니다.")

        //       setIdcheck(res.data.data.authCode);
        //     } catch (error) {
        //       console.log("사용불가")
        //       setIdcheck(true)
        //     }
        //   }
        //   else{
        //     setIdcheck(true)
        //     alert("아이디 입력란이 비어있습니다.")
        //   }
        alert("중복체크 완료")
    }
 

  return (
    <div className="container-join">
      
        <div>
            <form className='join-case' name='form' method='get' onSubmit={e=>{e.preventDefault()
            window.location.href = '/login'  
          }
            }>
              <h1 id="회원가입">회원가입</h1>
                <div>
                    <p>아이디</p>
                    <input type='text' name='username' id="join-input" placeholder='아이디' onInput={e=>{e.preventDefault(); setIdcheck(true);}}
                    aria-invalid={!isDirty ? undefined : errors.username ? (!idcheck ? "true" : "false") : "false"}
                    {...register("username", {
                      required: "아이디는 필수 입력입니다.",
                      minLength:{
                        value:4,
                        message:"적어도 4자 이상 아이디를 사용하세요",
                      },
                    })}
                    />
                <button id="id-check-button" onClick={e=>{
                    e.preventDefault();
                    ID_CHECK(check_id);
                }}>중복 확인</button>
                </div>
                {errors.username && <small role="alert" className='err_mess'>{errors.username.message}</small>}
                {!errors.username && idcheck===true && <small role="alert" className='err_mess'>아이디 중복 체크를 완료하세요.</small>}
                <div>
                    <p>비밀번호</p>
                    <input type='password' name="password" placeholder='비밀번호'
                       aria-invalid={!isDirty ? undefined : errors.input_pd ? "true" : "false"}
                       {...register("password", {
                         required: "비밀번호는 필수 입력입니다.",
                         minLength: {
                           value: 8,
                           message: "8자리 이상 비밀번호를 사용하세요.",
                         },
                        
                       })}
                    />
                </div>
                {errors.password && <small role="alert" className='err_mess'>{errors.password.message}</small>}
                
                <div>
                    <p>비밀번호 재확인</p>
                    <input type='password' name="password_check" placeholder='비밀번호 재확인'
                   aria-invalid={!isDirty ? undefined : errors.password_check ? "true" : "false"}
                    {...register("password_check", {
                        validate: value => value === password || '비밀번호가 일치하지 않습니다.',
                        required: "비밀번호체크는 필수 입니다.",
                      })}
                    />
                </div>
                {errors.password_check && <small role="alert" className='err_mess'>{errors.password_check.message}</small>}

                <div>
                    <p>이름</p>
                    <input type='text' name="name" placeholder='이름'
                     aria-invalid={!isDirty ? undefined : errors.name ? "true" : "false"}
                     {...register("name", {
                         required: "이름은 필수 입력입니다.",
                       })}
                    />
                </div>
                {errors.name && <small role="alert" className='err_mess'>{errors.name.message}</small>}

                <div id='student-number-join'>
                    <p>학번</p> 
                    <div>
                        <select id="student-number" name="studentnumber" aria-label="학번"
                         aria-invalid={!isDirty ? undefined : errors.studentnumber ? "true" : "false"}
                         {...register("studentnumber",{
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
                    </div>
                {/* </div> */}
                

                {/* <div id='student-grade-join'> */}
                    {/* <p>학년</p>  */}
                    <div>
                        <select id="student-grade" name="studentgrade" aria-label="학번"
                         aria-invalid={!isDirty ? undefined : errors.studentgrade ? "true" : "false"}
                         {...register("studentgrade",{
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
                {errors.studentnumber && <small role="alert" className='err_mess'>{errors.studentnumber.message}</small>}
                {!errors.studentnumber && errors.studentgrade && <small role="alert" className='err_mess'>{errors.studentgrade.message}</small>}


               
                    
                <input type="submit"value='가입하기' id="submitButton" onClick={
                  handleSubmit(onsubmit)}></input>
              
            </form>
      </div>
      <div id='last'></div>
    </div>
  );
}

export default Usersave;
