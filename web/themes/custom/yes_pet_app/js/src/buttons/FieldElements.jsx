import React from 'react';

function FieldElements(props) {
  const { data } = props;
  
  const fieldElements = data.map((item, index) => (
    <div className="main_content" key={index}>
      <a href={item.pathAlias}>
        <label type="text" name="title_field">{item.title}</label>
        <label type="text" name="address_field">{item.address}</label>
        <label type="text" name="number_field">{item.number}</label>
        <label type="text" name="neighborhood_field">{item.neighborhood}</label>
        <label type="text" name="city_field">{item.city}</label>
        <label type="text" name="state_field">{item.state}</label>
        <label type="text" name="distance_field">Aproximadamente: {item.distance}KM</label>
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
