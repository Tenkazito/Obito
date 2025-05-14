"use client"

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "./avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "./sidebar"

import Enable from "../dialogs/enable"
import Disable from "../dialogs/disable"
import Support from "../dialogs/support"
import { useLogout } from "../../hooks/useLogOut"
import { useProfile } from "../../hooks/useProfile"

export function NavUser({ user }) {
    const { isMobile } = useSidebar()
    const { logout } = useLogout()
    const { profile } = useProfile()

    return (
        <SidebarMenu className="mb-2 w-60 ml-2">
            <SidebarMenuItem className="">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            tooltip="User Menu"
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.avatar} alt={profile.name} className=""/>
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{profile.name}</span>
                                <span className="truncate text-xs">{profile.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal m-0 data-[inset]:pl-0" inset={false}>
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.name} className=""/>
                                    <AvatarFallback className="rounded-lg">XD</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight pl-0">
                                    <span className="truncate font-semibold">{profile.name}</span>
                                    <span className="truncate text-xs">{profile.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className=""/>
                        <DropdownMenuGroup>
                            
                            <Support/>
                            {profile.active === false ? <Enable /> : <Disable />}

                        </DropdownMenuGroup>
                        <DropdownMenuSeparator className=""/>
                            <DropdownMenuItem onClick={logout}>
                                <LogOut />
                                Log out
                            </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}