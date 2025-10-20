import {StyleSheet} from "react-native";

import {themas} from "../../global/themes";

export const style = StyleSheet.create({
  tabArea: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-around',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
  },
  tabItem: {
    felx: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabItemButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    zIndex: 9999,
    // backgroundColor: themas.colors.primary,
    backgroundColor: themas.colors.border,
    // backgroundColor: themas.colors.surface,
    borderColor: themas.colors.border,
    color: themas.colors.textPrimary,
    
    
  }
}) 