export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "LLManipulate",
  description: "LLManipulate",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  authedNavItems: [
    {
      label: "Tasks",
      href: "/tasks",
    },
  ],
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
