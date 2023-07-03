
import { useState } from "react";
import CartItem from "./CartItem";

const CartItems = ({ order, removeItemFromCart, updateOrder, createOrder }) => {

    const [name, setName] = useState(order.name);
    const [email, setEmail] = useState(order.email);
    const [phone, setPhone] = useState(order.phone);
    const [address, setAddress] = useState(order.address);

    return (<>
        {
            order.goods.length ? (
                <div className="cart">
                    <div className="cart-details">
                        <div className="cart-field">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                className="cart-input"
                                defaultValue={name}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={() => updateOrder({ field: "name", value: name })}
                            />
                        </div>
                        <div className="cart-field">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="cart-input"
                                defaultValue={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => updateOrder({ field: "email", value: email })}
                            />
                        </div>
                        <div className="cart-field">
                            <label htmlFor="phone">Phone</label>
                            <input
                                id="phone"
                                type="tel"
                                className="cart-input"
                                defaultValue={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                onBlur={() => updateOrder({ field: "phone", value: phone })}
                            />
                        </div>
                        <div className="cart-field">
                            <label htmlFor="address">Address</label>
                            <input
                                id="address"
                                className="cart-input"
                                defaultValue={address}
                                onChange={(e) => setAddress(e.target.value)}
                                onBlur={() => updateOrder({ field: "address", value: address })}
                            />
                        </div>
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
                            <div className="cart-total">
                                <span>Total:</span>
                                <span>{order.total}</span>
                            </div>
                            <button
                                onClick={() => createOrder(order)}
                                className="button cart-button"
                            >
                                Create an order
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <span>Your cart is empty...</span>
            )
        }
    </>
    );

}

export default CartItems;
