import React, { useState } from 'react';
import Popup from '../popup/Popup';

function FieldElements(props) {
  const { data } = props;

  const [openRatingFor, setOpenRatingFor] = useState(null); // Add state for tracking Rating open popup
  const [openKmFor, setOpenKmFor] = useState(null); // Add state for tracking KM open popup

  const toggleRating = (index) => {
    // Close open popup before opening a new one
    if (openRatingFor === index) {
      setOpenRatingFor(null);
    } else {
      setOpenRatingFor(index);
    }
  };

  const toggleKm = (index) => {
    // Close open popup before opening a new one
    if (openKmFor === index) {
      setOpenKmFor(null);
    } else {
      setOpenKmFor(index);
    }
  };

  const fieldElements = data.map((item, index) => (
    <div
      className="main_content"
      key={index}
      style={{
        border: '0',
        padding: '0',
        marginBottom: '2rem',
        position: 'relative', // Set the position of the container to relative
      }}
    >
      <div
        className="score"
        style={{
          position: 'absolute',
          right: '0',
          padding: '0.5rem',
          color: '#fff',
          left: '0',
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
          zIndex: '1',
        }}
      >
        <p 
          type="text"
          name="type"
          style=
            {{
              margin: '0',
              padding: '0 0.8rem',
              display: 'flex',
              alignItems: 'center',
              background: 'aliceblue',
              color: '#222',
              fontSize: '0.8rem',
              borderRadius: '1rem',
              height: '45px',

            }}  
        >{item.type}</p>
        <div className='score__parent'>
          <img
            src="/sites/default/files/image/score/star.png"
            alt="score"
            style=
              {{
                padding: '0.6rem 0.45rem',
              }}
            onClick={() => toggleRating(index)}
          />
        </div>
        {/* <p
          // src="/sites/default/files/image/score/score.png"
          // alt="score"
          className='star__home'
          style=
            {{
              // background: 'rgba(0, 0, 0, 0.15)',
              // borderRadius: '50%',
              //padding: '0.45rem',
            }}
          onClick={() => toggleRating(index)}
        /> */}

      </div>

      <a href={item.pathAlias}>
        <img
          src={item.thumb}
          alt={item.alt}
          style={{
            width: '100%',
            height: '15rem',
            borderRadius: '1rem',
            boxShadow: 'rgba(0, 0, 0, 0.5) 0.2rem 0.2rem 0.5rem',
          }}
        />
        <div className="text_fields" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 0.5rem',
          position: 'absolute', // Set the position of the text fields to absolute
          bottom: '0', // Position the text fields at the bottom of the container
          left: '0', // Position the text fields at the left of the container
          right: '0', // Position the text fields at the right of the container
          backgroundColor: 'rgb(0 0 0 / 25%)', // Add a semi-transparent black background to the text fields
          color: 'aliceblue', // Set the color of the text fields to white
          boxSizing: 'border-box', // Make sure the padding is included in the total width of the text fields
          height: '15%',
          borderRadius: '0 0 1rem 1rem',
        }}>
          
          <p type="text" name="title_field"
          style={{
            margin: '0',
            /* Set maximum height to one line */
            maxHeight: '1.3em',
            /* Hide any overflow beyond one line */
            overflow: 'hidden',
            /* Ensure text doesn't wrap to a second line */
            whiteSpace: 'nowrap',
            /* Add ellipsis to indicate truncated text */
            textOverflow: 'ellipsis',
            fontSize: '0.9rem',
            color: '#fff',
          }}
          >{item.title}</p>

          <div>
          
            <div style=
            {{
              background: 'url("/sites/default/files/image/icons/gps.png") 0px center / cover no-repeat',
              width: '1.85rem',
              height: '2.5rem',
            }}
            onClick={(event) => {
              event.preventDefault();
              toggleKm(index);
            }}

            ></div>
          </div>
        </div>
      </a>

      <Popup
        index={index}
        openPopupFor={openRatingFor}
        togglePopup={setOpenRatingFor}
      >
        {/* Add the content for the rating popup here */}
        <span className="rating__homepage">{item.rating}/5</span>
      </Popup>

      <Popup
        index={index}
        openPopupFor={openKmFor}
        togglePopup={setOpenKmFor}
      >
        {/* Add the content for the km popup here */}
        <span className="distance__homepage">{item.distance}km</span>
      </Popup>


    </div>
  ));

  return <div>{fieldElements}</div>;
}

export default FieldElements;
