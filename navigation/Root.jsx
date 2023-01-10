import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Stacks from './Staks'
import Subs from './Subs'
import Tabs from './Tabs'

const Nav = createNativeStackNavigator()

const Root = () => {
  return (
    <Nav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Nav.Screen name="Tabs" component={Tabs} />
      <Nav.Screen name="Stacks" component={Stacks} />
      <Nav.Screen name="Subs" component={Subs} />
    </Nav.Navigator>
  )
}

export default Root
