import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../Styles/Pages/Estoque/ListaEstoque.module.scss';
import reportIcon from '../../../assets/report-icon.svg';
import ModalReport from './ModalReport/ModalReport';
import RefreshButton from './RefreshButton/RefreshButton';

const GenerateReportButton = ({ onClick }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleGenerateReport = () => {
        setModalOpen(true);
    };

    const handleConfirm = () => {
        onClick();
        setModalOpen(false);
    };

    const handleCancel = () => {
        setModalOpen(false);
    };

    return (
        <div className={styles.ReportButtonContainer}>
            <RefreshButton />
            <img src={reportIcon} alt="Gerar Relatório" className={styles.ReportIcon} onClick={handleGenerateReport} />
            <ModalReport
                isOpen={modalOpen}
                message="Deseja baixar o Relatório?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </div>
    );
};

GenerateReportButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default GenerateReportButton;
