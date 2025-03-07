import React, { useRef, useState } from "react";
import { StyleProp, TextStyle, TextInput as TextInputRN } from "react-native";
import MaskInput, { Mask } from "react-native-mask-input";
import { TextInput, TextInputProps } from "react-native-paper";
import { useTheme } from "styled-components";

interface IInputProps extends TextInputProps {
  longText?: boolean;
  password?: boolean;
  mask?: Mask;
}

export const Input = ({
  value,
  longText,
  password,
  onChangeText,
  placeholder,
  disabled,
  mask,
  error,
  ...rest
}: IInputProps) => {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<TextInputRN>(null);

  const handleToogleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  function handleClear() {
    inputRef.current?.clear();
    onChangeText?.("");
  }

  const inputStyle: StyleProp<TextStyle> = {
    width: "100%",
    height: longText ? 220 : undefined,
    backgroundColor: colors.INPUT_BACKGROUND,
  };

  const disabledInputStyle: StyleProp<TextStyle> = {
    ...inputStyle,
    color: colors.SECONDARY_INACTIVE,
    pointerEvents: "none",
  };

  if (longText) {
    return (
      <TextInput
        {...rest}
        value={value}
        mode={"outlined"}
        onChangeText={onChangeText}
        placeholder={placeholder}
        textColor={disabled ? colors.SECONDARY_INACTIVE : colors.SECONDARY}
        outlineColor={disabled ? "transparent" : colors.SECONDARY_INACTIVE}
        placeholderTextColor={colors.SECONDARY_INACTIVE_OPACITY}
        style={disabled ? disabledInputStyle : inputStyle}
        numberOfLines={5}
        multiline
        error={error}
        right={
          value &&
          value.length > 0 && (
            <TextInput.Icon
              icon={disabled ? "lock" : "close"}
              color={colors.SECONDARY}
              onPress={handleClear}
              style={{
                bottom: 80,
              }}
            />
          )
        }
        render={(props) => <MaskInput {...props} mask={mask} />}
      />
    );
  }

  return password ? (
    <TextInput
      {...rest}
      value={value}
      mode={"outlined"}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={!showPassword}
      textColor={colors.SECONDARY}
      outlineColor={colors.SECONDARY_INACTIVE}
      placeholderTextColor={colors.SECONDARY_INACTIVE_OPACITY}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={inputStyle}
      error={error}
      right={
        (isFocused || (value && value.length > 0)) && (
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            color={colors.SECONDARY}
            onPress={handleToogleShowPassword}
          />
        )
      }
    />
  ) : (
    <TextInput
      {...rest}
      value={value}
      mode={"outlined"}
      onChangeText={onChangeText}
      placeholder={placeholder}
      textColor={disabled ? colors.SECONDARY_INACTIVE : colors.SECONDARY}
      outlineColor={disabled ? "transparent" : colors.SECONDARY_INACTIVE}
      placeholderTextColor={colors.SECONDARY_INACTIVE_OPACITY}
      style={disabled ? disabledInputStyle : inputStyle}
      error={error}
      right={
        value &&
        value.length > 0 && (
          <TextInput.Icon
            icon={disabled ? "lock" : "close"}
            color={colors.SECONDARY}
            onPress={handleClear}
          />
        )
      }
      render={(props) => <MaskInput {...props} mask={mask} />}
    />
  );
};
