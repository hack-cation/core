import Logo from '../logo/logo';
import './dvdscreen.css';

export default function DvDScreen() {
  return (
    <div className="dvd-screen">
      <marquee
        behavior="alternate"
        direction="down"
        width="1"
        height="1"
      >
        <marquee behavior="alternate">
          <h1>
            <Logo />
          </h1>
        </marquee>
      </marquee>
    </div>
  );
}
