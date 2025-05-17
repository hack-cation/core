import './logo.css';

export default function Logo({ name = 'voter' }) {
  return (
    <div className="logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 72 72"
      >
        <path d="M35 8h2l23 13 1 2v26l-1 2-23 13h-2L12 51l-1-2V23l1-2L35 8z" />
      </svg>

      <span>
        <span className="sr-only">dot</span>
      </span>
      <span style={{ fontWeight: 900 }}>hack//</span>
      <span style={{ fontWeight: 100 }}>{name}</span>
    </div>
  );
}
