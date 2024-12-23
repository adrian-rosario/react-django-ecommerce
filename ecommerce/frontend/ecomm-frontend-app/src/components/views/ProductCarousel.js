import React, { useEffect } from "react";
import { useDispatch, /*userDispatch,*/ useSelector } from "react-redux";
import { Carousel, Image } from "react-bootstrap";
import Loading from "./Loading";
import AlertMessage from "./AlertMessage";
import { listTopRatedProducts } from "../../state/actions/product";
import { Link } from "react-router-dom";

export default function ProductCarousel() {
  const dispatch = useDispatch();
  const topRatedFromStore = useSelector((state) => state.productTopProducts);
  const { loading, products, error } = topRatedFromStore;

  useEffect(() => {
    dispatch(listTopRatedProducts());
  }, [dispatch]);

  return (
    <div>
      {loading && <Loading />}
      {error && <AlertMessage variant='danger'>{error}</AlertMessage>}

      {products && (
        <Carousel pause='hover' className='carousel-inner'>
          {products.map((item) => (
            <Carousel.Item key={item.id}>
              <Link to={`/product/${item.id}`}>
                <Image src={item.image} alt={item.name} fluid />
                <Carousel.Caption className='carousel.caption'>
                  <h3>
                    {item.name} ${item.price}
                  </h3>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
}
