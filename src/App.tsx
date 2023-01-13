import React from "react";
import Dropdown from "./components/Dropdown/Dropdown";
import { citiesMock } from './constants';
import styles from './App.module.css';

export default function App(): JSX.Element {
  return (
    <div className={styles.app}>
      <span className={styles.title}>Язык</span>
      <Dropdown 
        data={citiesMock}
        showIcon={true}
        isMultyValue={true}
      />
    </div>
  );
}
