// HeroSection Component

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Button } from 'react-bootstrap';
import { BsArrowRight } from 'react-icons/bs';

// Importing images for the background
import heroImage1 from '../images/golden-retriever-royalty-free-image-506756303-1560962726.jpg';
import heroImage2 from '../images/heroImage2.jpeg';
import heroImage3 from '../images/heroImage3.jpeg';

// Images 
const imageList = [
  `url(${heroImage1})`,
  `url(${heroImage2})`,
  `url(${heroImage3})`,
];

// Props interface for HeroSection component
interface HeroSectionProps {
  onFindPetsClick: () => void;
}

// HeroSection Functional Component
const HeroSection: React.FC<HeroSectionProps> = ({ onFindPetsClick }) => {
  // Translation hook
  const { t } = useTranslation('common');

  // State to manage the index of the current background image
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // useEffect to change background image every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % imageList.length
      );
    }, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Style object for background image and transition
  const backgroundImageStyle = {
    backgroundImage: imageList[currentImageIndex],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '750px',
    transition: 'background-image 1s ease-in-out',
  };

  // Rendered TSX
  return (
    <div
      className="hero-section d-flex align-items-center text-white text-center"
      style={backgroundImageStyle}
    >
      <Container className="py-5">
        <h1 className="display-4" style={{ color: '#ffffff' }}>
          {t('title')}
        </h1>
        <p className="lead" style={{ color: '#ffffff' }}>
          {t('title.desc')}
        </p>
        <Button variant="light" className="mt-3" onClick={onFindPetsClick}>
          {t('findpets.button.label')} <BsArrowRight />
        </Button>
      </Container>
    </div>
  );
};

// Exporting the HeroSection component
export default HeroSection;
