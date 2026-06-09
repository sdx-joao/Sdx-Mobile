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
  NewWorkOrder: undefined;
  InventoryDetail: { id: string };
  Scan: undefined;
};
