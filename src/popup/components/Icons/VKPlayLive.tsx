import React, { JSX } from 'react';

const VKPlayLiveIcon = ({ className }: { className?: string }): JSX.Element => (
  <svg
    width='50'
    height='50'
    viewBox='0 0 50 50'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <mask
      id='mask0_704_2556'
      style={{ maskType: 'luminance' }}
      maskUnits='userSpaceOnUse'
      x='0'
      y='0'
      width='50'
      height='50'
    >
      <path d='M50 0H0V50H50V0Z' fill='white' />
    </mask>
    <g mask='url(#mask0_704_2556)'>
      <path
        d='M26.05 0C37.35 0 43 0 46.5 3.5C50 7 50 12.65 50 23.95V26.05C50 37.35 50 43 46.5 46.5C43 50 37.35 50 26.05 50H23.95C12.65 50 7 50 3.5 46.5C0 43 0 37.35 0 26.05V23.95C0 12.65 0 7 3.5 3.5C7 0 12.65 0 23.95 0H26.05Z'
        fill='#0077FF'
      />
      <path
        d='M0.15 14.0505C0 16.7505 0 20.0005 0 23.9505V26.0505C0 29.0505 0 31.6005 0.05 33.8505C6.6 37.0505 15.4 39.0005 25 39.0005C34.6 39.0005 43.4 37.0505 49.95 33.8505C50 31.6005 50 29.0005 50 26.0505V23.9505C50 20.0005 50 16.7505 49.85 14.0005H0.15V14.0505Z'
        fill='#0009B4'
      />
      <path
        d='M34.75 29.9995C37.3732 29.9995 39.5 27.8727 39.5 25.2495C39.5 22.6262 37.3732 20.4995 34.75 20.4995C32.1267 20.4995 30 22.6262 30 25.2495C30 27.8727 32.1267 29.9995 34.75 29.9995Z'
        stroke='white'
        strokeWidth='4'
      />
      <path d='M21.0001 31.0002L10 20' stroke='white' strokeWidth='4' />
      <path d='M21.0001 20L10 31' stroke='white' strokeWidth='4' />
    </g>
  </svg>
);

export default VKPlayLiveIcon;
