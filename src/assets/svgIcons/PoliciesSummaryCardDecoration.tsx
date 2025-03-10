type CardDecorationType = {
  className?: string;
};

export const CardDecoration1 = ({ className }: CardDecorationType) => {
  return (
    <svg
      width="82"
      height="81"
      viewBox="0 0 82 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.56822 -9.444L99.9998 -9.444V80.2229C99.9998 80.2229 58.0096 84.6721 47.9793 37.9563C37.9489 -8.75952 6.56822 -9.444 6.56822 -9.444Z"
        fill="#EBB850"
      />
      <path
        d="M0.921358 -18L94.353 -18V71.6669C94.353 71.6669 94.524 31.2826 42.3324 29.4003C-9.85921 27.5179 0.921358 -18 0.921358 -18Z"
        fill="#377CC8"
      />
    </svg>
  );
};

export const CardDecoration2 = ({ className }: CardDecorationType) => {
  return (
    <svg
      width="55"
      height="28"
      viewBox="0 0 55 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="9.5" cy="45.5" r="45.5" fill="#469B88" />
    </svg>
  );
};
