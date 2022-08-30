import React, { RefObject, useEffect, useRef } from 'react';

function ContentEditable(props: {
  style?: any;
  value: string;
  handleChange: (event: any) => void;
  max: number;
}) {
  const { value, handleChange, max } = props;
  const additionalStyles = props.style;

  const lyricText = useRef(null) as RefObject<any>;

  const style = {
    minWidth: '1ch',
    backgroundColor: 'transparent',
    fontWeight: 300,
    border: 'none',
    outline: 'none',
    cursor: 'text',
    marginRight: '0.4rem',
    ...additionalStyles
  };

  function setCursorToEnd(elem: Node | null) {
    let sel = window.getSelection();
    if (sel != null) {
      if (elem) {
        sel.selectAllChildren(elem);
        sel.collapseToEnd();
      }
    }
  }

  useEffect(() => {
    lyricText.current.addEventListener(
      'keypress',
      function (e: any) {
        if (e.target.innerText.length <= max) {
          setCursorToEnd(lyricText.current);
          handleChange(e);
        } else {
          e.preventDefault();
          return false;
        }
      },
      true
    );

    return () => {
      if (lyricText.current != null) {
        lyricText.current.removeEventListener('input', handleChange);
      }
    };
  }, []);

  return (
    <span
      style={style}
      className="span-text"
      ref={lyricText}
      contentEditable="true"
      suppressContentEditableWarning={true}
    >
      {value}
    </span>
  );
}

export default ContentEditable;
