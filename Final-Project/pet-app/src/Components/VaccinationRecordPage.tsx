//Vaccination Record Component
import React, { useState, useEffect } from 'react';
import {Container, Table, Form, Button, Col, Modal} from 'react-bootstrap';
import axios from 'axios';
import '../CSS/VaccinationRecordsPage.css';

//Interface for Vaccination record
interface VaccinationRecord {
    _id?: string;
    petId: number;
    dateAdministered: string;
    vaccineName: string;
    veterinarian: string;
    nextVaccinationDate?: string;
}

const VaccinationRecordsPage: React.FC = () => {
    // State variables using React Hooks
    const [vaccinationRecords, setVaccinationRecords] = useState<VaccinationRecord[]>([]);
    const [showForm, setShowForm] = useState(false); // Control whether to show the form
    const [newRecord, setNewRecord] = useState<VaccinationRecord>({
        petId: 0,
        vaccineName: '',
        veterinarian: '',
        dateAdministered: '',
        nextVaccinationDate: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const vaccines = ['Distemper', 'Parainfluenza', 'Hepatitis', 'Rabies']; // Predefined vaccine options
    const [showModal, setShowModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<VaccinationRecord | null>(null);
    const [newRescheduleDate, setNewRescheduleDate] = useState('');

    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false);
        setNewRescheduleDate('');
        setSelectedRecord(null);
    };

    // Function to handle reschedule confirmation
    const handleConfirmReschedule = () => {
        if (selectedRecord && selectedRecord._id && newRescheduleDate) {
            handleReschedule(selectedRecord._id, newRescheduleDate);
            handleCloseModal();
        }
    };

    useEffect(() => {
        fetchVaccinationRecords();
    }, []);

    // Function to fetch vaccination records from the server
    const fetchVaccinationRecords = async () => {
        try {
            const response = await axios.get('http://localhost:4000/records/');
            setVaccinationRecords(response.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch vaccination records');
            setLoading(false);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setNewRecord({ ...newRecord, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:4000/records/', newRecord);
            fetchVaccinationRecords(); // Refresh data
            setNewRecord({ petId: 0, vaccineName: '', veterinarian: '', dateAdministered: '', nextVaccinationDate: '' }); // Reset form
            setShowForm(false); // Hide the form after submission
        } catch (error) {
            console.error('Error booking new slot:', error);
        }
    };

    const handleReschedule = async (recordId: string, updatedDate: string) => {
        try {
            await axios.put(`http://localhost:4000/records/${recordId}`, { nextVaccinationDate: updatedDate });
            fetchVaccinationRecords(); // Refresh data
        } catch (error) {
            console.error('Error rescheduling:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Container className="vaccination-records-container">
            <h1 className="header">Vaccination Records</h1>

            {!showForm && (
                <Button className="toggle-form-button" onClick={() => setShowForm(true)}>Add New Record</Button>
            )}

            {showForm && (
                <Form onSubmit={handleSubmit} className="vaccination-form">
                <div className="row"> {/* Use a regular div with "row" class */}
                        <div className="col">
                            <Form.Group>
                                <Form.Label>Pet ID</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="petId"
                                    value={newRecord.petId}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className="col">
                            <Form.Group>
                                <Form.Label>Vaccine Name</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="vaccineName"
                                    value={newRecord.vaccineName}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select a vaccine</option>
                                    {vaccines.map((vaccine, index) => (
                                        <option key={index} value={vaccine}>
                                            {vaccine}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </div>
                    </div>
                    <Form.Group>
                        <Form.Label>Veterinarian</Form.Label>
                        <Form.Control
                            type="text"
                            name="veterinarian"
                            value={newRecord.veterinarian}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date Administered</Form.Label>
                        <Form.Control
                            type="date"
                            name="dateAdministered"
                            value={newRecord.dateAdministered}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Next Vaccination Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="nextVaccinationDate"
                            value={newRecord.nextVaccinationDate}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button type="submit">Book Slot</Button>
                </Form>
            )}

            <Table striped bordered hover className="vaccination-table">
                <thead>
                <tr>
                    <th>Pet ID</th>
                    <th>Vaccine Name</th>
                    <th>Vaccination Date</th>
                    <th>Veterinarian</th>
                    <th>Next Vaccination Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {vaccinationRecords.map((record) => (
                    <tr key={record._id}>
                        <td>{record.petId}</td>
                        <td>{record.vaccineName}</td>
                        <td>{record.dateAdministered}</td>
                        <td>{record.veterinarian}</td>
                        <td>{record.nextVaccinationDate || 'N/A'}</td>
                        <td>
                            <Button
                                className="reschedule-button"
                                onClick={() => {
                                    setSelectedRecord(record);
                                    setShowModal(true);
                                }}
                            >
                                Reschedule
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Reschedule Vaccination</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>New Vaccination Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={newRescheduleDate}
                            onChange={(e) => setNewRescheduleDate(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleConfirmReschedule}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
};

export default VaccinationRecordsPage;
