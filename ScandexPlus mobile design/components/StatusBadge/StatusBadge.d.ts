import * as React from 'react';

export interface StatusBadgeProps {
  label: React.ReactNode;
  /** Base color (hex). soft = 9%-tint bg + colored text; solid = filled. @default '#2563EB' */
  color?: string;
  /** @default 'soft' */
  variant?: 'soft' | 'solid';
  /** Leading dot (soft variant only). @default true */
  dot?: boolean;
  /** @default 'md' */
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

/** Pill status badge with a leading dot — soft (tinted) or solid (filled). */
export declare const StatusBadge: React.FC<StatusBadgeProps>;
