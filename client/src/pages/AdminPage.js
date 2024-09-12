import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CreateCity from '../components/modals/CreateCity'; 
import CreateAdmin from '../components/modals/CreateAdmin';
import CreateProduct from '../components/modals/CreateProduct'; 
import CreateCombo from '../components/modals/CreateCombo'; 

const Admin = () => {
    const [showCreateCityModal, setShowCreateCityModal] = useState(false);
    const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
    const [showCreateProductModal, setShowCreateProductModal] = useState(false);
    const [showCreateComboModal, setShowCreateComboModal] = useState(false);

    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <h2>Admin Panel</h2>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <h4>Create City</h4>
                    <Button variant="primary" onClick={() => setShowCreateCityModal(true)}>Create City</Button>
                    <CreateCity show={showCreateCityModal} onHide={() => setShowCreateCityModal(false)} />
                </Col>
                <Col>
                    <h4>Create Admin</h4>
                    <Button variant="primary" onClick={() => setShowCreateAdminModal(true)}>Create Admin</Button>
                    <CreateAdmin show={showCreateAdminModal} onHide={() => setShowCreateAdminModal(false)} />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <h4>Create Product</h4>
                    <Button variant="primary" onClick={() => setShowCreateProductModal(true)}>Create Product</Button>
                    <CreateProduct show={showCreateProductModal} onHide={() => setShowCreateProductModal(false)} />
                </Col>
                <Col>
                    <h4>Create Combo</h4>
                    <Button variant="primary" onClick={() => setShowCreateComboModal(true)}>Create Combo</Button>
                    <CreateCombo show={showCreateComboModal} onHide={() => setShowCreateComboModal(false)} />
                </Col>
            </Row>
        </Container>
    );
};

export default Admin;
