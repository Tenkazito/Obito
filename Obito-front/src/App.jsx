import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import { ProfileProvider } from './context/profileProvider'
import { router } from './router/router'

const App = () => {
    return (
      <ProfileProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </ProfileProvider>
    );
}
 
export default App;