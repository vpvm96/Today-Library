import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProfileEdit from '../screen/ProfileEdit'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, Text } from 'react-native'

const Sub = createBottomTabNavigator()

function Subs({ navigation: { goBack } }) {
  return (
    <Sub.Navigator>
      <Sub.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <TouchableOpacity onPress={() => goBack()}>
              <Text>Back</Text>
            </TouchableOpacity>
          ),
          tabBarStyle: {
            backgroundColor: '#61D2BC',
          },
        }}
        name="ProfileEdit"
        component={ProfileEdit}
      />
    </Sub.Navigator>
  )
}

export default Subs
