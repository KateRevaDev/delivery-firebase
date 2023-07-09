
import { useState } from "react";
import CartItem from "./CartItem";
import { Button, Col, Form, Row } from "react-bootstrap";

const CartItems = ({ order, removeItemFromCart, updateOrder, createOrder }) => {

    const [name, setName] = useState(order.name);
    const [email, setEmail] = useState(order.email);
    const [phone, setPhone] = useState(order.phone);
    const [address, setAddress] = useState(order.address);

    return (<>
        {order.goods.length ? (
            <div className="cart">
                <div className="cart-details">
                    <Form className="m-3">
                        <CartRow
                            label="Name"
                            control={{
                                type: "text",
                                name: "name",
                                defaultValue: name,
                                onChange: setName,
                                onBlur: updateOrder,
                            }}
                        />
                        <CartRow
                            label="Email"
                            control={{
                                type: "email",
                                name: "email",
                                defaultValue: email,
                                onChange: setEmail,
                                onBlur: updateOrder,
                            }}
                        />
                        <CartRow
                            label="Phone"
                            control={{
                                type: "tel",
                                name: "phone",
                                defaultValue: phone,
                                onChange: setPhone,
                                onBlur: updateOrder,
                            }}
                        />
                        <CartRow
                            label="Address"
                            control={{
                                type: "address",
                                name: "address",
                                defaultValue: address,
                                onChange: setAddress,
                                onBlur: updateOrder,
                            }}
                        />
                    </Form>
                </div>

                <div className="cart-content">
                    <div className="cart-list">
                        {order?.goods.map((item) => (
                            <CartItem
                                key={`cart-item${item.id}`}
                                item={item}
                                removeItemFromCart={removeItemFromCart}
                                updateOrder={updateOrder}
                            />
                        ))}
                    </div>

                    <div className="cart-footer">
                        <div>
                            <span  className="cart-total">Total:</span>
                            <span>{' '}{order.total}</span>
                        </div>
                        <Button
                            onClick={() => createOrder(order)}
                            className="button cart-button"
                            variant="dark"
                        >
                            Create an order
                        </Button>
                    </div>
                </div>
            </div>
        ) : (
            <span>Your cart is empty...</span>
        )
        }
    </>
    );
};

const CartRow = ({ label, control }) => {
    const { type, name, defaultValue, onChange, onBlur } = control;
    return (
        <Form.Group as={Row} className="mt-2" >
            <Form.Label column sm="2">{label}</Form.Label>
            <Col sm="10">
                <Form.Control
                    type={type}
                    name={name}
                    defaultValue={defaultValue}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={() => onBlur({ field: name, value: defaultValue })}
                />
            </Col>
        </Form.Group>
    );
}

export default CartItems;
