import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBar } from './TabBar';
import type { RootStackParamList, TabParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { WorkOrdersScreen } from '../screens/WorkOrdersScreen';
import { InventoryScreen } from '../screens/InventoryScreen';
import { StockScreen } from '../screens/StockScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { WorkOrderDetailScreen } from '../screens/WorkOrderDetailScreen';
import { WorkOrderEditScreen } from '../screens/WorkOrderEditScreen';
import { WorkOrderHistoryScreen } from '../screens/WorkOrderHistoryScreen';
import { WorkOrderDelegateScreen } from '../screens/WorkOrderDelegateScreen';
import { WorkOrderAttachmentCaptureScreen } from '../screens/WorkOrderAttachmentCaptureScreen';
import { WorkOrderPhotoViewerScreen } from '../screens/WorkOrderPhotoViewerScreen';
import { NewWorkOrderScreen } from '../screens/NewWorkOrderScreen';
import { InventoryDetailScreen } from '../screens/InventoryDetailScreen';
import { EditInventoryItemScreen } from '../screens/EditInventoryItemScreen';
import { NewInventoryItemScreen } from '../screens/NewInventoryItemScreen';
import { InventoryCopyValidationScreen } from '../screens/InventoryCopyValidationScreen';
import { PendingRegistrationsScreen } from '../screens/PendingRegistrationsScreen';
import { ScanScreen } from '../screens/ScanScreen';
import { ScanRelayScreen } from '../screens/ScanRelayScreen';
import { WorkOrderSignatureScreen } from '../screens/WorkOrderSignatureScreen';
import { MyDataScreen } from '../screens/MyDataScreen';
import { NuntiusUnlockFab } from '../components/NuntiusUnlockScanner';
import { NotificationsScreen } from '../screens/NotificationsScreen';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function Tabs() {
  // O FAB fica NESTA camada: acompanha todas as abas mas some quando o técnico
  // entra num modal fullscreen (Scan, novo cadastro) — não faria sentido ler QR
  // por cima da própria câmera do cadastro.
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Orders" component={WorkOrdersScreen} />
        <Tab.Screen name="Inventory" component={InventoryScreen} />
        <Tab.Screen name="Stock" component={StockScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
      <NuntiusUnlockFab />
    </View>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="WorkOrderDetail" component={WorkOrderDetailScreen} />
      <Stack.Screen name="WorkOrderEdit" component={WorkOrderEditScreen} />
      <Stack.Screen name="WorkOrderHistory" component={WorkOrderHistoryScreen} />
      <Stack.Screen name="WorkOrderDelegate" component={WorkOrderDelegateScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="WorkOrderAttachmentCapture" component={WorkOrderAttachmentCaptureScreen} options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="WorkOrderPhotoViewer" component={WorkOrderPhotoViewerScreen} options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="InventoryDetail" component={InventoryDetailScreen} />
      <Stack.Screen name="EditInventoryItem" component={EditInventoryItemScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="NewInventoryItem" component={NewInventoryItemScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="InventoryCopyValidation" component={InventoryCopyValidationScreen} options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="PendingRegistrations" component={PendingRegistrationsScreen} />
      <Stack.Screen name="NewWorkOrder" component={NewWorkOrderScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="Scan" component={ScanScreen} options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="ScanRelay" component={ScanRelayScreen} options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="WorkOrderSignature" component={WorkOrderSignatureScreen} options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="MyData" component={MyDataScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}
