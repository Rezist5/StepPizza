import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { createCity } from '../../http/cityApi'; 

const CreateCity = ({ show, onHide }) => {
    const [name, setName] = useState('');
    const [countryId, setCountryId] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            await createCity(name, countryId);
            onHide();
        } catch (err) {
            setError('Failed to create city');
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Create City</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formCityName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter city name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCityCountryId">
                        <Form.Label>Country ID</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter country ID"
                            value={countryId}
                            onChange={(e) => setCountryId(e.target.value)}
                        />
                    </Form.Group>
                    {error && <p className="text-danger">{error}</p>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Create City
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCity;
