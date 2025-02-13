export const navItems = [
  { name: "Dashboard", href: "/", icon: "/assets/icons/home.svg", url: "/" },
  {
    name: "Documents",
    href: "/documents",
    icon: "/assets/icons/document.svg",
    url: "/documents",
  },
  {
    name: "Images",
    href: "/images",
    icon: "/assets/icons/image.svg",
    url: "/images",
  },
  {
    name: "Media",
    href: "/media",
    icon: "/assets/icons/media.svg",
    url: "/media",
  },
  {
    name: "Others",
    href: "/others",
    icon: "/assets/icons/other.svg",
    url: "/others",
  },
];

export const avatarPlaceholderUrl =
  "https://img.freepik.com/free-psd/3d-kid-with-costume_23-2151880022.jpg?t=st=1738575838~exp=1738579438~hmac=535e3e3a499d42b9ff84e3f5e6b222ddeb71760e75c8d2b6d8151f88a50a1484&w=826";

export const MAX_FILE_SIZE = 50 * 1024 * 1024;

export const actionsDropdownItems = [
  {
    label: "Rename",
    icon: "/assets/icons/edit.svg",
    value: "rename",
  },
  {
    label: "Details",
    icon: "/assets/icons/info.svg",
    value: "details",
  },
  {
    label: "Share",
    icon: "/assets/icons/share.svg",
    value: "share",
  },
  {
    label: "Download",
    icon: "/assets/icons/download.svg",
    value: "download",
  },
  {
    label: "Delete",
    icon: "/assets/icons/delete.svg",
    value: "delete",
  },
];

export const sortTypes = [
  {
    label: "Newest",
    value: "$createdAt-desc",
  },
  {
    label: "Oldest",
    value: "$createdAt-asc",
  },
  {
    label: "Name (A-Z)",
    value: "name-asc",
  },
  {
    label: "Name (Z-A)",
    value: "name-desc",
  },
  {
    label: "Size (Highest)",
    value: "size-desc",
  },
  {
    label: "Size (Lowest)",
    value: "size-asc",
  },
]