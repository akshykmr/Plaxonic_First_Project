import "./Header.scss";
const Header = () => {
    return  (
      <>
        <header className='main-header'> 
            <div className="header-content">
                <div className="left"><div className="logo">Car Details</div>
                </div>
                <div className="right">
                    <ul>
                        <li>Input Form</li>
                        <li>Result</li>
                    </ul>
                </div>
            </div>
        </header>
        </>
    );
};

export default Header;
