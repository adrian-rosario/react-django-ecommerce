import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ product_data }) {
  return (
    <>
      <Card className='my-3 p-3 rounded product_card'>
        <div>
          <Link to={`/product/${product_data.id}`}>
            {product_data.uploadedImage ? (
              <Card.Img src={product_data.uploadedImage} />
            ) : (
              <Card.Img src={product_data.image} />
            )}
          </Link>
        </div>

        <div>
          <Card.Body>
            <Link to={`/product/${product_data.id}`}>
              <Card.Title as='div'>
                <strong>{product_data.name}</strong>
              </Card.Title>
            </Link>
            <Card.Text as='div'>
              <Rating
                rating={product_data.rating}
                reviews={product_data.numReviews}
                star_color={`rgb(253, 168, 0)`}
              ></Rating>
            </Card.Text>

            <Card.Text as='h3'>${product_data.price}</Card.Text>
          </Card.Body>
        </div>
      </Card>
    </>
  );
}

export default Product;
