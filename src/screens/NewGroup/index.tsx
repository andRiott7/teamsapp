import { Container, Content, Icon } from "./styles";

import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { groupCreate } from "@storage/group/groupsCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export function NewGroup() {
  const [group, setGroup] = useState('');
  const navigation = useNavigation();

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('New Group', 'Enter the group name')
      }

      await groupCreate(group);
      navigation.navigate('players', { group });

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("New Group", error.message);
      } else {
        Alert.alert("New Group", "Error: Unable to create a new group");
        console.log(error);
      }
    }
  }
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="New team"
          subtitle="create new team do add members"
        />
        <Input
          placeholder="Group name"
          onChangeText={setGroup} />
        <Button
          title="Create"
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </Content>
    </Container>
  )
}