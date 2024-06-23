import React from 'react';
import refreshIcon from '../../../../assets/refresh.png';
import styles from './RefreshButton.module.scss'

const RefreshButton = () => {
    const handleReloadPage = () => {
        window.location.reload();
    };

    return (
        <img
            src={refreshIcon}
            alt="Atualizar"
            className={styles.RefreshIcon}
            onClick={handleReloadPage}
        />
    );
};

export default RefreshButton;