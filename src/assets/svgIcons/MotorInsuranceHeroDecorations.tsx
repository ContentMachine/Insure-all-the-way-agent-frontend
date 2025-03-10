import React from "react";

type MotorInsuranceHeroDecorationTypes = {
  color?: string;
};

export const MotorInsuranceHeroDecoration1 = ({
  color,
}: MotorInsuranceHeroDecorationTypes) => {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M72 72H0L72 0V72Z" fill={color || "#EDD014"} />
    </svg>
  );
};

export const MotorInsuranceHeroDecoration2 = ({
  color,
}: MotorInsuranceHeroDecorationTypes) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M40 40H0L40 0V40Z" fill={color || "#EDD014"} />
    </svg>
  );
};

export const MotorInsuranceHeroDecoration3 = ({
  color,
}: MotorInsuranceHeroDecorationTypes) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 40H40L0 0V40Z" fill={color || "#EDD014"} />
    </svg>
  );
};
