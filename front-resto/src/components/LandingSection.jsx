import "./LandingSection.css";
import background from "../assets/background.png";
import dotsMenu from "../assets/dots-nine.svg";

function LandingSection() {
  return (
    <div className="landing-section">
      <img className="dotsMenu" src={dotsMenu} alt="" />

      <div className="overlay-content">
        <div className="landing-img-wrapper">
          <img src={background} alt="" />
        </div>
        <div>
          <h1 className="landing-title">Chilli&lsquo;s Tunisie</h1>
          <p className="landing-name">Découvrez les </p>
          <p className="landing-name">meilleures recettes </p>
          <p className="landing-name">syriennes </p>
          <button className="landing-button">
            <a href="#menu">Voir notre menu</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingSection;
