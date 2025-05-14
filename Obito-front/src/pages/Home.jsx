import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import AppSidebar from "../components/ui/app-sidebar"
import Sidecontent from "../components/ui/sidecontent"
 
import { Sidebar } from "../components/ui/sidebar"
import { NavUser } from "../components/ui/navuser";
import { Outlet } from "react-router-dom"
import { BreadcrumbWithCustomSeparator } from "../components/ui/homebread";
import { useLocation } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";

const Home = () => {
    const location = useLocation()
    const activeSubroute = location.pathname.replace("/home", "")
    const component = (activeSubroute.startsWith("/") ? activeSubroute.slice(1) : activeSubroute).replace(/^./, c => c.toUpperCase())
    const { profile } = useProfile();

    return (
      <SidebarProvider defaultOpen={false}>
        <div className="flex h-screen w-screen overflow-hidden bg-background">
          {/* Barra lateral izquierda fija */}
          <AppSidebar />

          {/* Contenido principal */}
          <main className="flex-1 p-4 flex flex-col overflow-y-auto">
            {/* Header con SidebarTrigger y Breadcrumb */}
            <header className="flex flex-row gap-4 items-center mb-4 border-b pb-2">
              <SidebarTrigger />
              <BreadcrumbWithCustomSeparator route={activeSubroute} component={component} />
            </header>

            {/* Contenido centrado */}
            <div className="flex-1 flex items-center justify-center w-full">
              <Outlet />
            </div>
          </main>

          {/* Sidebar flotante (controlado por SidebarProvider) */}
          <Sidebar>
            <Sidecontent />
            <NavUser
              user={{
                name: profile.name,
                email: profile.email,
                avatar: "https://upload.wikimedia.org/wikipedia/commons/9/90/Labrador_Retriever_portrait.jpg",
              }}
            />
          </Sidebar>
        </div>
      </SidebarProvider>
    );
}
 
export default Home;