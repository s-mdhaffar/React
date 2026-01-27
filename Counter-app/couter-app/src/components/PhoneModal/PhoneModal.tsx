import React, { useState, useMemo, useEffect } from 'react';
import './PhoneModal.scss';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

interface PhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (phoneNumber: string) => void;
  currentPhoneNumber?: string;
}

interface CountryOption {
  code: string;
  name: string;
  dialCode: string;
}

const PhoneModal: React.FC<PhoneModalProps> = ({ isOpen, onClose, onSave, currentPhoneNumber }) => {
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const phoneUtil = PhoneNumberUtil.getInstance();

  // Generate country list with dial codes
  const countries: CountryOption[] = useMemo(() => {
    const countryNames: { [key: string]: string } = {
      'US': 'United States',
      'GB': 'United Kingdom',
      'CA': 'Canada',
      'AU': 'Australia',
      'DE': 'Germany',
      'FR': 'France',
      'IT': 'Italy',
      'ES': 'Spain',
      'NL': 'Netherlands',
      'BE': 'Belgium',
      'CH': 'Switzerland',
      'AT': 'Austria',
      'SE': 'Sweden',
      'NO': 'Norway',
      'DK': 'Denmark',
      'FI': 'Finland',
      'PL': 'Poland',
      'RU': 'Russia',
      'CN': 'China',
      'JP': 'Japan',
      'KR': 'South Korea',
      'IN': 'India',
      'BR': 'Brazil',
      'MX': 'Mexico',
      'AR': 'Argentina',
      'CL': 'Chile',
      'CO': 'Colombia',
      'PE': 'Peru',
      'ZA': 'South Africa',
      'EG': 'Egypt',
      'NG': 'Nigeria',
      'KE': 'Kenya',
      'SA': 'Saudi Arabia',
      'AE': 'United Arab Emirates',
      'IL': 'Israel',
      'TR': 'Turkey',
      'GR': 'Greece',
      'PT': 'Portugal',
      'IE': 'Ireland',
      'NZ': 'New Zealand',
      'SG': 'Singapore',
      'MY': 'Malaysia',
      'TH': 'Thailand',
      'VN': 'Vietnam',
      'PH': 'Philippines',
      'ID': 'Indonesia',
      'PK': 'Pakistan',
      'BD': 'Bangladesh',
      'UA': 'Ukraine',
      'RO': 'Romania',
      'CZ': 'Czech Republic',
      'HU': 'Hungary',
      'BG': 'Bulgaria',
    };

    return Object.entries(countryNames).map(([code, name]) => {
      const dialCode = phoneUtil.getCountryCodeForRegion(code);
      return {
        code,
        name,
        dialCode: `+${dialCode}`,
      };
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [phoneUtil]);

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
        // If parsing fails, just keep the default values
        console.error('Error parsing phone number:', err);
      }
    } else if (isOpen && !currentPhoneNumber) {
      // Reset to defaults when opening with no existing number
      setSelectedCountry('US');
      setPhoneNumber('');
      setError('');
    }
  }, [isOpen, currentPhoneNumber, phoneUtil]);

  const handleSave = () => {
    const dialCode = countries.find(c => c.code === selectedCountry)?.dialCode || '';
    const fullNumber = `${dialCode}${phoneNumber}`;
    
    try {
      // Parse and validate the phone number
      const parsedNumber = phoneUtil.parse(fullNumber, selectedCountry);
      const isValid = phoneUtil.isValidNumber(parsedNumber);
      
      if (!isValid) {
        setError('Invalid phone number. Please check and try again.');
        return;
      }
      
      // Format the phone number in international format
      const formattedNumber = phoneUtil.format(parsedNumber, PhoneNumberFormat.INTERNATIONAL);
      
      onSave(formattedNumber);
      onClose();
    } catch (err) {
      setError('Invalid phone number format. Please check the number.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Enter Phone Number</h2>
        
        <div className="input-group">
          <label>Phone Number</label>
          <div className="phone-inputs">
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
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneModal;
