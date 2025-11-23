import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import { useGetProductDetailsQuery } from "../../slices/productDetailsApiSlice";
import { FormContainer } from "../../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import Loader from "../../components/loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";

export const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [uploadProductImage, { isLoading: laodingUpload }] =
    useUploadProductImageMutation();
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };

    try {
      const result = await updateProduct(updatedProduct);
      if (result.error) {
        toast.error(result.error?.data?.message || result.error.error);
      } else {
        toast.success("Product updated successfully");
        refetch();
        navigate("/admin/productslist");
      }
    } catch (err) {
      toast.error("Failed to update product");
    }
  };

  const uploadImage = async (e) => {
    const formData = new FormData();

    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.image);
      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link
        to="/admin/productslist"
        className="btn btn-light my-3 app-go-back-btn"
      >
        go back
      </Link>
      <FormContainer className="app-auth-container-custom">
        <h1 className="app-auth-heading">Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label className="fw-bold">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="app-form-control-custom"
              />
            </Form.Group>
            <Form.Group controlId="price" className="my-2">
              <Form.Label className="fw-bold">Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="app-form-control-custom"
              />
            </Form.Group>
            <Form.Group controlId="image" className="my-2">
              <Form.Label className="fw-bold">Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="app-form-control-custom"
              />
              <Form.Control
                type="file"
                onChange={uploadImage}
                className="app-form-control-custom mt-2"
              />
              {laodingUpload && <Loader />}
            </Form.Group>
            <Form.Group controlId="brand" className="my-2">
              <Form.Label className="fw-bold">Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="app-form-control-custom"
              />
            </Form.Group>
            <Form.Group controlId="category" className="my-2">
              <Form.Label className="fw-bold">Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="app-form-control-custom"
              />
            </Form.Group>
            <Form.Group controlId="countInStock" className="my-2">
              <Form.Label className="fw-bold">Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
                className="app-form-control-custom"
              />
            </Form.Group>
            <Form.Group controlId="description" className="my-2">
              <Form.Label className="fw-bold">Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="app-form-control-custom"
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="my-2 w-100 app-auth-btn-custom"
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};
