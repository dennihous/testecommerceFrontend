import { useContext } from 'react';
import { BasketContext } from '../contexts/BasketContext';
import api from '../services/api';

export default function BasketPage() {
  const { items, removeItem, increment, decrement, clear } = useContext(BasketContext);

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
       <div key={i.product.id}
            className="d-flex justify-content-between align-items-center mb-2">
         <div>
           {i.product.name}
           <span className="ms-2 badge bg-secondary">{i.qty}</span>
         </div>
         <div>
           <button className="btn btn-outline-secondary btn-sm me-1"
                   onClick={() => decrement(i.product.id)}
                   disabled={i.qty === 1}>−</button>

           <button className="btn btn-outline-secondary btn-sm me-3"
                   onClick={() => increment(i.product.id)}
                   disabled={i.qty === i.product.stock}>＋</button>

           <button className="btn btn-outline-danger btn-sm"
                   onClick={() => removeItem(i.product.id)}>Remove</button>
         </div>
        </div>
      ))}
      <button className="btn btn-success mt-3" onClick={checkout}>Checkout</button>
    </div>
  );
}