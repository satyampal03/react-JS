
    export const data = [
  {
    label: "Home",
    to: "/",
  },

  {
    label: "Profile",
    to: "/",
    children: [
      {
        label: "Details",
        to: "details",
      },
      {
        label: "Location",
        to: "location",
      },
    ],
  },

  {
    label: "Settings",
    to: "/settings",
    children: [
      {
        label: "Account",
        to: "account",
      },
      {
        label: "Security",
        to: "security",
        children: [
          {
            label: "Login",
            to: "login",
          },
          {
            label: "Register",
            to: "register",
          },
        ],
      },
    ],
  },

  {
    label: "Reports",
    to: "/reports",
    children: [
      {
        label: "Daily",
        to: "daily",
      },
      {
        label: "Monthly",
        to: "monthly",
      },
    ],
  },

  {
    label: "Support",
    to: "/support",
    children: [
      {
        label: "Contact",
        to: "contact",
      },
      {
        label: "FAQ",
        to: "faq",
      },
    ],
  },
];
