import * as React from 'react';

export interface SegmentOption {
  /** Stable id returned by onChange. */
  key: string;
  label: React.ReactNode;
  /** Optional count rendered next to the label (e.g. tab counts). */
  count?: number;
}

export interface SegmentedControlProps {
  options: SegmentOption[];
  /** Selected option key. */
  value: string;
  onChange?: (key: string) => void;
  /** Height: sm 36 · md 40 · lg 44. @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

/** Segmented control — active segment fills with primary blue. */
export declare const SegmentedControl: React.FC<SegmentedControlProps>;
