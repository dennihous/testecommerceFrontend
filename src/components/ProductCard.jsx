import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAdd }) {
  // This separates out products from the main home page
  // takes in product and ability to add so that home page can be populated
  // contains buttons so that basket can be populated
  // onAdd is uses an event listener to update the basket
  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>£{product.price}</Card.Text>
        <div className="mt-auto d-flex flex-column align-items-center justify-content-center gap-3">
          <Link className="btn btn-primary" to={`/products/${product.id}`}>
            View
          </Link>

          <Button onClick={() => onAdd(product)}>
            Add to Basket
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}