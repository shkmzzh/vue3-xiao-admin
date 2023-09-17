export interface MenuObject extends Object {
  themeColor: string; //主题色

  menuBg?: string; // 菜单背景色
  menuText?: string; // 菜单文字颜色
  subMenuBg?: string; // 子菜单背景色
  menuActiveText?:string; // 菜单选中文字颜色
  subMenuActiveBg?: string; // 子菜单选中后背景色
  subMenuActiveText?: string; // 子菜单选中颜色
  subMenuHover?:string // 子菜单移入背景色
  sidebarLogo?: string; // logo背景色 
  
  menuHover?: string; // 菜单移入色
  menuTitleHover?: string; // 菜单文字移入颜色
  subMenuHoverText?:string; // 菜单文字移入颜色
  subActiveText?:string; // 选中当前项文字颜色
}

export const themeColorList = ref<MenuObject[]>([
  {
    themeColor:'#409EFF', // 默认主题色

    menuBg: "#001529", 
    menuText: "rgb(254 254 254 / 65%)",
    subMenuBg: "#0f0303", 
    subMenuActiveBg: "#409EFF", 
    menuActiveText: "#409EFF", 
    subMenuActiveText: "#409EFF",
    subMenuHoverText:'#409EFF',
    sidebarLogo: "#002140", 
    menuHover: "transparent", 
    menuTitleHover: "transparent", 
    subActiveText:"#fff"
  },
  {
    themeColor:'#e13c39',  // 红色

    menuBg: "#2b0e05", 
    menuActiveText: "#2b0e05", 
    menuText: "rgb(254 254 254 / 65.1%)",
    subMenuBg: "#000", 
    subMenuActiveBg: "#e13c39", 
    subMenuActiveText: "#e13c39",
    subMenuHoverText:'#e13c39',
    sidebarLogo: "#42090c", 

    menuHover: "transparent", 
    menuTitleHover: "transparent", 
    subActiveText:"#fff"
  },
  {
    themeColor:'#722ed1', // 紫色

    menuBg: "#130824", 
    menuActiveText:'130824',
    menuText: "#7a80b4",
    subMenuBg: "#000", 
    subMenuActiveBg: "#722ed1", 
    subMenuActiveText: "#fff",
    subMenuHoverText:'#fff',
    sidebarLogo: "#1f0c38", 

    menuHover: "transparent", 
    menuTitleHover: "transparent", 
    subActiveText:"#fff"
  },
])