import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PhoneModal from './PhoneModal';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('PhoneModal', () => {
  const mockOnClose = vi.fn();
  const mockOnSave = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnSave.mockClear();
  });

  describe('Rendering', () => {
    it('should not render when isOpen is false', () => {
      render(
        <PhoneModal
          isOpen={false}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );
      expect(screen.queryByText('Enter Phone Number')).not.toBeInTheDocument();
    });

    it('should render when isOpen is true', () => {
      render(
        <PhoneModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );
      expect(screen.getByText('Enter Phone Number')).toBeInTheDocument();
    });

    it('should render country select dropdown', () => {
      render(
        <PhoneModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
    });

    it('should render phone number input', () => {
      render(
        <PhoneModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );
      const input = screen.getByPlaceholderText('123456789');
      expect(input).toBeInTheDocument();
    });

    it('should render Save and Close buttons', () => {
      render(
        <PhoneModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );
      expect(screen.getByText('Save')).toBeInTheDocument();
      expect(screen.getByText('Close')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should allow selecting a country', () => {
      render(
        <PhoneModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );
      const select = screen.getByRole('combobox') as HTMLSelectElement;
      fireEvent.change(select, { target: { value: 'GB' } });
      expect(select.value).toBe('GB');
    });

    it('should allow typing in phone number input', () => {
      render(
        <PhoneModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );
      const input = screen.getByPlaceholderText('123456789') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '2025551234' } });
      expect(input.value).toBe('2025551234');
    });

    it('should call onClose when Close button is clicked', () => {
      render(
        <PhoneModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );
      const closeButton = screen.getByText('Close');
      fireEvent.click(closeButton);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when clicking outside modal', () => {
      render(
        <PhoneModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );
      const overlay = screen.getByText('Enter Phone Number').parentElement?.parentElement;
      if (overlay) {
        fireEvent.click(overlay);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      }
    });

    it('should not close when clicking inside modal content', () => {
      render(
        <PhoneModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );
      const modalContent = screen.getByText('Enter Phone Number').parentElement;
      if (modalContent) {
        fireEvent.click(modalContent);
        expect(mockOnClose).not.toHaveBeenCalled();
      }
    });
  });

  describe('Phone Number Validation', () => {
    it('should show error for invalid phone number', async () => {
      render(
        <PhoneModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );
      
      const input = screen.getByPlaceholderText('123456789');
      const saveButton = screen.getByText('Save');
      
      fireEvent.change(input, { target: { value: '123' } });
      fireEvent.click(saveButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Invalid phone number/i)).toBeInTheDocument();
      });
      
      expect(mockOnSave).not.toHaveBeenCalled();
    });

    it('should save valid US phone number', async () => {
      render(
        <PhoneModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );
      
      const select = screen.getByRole('combobox');
      const input = screen.getByPlaceholderText('123456789');
      const saveButton = screen.getByText('Save');
      
      fireEvent.change(select, { target: { value: 'US' } });
      fireEvent.change(input, { target: { value: '2025551234' } });
      fireEvent.click(saveButton);
      
      await waitFor(() => {
        expect(mockOnSave).toHaveBeenCalledTimes(1);
      });
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should save valid UK phone number', async () => {
      render(
        <PhoneModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );
      
      const select = screen.getByRole('combobox');
      const input = screen.getByPlaceholderText('123456789');
      const saveButton = screen.getByText('Save');
      
      fireEvent.change(select, { target: { value: 'GB' } });
      fireEvent.change(input, { target: { value: '2079460958' } });
      fireEvent.click(saveButton);
      
      await waitFor(() => {
        expect(mockOnSave).toHaveBeenCalledTimes(1);
      });
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Existing Phone Number', () => {
    it('should populate fields with existing US phone number', () => {
      render(
        <PhoneModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          currentPhoneNumber="+1 202 555 1234"
        />
      );
      
      const select = screen.getByRole('combobox') as HTMLSelectElement;
      const input = screen.getByPlaceholderText('123456789') as HTMLInputElement;
      
      expect(select.value).toBe('US');
      expect(input.value).toBe('2025551234');
    });

    it('should populate fields with existing UK phone number', () => {
      render(
        <PhoneModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          currentPhoneNumber="+44 20 7946 0958"
        />
      );
      
      const select = screen.getByRole('combobox') as HTMLSelectElement;
      const input = screen.getByPlaceholderText('123456789') as HTMLInputElement;
      
      expect(select.value).toBe('GB');
      expect(input.value).toBe('2079460958');
    });

    it('should reset to defaults when opening without existing number', () => {
      const { rerender } = render(
        <PhoneModal
          isOpen={false}
          onClose={mockOnClose}
          onSave={mockOnSave}
          currentPhoneNumber="+1 202 555 1234"
        />
      );
      
      rerender(
        <PhoneModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          currentPhoneNumber=""
        />
      );
      
      const select = screen.getByRole('combobox') as HTMLSelectElement;
      const input = screen.getByPlaceholderText('123456789') as HTMLInputElement;
      
      expect(select.value).toBe('US');
      expect(input.value).toBe('');
    });
  });

  describe('Country List', () => {
    it('should include major countries in the dropdown', () => {
      render(
        <PhoneModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );
      
      const select = screen.getByRole('combobox');
      const options = Array.from(select.querySelectorAll('option'));
      const optionTexts = options.map(opt => opt.textContent);
      
      expect(optionTexts.some(text => text?.includes('United States'))).toBe(true);
      expect(optionTexts.some(text => text?.includes('United Kingdom'))).toBe(true);
      expect(optionTexts.some(text => text?.includes('Canada'))).toBe(true);
      expect(optionTexts.some(text => text?.includes('Australia'))).toBe(true);
    });

    it('should display country codes in dropdown options', () => {
      render(
        <PhoneModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );
      
      const select = screen.getByRole('combobox');
      const options = Array.from(select.querySelectorAll('option'));
      const optionTexts = options.map(opt => opt.textContent);
      
      expect(optionTexts.some(text => text?.includes('(+1)'))).toBe(true);
      expect(optionTexts.some(text => text?.includes('(+44)'))).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <PhoneModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
