export type MobileCapabilities = {
  canManageWorkOrders: boolean;
  canDelegateWorkOrders: boolean;
  canViewAllWorkOrders: boolean;
};

export type MobileUser = {
  id: string;
  username: string;
  fullName: string | null;
  role: string;
  department: string | null;
  email?: string | null;
  phone?: string | null;
  cpf?: string | null;
  registeredSince?: string | null;
  workOrderPrinterName?: string | null;
  avatarUrl?: string | null;
  capabilities?: MobileCapabilities | null;
  /** Mapa efetivo de permissões { key: boolean } (novo sistema). */
  permissions?: Record<string, boolean> | null;
};

export type LoginResponse = {
  token: string;
  refreshToken: string;
  user: MobileUser;
};

export type RefreshResponse = {
  token: string;
  refreshToken: string;
};
