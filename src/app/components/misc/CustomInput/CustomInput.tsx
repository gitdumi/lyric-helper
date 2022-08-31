import React, { useState } from 'react';
import './CustomInput.css';
import { ClickAwayListener } from '@mui/material';

function CustomInput(props: {
  style?: any;
  value: string;
  handleChange: (event: any) => void;
  max: number;
  className?: string;
  placeholder?: string;
}) {
  const { value, max, handleChange, className, placeholder } = props;
  const additionalStyles = props.style;
  const [isEdit, setIsEdit] = useState(false);

  return (
    <ClickAwayListener
      onClickAway={() => {
        setIsEdit(false);
      }}
    >
      {isEdit ? (
        <input
          className={'input-edit ' + className}
          style={{ ...additionalStyles }}
          value={value}
          onChange={handleChange}
          maxLength={max}
          autoFocus
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              setIsEdit(false);
            }
          }}
        />
      ) : (
        <span
          style={{ ...additionalStyles }}
          className={'input-view ' + className}
          onClick={() => {
            setIsEdit(true);
          }}
        >
          {value || placeholder || 'empty'}
        </span>
      )}
    </ClickAwayListener>
  );
}

export default CustomInput;
