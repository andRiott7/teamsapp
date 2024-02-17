import { Container, Content, Icon } from "./styles";

import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";

export function NewGroup() {
  const navigation = useNavigation();

  function handleNew() {
    navigation.navigate('players', { group: 'Rocket' });
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
        <Input />
        <Button
          title="Create"
          onPress={handleNew}
        />
      </Content>
    </Container>
  )
}