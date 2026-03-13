import heroVideo from "../assets/hero.mp4";

function Hero() {
  return (
    <div style={{
      position: "relative",
      height: "100vh",
      width: "100%",
      overflow: "hidden"
    }}>

      {/* Video Background */}

      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
  position: "absolute",
  width: "100%",
  height: "120%",
  objectFit: "cover",
  transform: "translateY(-5%)"
}}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Overlay */}

      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)"
      }}></div>

      {/* Text Content */}

      <div style={{
        position: "relative",
        zIndex: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white"
      }}>

        <h1 style={{
          fontSize: "60px",
          color: "#d4af37",
          marginBottom: "10px"
        }}>
          Imperial Wheels
        </h1>

        <p style={{
          fontSize: "22px",
          marginBottom: "30px"
        }}>
          Drive Luxury. Experience Power.
        </p>

        <a href="#vehicles">
          <button style={{
            padding: "12px 25px",
            fontSize: "16px"
          }}>
            Explore Vehicles
          </button>
        </a>

      </div>

    </div>
  );
}
 
export default Hero;  
