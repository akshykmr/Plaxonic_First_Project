import "./Header.scss";
import { useNavigate } from 'react-router-dom';




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
                        <li className='output'onClick={()=>navigate(`/ListView`)}>List View</li>
                        <li className='output'onClick={()=>navigate(`/OutputPage`)}>Grid View</li>
                    </ul>
                </div>
            </div>
        </header>
        </>
    );
};

export default Header;