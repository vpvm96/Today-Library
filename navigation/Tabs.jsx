import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import styled from '@emotion/native'
import Mypage from '../screen/Mypage'
import Home from '../screen/Home'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
// import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'
import { Image, TouchableOpacity, View, Text } from 'react-native'
import ProfileEdit from '../screen/ProfileEdit'
import Subs from './Subs'
import { useNavigation } from '@react-navigation/core'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from '@firebase/auth'
import { authService } from '../api/firebase'

const Tab = createBottomTabNavigator()

const Tabs = ({ navigation }) => {
  const [logoutText, setLogoutText] = useState(true)
  const navigate = useNavigation()

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setLogoutText(false)
      } else if (!user) {
        setLogoutText(true)
      }
    })
  }, [])
  const NavLogoutHandler = () => {
    if (logoutText === false) {
      authService.signOut()
    } else {
      navigate.replace('LoginPage')
    }
  }

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
        headerRight: () => (
          <LogoutText onPress={NavLogoutHandler}>
            <Text>{logoutText ? '로그인' : '로그아웃'}</Text>
          </LogoutText>
        ),
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
            <SettingIcon onPress={() => navigation.navigate('Subs')}>
              <Ionicons name="ios-settings-sharp" size={20} color="black" />
            </SettingIcon>
          ),
        }}
        name="Mypage"
        component={Mypage}
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
const LogoutText = styled.TouchableOpacity`
  margin-right: 20px;
  margin-top: 15px;
`
