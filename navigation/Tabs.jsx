import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import styled from '@emotion/native'
import Mypage from '../screen/Mypage'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Mypage" component={Mypage} />
      {/* <LogoImage source={(require = '../../assets/images/Hlogo.png')} /> */}
    </Tab.Navigator>
  )
}

export default Tabs

const LogoImage = styled.Image`
  width: 20px;
`
