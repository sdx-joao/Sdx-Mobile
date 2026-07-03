import * as React from 'react';

export interface DelegationBannerProps {
  /** 'card' = tira compacta na lista; 'detail' = bloco completo com recado. @default 'card' */
  variant?: 'card' | 'detail';
  /** Nome de quem recebeu a delegação. */
  toName?: string;
  /** Nome de quem delegou/encaminhou. */
  byName?: string;
  /** Recado anexo à delegação (só aparece no variant 'detail'). */
  message?: string;
  /** Realça como "delegada a você" (destinatário = usuário logado). @default false */
  toMe?: boolean;
  style?: React.CSSProperties;
}

/** Sinalização índigo de OS delegada (encaminhada a um usuário). */
export declare const DelegationBanner: React.FC<DelegationBannerProps>;
