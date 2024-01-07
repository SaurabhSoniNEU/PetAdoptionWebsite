// AdoptionFormPage.tsx
import React, { useState, useEffect } from 'react';
import { Snackbar } from '@mui/material';
import { Container, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PetListModal from './PetListModel';
import { RootState } from '../redux/store';
import { updatePetStatus, showSnackbar, hideSnackbar } from '../redux/actions';
import SnackbarContent from '@mui/material/SnackbarContent';

// Define the interfaces for Pet and AdoptionFormPageProps
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

// Props For Adoption Form Page
interface AdoptionFormPageProps {
  pets: Pet[];
  updatePets: (updatedPets: Pet[]) => void;
  updateTrigger: boolean;
  adoptedPetIds: string[];
  handleAdopt: (petId: string) => void;
  updateAvailablePets: (petId: string) => void;
}

const AdoptionFormPage: React.FC<AdoptionFormPageProps> = ({ pets, updatePets, updateTrigger, adoptedPetIds, handleAdopt, updateAvailablePets }) => {
  // Initialize necessary hooks and state variables
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [petDetails, setPetDetails] = useState<Pet | null>(null);
  const [showPetListModal, setShowPetListModal] = useState(false);
  const [adoptedPetIdsState, setAdoptedPetIds] = useState<string[]>(adoptedPetIds);
  const [, forceUpdate] = useState<number>(0);

  const showSnackbarState = useSelector((state: RootState) => state.adoption.showSnackbar);

  const validateForm = (): boolean => {
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const addressInput = document.getElementById('address') as HTMLInputElement;
  
    // Check if all fields are filled
    if (!nameInput.value || !phoneInput.value || !emailInput.value || !addressInput.value) {
      console.error('Please fill in all the required fields.');
      return false;
    }
  
    // Validate name (only alphabets)
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(nameInput.value)) {
      console.error('Name should only contain alphabets.');
      return false;
    }
  
    // Validate phone number (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneInput.value)) {
      console.error('Phone number should be 10 digits.');
      return false;
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      console.error('Invalid email format.');
      return false;
    }
  
    // Other custom validations can be added as needed
  
    return true;
  };

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Perform form validation
    const isFormValid = validateForm(); // Implement your form validation logic

    if (isFormValid) {
      // Dispatch the action to update the pet status
      if (adoptedPetIds.length > 0) {
        adoptedPetIds.forEach((petId) => {
          dispatch(updatePetStatus(petId));
        });
      }

      // Reset the form or navigate to another page if needed

      // Show the success snackbar
      dispatch(showSnackbar());

      // Optionally, we can hide the snackbar after a delay
      setTimeout(() => {
        dispatch(hideSnackbar());
      }, 6000);
    }
  };

  // Function to handle snackbar close event
  const handleSnackbarClose = () => {
    dispatch(hideSnackbar());
  };

  // Function to close remove confirmation modal
  const handleCloseRemoveConfirmation = () => {
    setShowRemoveConfirmation(false);
  };

  // Function to handle pet removal
  const handleRemovePet = (petId: string) => {
    const updatedPets = pets.filter((pet) => pet._id !== petId);
    updatePets(updatedPets);
    setAdoptedPetIds((prevIds: string[]) => prevIds.filter((id) => id !== petId));
    forceUpdate((prev) => prev + 1);
    handleCloseRemoveConfirmation();
  };

  // useEffect hook to update pet details based on location changes
  useEffect(() => {
    const petId = location.state?.data;
    const petObj = pets.find((pet) => pet._id === petId);
    setPetDetails(petObj || null);
  }, [location, pets]);

  // useEffect hook to reset pet details when updateTrigger changes
  useEffect(() => {
    if (updateTrigger) {
      setPetDetails(null);
    }
  }, [updateTrigger, pets]);

  // useEffect hook to reload the page when selectedPet changes
  useEffect(() => {
    if (selectedPet) {
      window.location.reload();
    }
  }, [selectedPet]);

  //Rendered TSX
  return (
    <Container className="py-5">
      <h1 className="display-4">Adoption Form</h1>
      <p className="lead">Please provide your information to complete the adoption process.</p>

      {/* Display adopted pets and remove option */}
      {adoptedPetIds.map((adoptedPetId) => {
        const adoptedPet = pets.find((pet) => pet._id === adoptedPetId);

        if (adoptedPet) {
          return (
            <div key={adoptedPetId} className="mb-3">
              <h2>{adoptedPet.petDetail.name}</h2>
              <p>Type: {adoptedPet.petDetail.type}</p>
              <p>Breed: {adoptedPet.petDetail.breed}</p>
              <p>Age: {adoptedPet.petDetail.age}</p>
              <Button variant="danger" onClick={() => handleRemovePet(adoptedPetId)}>
                Remove Pet
              </Button>
            </div>
          );
        }

        return null;
      })}

      {/* Adoption form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="name" required />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input type="tel" className="form-control" id="phone" required />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="email" required />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Home Address
          </label>
          <textarea className="form-control" id="address" rows={3} required></textarea>
        </div>

        {/* Buttons to add more pets and submit form */}
        <Button variant="primary" className="me-3" onClick={() => setShowPetListModal(true)}>
          Add More Pets
        </Button>

        <Button type="submit" variant="success">
          Submit
        </Button>
      </form>

      {/* Snackbar for successful adoption */}
      <Snackbar
        open={showSnackbarState}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <SnackbarContent
          message="Adoption Successful"
          style={{ backgroundColor: 'white', border: '2px solid green', color: 'green' }}
        />
      </Snackbar>

      {/* PetListModal for selecting more pets */}
      <PetListModal
        show={showPetListModal}
        handleClose={() => setShowPetListModal(false)}
        pets={pets}
        handleAdopt={handleAdopt}
        adoptedPetIds={adoptedPetIds}
      />
    </Container>
  );
};

export default AdoptionFormPage;