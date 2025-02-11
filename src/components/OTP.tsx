import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 4, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>(Array(length).fill(null));

  const updateOTP = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus or complete
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const completedOTP = newOtp.join('');
    if (completedOTP.length === length) {
      onComplete?.(completedOTP);
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    const { nativeEvent } = event;

    if (nativeEvent.key === 'Backspace') {
      // Clear current input or move back
      if (otp[index] === '') {
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        updateOTP('', index);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.boxContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={el => inputRefs.current[index] = el}
            style={styles.box}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => updateOTP(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            textAlign="center"
            autoFocus={index === 0}
          />
        ))}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  box: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#3498db',
    marginHorizontal: 5,
    borderRadius: 8,
    fontSize: 24,
  },
});

export default OTPInput;