import { Container } from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Hightlight';
import { GroupCard } from './../../components/GroupCard/index';
export function Groups() {
  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title="Team"
        subtitle="Work with your teams"
      />
      <GroupCard title="Team Members" />
    </Container>
  );
}