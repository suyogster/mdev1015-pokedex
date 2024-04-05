import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { colors } from '../theme/theme'

export const Spinner = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator color={colors.primary} size={30} />
        </View>
    )
}
