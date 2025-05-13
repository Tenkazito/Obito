import { SidebarContent, 
        SidebarGroup,
        SidebarGroupLabel,
        SidebarGroupContent,
        SidebarMenu,
        SidebarMenuItem,
        SidebarMenuButton } from "./sidebar";
import { BanknoteArrowUp, FileClock, House } from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

const items = [
    {
      title: "Dashboard",
      url: "/home",
      icon: House,
    },
    {
      title: "Transfer",
      url: "/home/transfer",
      icon: BanknoteArrowUp,
    },
    {
      title: "History",
      url: "/home/history",
      icon: FileClock,
    },
];

const Sidecontent = () => {
    return (
        <SidebarContent>
            <SidebarGroup>
                <div className="flex flex-row justify-between mb-2">
                    <SidebarGroupLabel>Actions</SidebarGroupLabel>
                    <ModeToggle />
                </div>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                            <Link to={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                            </Link>
                            </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    );
}
 
export default Sidecontent;