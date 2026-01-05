"use client";

import * as React from "react";
import {
  // BookOpen,
  // Bot,
  // Frame,
  Link,
  // Map,
  // PieChart,
  // Settings2,
  // SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useMe } from "@/quaries/useMe";
// import { LoadingButton } from "./loading-button";
import { Spinner } from "./ui/spinner";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Links",
      url: "#",
      icon: Link,
      items: [
        {
          title: "All links",
          url: "#",
        },
        {
          title: "Make link",
          url: "#",
        },
      ],
    },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user, isLoading } = useMe();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      {isLoading ? (
        <div className="h-full flex justify-center items-center">
          <Spinner className="size-6" />
        </div>
      ) : (
        <>
          <SidebarContent>
            <NavMain items={data.navMain} />
            {/* <NavProjects projects={data.projects} /> */}
          </SidebarContent>
          <SidebarFooter>
            <NavUser
              user={{
                name: user?.name || "Unknown User",
                email: user?.mail || "Unknown Email",
                avatar: "/pp.png",
              }}
            />
          </SidebarFooter>
          <SidebarRail />
        </>
      )}
    </Sidebar>
  );
}
