export const global = {
  tabBarVisible: true,
  keyStack: '',
  currentRoute: '',
  allProjects: {},
};

export const handle = {
  setTabbarVisible(isVisible) {
      global.tabBarVisible = isVisible;
  },
  setKeyStack(keyStack) {
      global.keyStack = keyStack;
  },
  setRoute(nameRoute) {
      global.currentRoute = nameRoute;
  },
  setAllProjects(allProjects) {
      global.allProjects = allProjects;
  },
}
