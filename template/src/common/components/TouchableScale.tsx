import React, { ReactNode } from "react"
import { StyleProp, ViewStyle } from "react-native"
import { TapGestureHandler } from "react-native-gesture-handler"
import Animated, { Easing } from "react-native-reanimated"
import useScaleTransition, {
  ScaleTransitionProps
} from "../hooks/useScaleTransition"

interface Props {
  children: ReactNode
  containerStyle: StyleProp<Animated.AnimateStyle<ViewStyle>>
  config?: Partial<ScaleTransitionProps>
}

/**
 *
 * Performs a scale transition when pressed.
 */
const TouchableScale = ({ children, containerStyle, config }: Props) => {
  const animConfig: ScaleTransitionProps = {
    duration: config?.duration || 100,
    regularScale: config?.regularScale || 1,
    scaleWhenPressed: config?.scaleWhenPressed || 0.9,
    easing: config?.easing || Easing.inOut(Easing.ease),
    onPress: config?.onPress
  }

  const { scale, gestureHandler } = useScaleTransition(animConfig)
  return (
    <TapGestureHandler {...gestureHandler}>
      <Animated.View style={[{ transform: [{ scale }] }, containerStyle]}>
        {children}
      </Animated.View>
    </TapGestureHandler>
  )
}

export default TouchableScale
