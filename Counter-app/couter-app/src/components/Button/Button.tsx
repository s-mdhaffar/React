import React from 'react';
import "./Button.scss"
interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
  <button className='but' onClick={onClick} aria-label="Open Button">
    {children}
  </button>
);

export default Button;
