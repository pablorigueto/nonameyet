import React from 'react';

function FieldElements(props) {
  const { data } = props;
  
  const fieldElements = data.map((item, index) => (

    <div
      className="main_content"
      key={index}
      style={{
        border: '0',
        padding: '0',
        marginBottom: '50px',
        position: 'relative', // Set the position of the container to relative
      }}
    >

      <a href={item.pathAlias}>
        <img src={item.thumb} alt={item.alt} style={{width: '100%'}} />
        <div className="text_fields" style={{
          position: 'absolute', // Set the position of the text fields to absolute
          bottom: '0', // Position the text fields at the bottom of the container
          left: '0', // Position the text fields at the left of the container
          right: '0', // Position the text fields at the right of the container
          backgroundColor: 'rgba(0,0,0,0.5)', // Add a semi-transparent black background to the text fields
          color: '#fff', // Set the color of the text fields to white
          padding: '5px', // Add some padding to the text fields
          boxSizing: 'border-box', // Make sure the padding is included in the total width of the text fields
          height: '50%',
        }}>
          <p type="text" name="title_field">{item.title}</p>
          <p type="text" name="address_field">{item.address}</p>
          <p type="text" name="number_field">{item.number}</p>
          <p type="text" name="neighborhood_field">{item.neighborhood}</p>
          <p type="text" name="city_field">{item.city}</p>
          <p type="text" name="state_field">{item.state}</p>
          <p type="text" name="distance_field">Aproximadamente: {item.distance}KM</p>
          <p type="text" name="rating_field">Rating: {item.rating}</p>
        </div>
      </a>
    </div>
  ));

  return (
    <div>
      {fieldElements}
    </div>
  );
}

export default FieldElements;
