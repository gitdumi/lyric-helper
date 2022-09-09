import { MAX_SYL_COUNT, MIN_SYL_COUNT, RESPONSIVE_WIDTH } from '../../../../utils/constants';
import { ClickAwayListener, Input, Tooltip, useMediaQuery } from '@mui/material';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentSylCount } from '../../../store/dbSlice';
import useLyricDb from '../../../hooks/dbHook';
import './SyllableCountInput.css';
import { theme } from '../../../../lib/Theme';

export default function SyllableCountInput(props: { responsive: boolean }) {
  const { responsive } = props;
  const { setCurrentSylCount } = useLyricDb();
  const currentSylCount = useSelector(selectCurrentSylCount);
  const [value, setValue] = useState<string>(currentSylCount.toString());
  const [open, setOpen] = useState(false);
  const isResponsive = useMediaQuery(`(max-width: ${RESPONSIVE_WIDTH})`);

  useEffect(() => {
    setValue(currentSylCount.toString());
  }, [currentSylCount]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$2');
    setValue(value);
  }

  function handleChangeSylCount() {
    const newValue =
      parseInt(value) <= MAX_SYL_COUNT && parseInt(value) >= MIN_SYL_COUNT ? parseInt(value) : '';
    if (!!newValue) {
      setCurrentSylCount(newValue);
    } else {
      setValue(currentSylCount.toString());
    }
  }

  function handleFocus(event: any) {
    if (!isResponsive) {
      event.target.select();
    }
  }

  // @ts-ignore
  return (
    <ClickAwayListener
      onClickAway={() => {
        handleChangeSylCount();
        setOpen(false);
      }}
    >
      <Tooltip
        open={open}
        placement={isResponsive ? 'top' : 'left'}
        title={`pick a value between ${MIN_SYL_COUNT} and ${MAX_SYL_COUNT} to select the number of syllables for newly generated lyrics`}
      >
        <input
          style={{ color: theme.palette.background.paper }}
          className={`syl-count-input ${responsive ? '' : 'floating-input'}`}
          type="text"
          maxLength={2}
          value={value}
          onMouseEnter={() => setOpen(true)}
          onMouseOver={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onClick={(e: any) => {
            e.target.value = '';
            isResponsive ? setOpen(true) : '';
          }}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyPress={(e) => (e.key === 'Enter' ? handleChangeSylCount() : '')}
        />
      </Tooltip>
    </ClickAwayListener>
  );
}
