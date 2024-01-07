// Header Component

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { animateScroll as scroll } from 'react-scroll';
import logo from '../images/CuteDog.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Header Functional Component
const Header = () => {
    // React Router's navigate hook for navigation
    const navigate = useNavigate();

    // Translation hook to enable language translation
    const { t, i18n } = useTranslation('common');

    // Function to navigate to the 'Shelters' page
    const handleShelterNavigation = () => {
        navigate('/shelters');
    };

    // Function to navigate to the 'Volunteer' page
    const handleVolunteerNavigation = () => {
        navigate('/volunteer');
    };

    // Function to scroll to the 'About Us' section
    const scrollToAboutUs = () => {
        const aboutUsElement = document.getElementById('about-us');

        if (aboutUsElement) {
            // Scroll to the 'About Us' section with an adjusted offset
            scroll.scrollTo(aboutUsElement.offsetTop - 70);
        }
    };

    // Function to toggle between language translations
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    // Rendered JSX
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                {/* Logo */}
                <Navbar.Brand href="#">
                    <img src={logo} alt="Logo" width="80vw" height="80vh" />
                </Navbar.Brand>

                {/* Navbar Toggle Button */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Navbar Collapse Section */}
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        {/* Scroll to 'About Us' Link */}
                        <Nav.Link onClick={scrollToAboutUs}>{t('aboutus.label')}</Nav.Link>

                        {/* Language Dropdown */}
                        <NavDropdown title={t('language.label')} id="language-dropdown">
                            <NavDropdown.Item onClick={() => changeLanguage('en')}>English</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => changeLanguage('hi')}>हिन्दी (Hindi)</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => changeLanguage('zh')}>中文 (Chinese)</NavDropdown.Item>
                        </NavDropdown>

                        {/* Information Dropdown */}
                        <NavDropdown title={t('info.button.label')} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={handleShelterNavigation}>{t('shelters.button.label')}</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleVolunteerNavigation}>{t('volunteer.button.label')}</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/vaccination-records">{t('vaccination.button.label')}</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

// Exporting the Header component
export default Header;
