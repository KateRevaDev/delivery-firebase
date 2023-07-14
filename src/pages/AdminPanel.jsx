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
    const [goodName, setGoodName] = useState('');
    const [goodDescription, setGoodDescription] = useState('');
    const [goodPrice, setGoodPrice] = useState(0);
    const [shopId, setShopId] = useState(shops.length ? shops[0].id : null);

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
                <Tab eventKey="add-good" title="Add Good">
                    <Form className="m-3">
                        <Form.Label>Good name</Form.Label>
                        <Form.Control type="text" name="goodName" value={goodName} onChange={(e) => setGoodName(e.target.value)} />
                        <Form.Label>Good description</Form.Label>
                        <Form.Control
                            type="text"
                            name="goodDescription"
                            as="textarea"
                            rows={3}
                            value={goodDescription}
                            onChange={(e) => setGoodDescription(e.target.value)}
                        />
                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                        <Form.Label className="mt-2">Good price</Form.Label>
                        <Form.Control type="number" name="goodPrice" value={goodPrice} onChange={(e) => setGoodPrice(e.target.value)} />
                        <Form.Label className="mt-2">Shop</Form.Label>
                        <Form.Select name="shopId" value={shopId} onChange={(e) => setShopId(e.target.value)} >
                            {shops.map(item => <option key={`shop-${item.id}`} value={item.id}>{item.name}</option>)}
                        </Form.Select>
                        <Button
                            variant="outline-dark"
                            onClick={() => addGood({ name: goodName, price: goodPrice, shopId, description: goodDescription })}
                            className="mt-2"
                        >
                            Add good
                        </Button>
                    </Form>
                </Tab>
            </Tabs>
        </>
    );
};

export default AdminPanel;