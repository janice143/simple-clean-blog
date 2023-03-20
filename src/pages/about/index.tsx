import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col" style={{ maxWidth: 600 }}>
        <Navbar />
        <div className="primary-text">
          Hey there, I&apos;m <b className="highlight">Iaine</b>!
        </div>
        <div className="primary-text">
          I&apos;m a <b className="highlight">frontend developer</b>
          by day, and a
          <em className="highlight">
            GOT && F·R·I·E·N·D·S && OTHER STUFFS
          </em>{" "}
          enthusiast by night.
        </div>
        <div className="primary-text">
          Follow me for a mix of tech, creativity, and a healthy dose of
          humor.🤖🎨😂
        </div>
        <Footer />
      </div>
    </div>
  );
};
export default About;
