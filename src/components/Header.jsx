import PlayImg from "assets/play.svg";

function Header() {
  return (
    <header>
      <h1>Fractal snowflakes</h1>
      <div id="description">
        <p>
          This small web app can draw custom fractal snowflakes.

          Click to the <img style={{ width: 12 }} src={PlayImg} alt="play" /> button
          several times and generate snowflake. Change the settings and create a unique snowflake. 
        </p>
      </div>
    </header>
  );
}

export default Header;
