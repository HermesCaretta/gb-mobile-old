/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, {useState, useMemo} from 'react';
import {Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, DateButton, DateText, Picker} from './styles';

const DateInput = ({date}) => {
  const [opened, setOpened] = useState(false);
  const [mode, setMode] = useState('date');

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", {locale: pt}),
    [date],
  );

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setOpened(Platform.OS === 'ios');
    dateFormatted(currentDate);
  };

  const showMode = (currentMode) => {
    setOpened(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#FFF" size={20} />
        <DateText>{dateFormatted}</DateText>
        <Button onPress={showDatepicker} />
      </DateButton>

      {opened && (
        <Picker>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour
            display="default"
            onChange={onChange}
          />
        </Picker>
      )}
    </Container>
  );
};

export default DateInput;
