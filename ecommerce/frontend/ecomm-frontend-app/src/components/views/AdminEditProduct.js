import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FormLoginRegister from "./FormLoginRegister";
import { Form, Button, Image, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../state/actions/product_detail";
import AlertMessage from "./AlertMessage";
import Loading from "./Loading";
import { constants } from "../../utl/constants";
import { adminEditProduct } from "../../state/actions/product";
import axios from "axios";

// import { admin_get_user_details } from "../../state/actions/user";

export default function AdminEditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  const [uploadedImage, setUploadedImage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const userInformation = useSelector((state) => state.userLogin);
  const { error: userInformationError, /*loading,*/ userDetails } =
    userInformation;

  const productItem = useSelector((state) => state.productItem);
  const { error: productError, loading: productLoading, product } = productItem;

  const adminEditProductState = useSelector((state) => state.adminEditProduct);
  const {
    error: adminEditProductError,
    loading: adminEditProductLoading,
    success: adminEditProductSuccess,
  } = adminEditProductState;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      adminEditProduct({
        id,
        name,
        image,
        description,
        brand,
        category,
        price,
        countInStock,
      })
    );
  };

  const handleImageUpload = async (e) => {
    console.log("handle image uploade for: ", userDetails.is_admin);

    const imageFile = e.target.files[0];
    const formData = new FormData();

    formData.append("uploadedImage", imageFile);
    formData.append("productId", id);

    setImageUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userDetails.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/admin/upload-product-image/",
        formData,
        config
      );

      setUploadedImage(data);
      setImageUploading(false);
    } catch (error) {
      console.log(error);
      setImageUploading(false);
    }
  };

  // if (error) console.log(error);
  // if (productError) console.log(productError);

  useEffect(() => {
    if (!userDetails.is_admin || userInformationError) {
      navigate("/login");
    }
    // console.log(userDetails.is_admin);
    // console.log(userDetails.token);

    if (adminEditProductSuccess) {
      dispatch({ type: constants.PRODUCT_ADMIN_EDIT_PRODUCT_RESET });
      navigate("/admin-edit-products");
    }

    if (userDetails === null || userDetails.is_admin === undefined) {
      navigate("/login");
    }

    if (!productLoading && product === null) {
      dispatch(listProduct(id));
    }

    if (!productLoading && product) {
      if (Number(product.id) !== Number(id)) {
        // console.log("numbers dont match");
        dispatch(listProduct(id));
      }

      if (!productLoading && Number(product.id) === Number(id)) {
        // console.log("numbers match");
        setName(product.name);
        setImage(product.image);
        setUploadedImage(product.uploadedImage);
        setDescription(product.description);
        setBrand(product.brand);
        setCategory(product.category);
        setPrice(product.price);
        setCountInStock(product.countInStock);
      }
    }
  }, [
    dispatch,
    id,
    navigate,
    userDetails,
    product,
    productLoading,
    adminEditProductSuccess,
    userInformationError,
  ]);
  return (
    <div>
      <Link to='/admin-edit-products'>Go Back</Link>
      <FormLoginRegister>
        <h3>Edit Product, Admin</h3>

        {productError && (
          <AlertMessage variant='danger'>{productError}</AlertMessage>
        )}
        {productLoading && <Loading />}

        {adminEditProductError && (
          <AlertMessage variant='danger'>{adminEditProductError}</AlertMessage>
        )}
        {adminEditProductLoading && <Loading />}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='name'>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image' className='mt-4'>
            <Form.Label>Default Image:</Form.Label>
            <Row>
              <Col md={6}>
                <Form.Control
                  type='text'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
              </Col>
              <Col md={4}>
                {product.image && (
                  <Image
                    src={product.image}
                    alt='Default Image'
                    fluid
                    className='border border-success'
                  />
                )}
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId='uploadedImage' className='mt-4'>
            <Row>
              <Col md={6}>
                Current Uploaded Image: "
                {product.uploadedImage ? product.uploadedImage : "None"}"
                <Form.Label className='mt-4'>Upload New Image:</Form.Label>
                <Form.Control
                  type='file'
                  label='Uploaded Image'
                  onChange={handleImageUpload}
                ></Form.Control>
                {imageUploading && <Loading />}
              </Col>
              <Col md={4}>
                {product.uploadedImage && (
                  <Image
                    src={product.uploadedImage}
                    alt='Current Image'
                    fluid
                    className='border border-success'
                  />
                )}
                {uploadedImage && (
                  <Image
                    src={uploadedImage}
                    alt='Current Image'
                    fluid
                    className='border border-success'
                  />
                )}
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type='text'
              as='textarea'
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='brand'>
            <Form.Label>Brand:</Form.Label>
            <Form.Control
              type='text'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='category'>
            <Form.Label>Category:</Form.Label>
            <Form.Control
              type='text'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Label>Price:</Form.Label>
            <Form.Control
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='countInStock'>
            <Form.Label>Count In Stock:</Form.Label>
            <Form.Control
              type='number'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='mt-3'>
            Update
          </Button>
        </Form>
      </FormLoginRegister>
    </div>
  );
}
