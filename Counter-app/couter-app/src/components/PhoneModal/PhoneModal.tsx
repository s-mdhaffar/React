import React, { useState, useEffect, useRef } from 'react';
import './PhoneModal.scss';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
import { countryNames } from '../../utils/countries';

const phoneUtil = PhoneNumberUtil.getInstance();

// Generate country list with dial codes statically
const countries = Object.entries(countryNames).map(([code, name]) => {
  const dialCode = phoneUtil.getCountryCodeForRegion(code);
  return {
    code,
    name,
    dialCode: `+${dialCode}`,
  };
}).sort((a, b) => {
  // Prioritize Tunisia
  if (a.code === 'TN') return -1;
  if (b.code === 'TN') return 1;
  // Sort others alphabetically
  return a.name.localeCompare(b.name);
});

interface PhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (phoneNumber: string) => void;
  currentPhoneNumber?: string;
}

const PhoneModal: React.FC<PhoneModalProps> = ({ isOpen, onClose, onSave, currentPhoneNumber }) => {
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Validate number on change
  useEffect(() => {
    const dialCode = countries.find(c => c.code === selectedCountry)?.dialCode || '';
    const fullNumber = `${dialCode}${phoneNumber}`;
    
    try {
      if (!phoneNumber) {
        setIsValid(false);
        return;
      }
      const parsedNumber = phoneUtil.parse(fullNumber, selectedCountry);
      setIsValid(phoneUtil.isValidNumber(parsedNumber));
    } catch {
      setIsValid(false);
    }
  }, [phoneNumber, selectedCountry]);

  // Parse and populate existing phone number when modal opens
  useEffect(() => {
    if (isOpen && currentPhoneNumber) {
      try {
        const parsedNumber = phoneUtil.parse(currentPhoneNumber);
        const regionCode = phoneUtil.getRegionCodeForNumber(parsedNumber);
        
        if (regionCode) {
          setSelectedCountry(regionCode);
          // Get the national number (without country code)
          const nationalNumber = parsedNumber.getNationalNumber()?.toString() || '';
          setPhoneNumber(nationalNumber);
        }
      } catch (err) {
        console.error('Error parsing phone number:', err);
      }
    } else if (isOpen && !currentPhoneNumber) {
      // Reset to defaults when opening with no existing number
      setSelectedCountry('US');
      setPhoneNumber('');
      setError('');
    }
  }, [isOpen, currentPhoneNumber]);

  // Focus trap and Esc key listener
  useEffect(() => {
    if (!isOpen) return;

    const modalElement = modalRef.current;
    if (!modalElement) return;

    // Focus first focusable element
    const focusableElements = modalElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (firstElement) {
      firstElement.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    setError('');
    onClose();
  };

  const handleSave = () => {
    if (!isValid) return;

    const dialCode = countries.find(c => c.code === selectedCountry)?.dialCode || '';
    const fullNumber = `${dialCode}${phoneNumber}`;
    
    try {
      const parsedNumber = phoneUtil.parse(fullNumber, selectedCountry);
      const formattedNumber = phoneUtil.format(parsedNumber, PhoneNumberFormat.INTERNATIONAL);
      
      onSave(formattedNumber);
      handleClose();
    } catch (err) {
      setError('Invalid phone number format.');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay" 
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <h2 id="modal-title">Enter Phone Number</h2>
        
        <div className="input-group">
          <label>Phone Number</label>
          <div className="phone-inputs">
            <div className="select-wrapper">
              <span className="selected-prefix">
                {countries.find(c => c.code === selectedCountry)?.dialCode}
              </span>
              <select
                id="country-select"
                className="country-select"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                aria-label="Select Country"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name} ({country.dialCode})
                  </option>
                ))}
              </select>
            </div>
            <input
              id="phone-number"
              type="tel"
              placeholder="123456789"
              className="number-input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              aria-label="Phone Number"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>

        <div className="modal-buttons">
          <button 
            className="save-btn" 
            onClick={handleSave}
            disabled={!isValid}
          >
            Save
          </button>
          <button className="close-btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneModal;
