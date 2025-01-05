// CryptoDetailsCardModal.js

import React from 'react';
import Modal from 'react-modal';
import CryptoDetailsCard from '../CryptoDetailsCard/CryptoDetailsCard';

Modal.setAppElement('#root');

const CryptoDetailsCardModalSearch = ({ cryptoDetails, closeModal }) => {
  return (
    <Modal
      isOpen={!!cryptoDetails}
      onRequestClose={closeModal}
      contentLabel="Detalhes da Criptomoeda"
    >
      {cryptoDetails && (
        <CryptoDetailsCard
          cryptoDetails={cryptoDetails}
          closeModal={closeModal}
        />
      )}
    </Modal>
  );
};

export default CryptoDetailsCardModalSearch;
