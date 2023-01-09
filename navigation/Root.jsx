import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screen/Login/Login'
import SignUp from '../screen/Login/SignUp'
import Stacks from './Staks'
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
      <Nav.Screen name="LoginPage" component={Login} />
      <Nav.Screen name="SignUpPage" component={SignUp} />
    </Nav.Navigator>
  )
}

export default Root
