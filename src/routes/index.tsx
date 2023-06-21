import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from '@rneui/themed';

import styles from './styles';

// Containers
import Home from '../containers/Home';
import CustomModule from '../containers/CustomModule';

// Components
import DrawerContent from '../components/DrawerContent';

const Drawer = createDrawerNavigator();

const Routes = () => {
  const openDrawer = (navigation: any) => {
    navigation.openDrawer();
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => (
            {
              headerLeft: () => (
                <Icon type="font-awesome" name="bars" onPress={() => openDrawer(navigation)} iconStyle={styles.menuIcon} />
              ),
            }
          )}
        />

        <Drawer.Screen
          name="CustomModule"
          component={CustomModule}
          options={({ navigation }) => (
            {
              headerLeft: () => (
                <Icon type="font-awesome" name="bars" onPress={() => openDrawer(navigation)} iconStyle={styles.menuIcon} />
              ),
            }
          )}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
