import React from 'react';

function Popup(props) {
  const { index, openPopupFor, togglePopup, children } = props;

  return (
    <>
      {/* Add check to see if this popup is open */}
      {openPopupFor === index && (
        <div
          className="popup"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'aliceblue',
            padding: '0.5rem 0.7rem',
            borderRadius: '1rem',
            boxShadow: '0 0 1rem rgba(0, 0, 0, 0.5)',
            zIndex: '999',
            fontSize: '0.8rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {children}
        </div>
      )}
    </>
  );
}

export default Popup;
