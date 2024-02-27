import { useState, useEffect, useRef } from 'react';
import { FlatList, Alert, TextInput, Keyboard } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native';

import { AppError } from '@utils/AppError';

import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Input } from "@components/Input";
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

type RouteParams = {
  group: string;
}
export function Players() {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Team A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const navigation = useNavigation();
  const route = useRoute()
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('New player', 'Enter a new player name');
    }

    const newPlayer = {
      name: newPlayerName,
      team
    }
    try {

      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();

      setNewPlayerName('');
      await fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("New Player", error.message);
      } else {
        Alert.alert("New Player", "Error: Unable to add a new player");
        console.log(error);
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error);
      Alert.alert('Players', 'Unable to load players from the selected team');
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);

      fetchPlayersByTeam()

    } catch (error) {
      console.log(error);

      Alert.alert('Remove player', 'Was not possible remove this player.');
    }
  }
  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups');

    } catch (error) {
      console.log(error);
      Alert.alert('Remover Grupo', 'Não foi posível remover o grupo');
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      'Remove',
      'Do you want to remove the group?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => groupRemove() }

      ]
    )
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="Add new members"
      />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Person Name"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon
          icon="add"
          onPress={handleAddPlayer}

        />
      </Form>

      <HeaderList>
        <FlatList
          data={['Team A', 'Team B']}
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
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handlePlayerRemove(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="This team are empty" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
      />
      <Button
        title="Remove Team"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  )
}

// function playerRemoveByGroup(playerName: string, group: string) {
//   throw new Error('Function not implemented.');
// }
