import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useTheme } from "styled-components";
import { SignedInNavigators, SignedInScreens } from "@routes/screens";
import { useQuery, useQueryClient } from "react-query";
import { HttpStatusCode } from "axios";
import EquipmentService from "@services/equipment";
import { SuperConsole } from "@tools/indentedConsole";
import { useCallback } from "react";
import { useToast } from "@hooks/useToast";
import { serviceOrderFilteredByEnum } from "@pages/signedIn/serviceOrders/constants";

export const useEquipmentDetailController = () => {
  const { colors } = useTheme();
  const { unexpectedErrorToast } = useToast();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const { params } = useRoute<any>();
  const { equipmentId } = params;
  const queryClient = useQueryClient();

  const equipmentService = new EquipmentService();

  const { data, isLoading } = useQuery(
    ["equipmentDetails", equipmentId],
    async () => {
      const { statusCode, body } = await equipmentService.get(equipmentId);
      switch (statusCode) {
        case HttpStatusCode.Ok:
          return body;
        case HttpStatusCode.NoContent:
        case HttpStatusCode.BadRequest:
        default:
          SuperConsole(body, "equipmentDetails");
          unexpectedErrorToast();
          return;
      }
    },
    {
      onError: async (error) => {
        SuperConsole(error, "equipmentDetails");
        unexpectedErrorToast();
        return;
      },
    }
  );

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleGoToUpdateEquipment = () => {
    navigate(SignedInScreens.EQUIPMENTS_UPDATE_FORM, {
      equipmentId,
    });
  };

  const handleGoToServiceOrderList = () => {
    navigate(SignedInNavigators.SERVICE_ORDERS, {
      id: equipmentId,
      filterBy: serviceOrderFilteredByEnum.EQUIPMENT,
    });
  };

  const actionStyles = {
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: colors.SECONDARY,
  };

  const fabActions = [
    {
      icon: "file-edit",
      label: "Atualizar cadastro",
      onPress: handleGoToUpdateEquipment,
      color: colors.PRIMARY,
      style: actionStyles,
    },
    {
      icon: "file-table",
      label: "Histórico de ordens de serviço",
      onPress: handleGoToServiceOrderList,
      color: colors.PRIMARY,
      style: actionStyles,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      queryClient.resetQueries("equipmentDetails");
    }, [])
  );

  return {
    equipmentData: data,
    handleGoBack,
    fabActions,
    viewState: {
      loading: isLoading,
    },
  };
};
