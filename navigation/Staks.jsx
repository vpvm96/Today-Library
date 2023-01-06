import { TouchableOpacity, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const Stacks = ({ navigation: { goBack } }) => {
  return (
    <Stack.Navigator>
      <TouchableOpacity onPress={() => goBack()}>
        <Text>Back</Text>
      </TouchableOpacity>
    </Stack.Navigator>
  )
}

export default Stacks
