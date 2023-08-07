import React from 'react';
import './test.css';

function Button_five(probs){
    // const name = probs.name
    return (
    <div className='input-container'>
        <span className='outline-span'>
            <input
                id="first-radio"
                // aria-label="매우 동의합니다"
                name={probs.name}
                type="radio"
                value="1"
            />
            <label htmlFor="first-radio" className='label first-label' ></label>
        </span>

        <span className='outline-span'>
          <input
            id="second-radio"
            // aria-label="매우 동의합니다"
            name={probs.name}
            type="radio"
            value="2"
            
          />
          <label htmlFor="second-radio" className='label second-label'></label>
        </span>

        <span className='outline-span'>
          <input
            id="third-radio"
            // aria-label="매우 동의합니다"
            name={probs.name}
            type="radio"
            value="3"
            // onChange={handleRadioChange} // 라디오 버튼 선택 시 이벤트 처리
          />
          <label htmlFor="third-radio" className='label third-label'></label>
        </span>

        <span className='outline-span'>
          <input
            id="fourth-radio"
            aria-label="매우 동의합니다"
            name={probs.name}
            type="radio"
            value="4"
            // onChange={handleRadioChange} // 라디오 버튼 선택 시 이벤트 처리
          />
          <label htmlFor="fourth-radio" className='label fourth-label'></label>
        </span>

        <span className='outline-span'>
          <input
            id="fifth-radio"
            aria-label="매우 동의합니다"
            name={probs.name}
            type="radio"
            value="5"
            // onChange={handleRadioChange} // 라디오 버튼 선택 시 이벤트 처리
          />
          <label htmlFor="fifth-radio" className='label fifth-label'></label>
        </span>

    </div>
  )
}


function Test() {
  const handleRadioChange = (event) => {
    // 라디오 버튼의 선택 여부에 따른 처리를 여기서 할 수 있습니다.
    console.log('라디오 버튼 선택:', event.target.value);
  };

  return (
    <div className='container-test'>
      <form>
        <Button_five name={"first"}></Button_five>
        {/* <span className='outline-span'>
          <input
            id="first-radio"
            aria-label="매우 동의합니다"
            name="_ix6cgju42u"
            type="radio"
            value="0"
            onChange={handleRadioChange} // 라디오 버튼 선택 시 이벤트 처리
          />
          <label htmlFor="first-radio" className='label'></label>
        </span>

   
        <span className='outline-span'>
          <input
            data-v-a68b71c9=""
            id="second-radio"
            aria-label="매우 동의하지 않습니다"
            aria-busy="false"
            name="_ix6cgju42u"
            type="radio"
            tabIndex="0"
            value="1"
            data-focus-first="true"
            onChange={handleRadioChange} // 라디오 버튼 선택 시 이벤트 처리
          />
          <label htmlFor="second-radio" className='label'></label>
        </span>

        <span className='outline-span'>
          <input
            data-v-a68b71c9=""
            id="third-radio"
            aria-label="보통입니다"
            aria-busy="false"
            name="_ix6cgju42u"
            type="radio"
            tabIndex="0"
            value="2"
            data-focus-first="true"
            onChange={handleRadioChange} // 라디오 버튼 선택 시 이벤트 처리
          />
          <label htmlFor="third-radio" className='label'></label>
        </span>


        <span className='outline-span'>
          <input
            data-v-a68b71c9=""
            id="fourth-radio"
            aria-label="그저 그래요"

            name="_ix6cgju42u"
            type="radio"

            value="3"
            // data-focus-first="true"
            onChange={handleRadioChange} // 라디오 버튼 선택 시 이벤트 처리
          />
          <label htmlFor="fourth-radio" className='label'></label>
        </span>


        <span className='outline-span'>
          <input
            id="fifth-radio"
            aria-label="전혀 동의하지 않습니다"
            name="_ix6cgju42u"
            type="radio"
            value="4"
            onChange={handleRadioChange} // 라디오 버튼 선택 시 이벤트 처리
          />
          <label htmlFor="fifth-radio" className='label'></label>
        </span> */}

      </form>
    </div>
  );
}

export default Test;
