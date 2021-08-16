import { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Resgister from "./components/user/Resgister";
import store from "./store";
import { loadUser } from "./actions/userActions";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <div className='container container-fluid'>
          <Route path='/' exact component={Home} />
          <Route path='/search/:keyword' component={Home} />
          <Route path='/product/:id' exact component={ProductDetails} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Resgister} />
          <ProtectedRoute path='/me' component={Profile} exact />
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
