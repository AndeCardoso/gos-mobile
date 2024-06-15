import React from "react";
import { Container } from "./style";
import { Text } from "@components/base/Text";
import { Button } from "@components/base/Button";
interface IEmptyStateProps {
  title: string;
  subtitle?: string;
  action?: {
    text: string;
    onPress: (value?: string) => void;
  };
  secondary?: boolean;
  error?: boolean;
}
export const EmptyState = ({
  title,
  subtitle,
  action,
  secondary,
  error,
}: IEmptyStateProps) => {
  return (
    <Container>
      <Text size={20} weight="600" color="WHITE" textAlign="center">
        {error ? "Um erro inesperado aconteceu" : title}
      </Text>
      {error ? (
        <Text size={16} color="WHITE" textAlign="center">
          Aguarde alguns momentos e tente novamente
        </Text>
      ) : null}
      {!error && subtitle ? (
        <Text size={16} color="WHITE" textAlign="center">
          {subtitle}
        </Text>
      ) : null}
      {!error && action ? (
        <Button onPress={() => action.onPress()}>{action.text}</Button>
      ) : null}
    </Container>
  );
};
