import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import styled from '@emotion/native'
import Mypage from '../screen/Mypage'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { Image, TouchableOpacity, View, Text } from 'react-native'
import ProfileEdit from '../screen/ProfileEdit'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home" // 처음 랜더링시 Home 화면 보여줌
      screenOptions={{
        tabBarShowLabel: false, // 탭바 타이틀 지우기
        headerTitleAlign: 'left', // 안드로이드와 ios 헤더위치가 달라서 left로 값 지정
        title: <LogoImage source={require('../assets/images/Hlogo.png')} />,
        tabBarStyle: {
          backgroundColor: '#61D2BC',
        },
        tabBarActiveTintColor: '#fff',
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={32} color={color} />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={32} color={color} />
          ),
          headerRight: () => (
            <SettingIcon onPress={() => navigate('ProfileEdit')}>
              <Ionicons name="ios-settings-sharp" size={20} color="black" />
            </SettingIcon>
          ),
        }}
        name="Mypage"
        component={Mypage}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-settings-sharp" size={20} color={color} />
          ),
        }}
        name="ProfileEdit"
        component={ProfileEdit}
      />
    </Tab.Navigator>
  )
}

export default Tabs

const LogoImage = styled.Image`
  width: 120px;
  height: 30px;
`
const SettingIcon = styled.TouchableOpacity`
  margin-right: 20px;
`
