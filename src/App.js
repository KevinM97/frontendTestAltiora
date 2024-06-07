import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Clientes from "./components/Clientes";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import Ordenes from "./components/Ordenes";

function App() {
  return (

    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/ordenes" element={<Ordenes />} />
            <Route path="/addproducto" element={<AddProduct />} />
            <Route exact path="/editproduct/:id" component={EditProduct} />

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
    
  );
}

export default App;
