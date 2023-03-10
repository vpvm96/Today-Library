import { onAuthStateChanged } from '@firebase/auth'
import { useNavigation } from '@react-navigation/core'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { authService } from '../api/firebase'
import BookDetail from '../screen/BookDetail'

const Stack = createNativeStackNavigator()

const Stacks = ({ navigation: { goBack } }) => {
  const [logoutText, setLogoutText] = useState(true)
  const navigation = useNavigation()

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setLogoutText(false)
      } else if (!user) {
        setLogoutText(true)
      }
    })
  }, [])
  const logoutHandler = () => {
    if (logoutText === false) {
      authService.signOut()
    } else {
      navigation.replace('LoginPage')
    }
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={logoutHandler}>
            <Text>{logoutText ? '로그인' : '로그아웃'}</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="BookDetail" component={BookDetail} />
    </Stack.Navigator>
  )
}

export default Stacks
