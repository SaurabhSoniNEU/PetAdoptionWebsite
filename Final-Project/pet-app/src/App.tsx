import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Components/Header';
import AboutUs from './Components/AboutUs';
import PetListModal from './Components/PetListModel';
import HeroSection from './Components/HeroSection';
import AdoptionFormPage from './Components/AdoptionFormPage';
import SheltersPage from './Components/SheltersPage';
import Footer from './Components/Footer';
import VaccinationRecordPage from './Components/VaccinationRecordPage';
import Donation from './Components/Donate';
interface Pet {
  _id: string;
  petDetail: {
    name: string;
    type: string;
    breed: string;
    age: number;
    imageUrl: string;  // Add this line
  };
  status: string;
}

const App: React.FC = () => {
  // State to manage the visibility of the pet list modal
  const [showPetListModal, setShowPetListModal] = useState(false);

  // State to manage the list of pets
  const [pets, setPets] = useState<Pet[]>([]);

  // State to manage adopted pet IDs
  const [adoptedPetIds, setAdoptedPetIds] = useState<string[]>([]);

  // State to trigger a re-render when pets are updated
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const [availablePets, setAvailablePets] = useState<string[]>([]);


  // Hook to navigate between routes
  const navigate = useNavigate();

  // Function to fetch and show the pet list modal
  const handleShowPetListModal = async () => {
    try {
      // Fetch the list of pets from the server
      const response = await fetch('http://localhost:4000/pets/');
      const data = await response.json();

      // Update the state with the fetched pets
      setPets(data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }

    // Show the pet list modal
    setShowPetListModal(true);
  };

  // Function to close the pet list modal
  const handleClosePetListModal = () => {
    setShowPetListModal(false);
  };

  // Function to handle the adoption of a pet
  const handleAdopt = async (petId: string) => {
    try {
      // Check if the pet is already adopted
      if (adoptedPetIds.includes(petId)) {
        console.warn('Pet already adopted:', petId);
        return;
      }
  
      // Update the adoptedPetIds state with the adopted pet ID
      setAdoptedPetIds((prevIds) => [...prevIds, petId]);
  
      // Create an object to pass the petId as state to the AdoptionFormPage
      const obj = {
        state: {
          data: petId,
        },
      };
  
      // Add the pet back to the list of available pets in PetListModal
      updateAvailablePets(petId);
  
      // Navigate to the AdoptionFormPage with the petId as state
      navigate('/adoption-form', obj);
    } catch (error) {
      console.error('Error fetching pet details:', error);
    }
  };
  
  //Function to update available pets
  const updateAvailablePets = (petId: string) => {
    setAvailablePets((prevIds) => [...prevIds, petId]);
  };  
  
  

  // Function to update the pets list
  const handleUpdatePets = (updatedPets: Pet[]) => {
    // Update the state with the updated pets
    setPets(updatedPets);

    // Toggle the updateTrigger to trigger a re-render of AdoptionFormPage
    setUpdateTrigger((prev) => !prev);
  };

  return (
    <div className="App">
      {/* Header component */}
      <Header />

      {/* React Router DOM Routes */}
      <Routes>
        {/* Route for the Adoption Form Page */}
        <Route path="/shelters" element={<SheltersPage />} /> {/* route for shelters page */}
        <Route
          path="/adoption-form"
          element={<AdoptionFormPage pets={pets} updatePets={handleUpdatePets} updateTrigger={updateTrigger} adoptedPetIds={adoptedPetIds} handleAdopt={handleAdopt} updateAvailablePets={updateAvailablePets}/>}
        />
        <Route path="/vaccination-records" element={<VaccinationRecordPage />} />
        {/* Default route */}
        <Route
          path="/"
          element={
            <>
              {/* HeroSection component with a callback to show the pet list modal */}
              <HeroSection onFindPetsClick={handleShowPetListModal} />

              
              <PetListModal
                show={showPetListModal}
                handleClose={handleClosePetListModal}
                pets={pets}
                handleAdopt={handleAdopt}
                adoptedPetIds={adoptedPetIds}
              />

              {/* AboutUs component */}
              <AboutUs />

              {/* Donation component*/}
              <Donation />
            </>
          }
        />
      </Routes>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default App;

