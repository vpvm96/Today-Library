import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from '@emotion/react'
import { darkTheme, lightTheme } from './assets/styles/theme'
import Root from './navigation/Root'
import { useColorScheme } from 'react-native'

const queryClient = new QueryClient()

export default function App() {
  const isDark = useColorScheme() === 'dark'
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
