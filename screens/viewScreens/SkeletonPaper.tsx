import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scaleHeight } from '../../Scaling'
import { LinearGradient } from 'expo-linear-gradient'
import { Skeleton } from '@rneui/themed'
import { styles } from '../../style/style'

const SkeletonPaper = ({SkeletonHeight,SkeletonWidth,style}) => {
  return (
    <Skeleton
    LinearGradientComponent={LinearGradient}
    animation="wave"
    width={SkeletonWidth}
    height={SkeletonHeight}
    style={style}
  />
  )
}

export default SkeletonPaper

const SkeletonCircle = ({SkeletonHeight,SkeletonWidth,style}) => {
  return (
    <Skeleton 
    LinearGradientComponent={LinearGradient}
    animation="wave"
    circle width={SkeletonWidth} 
    height={SkeletonHeight} 
    style={style}
    />
  )
}

export {SkeletonCircle}

