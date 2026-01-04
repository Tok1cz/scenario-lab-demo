/**
 * Design Tokens - Centralized design system variables
 * Use these tokens throughout the application for consistent spacing, typography, and sizing
 */

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const fontSize = {
  xxs: 10,
  xs: 11,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 24,
  xxxl: 32,
  display1: 48,
  display2: 56,
  display3: 64,
} as const;

export const borderRadius = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  xxl: 16,
  round: 9999,
} as const;

export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

export const fontWeight = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 2px 4px rgba(0, 0, 0, 0.1)",
  lg: "0 3px 8px rgba(0, 0, 0, 0.15)",
  xl: "0 4px 12px rgba(0, 0, 0, 0.2)",
} as const;

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
} as const;

// Helper to generate CSS custom properties
export const toCSSVariables = () => {
  return {
    ...Object.entries(spacing).reduce((acc, [key, value]) => {
      acc[`--spacing-${key}`] = `${value}px`;
      return acc;
    }, {} as Record<string, string>),
    ...Object.entries(fontSize).reduce((acc, [key, value]) => {
      acc[`--font-size-${key}`] = `${value}px`;
      return acc;
    }, {} as Record<string, string>),
    ...Object.entries(borderRadius).reduce((acc, [key, value]) => {
      acc[`--radius-${key}`] = `${value}px`;
      return acc;
    }, {} as Record<string, string>),
  };
};
