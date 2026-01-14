import { Link, useLocation } from "react-router-dom"
import { BarChart3, Bell, ChevronDown, ChevronsUpDown, FileText, Home, LogOut, MessageCircle, Settings, ThumbsUp, User, Users } from "lucide-react"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Data Table",
    url: "/data-table",
    icon: FileText,
  },
  {
    title: "Analytics",
    url: "#",
    icon: BarChart3,
  },
  {
    title: "Reports",
    url: "#",
    icon: FileText,
  },
  {
    title: "Users",
    url: "#",
    icon: Users,
  },
]

const AppSidebar = () => {
  const { theme, setTheme } = useTheme()
  const { pathname } = useLocation()

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarContent>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="!text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                Navigation
                <ChevronDown className="ml-auto transition-transform group-data-[state=closed]/collapsible:rotate-0 group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => {
                    const isRoute = !item.url.startsWith("#")
                    const isActive = isRoute && (item.url === "/" ? pathname === "/" : pathname.startsWith(item.url))

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          {isRoute ? (
                            <Link to={item.url}>
                              <item.icon />
                              <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                            </Link>
                          ) : (
                            <a href={item.url}>
                              <item.icon />
                              <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                            </a>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="!text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                Help
                <ChevronDown className="ml-auto transition-transform group-data-[state=closed]/collapsible:rotate-0 group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <MessageCircle className="h-4 w-4" />
                        <span>Support</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <ThumbsUp className="h-4 w-4" />
                        <span>Feedback</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter>
        <div className="border-t border-sidebar-border px-2 pt-2 group-data-[collapsible=icon]:px-0">
          {/* Dark mode switch */}
          <div className="flex items-center gap-3 py-2">
            <span className="text-sm">Dark Mode</span>
            <label className="ml-auto inline-flex cursor-pointer items-center">
              <input type="checkbox" checked={theme === "dark"} onChange={(e) => setTheme(e.target.checked ? "dark" : "light")} className="sr-only" />
              <div className={`flex h-6 w-10 items-center rounded-full p-1 transition-colors ${theme === "dark" ? "bg-slate-600" : "bg-slate-300"}`}>
                <div
                  className={`
                    h-4 w-4 rounded-full bg-white shadow-md transition-transform
                    ${theme === "dark" ? "translate-x-4" : ""}
                  `}
                />
              </div>
            </label>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="
                  w-full flex items-center justify-between rounded-md px-2 py-2
                  hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
                  focus-visible:outline-hidden focus-visible:ring-2 ring-sidebar-ring
                  group-data-[collapsible=icon]:justify-center
                  group-data-[collapsible=icon]:px-0
                "
                aria-label="Open user menu"
              >
                <div className="flex min-w-0 items-center gap-3 group-data-[collapsible=icon]:gap-0">
                  <img
                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=64&q=80&auto=format&fit=crop"
                    alt="John Doe avatar"
                    className="
                    h-10 w-10 shrink-0 rounded-full object-cover 
                    group-data-[collapsible=icon]:mx-auto
                    group-data-[collapsible=icon]:h-8 
                    group-data-[collapsible=icon]:w-8
                    "
                  />

                  <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                    <div className="text-sm font-medium leading-none">John Doe</div>
                    <div className="mt-0.5 truncate text-xs text-muted-foreground">john.doe@example.com</div>
                  </div>
                </div>

                <ChevronsUpDown
                  className="
                    h-4 w-4 shrink-0 text-muted-foreground
                    group-data-[collapsible=icon]:hidden
                  "
                  aria-hidden="true"
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="right" align="start" sideOffset={8} className="mb-2 w-64">
              <DropdownMenuLabel className="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=64&q=80&auto=format&fit=crop" alt="User avatar" className="h-9 w-9 rounded-full object-cover" />
                <div className="grid">
                  <span className="text-sm font-medium leading-none">John Doe</span>
                  <span className="text-xs text-muted-foreground">john.doe@example.com</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
