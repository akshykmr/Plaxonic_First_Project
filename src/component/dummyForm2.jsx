import React, { useState,useEffect } from 'react';

const Test = (props) => {
  const [formData, setFormData] = useState({
    Car_Name: "",
  });
  const [result, setResult] = useState(false);
  const click = () => {
    setResult(formData);
    console.log(formData);
    setFormData({ Car_Name: "" });
    
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // console.log(formData)
  };

  useEffect(() => {
    props.getData(result);
  },[result]);

  return (
    <>
      <div className="input-group input-group-sm  mb-4">
        <span className="input-group-text" id="addon-wrapping">
          Car Name
        </span>
        <input
           onChange={handleOnChange}
           value={formData.Car_Name}
           name="Car_Name"
           type="text"
           className="form-control"
           placeholder="Enter Your Car Name"
           aria-label="Input1"
           aria-describedby="addon-wrapping"
           required
        />

      </div>
      {/* <div className="result">Result: {JSON.stringify(result)}</div> */}
      <button onClick={click}>Click Here</button>
    </>
  );
};


export default Test;
