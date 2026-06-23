import * as React from 'react';

export interface MobileCardProps {
  /** Elevation. @default 'elevated' */
  variant?: 'elevated' | 'flat';
  /** Optional accent color for a 3px left border (e.g. priority/status). */
  accent?: string;
  /** Inner padding in px. @default 14 */
  padding?: number;
  /** Makes the whole card a button. */
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** White surface card — 16px radius, soft elevation, optional accent border. */
export declare const MobileCard: React.FC<MobileCardProps>;
