import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomTabButton from "./customFloatingButton";
import DevScreen from "../screens/dev";

const Tab = createBottomTabNavigator();

interface BottomTabNavigatorProps {
  tabs: Array<{ name: string; component: React.ComponentType<any>; icon: string }>;
}

const BottomTabNavigator = ({ tabs }: BottomTabNavigatorProps) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: (route.name === 'NewTransferStack' || route.name === 'AIChatStack') ? styles.tabBarHidden : styles.tabBar,
        tabBarActiveTintColor: 'rgba(135, 206, 250, 1)',
        tabBarInactiveTintColor: "gray",
      })}
    >
      {tabs.map(({ name, component, icon }) => 
      icon === "comments" ?
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({ focused, color, size }) =>
              <Icon name={icon} size={30} color={'gray'} />,
            tabBarButton: (props) =>
                <CustomTabButton {...props}/>
          }}
        />:
        <Tab.Screen
        key={name}
        name={name}
        component={component}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            <Icon name={icon} size={size} color={color} /> 
        }}
      />
      )}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 70,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'black',
    borderRadius: 35,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  tabBarHidden: {
    display: 'none',
  },
});

export default BottomTabNavigator;
