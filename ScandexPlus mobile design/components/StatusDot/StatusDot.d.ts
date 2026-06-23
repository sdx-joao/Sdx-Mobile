import * as React from 'react';

export type DocStatus = 'available' | 'processing' | 'altered' | 'missing_info' | 'absent';

export interface StatusDotProps {
  /** Document state. Ignored when `reported` is true. @default 'available' */
  status?: DocStatus;
  /** Renders the ⚠️ warning triangle instead of a dot. @default false */
  reported?: boolean;
  /** Diameter in px. @default 16 */
  size?: number;
}

export interface StatusLegendProps {
  style?: React.CSSProperties;
}

/** Colored document-status indicator (green/blue/yellow/orange/red + ⚠️). */
export declare const StatusDot: React.FC<StatusDotProps>;

/** Vertical legend mapping every status color to its meaning. */
export declare const StatusLegend: React.FC<StatusLegendProps>;

/** `status → { label, fill, ring }` metadata backing the dots. */
export declare const DOC_STATUS_META: Record<DocStatus, { label: string; fill: string; ring: string }>;
