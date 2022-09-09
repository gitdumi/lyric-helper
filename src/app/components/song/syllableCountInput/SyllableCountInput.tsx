import { MAX_SYL_COUNT, MIN_SYL_COUNT, RESPONSIVE_WIDTH } from '../../../../utils/constants';
import { ClickAwayListener, Input, Tooltip, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
    <ClickAwayListener onClickAway={() => handleChangeSylCount()}>
      <Tooltip
        placement="bottom"
        title={`pick a value between ${MIN_SYL_COUNT} and ${MAX_SYL_COUNT} to select the number of syllables for newly generated lyrics`}
      >
        <input
          style={{ color: theme.palette.background.paper }}
          className={responsive ? 'syl-count-input-responsive' : 'syl-count-input'}
          type="text"
          maxLength={2}
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyPress={(e) => (e.key === 'Enter' ? handleChangeSylCount() : '')}
        />
      </Tooltip>
    </ClickAwayListener>
  );
}
