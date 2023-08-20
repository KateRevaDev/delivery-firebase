import { Button, Card, CloseButton } from "react-bootstrap";
import Holder from "../../assets/holder286x180.svg"
import AnimatedHolder from "../../assets/holder.gif"
import { useState } from "react";
import TextTruncate from "react-text-truncate";
import { Rating } from "@mui/material";

const Products = ({ products, addToCart, removeProduct, isAdmin }) => {
    return (
        <div className="products">
            {products.length
                ? products.map(item => <Product item={item} addToCart={addToCart} removeProduct={removeProduct} key={item.id} isAdmin={isAdmin} />)
                : <span>Nothing here...</span>
            }
        </div>
    );
};

const Product = ({ item, addToCart, removeProduct, isAdmin }) => {
    const { price, currency, name, description, imageURL, rate } = item;
    const [isImgLoaded, setImgIsImgLoaded] = useState(false);
    const [rating, setRating] = useState(rate || 5);
    return (
        <Card className="product-item" >
            {isAdmin && <CloseButton onClick={() => removeProduct(item)} />}
            <Card.Img
                className="product-item__img"
                variant="top"
                onLoad={() => setImgIsImgLoaded(true)}
                src={isImgLoaded ? (imageURL ? imageURL : Holder) : (imageURL ? AnimatedHolder : Holder)}
            />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text className="product-item__description">
                    <TextTruncate
                        line={2}
                        element="span"
                        truncateText="..."
                        text={description}
                    />
                </Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                    {price || 0} {' '} {currency || "UAH"}
                </Card.Subtitle>
                <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
                <Button variant="outline-dark" onClick={() => addToCart(item)}>Add to cart</Button>
            </Card.Body>
        </Card>
    );
};

export default Products;