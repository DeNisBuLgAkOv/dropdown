import React from 'react';
import Zoom from 'components/Zoom/Zoom';
import styles from './Menu.module.css';
import cn from 'classnames';
import { ICity } from 'type';

type MenuProps = {
  showDropDown: boolean;
  toggleDropDown: Function;
  citySelection: Function;
  selectCity: ICity[] | [],
  data: ICity[],
  showIcon: boolean,
  handleChangeSearch: (value: string) => void
};

const Menu: React.FC<MenuProps> = ({
  citySelection,
  showDropDown,
  selectCity,
  data,
  showIcon=false,
  handleChangeSearch
}: MenuProps): JSX.Element => {
  
  const onClickHandler = (city: ICity): void => {
    citySelection(city);
  };

  return (
    <>
      <div className={showDropDown ? styles.dropdown : cn(styles.dropdown, styles.active)}>
        <div className={styles.search_container}>
          <div className={styles.search_icon}>
            <Zoom />
          </div>
          <div className={styles.search_wrapper_input}>
            <input 
              placeholder="Поиск"
              onChange={(e) => handleChangeSearch(e.target.value)}
              className={styles.search_input} 
            />
          </div> 
        </div>

        <div className={styles.conteiner_items}>
          {data.map(
            (city: ICity): JSX.Element => {
              const isSelected = selectCity.find((findCity: ICity) => findCity.id === city.id)
              return (
                <div
                  className={styles.items}
                  key={city.id}
                  onClick={(): void => {
                    onClickHandler(city);
                  }}
                >
                  <div className={styles.wrapper_value}>
                    {showIcon && <div className={cn(city.icon,styles.icon)}></div>}
                    <span className={styles.items_value}>
                      {city.value}
                    </span>
                  </div>
                  <div className={isSelected ? cn(styles.checkbox,'checkbox_on') : cn(styles.checkbox,'checkbox_off')}></div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
