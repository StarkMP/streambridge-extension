import React, { JSX } from 'react';

const KickIcon = ({ className }: { className?: string }): JSX.Element => (
  <svg
    width='50'
    height='50'
    viewBox='0 0 50 50'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <rect width='50' height='50' rx='4' fill='#050F14' />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M22 12H13V38H22V32H25V35H28V38H31H34H37V29H34V27H31V23H34V21H37V12H34H31H28V15H25V18H22V12Z'
      fill='#53FC18'
    />
  </svg>
);

export default KickIcon;
