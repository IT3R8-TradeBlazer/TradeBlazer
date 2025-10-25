import { View, Text, Image, StyleSheet} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';

function Screen1() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
      <View style={styles.search}>
        <Searchbar
            style={{backgroundColor: '#fff',}}
          placeholder="Search for anything"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />

        <View style={styles.container}>
            <Text>Hello World</Text>
        </View>
      </View>
      
      
      
    );
  }

function Screen2() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eBecf4'}}>
      <Text style={{fontSize: 20}}>Welcome to Screen 2</Text>
    </View>
  );
}

function Screen3() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20}}>Welcome to Screen 3</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Dashboard() {   
  return (
    <Tab.Navigator screenOptions={tabBarStyle={backgroundColor: '#357045'}}>
      <Tab.Screen 
        name=" " 
        component={Screen1}
        options={{
        headerTitle: 'Home',  
          tabBarIcon: () => (<Image source={require('../assets/1.png')} style={{height:30, width:30}} />)
        }}
      />
      <Tab.Screen 
        name="  " 
        component={Screen2}
        options={{
        headerTitle: 'House',
          tabBarIcon: () => (<Image source={require('../assets/2.png')} style={{height:30, width:30}} />)
        }}
      />
      <Tab.Screen 
        name="   " 
        component={Screen3}
        options={{
        headerTitle: 'Homee',
          tabBarIcon: () => (<Image source={require('../assets/3.png')} style={{height:30, width:30}} />)
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    search: {
      flex: 1,
      padding: 16,
      backgroundColor: '#eBecf4'
      
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  });