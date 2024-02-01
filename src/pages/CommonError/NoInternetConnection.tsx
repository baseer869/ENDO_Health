import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from 'assets/colors'
import { commonStyles } from 'utils/styles/commonStyles'
import icons from 'components/icons'
import { fonts } from 'assets/fonts'
import CustomButton from 'components/common/ActionButton'

const NoInternetConnection = () => {

    const onOk = () =>{};
    const onRetry = () =>{};
    return (
        <View style={{ ...commonStyles.container, padding: 20 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Image source={icons.icon_no_interent_connection} style={{ width: 140, height: 140 }} />
                <Text style={styles.title}>We cannot connect to the Internet</Text>
                <Text style={styles.description}>Please try again in a few minutes.</Text>
                <TouchableOpacity onPress={onRetry} activeOpacity={0.7} style={styles.retryButton}>
                    <Image source={icons.icon_retry_connection} style={{ width: 16, height: 16 }} />
                    <Text style={styles.retry}>Retry</Text>
                </TouchableOpacity>
            </View>
            <CustomButton label='Ok' arrow={false} onPress={onOk} />
        </View>
    )
}

export default NoInternetConnection

const styles = StyleSheet.create({

    title: {
        fontSize: 20,
        lineHeight: 26,
        color: colors.GRAY_60,
        fontFamily: fonts.Pretendard_Bold,
        textAlign: 'center',
        paddingTop: 40
    },
    description: {
        fontSize: 15,
        lineHeight: 21,
        color: colors.GRAY_60,
        fontFamily: fonts.Pretendard_Regular,
        textAlign: 'center',
        paddingTop: 17
    },
    retryButton: {
        borderWidth: 0.5,
        borderColor: colors.GRAY_30,
        borderRadius: 17,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        height: 34,
        paddingTop: 8,
        paddingRight: 18,
        paddingBottom: 8,
        paddingLeft: 18,
        marginTop: 30
    },
    retry: {
        fontSize: 14,
        lineHeight: 16.8,
        color: colors.GRAY_100,
        fontFamily: fonts.Pretendard_Bold
    }

})