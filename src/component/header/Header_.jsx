import "./Header.scss";
import { useNavigate } from 'react-router-dom';
import InputScreen from "../inputpage/Input_form";
import OutputScree from '../outputpage/Output_page';



const Header = () => {

    const navigate = useNavigate();

// const NavigateToInputForm =()=>{
//   navigate('/InputScreen');
// }
    return  (
      <>
        <header className='main-header'> 
            <div className="header-content">
                <div className="left"><div className="logo" onClick={()=>navigate(`/`)} >Car Details</div>
                </div>
                <div className="right">
                    <ul>
                        <li className="input" onClick={()=>navigate(`/`)}>Input Form</li>
                        <li className='output'onClick={()=>navigate(`/OutputPage`)}>Result</li>
                    </ul>
                </div>
            </div>
        </header>
        </>
    );
};

export default Header;
