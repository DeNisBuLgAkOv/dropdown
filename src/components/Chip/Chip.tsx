import React, { FC } from "react";
import cn from 'classnames';
import Close from "./components/Close";
import styles from './Chip.module.css';

interface IChip { 
    id: number;
    value: string;
    index: number;
    handleRemove: (id: number) => void
}

const Chip: FC<IChip> = (props): JSX.Element => {
    const { id, value, index, handleRemove} = props;
    return (
    <div
        key={id}
        className={index < 2 ? styles.chip_container : cn(styles.chip_container, styles.chip_margin)}
        onClick={() => handleRemove(id)}
    >
        <p>{value}</p>
        <Close />
    </div>
  );
};

export default Chip;
