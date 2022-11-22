import React from 'react';
import styles from './Header.module.css';

const Header = () => (
    <header className={styles.header}>
        <div className={styles.header__container}>
            <img src={`${process.env.PUBLIC_URL}/imagens/logo.png`} alt="Logo sorteador" />
            <img src={`${process.env.PUBLIC_URL}/imagens/participante.png`} alt="" />
        </div>
    </header>
);

export default Header;