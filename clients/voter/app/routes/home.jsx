import { Text } from '@phxjs/ui/Text/Text';
import Logo from '../components/logo/logo';

export const meta = () => [
  { title: '.hack//voter' },
  { name: 'description', content: 'main voter page of .hack//cation' }
];

export default function Home() {
  return (
    <>
      <h1>
        <Logo />
      </h1>

      <marquee>nice</marquee>
      <Text content="banana" />
    </>
  );
}
