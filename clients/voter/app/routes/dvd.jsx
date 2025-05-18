import DvDScreen from '../components/dvdscreen/dvdscreen';

export const meta = () => [
  { title: '.hack//voter loading' },
  { name: 'description', content: 'DVD loading screen for voter page of .hack//cation' }
];

export default function DvDRoute() {
  return (
    <>
      <DvDScreen />
    </>
  );
}
