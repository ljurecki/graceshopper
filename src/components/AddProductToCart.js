// based off AttachActivity.js in Fitness Tracker
import React, { useState, useEffect } from 'react';
import { addProductToCart, getAllProducts } from '../api';
import {
  Form,
  FloatingLabel,
  Button,
  Modal,
  Row,
  Col,
  Dropdown,
  Alert,
} from 'react-bootstrap';

const AddProductToCart = ({ product, jwt, updateCurrentProduct }) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedProductTitle, setSelectedProductTitle] = useState('');
  const [quantity, setQuantity] = useState('');

  const [cartProductList, setCartProductList] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchCartProductList = async () => {
    setCartProductList(await getAllProducts());
  };

  useEffect(() => {
    fetchCartProductList();
  }, []);

  const handleSubmit = async () => {
    if (!title || !qty) {
      console.error('Please select a title');
      setErrorMessage('Please select a quantity');
      return;
    }
    const cartProduct = selectedProduct;
    selectedProduct.title = title;
    selectedProduct.qty = qty;
    const result = await addProductToCart(selectedProduct.title, selectedProduct.qty, jwt);

    if (!result.error) {
      setSuccessMessage('Product Added!');
      setErrorMessage('');
      setTimeout(() => {
        closeModal();
        updateCurrentRoutine();
      }, 1000);
    } else {
      console.error(result.error);
      setErrorMessage('Product Already Added!');
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setSuccessMessage('');
          setTitle('');
          setQty('');
          setSelectedProductTitle('');
          setSelectedProduct('');
          setErrorMessage('');
          openModal();
        }}>
        Add Product
      </Button>
</> )};
      {/* <Modal show={showModal} onHide={closeModal}>
        <Modal.Header style={{ fontSize: '20px' }} closeButton>
          <Modal.Title className='w-100 text-center'>
            Add Product to Cart
          </Modal.Title>
        </Modal.Header>

        <Form>
          <Form.Group as={Row} className='m-3'>
            <Col className='p-0' sm='3'>
              <Dropdown>
                <Dropdown.Toggle variant='success'>Title</Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    maxHeight: '15rem',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    width: '483px',
                  }}>
                  {cartProductList && cartProductList.length && (
                    <>
                      <Form.Control
                        autoFocus
                        className='mx-3 my-2 sticky-top'
                        style={{ width: '93%' }}
                        placeholder='Type to filter...'
                        onChange={e => setSearchValue(e.target.value)}
                        value={searchValue}
                      />
                      {cartProductList.map(product => {
                        if (
                          activity.name.toLowerCase().startsWith(searchValue)
                        ) {
                          return (
                            <Dropdown.Item
                              key={activity.id}
                              onClick={() => {
                                setSelectedProduct(product);
                                setSelectedProductTitle(product.title);
                              }}>
                              {product.title}
                            </Dropdown.Item>
                          );
                        }
                      })}
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Col> */}

            // <Col className='p-0' sm='9'>
            //   <Form.Control
            //     id='ProductToAttach'
            //     placeholder='Product Title'
            //     plaintext
            //     disabled
            //     value={selectedProductTitle}
            //   />
            // </Col>
          // </Form.Group>
<Form>
          <Form.Group className='m-3' as={Row}>
            <Col className='ps-0 pe-1'>
              <FloatingLabel label='Quantity'>
                <Form.Control
                  id='qty'
                  placeholder='Quantity'
                  required
                  onChange={e => setQuantity(e.target.value)}
                  value='qty'
                />
              </FloatingLabel>
            </Col>
          </Form.Group>

          <Form.Group className='m-3 d-flex justify-content-end'>
            <Button variant='success' onClick={() => handleSubmit()}>
              Add Product
            </Button>
          </Form.Group>
        </Form>

        // {errorMessage && <Alert variant='danger'>{error}</Alert>}
        // {successMessage && (
        //   <Alert variant='success' className='mt-3'>
        //     {successMessage}
        //   </Alert>
        // )}
  
    //   </Modal>
    // </>
  // );
// };

export default AddProductToCart;
