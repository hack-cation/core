import Logo from './logo';
import './404.css';

export default function FourOFour() {
  return (
    <div className="four-oh-four">
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
