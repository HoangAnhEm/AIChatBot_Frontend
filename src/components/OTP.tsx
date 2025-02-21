// OTPInput.tsx
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
}

// Define the methods that will be exposed
export interface OTPInputHandle {
  clear: () => void;
}

const OTPInput = forwardRef<OTPInputHandle, OTPInputProps>(({ length = 4, onComplete }, ref) => {
  const [otpArray, setOtpArray] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<TextInput[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Expose the clear method to parent components
  useImperativeHandle(ref, () => ({
    clear: () => {
      setOtpArray(Array(length).fill(''));
      setFocusedIndex(0);
      inputRefs.current[0]?.focus();
    }
  }));

  const handleTextChange = (text: string, index: number) => {
    if (text && !/^\d+$/.test(text)) return;

    const newOtpArray = [...otpArray];
    newOtpArray[index] = text;
    setOtpArray(newOtpArray);

    if (text.length === 1 && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }

    const otpString = newOtpArray.join('');
    if (otpString.length === length) {
      onComplete?.(otpString);
    }
  };

  const handleKeyPress = ({ nativeEvent: { key } }: any, index: number) => {
    if (key === 'Backspace' && !otpArray[index] && index > 0) {
      const newOtpArray = [...otpArray];
      newOtpArray[index - 1] = '';
      setOtpArray(newOtpArray);
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    }
  };

  return (
    <View style={styles.container}>
      {otpArray.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => {
            if (ref) inputRefs.current[index] = ref;
          }}
          style={[
            styles.input,
            focusedIndex === index && styles.focused,
            digit && styles.filled
          ]}
          maxLength={1}
          keyboardType="number-pad"
          value={digit}
          onChangeText={(text) => handleTextChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => setFocusedIndex(index)}
          autoComplete="off"
          textContentType="oneTimeCode"
          importantForAutofill="no"
          autoCorrect={false}
          selectTextOnFocus
          caretHidden
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 5,
    color: '#000',
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        padding: 0,
      },
    }),
  },
  focused: {
    borderColor: '#3498db',
    borderWidth: 2,
  },
  filled: {
    backgroundColor: '#f8f9fa',
  },
});

export default OTPInput;