import React, { JSX } from 'react';

const WASDIcon = ({ className }: { className?: string }): JSX.Element => (
  <svg
    width='50'
    height='50'
    viewBox='0 0 50 50'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <g clipPath='url(#clip0_719_2534)'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3.55833 0C1.59375 0 0 1.5927 0 3.55938V46.4406C0 48.4073 1.59375 50 3.55833 50H46.4406C48.4073 50 50 48.4073 50 46.4406V3.55938C50 1.5927 48.4073 0 46.4406 0H3.55833Z'
        fill='url(#paint0_linear_719_2534)'
      />
      <path
        d='M23.4399 20.6117C23.7629 19.8128 24.6743 19.4253 25.4743 19.7492C26.2743 20.0733 26.6609 20.9836 26.3379 21.7836L20.3828 36.519C20.1431 37.1097 19.5703 37.4951 18.9337 37.4951H18.9067C18.2598 37.4836 17.6868 37.0753 17.466 36.4679L9.6785 15.0815C9.38372 14.269 9.80143 13.3732 10.6118 13.0784C11.4223 12.7815 12.3191 13.2003 12.615 14.0107L19.0098 31.5753L23.4399 20.6117Z'
        fill='white'
      />
      <path
        d='M37.163 14.0113C37.4599 13.2009 38.3568 12.7842 39.1661 13.078C39.9764 13.3728 40.3952 14.2697 40.0994 15.0811L32.313 36.4675C32.0911 37.0749 31.5182 37.4843 30.8724 37.4947H30.8443C30.2088 37.4947 29.6347 37.1093 29.3963 36.5186L26.7316 29.9269C26.4077 29.126 26.7952 28.2155 27.5952 27.8925C28.3932 27.5686 29.3046 27.9541 29.6285 28.755L30.7682 31.5749L37.163 14.0113Z'
        fill='white'
      />
    </g>
    <defs>
      <linearGradient
        id='paint0_linear_719_2534'
        x1='-0.124246'
        y1='0'
        x2='50.0709'
        y2='2.74608e-08'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#9013FE' />
        <stop offset='1' stopColor='#008FEC' />
      </linearGradient>
      <clipPath id='clip0_719_2534'>
        <rect width='50' height='50' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

export default WASDIcon;
