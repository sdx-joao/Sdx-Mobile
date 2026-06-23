import * as React from 'react';
import type { IconName } from '../Icon/Icon';

export interface TabItem {
  /** Stable id returned by onChange. */
  key: string;
  label: React.ReactNode;
  /** Icon name from the curated set. */
  icon: IconName;
}

export interface TabBarProps {
  items: TabItem[];
  /** Active item key. */
  active: string;
  onChange?: (key: string) => void;
  /** Active color. @default primary blue */
  accent?: string;
  style?: React.CSSProperties;
}

/** Bottom navigation bar — active item icon + label take the accent color. */
export declare const TabBar: React.FC<TabBarProps>;
