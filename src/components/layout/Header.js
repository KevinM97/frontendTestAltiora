import React, { Fragment , useState} from "react";
import '../../App.css'
const Header = () => {
  const [selectedTab, setSelectedTab] = useState("Productos");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <img src="/images/Logotipo-Altiora.png" alt="logo" style={{width:'40%'}}/>
          </div>
        </div>


        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">

        <nav className="nav">
            <a 
              href="clientes" 
              className={`nav-link ${selectedTab === "Clientes" ? "active" : ""}`}
              onClick={() => handleTabClick("Clientes")}
            >
              Clientes
            </a>
            <a 
              href="ordenes" 
              className={`nav-link ${selectedTab === "Ordenes" ? "active" : ""}`}
              onClick={() => handleTabClick("Ordenes")}
            >
              Ordenes
            </a>
            <a 
              href="/" 
              className={`nav-link ${selectedTab === "Productos" ? "active" : ""}`}
              onClick={() => handleTabClick("Productos")}
            >
              Productos
            </a>
          </nav>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
