// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import '../App.css';
import { Card } from 'react-bootstrap';

// Define the interface for pet details
interface Pet {
  _id: string;
  petDetail: {
    name: string;
    type: string;
    breed: string;
    age: number;
    imageUrl: string;
  };
  status: string;
}

interface PetListModalProps {
  show: boolean;
  handleClose: () => void;
  pets: Pet[];
  handleAdopt: (petId: string) => void;
  adoptedPetIds: string[];
}

const PetListModal: React.FC<PetListModalProps> = ({ show, handleClose, pets, handleAdopt, adoptedPetIds }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);

  // Filter out the adopted pets
  const availablePets = pets.filter((pet) => !adoptedPetIds.includes(pet._id));

  useEffect(() => {
    // Filter pets based on the search query
    const filtered = availablePets.filter(
      (pet) =>
        pet.petDetail.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.petDetail.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.petDetail.breed.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredPets(filtered);
  }, [searchQuery, availablePets]);

  const handleAdoptClick = (petId: string) => {
    // Check if the pet is already adopted
    if (!adoptedPetIds.includes(petId)) {
      // If not adopted, trigger the handleAdopt function
      handleAdopt(petId);

      // Close the modal
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>List of Pets</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>

          {/* Search Bar */}

          <Form className="mb-3">
            <Form.Group controlId="search">
              <Form.Control
                type="text"
                placeholder="Search by pet name, type, or breed"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
          </Form>

          <Row>

            {/* Display filtered pets */}

            {filteredPets.map((pet) => (
              <Col key={pet._id} md={4} className="mb-3">
                <Card className="pet-card">
                  <Card.Img variant="top" src={pet.petDetail.imageUrl} className="pet-image" />
                  <Card.Body>
                    <Card.Title>{pet.petDetail.name}</Card.Title>
                    <Card.Text>Type: {pet.petDetail.type}</Card.Text>
                    <Card.Text>Breed: {pet.petDetail.breed}</Card.Text>
                    <Card.Text>Age: {pet.petDetail.age}</Card.Text>
                    <Card.Text>Status: {pet.status}</Card.Text>
                    {pet.status === 'available' && (
                        <Button variant="success" onClick={() => handleAdoptClick(pet._id)}>
                          Adopt
                        </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        {/* Close Button */}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PetListModal;