import React, { useState } from 'react';
import Modal from 'react-modal';
import './test.css'
Modal.setAppElement('#root'); // 모달을 위한 접근성 설정

function Test() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div>
      <div className='null-box'></div>
      <div className='null-box'></div>
      <div className='null-box'></div>
       <div className='div1'>
          <div className='div2'>
          
          </div>
          <div className='div3'>
            <div className='div4'></div>
          </div>
      </div>
    </div>
  );
}

export default Test;
