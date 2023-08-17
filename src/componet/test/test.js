import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // 모달을 위한 접근성 설정

function Test() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div>
      <button onClick={openModal}>모달 열기</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>질문</h2>
        <p>예/아니요 질문 내용</p>
        <button onClick={closeModal}>아니요</button>
        <button onClick={closeModal}>예</button>
      </Modal>
    </div>
  );
}

export default Test;
