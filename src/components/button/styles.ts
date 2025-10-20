import {StyleSheet} from "react-native";

import {themas} from "../../global/themes";

export const style = StyleSheet.create({
  button: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themas.colors.buttonPrimary,
    borderRadius: 40,
  },
  textButton: {
    fontSize: 16,
    color: themas.colors.buttonText,
    // fontWeight: 'bold'
  },
}) 