import PlayImg from "./play.svg";

function Header() {
  return (
    <nav>
      <h1>Fractal snowflakes</h1>
      <div id="description">
        <p>
          {" "}
          Click to the <img style={{ width: 12 }} src={PlayImg} alt="" /> button
          several times and generate snowflake.{" "}
        </p>
        <p>Change the settings and create a unique snowflake. </p>
      </div>
    </nav>
  );
}

export default Header;
