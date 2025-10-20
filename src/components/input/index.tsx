import React, {forwardRef, Fragment, ForwardedRef} from "react";
import { MaterialIcons, Ionicons, FontAwesome, Octicons} from '@expo/vector-icons';
import {Text,View, TextInput,TouchableOpacity, TextInputProps} from 'react-native';

import { style } from "./styles";
import {themas} from "../../global/themes";

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> |
                     React.ComponentType<React.ComponentProps<typeof Ionicons>> |
                     React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
                     React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props = TextInputProps & {
  IconLeft?: IconComponent,
  IconRight?: IconComponent,
  iconLeftName?: string,
  iconRightName?: string,
  title?: string,
  onIconLeftPress?: () => void,
  onIconRightPress?: () => void,
}

export const Input = forwardRef((props:Props, ref: ForwardedRef<TextInput>) => {

  const {IconLeft, IconRight, iconLeftName, iconRightName, title, onIconLeftPress, onIconRightPress, ...rest} = props
  
  const calculateSizeWidth = () => {
    if(IconLeft && IconRight){
      return '80%';
    } else if (IconLeft || IconRight){
      return '90%';
    }else{
      return '100%';
    }
  }

  const calculateSizePaddingLeft = () => {
    if(IconLeft && IconRight){
      return 0;
    } else if (IconLeft || IconRight){
      return 15;
    }else{
      return 20;
    }
  }

  return(
    <Fragment>
      {title && <Text style={style.titleInput}>{title}</Text>}
      <View style={[style.boxInput, {paddingLeft:calculateSizePaddingLeft()} ]}>
        {IconLeft && iconLeftName &&(
          <TouchableOpacity onPress={onIconLeftPress} style={style.button}>
            <IconLeft name={iconLeftName as any} size={20} color={themas.colors.textSecondary} style={style.icon}/>
          </TouchableOpacity>
        )}
        <TextInput 
          style={[
            style.input,{width:calculateSizeWidth()}
          ]}
          {...rest}
        />
        {IconRight && iconRightName &&(
          <TouchableOpacity onPress={onIconRightPress}>
            <IconRight name={iconRightName as any} size={20} color={themas.colors.textSecondary} style={style.icon}/>
          </TouchableOpacity>
        )}
      </View>
    </Fragment>
  )
})