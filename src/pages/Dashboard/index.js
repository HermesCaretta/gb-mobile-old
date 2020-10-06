import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import Background from '../../components/Background';
import Appointment from '../../components/Appointment';

import {Container, Title, List} from './styles';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function loadAppointments() {
      const response = await api.get('appointments');

      setAppointments(response.data);
    }

    loadAppointments();
  }, []);

  async function handleCancel(id) {
    await api.delete(`appointments/${id}`);

    setAppointments(appointments.filter((x) => x.id !== id));
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <Appointment data={item} onCancel={() => handleCancel(item.id)} />
          )}
        />
      </Container>
    </Background>
  );
}
