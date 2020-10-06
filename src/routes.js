/* eslint-disable react/prop-types */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StackNew() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#fff',
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="SelectProvider"
        component={SelectProvider}
        options={{
          headerTitle: 'Selecione o prestador',
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}}>
              <Icon name="arrow-back" color="#FFF" size={20} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={{
          headerTitle: 'Selecione o horário',
        }}
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={{headerTitle: 'Confirme o agendamento'}}
      />
    </Stack.Navigator>
  );
}

export default ({isSigned}) => (
  <NavigationContainer>
    {isSigned ? (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Agendamentos') {
              iconName = focused ? 'event' : 'event';
            } else if (route.name === 'Perfil') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Agendar') {
              iconName = focused ? 'add-circle-outline' : 'add';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          keyboardHidesTabBar: true,
          activeTintColor: '#fff',
          inactiveTintColor: 'rgba(255,255,255,0.6)',
          style: {
            backgroundColor: '#ab59c1',
            borderTopWidth: 0,
          },
        }}>
        <Tab.Screen name="Agendamentos" component={Dashboard} />
        <Tab.Screen
          name="Agendar"
          component={StackNew}
          options={{tabBarVisible: false}}
        />
        <Tab.Screen name="Perfil" component={Profile} />
      </Tab.Navigator>
    ) : (
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    )}
  </NavigationContainer>
);
