import ShoppingCart from '../components/flights/ShoppingCart';
import FlightPubHome from '../pages/FlightPubHome';
import { useState } from 'react';

function Cart(props) {
    const { flightItems} = props;
    const [cartItems, setCartItems] = useState([]);
    const onAdd = (item) => {
        const exist = cartItems.find((x) => x.id === props.flightId);
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x.id === props.flightId ? { ...exist, qty: exist.qty + 1 } : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...item, qty: 1 }]);
        }
    };
    const onRemove = (item) => {
        const exist = cartItems.find((x) => x.id === props.flightId);
        if (exist.qty === 1) {
            setCartItems(cartItems.filter((x) => x.id !== props.flightId));
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x.id === props.flightId ? { ...exist, qty: exist.qty - 1 } : x
                )
            );
        }
    };
    return (
        <div className="App">
            countCartItems={cartItems.length}
            <div className="row">
                flightItems={flightItems} onAdd={onAdd}
                <ShoppingCart>
                    cartItems={cartItems}
                    onAdd={onAdd}
                    onRemove={onRemove}
                </ShoppingCart>
            </div>
        </div>
    );
}

export default Cart;