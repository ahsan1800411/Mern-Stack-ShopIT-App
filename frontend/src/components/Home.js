import React, { useEffect } from "react";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "./product/Product";
import Loader from "./layout/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title='Buy Best Products Online' />
          <h1 id='products_heading'>Latest Products</h1>
          <section id='products' className='container mt-5'>
            <div className='row'>
              {products &&
                products.map((product) => {
                  return <Product key={product._id} product={product} />;
                })}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
