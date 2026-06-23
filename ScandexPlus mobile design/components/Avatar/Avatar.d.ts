import * as React from 'react';

export interface AvatarProps {
  /** Full name — initials are derived from the first two words. */
  name?: string;
  /** Explicit initials, overrides those derived from `name`. */
  initials?: string;
  /** Photo URL; falls back to initials when absent. */
  src?: string;
  /** Square size in px. @default 48 */
  size?: number;
  /** Corner radius in px. @default ~28% of size (rounded square) */
  radius?: number;
  /** Tint + initials color. @default primary blue */
  color?: string;
  style?: React.CSSProperties;
}

/** Rounded-square initials avatar with photo fallback. */
export declare const Avatar: React.FC<AvatarProps>;
