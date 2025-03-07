import { Text } from "@components/base/Text";
import React, { memo } from "react";
import { Card } from "@components/base/Card";
import { Row } from "@components/base/Row";
import { Chip } from "@components/base/Chip";
import { Divider } from "@components/base/Separator";
import { DisplayField } from "@components/base/DisplayField";
import { formatCellphoneNumber, formatCpf } from "@utils/formatString";
import { ITechnicianModel } from "@model/entities/technician";
import {
  technicianPositionDisplay,
  technicianStatusDisplay,
} from "@pages/signedIn/technicians/constants";
import { BottomContainer, CardContainer } from "./styles";
import { GestureResponderEvent } from "react-native";
import { useTheme } from "styled-components";

interface ITechnicianCardProps {
  data: Partial<ITechnicianModel>;
  footerLabel?: string;
  onPress?: (e: GestureResponderEvent) => void;
}

export const TechnicianCard = memo(
  ({
    data: { name, cpf, phone, position, status },
    footerLabel,
    onPress,
  }: ITechnicianCardProps) => {
    const { colors } = useTheme();
    return (
      <Card
        footerLabel={footerLabel}
        onPress={onPress && onPress}
        style={{ backgroundColor: colors.SECONDARY_INACTIVE }}
      >
        <CardContainer>
          <Row space="space-between">
            <Text
              color="WHITE"
              size={24}
              weight="700"
              numberOfLines={1}
              fullwidth
            >
              {name}
            </Text>

            {status ? (
              <Chip
                text={technicianStatusDisplay[status]}
                color="PRIMARY"
                textColor="SECONDARY"
              />
            ) : null}
          </Row>
          <Divider color="WHITE" />
          <BottomContainer>
            <DisplayField
              text="Celular"
              value={formatCellphoneNumber(phone)}
              color="WHITE"
            />
            <Row>
              <DisplayField text="Cpf" value={formatCpf(cpf)} color="WHITE" />
              <DisplayField
                text="Cargo"
                value={technicianPositionDisplay[position!!]}
                color="WHITE"
              />
            </Row>
          </BottomContainer>
        </CardContainer>
      </Card>
    );
  }
);
