import { useEffect, useState } from 'react';
import api from '../services/api';
import { Modal, Button, Form, Table } from 'react-bootstrap';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '', description: '', price: '', stock: ''
  });
  const [busy, setBusy]         = useState(false);
  const [alert, setAlert]       = useState('');

  const load = () =>
    api.get('/products').then(r => setProducts(r.data));

  const openCreate = () => {
    setEditing(null);
    setForm({ name:'', description:'', price:'', stock:'' });
    setShow(true);
  };

  const openEdit = p => {
    setEditing(p);
    setForm({
      name: p.name,
      description: p.description ?? '',
      price: p.price,
      stock: p.stock
    });
    setShow(true);
  };

  const save = async () => {
    try {
      setBusy(true);
      if (editing) {
        await api.put(`/products/${editing.id}`, {
          id:    editing.id,
          ...form,
          price: Number(form.price),
          stock: Number(form.stock)
        });
      } else {
        await api.post('/products', {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock)
        });
      }
      setShow(false);
      load();
      setAlert('Saved');
    } catch {
      setAlert('Failed to save');
    } finally {
      setBusy(false);
    }
  };

  const remove = async id => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      load();
    } catch {
      setAlert('Delete failed');
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container mt-3">
      <h2 className="mb-3">Admin Dashboard</h2>

      {alert && <p>{alert}</p>}

      <Button className="mb-3" onClick={openCreate}>＋ New product</Button>

      <Table bordered hover size="sm">
        <thead className="table-light">
          <tr>
            <th>Name</th><th>Price</th><th>Stock</th><th style={{width:120}} />
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>£{p.price.toFixed(2)}</td>
              <td>{p.stock}</td>
              <td>
                <Button variant="outline-secondary" size="sm" onClick={() => openEdit(p)}>
                  Edit
                </Button>{' '}
                <Button variant="outline-danger"   size="sm" onClick={() => remove(p.id)}>
                  Del
                </Button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr><td colSpan={4} className="text-center">No products</td></tr>
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Edit product' : 'New product'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea" rows={2}
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" step="0.01"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number"
                value={form.stock}
                onChange={e => setForm({ ...form, stock: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          <Button variant="primary" onClick={save} disabled={busy}>
            {busy ? 'Saving…' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}