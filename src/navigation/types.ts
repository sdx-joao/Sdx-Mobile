import type { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Home: undefined;
  Orders: undefined;
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
  WorkOrderSignature: { id: string; status: 'completed' | 'delivered'; signerName?: string };
  MyData: undefined;
  Notifications: undefined;
};
