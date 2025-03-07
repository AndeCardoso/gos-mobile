import React from "react";
import { Button, IconWrapper } from "./styles";
import { Text } from "@components/base/Text";
import { StyleProp, ViewStyle } from "react-native";
import { useTheme } from "styled-components";
import { useTheme as usePaperTheme } from "react-native-paper";
import { IconButton } from "@components/base/IconButton";

interface ISelectButtonProps {
  value?: string;
  placeholder?: string;
  modalVisible: boolean;
  isSelected: boolean;
  disabled?: boolean;
  error?: boolean;
  onPress: () => void;
  handleClear: () => void;
}

export const SelectButton = ({
  value,
  placeholder,
  modalVisible,
  isSelected,
  disabled,
  error,
  onPress,
  handleClear,
}: ISelectButtonProps) => {
  const { colors } = useTheme();
  const { colors: paperColors } = usePaperTheme();

  const inputStyle: StyleProp<ViewStyle> = {
    width: "100%",
    backgroundColor: colors.INPUT_BACKGROUND,
    borderWidth: error ? 2 : 1,
    borderColor: error ? paperColors.error : colors.SECONDARY_INACTIVE,
  };

  const disabledInputStyle: StyleProp<ViewStyle> = {
    ...(inputStyle as Object),
    pointerEvents: "none",
    borderColor: "transparent",
  };

  return (
    <Button
      onPress={onPress}
      style={disabled ? disabledInputStyle : inputStyle}
      activeOpacity={1}
    >
      {value ? (
        <Text color={disabled ? "SECONDARY_INACTIVE" : "SECONDARY"}>
          {value}
        </Text>
      ) : (
        <Text color={"SECONDARY_INACTIVE_OPACITY"}>{placeholder}</Text>
      )}
      <IconWrapper>
        <IconButton
          onPress={!disabled ? onPress : undefined}
          name={
            disabled ? "lock" : modalVisible ? "chevron-up" : "chevron-down"
          }
          color="SECONDARY"
        />
        {isSelected && !disabled ? (
          <>
            <Text color="SECONDARY" size={16}>
              |
            </Text>
            <IconButton
              disabled={disabled}
              onPress={handleClear}
              name={"close"}
              color="SECONDARY"
            />
          </>
        ) : null}
      </IconWrapper>
    </Button>
  );
};
