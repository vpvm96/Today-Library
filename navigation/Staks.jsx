import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Text, TouchableOpacity } from 'react-native'
import { authService } from '../api/firebase'
import BookDetail from '../screen/BookDetail'

const Stack = createNativeStackNavigator()

const Stacks = ({ navigation: { goBack } }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Text>뒤로가기</Text>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => authService.signOut()}>
            <Text>로그아웃</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="BookDetail" component={BookDetail} />
    </Stack.Navigator>
  )
}

export default Stacks
