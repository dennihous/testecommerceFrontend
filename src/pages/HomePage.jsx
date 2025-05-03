import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { BasketContext } from '../contexts/BasketContext';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const { addItem } = useContext(BasketContext);

  useEffect(() => { api.get('/products').then(r => setProducts(r.data)); }, []);

  return (
    <Container>
      <Row>
        {products.map(p => (
          <Col key={p.id} sm={6} md={4} lg={3} className="mb-4">
            <ProductCard product={p} onAdd={addItem} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}