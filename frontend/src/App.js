import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <div className='container container-fluid'>
          <Route path='/' exact component={Home} />
          <Route path='/product/:id' exact component={ProductDetails} />
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
