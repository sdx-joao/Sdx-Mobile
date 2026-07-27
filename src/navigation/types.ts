import type { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Home: undefined;
  Orders: { filter?: string } | undefined;
  Inventory: undefined;
  Stock: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  WorkOrderDetail: { id: string };
  WorkOrderEdit: { id: string };
  WorkOrderHistory: undefined;
  WorkOrderDelegate: { id: string; code?: string };
  WorkOrderAttachmentCapture: { id: string; category?: 'before' | 'after' | 'general' };
  WorkOrderPhotoViewer: { id: string; startId?: string };
  NewWorkOrder: undefined;
  InventoryDetail: { id: string };
  LocationShowcase: { code: string };
  /** Edição de item já cadastrado (completar informação/fotos em campo). */
  EditInventoryItem: { id: string };
  NewInventoryItem: { labelCode?: string; copies?: number; firstCopy?: number; resumeLabelCode?: string } | undefined;
  InventoryCopyValidation: {
    labelCode: string;
    copies: number;
    validated: number[];
    form: import('../lib/pending-registrations').PendingForm;
  };
  PendingRegistrations: undefined;
  Scan: undefined;
  // "Celular como scanner": lê a sessão QR aberta no web e envia cada etiqueta lida.
  ScanRelay: { token: string };
  // Fluxo de conclusão da OS (situação → solução/data → assinaturas → revisão).
  // Lançado só com o id; o resto é coletado/derivado dentro do fluxo.
  WorkOrderSignature: { id: string };
  MyData: undefined;
  Notifications: undefined;
};
