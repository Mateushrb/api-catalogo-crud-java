import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditModal from './EditModal/EditModal';
import styles from '../../../Styles/Pages/Estoque/EditButton.module.scss';

const EditButton = ({ product, onEdit }) => {
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleSave = (editedProduct) => {
    onEdit(editedProduct);
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <button className={styles.EditButton} onClick={handleEdit}>
        Editar
      </button>
      {showModal && (
        <EditModal product={product} onSave={handleSave} onClose={handleClose} />
      )}
    </>
  );
};

EditButton.propTypes = {
  product: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default EditButton;
