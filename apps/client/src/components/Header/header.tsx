import "./header.css";
import logo from "../../assets/logo.png";

export default function Header() {
  return (
    <header>
      <div className="left">
        <img src={logo} alt="HushPath logo" className="logo" />
        <h1>HushPath</h1>
      </div>
    </header>
  );
}
