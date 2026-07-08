import type { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Home: undefined;
  Orders: { filter?: string } | undefined;
  Inventory: undefined;
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
  Scan: undefined;
  // Fluxo de conclusão da OS (situação → solução/data → assinaturas → revisão).
  // Lançado só com o id; o resto é coletado/derivado dentro do fluxo.
  WorkOrderSignature: { id: string };
  MyData: undefined;
  Notifications: undefined;
};
