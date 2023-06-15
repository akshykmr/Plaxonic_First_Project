import React from 'react'
import PropTypes from 'prop-types'
// import {Link} from 'react-router-dom'


export default function Navbar(props) { /*This is function based components created using props */


// const [isFocused, setIsFocused] = useState(false);

// const handleFocus = () => {
//   setIsFocused(true);
// };

  return (
    <>
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
  <div className="container-fluid">
    {/* <Link className={`navbar-brand text-${props.mode==='dark'?'primary':'danger'}`} to="/">{props.title}</Link> */}
    <a className={`navbar-brand text-${props.mode==='dark'?'primary':'danger'}`} href="#">{props.title}</a>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      <li className="nav-item active mx-1">
        {/* <Link className={`nav-link text-${props.mode==='dark'?'white':'black'}`} to="/">TEXT</Link> */}
        <a className={`nav-link text-${props.mode==='dark'?'white':'black'}`} href="#">TEXT</a>

      </li>
      <li className="nav-item mx-2">
        {/* <Link className={`nav-link text-${props.mode==='dark'?'white':'black'}`} to="/Emoji">EMOJI</Link> */}
        <a className={`nav-link text-${props.mode==='dark'?'white':'black'}`} href="#">EMOJI</a>

      </li>
    </ul>
    <div className={`form-check form-switch text-${props.mode==='dark'?'light':'dark'} mx-2`}> {/*  using ternary operator */}
  <input className="form-check-input" onClick = {props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
  <label className="form-check-label  " htmlFor="flexSwitchCheckDefault">{props.mode}</label>
</div> 
  </div>
</div> 
</nav>

</>
  )
}

Navbar.propTypes = {title:PropTypes.string.isRequired, /* .isRequired will gives error when props value is not given to title while printing */
    
    aboutText:PropTypes.string,} ;
/* Here we have declare that titel and aboutText are string
type props and also we can declare other props as well using objects*/

Navbar.defaultProps={title:"Add a title here",
aboutText:"add a aboutText here"}   

// here by defaultProps we giving default value to props in case there is no value given or declare to props at the print time ... ()
