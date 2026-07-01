import type { ReactElement } from "react";

export type BrandLogo = {
  name: string;
  width: number;
  height: number;
  render: () => ReactElement;
};

export const brandLogos: BrandLogo[] = [
  {
    name: "Coach",
    width: 120,
    height: 32,
    render: () => (
      <svg viewBox="0 0 120 32" fill="none" aria-hidden="true" className="h-10 w-auto">
        <text
          x="60"
          y="24"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="22"
          fontWeight="700"
          letterSpacing="0.18em"
          fill="currentColor"
        >
          COACH
        </text>
      </svg>
    ),
  },
  {
    name: "Kate Spade",
    width: 140,
    height: 32,
    render: () => (
      <svg viewBox="0 0 140 32" fill="none" aria-hidden="true" className="h-10 w-auto">
        <text
          x="70"
          y="14"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="13"
          fontWeight="600"
          letterSpacing="0.22em"
          fill="currentColor"
        >
          KATE SPADE
        </text>
        <text
          x="70"
          y="28"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="11"
          fontWeight="400"
          letterSpacing="0.35em"
          fill="currentColor"
          opacity="0.7"
        >
          NEW YORK
        </text>
      </svg>
    ),
  },
  {
    name: "Tory Burch",
    width: 130,
    height: 32,
    render: () => (
      <svg viewBox="0 0 130 32" fill="none" aria-hidden="true" className="h-10 w-auto">
        <text
          x="65"
          y="24"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="18"
          fontWeight="600"
          letterSpacing="0.12em"
          fill="currentColor"
        >
          TORY BURCH
        </text>
      </svg>
    ),
  },
  {
    name: "Longchamp",
    width: 150,
    height: 32,
    render: () => (
      <svg viewBox="0 0 150 32" fill="none" aria-hidden="true" className="h-10 w-auto">
        <text
          x="75"
          y="24"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="20"
          fontWeight="600"
          letterSpacing="0.08em"
          fill="currentColor"
        >
          LONGCHAMP
        </text>
      </svg>
    ),
  },
  {
    name: "Michael Kors",
    width: 160,
    height: 32,
    render: () => (
      <svg viewBox="0 0 160 32" fill="none" aria-hidden="true" className="h-10 w-auto">
        <text
          x="80"
          y="14"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="12"
          fontWeight="600"
          letterSpacing="0.28em"
          fill="currentColor"
        >
          MICHAEL
        </text>
        <text
          x="80"
          y="28"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="12"
          fontWeight="600"
          letterSpacing="0.28em"
          fill="currentColor"
        >
          KORS
        </text>
      </svg>
    ),
  },
  {
    name: "Fossil",
    width: 110,
    height: 32,
    render: () => (
      <svg viewBox="0 0 110 32" fill="none" aria-hidden="true" className="h-10 w-auto">
        <text
          x="55"
          y="24"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="21"
          fontWeight="700"
          letterSpacing="0.14em"
          fill="currentColor"
        >
          FOSSIL
        </text>
      </svg>
    ),
  },
  {
    name: "Calvin Klein",
    width: 150,
    height: 32,
    render: () => (
      <svg viewBox="0 0 150 32" fill="none" aria-hidden="true" className="h-10 w-auto">
        <text
          x="75"
          y="14"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="12"
          fontWeight="600"
          letterSpacing="0.24em"
          fill="currentColor"
        >
          CALVIN KLEIN
        </text>
        <line x1="30" y1="20" x2="120" y2="20" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "Dooney & Bourke",
    width: 170,
    height: 32,
    render: () => (
      <svg viewBox="0 0 170 32" fill="none" aria-hidden="true" className="h-10 w-auto">
        <text
          x="85"
          y="24"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="15"
          fontWeight="600"
          letterSpacing="0.1em"
          fill="currentColor"
        >
          DOONEY & BOURKE
        </text>
      </svg>
    ),
  },
];
