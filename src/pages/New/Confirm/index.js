/* eslint-disable react/prop-types */
import React, {useMemo} from 'react';
import {formatRelative, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  Container,
  Name,
  Avatar,
  SubmitButton,
  Time,
  SubmitButtonText,
} from './styles';

import api from '~/services/api';

import Background from '~/components/Background';

export default function Confirm({route, navigation}) {
  const {provider, time} = route.params;

  const dateFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), {locale: pt}),
    [time],
  );

  async function handleAddAppointment() {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time,
    });

    navigation.navigate('Agendamentos');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />
        <Name>{provider.name}</Name>
        <Time>{dateFormatted}</Time>
        <SubmitButton onPress={handleAddAppointment}>
          <SubmitButtonText>Confirmar agendamento</SubmitButtonText>
        </SubmitButton>
      </Container>
    </Background>
  );
}
