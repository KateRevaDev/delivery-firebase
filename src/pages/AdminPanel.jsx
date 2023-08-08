import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../saga/actions";
import { bindActionCreators } from "@reduxjs/toolkit";
import Header from "../components/Header";
import { Button, Form, Tab, Tabs } from "react-bootstrap";

function AdminPanel({ shops }) {

    const dispatch = useDispatch();
    const { addShop, addGood } = bindActionCreators(actions, dispatch);

    const [shopName, setShopName] = useState('');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [shopId, setShopId] = useState(shops.length ? shops[0].id : null);
    const [image, setImage] = useState('');

    return (
        <>
            <Header />
            <Tabs
                defaultActiveKey="add-shop"
                id="uncontrolled-tab-example"
            >
                <Tab eventKey="add-shop" title="Add Shop">
                    <Form className="m-3">
                        <Form.Label>Shop name</Form.Label>
                        <Form.Control type="text" placeholder="shop name" name="shopName" value={shopName} onChange={(e) => setShopName(e.target.value)} />
                        <Button
                            variant="outline-dark"
                            onClick={() => addShop({ shopName })}
                            className="mt-2"
                        >
                            Add shop
                        </Button>
                    </Form>
                </Tab>
                <Tab eventKey="add-product" title="Add Product">
                    <Form className="m-3">
                        <Form.Label>Product name</Form.Label>
                        <Form.Control type="text" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
                        <Form.Label>Product description</Form.Label>
                        <Form.Control
                            type="text"
                            name="productDescription"
                            as="textarea"
                            rows={3}
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                        />
                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={e => setImage(e.target.files[0])}
                            />
                        </Form.Group>
                        <Form.Label className="mt-2">Product price</Form.Label>
                        <Form.Control type="number" name="producrPrice" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                        <Form.Label className="mt-2">Shop</Form.Label>
                        <Form.Select name="shopId" value={shopId} onChange={(e) => setShopId(e.target.value)} >
                            {shops.map(item => <option key={`shop-${item.id}`} value={item.id}>{item.name}</option>)}
                        </Form.Select>
                        <Button
                            variant="outline-dark"
                            onClick={() => addGood({ name: productName, price: productPrice, shopId, description: productDescription, image: image })}
                            className="mt-2"
                        >
                            Add product
                        </Button>
                    </Form>
                </Tab>
            </Tabs>
        </>
    );
};

export default AdminPanel;