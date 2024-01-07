import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Button, Navbar, Spinner, Alert, Modal, Form, InputGroup, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../App.css'; // Import the CSS file for styling

interface Shelter {
    _id?: string;
    id?: number;
    name: string;
    locationId: number;
    contactInformation: string;
    operatingHours: string;
    imageUrl?: string;
}

const SheltersPage = () => {
    const [shelters, setShelters] = useState<Shelter[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [currentShelter, setCurrentShelter] = useState<Shelter | null>(null);
    const [newShelter, setNewShelter] = useState<Shelter>({
        name: '',
        locationId: 0,
        contactInformation: '',
        operatingHours: '',
        imageUrl: ''
    });
    const [newShelterIdInput, setNewShelterIdInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchShelters = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/shelter/');
            setShelters(response.data);
            setError(null);
        } catch (error) {
            setError('Failed to fetch shelters');
        } finally {
            setLoading(false);
        }
    };

    const updateShelter = async (_id: string, updatedShelter: Shelter) => {
        setLoading(true);
        try {
            await axios.put(`http://localhost:3000/shelter/${_id}`, updatedShelter);
            fetchShelters();
            setError(null);
        } catch (error) {
            setError('Failed to update shelter');
        } finally {
            setLoading(false);
            setShowUpdateModal(false);
        }
    };

    const deleteShelter = async (_id: string) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:3000/shelter/${_id}`);
            fetchShelters();
            setError(null);
        } catch (error) {
            setError('Failed to delete shelter');
        } finally {
            setLoading(false);
        }
    };

    const addShelter = async (shelter: Shelter) => {
        setLoading(true);
        try {
            await axios.post('http://localhost:3000/shelter/', shelter);
            fetchShelters();
            setError(null);
        } catch (error) {
            setError('Failed to add new shelter');
        } finally {
            setLoading(false);
            setShowAddModal(false);
        }
    };

    useEffect(() => {
        fetchShelters();
    }, []);

    const handleUpdateClick = (shelter: Shelter) => {
        setCurrentShelter(shelter);
        setShowUpdateModal(true);
    };

    const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentShelter((prev) => ({
            ...prev,
            [name]: value,
        } as Shelter));
    };

    const handleUpdateSubmit = () => {
        if (currentShelter && currentShelter._id) {
            updateShelter(currentShelter._id, currentShelter);
        }
    };

    const handleAddShelterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewShelter((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddShelterSubmit = () => {
        if (!newShelterIdInput) {
            setError('Please provide a unique ID for the shelter');
            return;
        }
        if (isNaN(Number(newShelterIdInput))) {
            setError('ID must be a number');
            return;
        }
        const id = parseInt(newShelterIdInput, 10);
        addShelter({ ...newShelter, id: id });
        setNewShelter({
            name: '',
            locationId: 0,
            contactInformation: '',
            operatingHours: '',
        }); // Reset the form after submission
        setNewShelterIdInput(''); // Reset the ID input
    };


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Filtered list of shelters based on the search term
    const filteredShelters = searchTerm
        ? shelters.filter((shelter) =>
            shelter.id
        )
        : shelters;
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">ShelterFinder</Navbar.Brand>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Search for nearby shelters"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </InputGroup>
                </Container>
            </Navbar>
            <Container className="py-5">
                <Button variant="primary" className="mb-3" onClick={() => setShowAddModal(true)}>Add Shelter</Button>
                {error && <Alert variant="danger">{error}</Alert>}
                {loading ? (
                    <Spinner animation="border" />
                ) : (
                    <Row xs={1} md={2} lg={3} className="g-4"> {/* Adjust grid layout as needed */}
                        {filteredShelters.map((shelter) => (
                            <Col key={shelter._id}>
                                <Card className="h-100 shelter-card">
                                    <Card.Img variant="top" src={shelter.imageUrl || 'default-image-url.jpg'} /> {/* Add this line */}
                                    <Card.Header as="h5">{shelter.name}</Card.Header><Card.Body>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>ID: {shelter.id}</ListGroup.Item>
                                        <ListGroup.Item>Name: {shelter.name}</ListGroup.Item>
                                        <ListGroup.Item>Location ID: {shelter.locationId}</ListGroup.Item>
                                        <ListGroup.Item>Contact information: {shelter.contactInformation}</ListGroup.Item>
                                        <ListGroup.Item>Operating Hours: {shelter.operatingHours}</ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                                    <Card.Footer>
                                        <Button variant="success" onClick={() => handleUpdateClick(shelter)}>Update</Button>
                                        <Button variant="danger" onClick={() => shelter._id && deleteShelter(shelter._id)}>Delete</Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
            {/*<Container className="py-5">*/}
            {/*    <Button variant="primary" className="mb-3" onClick={() => setShowAddModal(true)}>Add Shelter</Button>*/}
            {/*    {error && <Alert variant="danger">{error}</Alert>}*/}
            {/*    {loading ? (*/}
            {/*        <Spinner animation="border" />*/}
            {/*    ) : (*/}
            {/*        shelters.map((shelter) => (*/}
            {/*            <Card key={shelter._id} className="mb-3">*/}
            {/*                <Card.Header as="h5">{shelter.name}</Card.Header>*/}
            {/*                <Card.Body>*/}
            {/*                    <ListGroup variant="flush">*/}
            {/*                        <ListGroup.Item>ID: {shelter.id}</ListGroup.Item>*/}
            {/*                        <ListGroup.Item>Name: {shelter.name}</ListGroup.Item>*/}
            {/*                        <ListGroup.Item>Location ID: {shelter.locationId}</ListGroup.Item>*/}
            {/*                        <ListGroup.Item>Contact information: {shelter.contactInformation}</ListGroup.Item>*/}
            {/*                        <ListGroup.Item>Operating Hours: {shelter.operatingHours}</ListGroup.Item>*/}
            {/*                    </ListGroup>*/}
            {/*                </Card.Body>*/}
            {/*                <Card.Footer>*/}
            {/*                    <Button variant="success" onClick={() => handleUpdateClick(shelter)}>Update</Button>*/}
            {/*                    <Button variant="danger" onClick={() => shelter._id && deleteShelter(shelter._id)}>Delete</Button>*/}
            {/*                </Card.Footer>*/}
            {/*            </Card>*/}
            {/*        ))*/}
            {/*    )}*/}
            {/*</Container>*/}
            {/* Add New Shelter Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Shelter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter unique shelter ID"
                                value={newShelterIdInput}
                                onChange={(e) => setNewShelterIdInput(e.target.value)}
                            />
                        </Form.Group>
                        {/*<Form.Group className="mb-3">*/}
                        {/*    <Form.Label>ID</Form.Label>*/}
                        {/*    <Form.Control*/}
                        {/*        type="text"*/}
                        {/*        placeholder="Enter unique shelter ID"*/}
                        {/*        value={newShelterIdInput}*/}
                        {/*        onChange={(e) => setNewShelterIdInput(e.target.value)}*/}
                        {/*    />*/}
                        {/*</Form.Group>*/}

                        {/* Name Field */}
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter shelter name"
                                name="name"
                                value={newShelter.name}
                                onChange={handleAddShelterChange}
                            />
                        </Form.Group>

                        {/* Location ID Field */}
                        <Form.Group className="mb-3">
                            <Form.Label>Location ID</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter location ID"
                                name="locationId"
                                value={newShelter.locationId.toString()}
                                onChange={handleAddShelterChange}
                            />
                        </Form.Group>

                        {/* Contact Information Field */}
                        <Form.Group className="mb-3">
                            <Form.Label>Contact Information</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter contact information"
                                name="contactInformation"
                                value={newShelter.contactInformation}
                                onChange={handleAddShelterChange}
                            />
                        </Form.Group>

                        {/* Operating Hours Field */}
                        <Form.Group className="mb-3">
                            <Form.Label>Operating Hours</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter operating hours"
                                name="operatingHours"
                                value={newShelter.operatingHours}
                                onChange={handleAddShelterChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter image URL"
                                name="imageUrl"
                                value={newShelter.imageUrl}
                                onChange={handleAddShelterChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddShelterSubmit}>Add Shelter</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Shelter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentShelter && (
                        <Form>
                            {/* Since ID is typically not updated, it's not included here. If needed, add it similarly to the Add Shelter form */}
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={currentShelter.name}
                                    onChange={handleUpdateChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Location ID</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="locationId"
                                    value={currentShelter.locationId.toString()}
                                    onChange={handleUpdateChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Contact Information</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="contactInformation"
                                    value={currentShelter.contactInformation}
                                    onChange={handleUpdateChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Operating Hours</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="operatingHours"
                                    value={currentShelter.operatingHours}
                                    onChange={handleUpdateChange}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleUpdateSubmit}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SheltersPage;
