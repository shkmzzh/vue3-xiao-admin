export interface MenuObject extends Object {
  themeColors?: string; //主题色

  menuBg?: string; // 菜单背景色
  menuText?: string; // 菜单文字颜色
  subMenuBg?: string; // 子菜单背景色
  subMenuActiveBg?: string; // 子菜单选中后背景色
  subMenuActiveText?: string; // 子菜单选中颜色
  subMenuHover?:string // 子菜单移入背景色
  sidebarLogo?: string; // logo背景色
  
  menuHover?: string; // 菜单移入色
  menuTitleHover?: string; // 菜单文字移入颜色
}

export const themeColorList = ref<MenuObject[]>([
  {
    themeColors:'#1b2a47', // 默认主题色

    menuBg: "#001529", 
    menuText: "rgb(254 254 254 / 65%)",
    subMenuBg: "#0f0303", 
    subMenuActiveBg: "#4091f7", 
    subMenuActiveText: "#fff",
    subMenuHover:'#0f0303',
    sidebarLogo: "#002140", 

    menuHover: "transparent", 
    menuTitleHover: "transparent", 
  },
  {
    themeColors:'red',
    subMenuActiveText: "#409eff",
    menuBg: "#fff",
    menuHover: "#e0ebf6",
    subMenuBg: "#fff",
    subMenuActiveBg: "#e0ebf6",
    menuText: "#7a80b4",
    sidebarLogo: "#fff",
    menuTitleHover: "#000",

  },
  {
    themeColors:'yellow',
    subMenuActiveText: "#fff",
    menuBg: "#2a0608",
    menuHover: "#e13c39",
    subMenuBg: "#000",
    subMenuActiveBg: "#e13c39",
    menuText: "rgb(254 254 254 / 65.1%)",
    sidebarLogo: "#42090c",
    menuTitleHover: "#fff",
  },
])