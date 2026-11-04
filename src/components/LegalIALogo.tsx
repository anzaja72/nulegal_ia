import React from 'react';

interface LegalIALogoProps {
  size?: number;
  className?: string;
  /** 'sky' = logo oficial en Sky Blue; 'white' = versión monocroma blanca. */
  variant?: 'sky' | 'white';
}

/**
 * Logo oficial de Legal-IA (PNG con fondo transparente, /public/logo.png).
 * Se respeta el espacio libre del brand book con `padding` en el contenedor, no aquí.
 */
export const LegalIALogo: React.FC<LegalIALogoProps> = ({
  size = 40,
  className = '',
  variant = 'sky'
}) => (
  <img
    src={`${import.meta.env.BASE_URL}logo.png`}
    width={size}
    height={size}
    alt="Legal-IA"
    decoding="async"
    draggable={false}
    className={`shrink-0 select-none object-contain ${variant === 'white' ? 'brightness-0 invert' : ''} ${className}`}
  />
);
