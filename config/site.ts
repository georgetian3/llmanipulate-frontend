export type SiteConfig = typeof siteConfig;

type NavItem = {
  label: string
  href: string
}


export const siteConfig = {
  name: "LLManipulate",
  description: "LLManipulate",
  navItems: [
    {
      label: "Tasks",
      href: "/tasks",
    },
  ] as NavItem[],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/georgetian3/llmanipulate-cicd",
  },
};
