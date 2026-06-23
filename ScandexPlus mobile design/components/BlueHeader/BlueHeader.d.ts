import * as React from 'react';

export interface BlueHeaderProps {
  /** Page / screen title (white, bold). */
  title?: React.ReactNode;
  /** Supporting line under the title. */
  subtitle?: React.ReactNode;
  /** Small uppercase-ish label above the title (e.g. record number). */
  eyebrow?: React.ReactNode;
  /** Renders a "Voltar" back button when provided. */
  onBack?: () => void;
  /** Trailing slot, top-right (e.g. bell button, status badge). */
  action?: React.ReactNode;
  /** Brand row rendered above everything (logo + wordmark). */
  brand?: React.ReactNode;
  /** Tighter vertical padding + smaller title — for detail screens. @default false */
  compact?: boolean;
  /** Extra content below the title block (chips, segmented control). */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Institutional blue gradient header with rounded bottom corners. */
export declare const BlueHeader: React.FC<BlueHeaderProps>;
