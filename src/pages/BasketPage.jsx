import { useContext } from 'react';
import { BasketContext } from '../contexts/BasketContext';
import api from '../services/api';

export default function BasketPage() {
  const { items, removeItem, clear } = useContext(BasketContext);

  const checkout = async () => {
    const order = {
      customerId: 1,
      orderItems: items.map(i => ({ productId: i.product.id, quantity: i.qty, unitPrice: i.product.price }))
    };
    await api.post('/orders', order);
    clear();
    alert('Order placed!');
  };

  return (
    <div>
      <h2>Your Basket</h2>
      {items.map(i => (
        <div key={i.product.id} className="d-flex justify-content-between">
          <span>{i.product.name} x {i.qty}</span>
          <button className="btn btn-sm btn-danger" onClick={() => removeItem(i.product.id)}>Remove</button>
        </div>
      ))}
      <button className="btn btn-success mt-3" onClick={checkout}>Checkout</button>
    </div>
  );
}