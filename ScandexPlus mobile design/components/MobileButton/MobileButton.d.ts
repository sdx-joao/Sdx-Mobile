import * as React from 'react';

export interface MobileButtonProps {
  /** Visual style. @default 'primary' */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Touch height: sm 40 · md 46 · lg 52. @default 'lg' */
  size?: 'sm' | 'md' | 'lg';
  /** Stretch to container width (full-width CTA). @default false */
  fullWidth?: boolean;
  disabled?: boolean;
  /** Replace label with a spinner. @default false */
  loading?: boolean;
  onClick?: () => void;
  /** Label and optional leading <Icon/>. */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Touch-first button; `primary` carries the institutional blue gradient. */
export declare const MobileButton: React.FC<MobileButtonProps>;
