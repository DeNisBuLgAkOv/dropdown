import React, {FC, useState, useEffect } from 'react';
import Menu from '../Menu/Menu';
import Chip from '../Chip/Chip';
import ArrowUp from '../ArrowUp/ArrowUp';
import styles from './Dropdown.module.css';
import { ICity } from 'type';

interface IDropdown {
  data: ICity[];
  showIcon:boolean;
  isMultyValue:boolean;
}

const Dropdown: FC<IDropdown> = (props): JSX.Element => {
  const { data, showIcon, isMultyValue} = props;
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [cities, setCities] = useState<ICity[]>(data)
  const [searchWord, setSearchWord] = useState<string>('');
  const [selectCity, setSelectCity] = useState<ICity[]>([]);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const citySelection = (clickCity: ICity): void => {
    const indexCity = selectCity.findIndex((city: ICity) => city.id === clickCity.id);
    if (!isMultyValue) {
      if (indexCity === -1 && selectCity.length < 1)  {
        setSelectCity([...selectCity, clickCity])
      } else if (indexCity !== -1) { 
        handleRemove(indexCity);
      }
    } else {
      if (indexCity === -1) {
        setSelectCity([...selectCity, clickCity])
      } else { 
        handleRemove(indexCity);
      }
    }

  };

  const handleRemove = (id: number) => {
    const indexCity = selectCity.findIndex((city: ICity) => city.id === id);
    const newSelectCity = [...selectCity];
    newSelectCity.splice(indexCity, 1);
    setSelectCity(newSelectCity);
  };

  const handleChangeSearch = (value: string) => {
    setSearchWord(value);
  };
 
  useEffect(() => {
    const newArrCities = data.filter((city: ICity) => city.value.toLowerCase().includes(searchWord.toLowerCase()));
    setCities(newArrCities);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchWord]);

  return (
    <>
      <div className={styles.announcement}>
        <div className={styles.orders_seleced}>
          {
            selectCity.map((item, index) => (
              <Chip 
                id={item.id}
                index={index}
                handleRemove={handleRemove}
                value={item.value}
              />
            ))
          }
        </div>
        <ArrowUp 
          onClick={toggleDropDown}
          isUpPosition={showDropDown}
        />
      </div>
      <Menu
        showIcon={showIcon}
        showDropDown={showDropDown}
        toggleDropDown={(): void => toggleDropDown()}
        citySelection={citySelection}
        selectCity={selectCity}
        data={cities}
        handleChangeSearch={handleChangeSearch}
      />
    </>
  );
};

export default Dropdown;
