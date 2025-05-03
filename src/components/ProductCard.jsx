import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAdd }) {
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>£{product.price}</Card.Text>
        <Link to={`/products/${product.id}`} className="btn btn-primary me-2">View</Link>
        <Button onClick={() => onAdd(product)}>Add to Basket</Button>
      </Card.Body>
    </Card>
  );
}