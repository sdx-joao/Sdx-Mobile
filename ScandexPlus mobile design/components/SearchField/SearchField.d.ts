import * as React from 'react';

export interface SearchFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** HTML input type. @default 'text' */
  type?: string;
  /** Mobile keyboard hint (e.g. 'numeric'). */
  inputMode?: 'text' | 'numeric' | 'tel' | 'email' | 'search' | 'decimal';
  /** Leading icon node. Defaults to a search glyph. */
  leading?: React.ReactNode;
  /** Shows a green check and green border (valid value). @default false */
  valid?: boolean;
  /** Shows a clear (×) button while there's a value. @default false */
  clearable?: boolean;
  style?: React.CSSProperties;
}

/** Mobile text/search field with focus ring and validation state. */
export declare const SearchField: React.FC<SearchFieldProps>;
