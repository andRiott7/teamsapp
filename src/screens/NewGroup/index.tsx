import { Container, Content, Icon } from "./styles";

import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export function NewGroup() {
  const [group, setGroup] = useState('');
  const navigation = useNavigation();

  function handleNew() {
    navigation.navigate('players', { group });
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
          onPress={handleNew}
        />
      </Content>
    </Container>
  )
}