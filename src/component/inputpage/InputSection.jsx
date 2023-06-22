import React from 'react'

const InputSection = ({ index, handleOnChange, titles, placeholders, formData }) => {

    const name =
    index === 0
      ? "Car_Name"
      : index === 1
      ? "Car_Modal"
      : index === 2
      ? "Purchase_Year"
      : index === 3
      ? "Transmission"
      : index === 4
      ? "Fuel_Type"
      : undefined;
  
    const value =
    index === 0
     ? formData.Car_Name
     : index === 1
     ? formData.Car_Modal
     : index === 2
     ? formData.Purchase_Year
     : index === 3
     ? formData.Transmission
     : index === 4
     ? formData.Fuel_Type
     : undefined;
  
  return (
    <div className="input-group input-group-sm mb-4">
        <span className="input-group-text">{titles[index]}</span>
        <input
          onChange={handleOnChange}
          value={value}
          name={name}
          type="text"
          className="form-control"
          placeholder={placeholders[index]}
          aria-describedby="addon-wrapping"
          required
        />
      </div>
  )
}

export default InputSection;

