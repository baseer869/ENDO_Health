import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet ,KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import { BottomSheetModal,BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import icons from 'components/icons';
import { colors } from 'assets/colors';

const Onboarding = () => {
    const bottomSheetModalRef = useRef(null);
    const [aiName, setAiName] = useState('');
    const [currentScreen, setCurrentScreen] = useState(1);

    const openBottomSheet = () => {
        if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current.present();
        }
    };

    const closeBottomSheet = () => {
        if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current.dismiss();
        }
    };

    const handleNext = () => {
        if (currentScreen === 1) {
            setCurrentScreen(2);
        } else {
            setAiName(/* AI name from TextInput */);
            closeBottomSheet();
        }
    };

    useEffect(() => {
        openBottomSheet();
    }, []);

    const handleBack = () => {
        if (currentScreen === 2) {
            setCurrentScreen(1);
        }
    };

    const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={1}
				appearsOnIndex={2}
			/>
		),
		[]
	);
    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={[currentScreen == 2 ? "57%" : '65%', '100%']}
            backgroundStyle={{ backgroundColor: 'white' }}
            index={0}
            handleIndicatorStyle={{ backgroundColor: colors.GRAY_20 }}
            backdropComponent={renderBackdrop}
            >
            {/* Screen 1 */}
            {currentScreen === 1 && (
                <View>
                    <Image source={icons.Content} style={{ width: '100%', height: 380, }} />
                    <TouchableOpacity style={styles.button} onPress={handleNext}>
                        <Text style={styles.buttonLable}>Get Started</Text>
                        <Image source={icons.direction_forward_line_30} style={{ width: 16, height: 16 }} />
                    </TouchableOpacity>
                </View>
            )}
            {/* Screen 2 */}
            {currentScreen === 2 && (
                <View style={{ flex:1, paddingHorizontal: 20 }}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={handleBack}>
                            <Image source={icons.icon_direction_back_line_30} style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                        <Text style={styles.title}>Get started</Text>
                    </View>
                    <Image source={icons.AskAIContent} style={{ width: '100%', height: 142, borderRadius: 8, marginTop: 10 }} />
                    <View style={{paddingTop:30}}>
                        <Text style={styles.inputlable}>{'Name your meidcal assistant'}</Text>
                        <TextInput
                            placeholder="Name your friendly AI (ex. Endo, Jessi)"
                            value={aiName}
                            onChangeText={setAiName}
                            style={styles.input}
                        />
                    </View>
                    <TouchableOpacity style={{...styles.button, backgroundColor: colors.PRIMARY_BLUE, top:40}} onPress={handleNext}>
                        <Text style={styles.buttonLable}>Start Asking</Text>
                        <Image source={icons.direction_forward_line_30} style={{ width: 16, height: 16 }} />
                    </TouchableOpacity>
                </View>

            )}
        </BottomSheetModal>
    );
};

export default Onboarding;


const styles = StyleSheet.create({
    button: {
        top: 22,
        alignSelf: 'center',
        backgroundColor: colors.GRAY_90,
        alignItems: 'center',
        justifyContent: 'center',
        width: "90%",
        minHeight: 48,
        paddingHorizontal: 20,
        borderRadius: 24,
        flexDirection: 'row',
        columnGap: 8
    },
    buttonLable: {
        fontSize: 17,
        color: colors.GRAY_0,
        lineHeight: 20.4,
        fontWeight: '700',
    },
    title: {
        fontSize: 18,
        color: colors.GRAY_100,
        lineHeight: 21.48,
        fontWeight: '700',
        textAlign: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 100,
        minHeight: 56,
    },
    inputlable: {
        fontSize: 14,
        lineHeight: 16.8,
        fontWeight: '400',
        color: colors.GRAY_60,
        height:17
    },
    input:{
        fontSize:17,
        lineHeight:20.4,
        fontWeight:"400",
        color: colors.GRAY_50,
        borderBottomWidth:2,
        borderBottomColor: colors.GRAY_20
    }

})