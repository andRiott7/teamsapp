import { Container, Logo } from "./styles";
import { CaretLeft } from 'phosphor-react-native'

import logoImg from '@assets/logo.png';
import { BackButton, BackIcon } from "@screens/Groups/styles";

type Props = {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false }: Props) {
  return (
    <Container>
      <BackButton>
        <BackIcon />
      </BackButton>
      <Logo source={logoImg} />
    </Container>
  )
}