import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scaleHeight } from '../../Scaling'
import { LinearGradient } from 'expo-linear-gradient'
import { Skeleton } from '@rneui/themed'

const SkeletonPaper = ({SkeletonHeight,SkeletonWidth}) => {
  return (
    <Skeleton
    LinearGradientComponent={LinearGradient}
    animation="wave"
    width={SkeletonWidth}
    height={SkeletonHeight}
  />
  )
}

export default SkeletonPaper
