import * as React from 'react';

/** Names available in the curated mobile icon set. */
export type IconName =
  | 'home' | 'search' | 'user' | 'bell' | 'plus' | 'check' | 'check-circle' | 'x'
  | 'chevron-right' | 'chevron-left' | 'arrow-left' | 'calendar' | 'clock'
  | 'file-text' | 'image' | 'clipboard' | 'package' | 'building' | 'droplet'
  | 'paperclip' | 'zoom-in' | 'zoom-out' | 'maximize' | 'download' | 'share'
  | 'flag' | 'alert' | 'idcard' | 'more-vertical' | 'edit' | 'trash' | 'phone'
  | 'camera' | 'qr' | 'filter' | 'sliders' | 'logout';

export interface IconProps {
  /** Icon to render from the curated set. */
  name: IconName;
  /** Square size in px. @default 20 */
  size?: number;
  /** Stroke color (any CSS color). @default 'currentColor' */
  color?: string;
  /** Stroke width. @default 2 */
  strokeWidth?: number;
  style?: React.CSSProperties;
}

/** Lucide-style stroke icon, curated for ScandexPRO mobile. */
export declare const Icon: React.FC<IconProps>;

/** Raw `name → SVG path` map backing {@link Icon}. */
export declare const ICON_PATHS: Record<IconName, string>;
