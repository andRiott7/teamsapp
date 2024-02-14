import { useState } from 'react';
import { FlatList } from 'react-native'

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Input } from "@components/Input";
import { PlayerCard } from '@components/PlayerCard';

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { ListEmpty } from '@components/ListEmpty';

export function Players() {
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState(['Anton', 'Janzel', 'Fantom', 'Goriet', 'Vornez', 'Zaznam'])
  return (
    <Container>
      <Header showBackButton />


      <Highlight
        title="Team name"
        subtitle="Add new members"
      />
      <Form>
        <Input
          placeholder="Persons Name"
          autoCorrect={false}
        />

        <ButtonIcon
          icon="add"

        />
      </Form>

      <HeaderList>
        <FlatList
          data={['Team A', 'Team B', 'Team C']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard
            name={item}
            onRemove={() => { }}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="This team are empty" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
      />

    </Container>
  )
}