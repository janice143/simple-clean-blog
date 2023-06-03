import avatar from "@/assets/avatar.png";
import { MY_LINKS } from "@/constants";
import styles from "@/styles/About.module.scss";
import { message } from "antd";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/router";

export const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      marginTop: "8rem",
      flex: 1,
    }}
  >
    <div
      style={{
        padding: " 0 2rem",
        margin: "auto",
        maxWidth: "800px",
      }}
    >
      {children}
    </div>
  </div>
);

export const MyPortrait = () => {
  const { theme } = useTheme();
  const color = theme === "dark" ? "FFF" : "000";

  return (
    <div
      className="flex flexDirectCol alignCenter"
      style={{ marginBottom: 30 }}
    >
      <Image src={avatar} alt="avatar" width={100}></Image>
      <p>
        <img
          src={`https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=${color}&width=220&lines=%40iaine_is_also_yan`}
          alt="Typing SVG"
        />
      </p>
    </div>
  );
};

export const MyLinks = () => {
  const router = useRouter();

  const handleClick = (link: any) => {
    if (link.label === "email") {
      navigator.clipboard.writeText(link.value).then(() => {
        message.success(
          "Go paste! You have just get my email address in your clipboard"
        );
      });
    }
    if (link.link) {
      router.push(link.link);
    }
  };

  return (
    <div className="flex flexDirectCol alignCenter">
      <ul className={`flex alignCenter ${styles.myLinkContainer}`}>
        {Object.entries(MY_LINKS).map(([, link]) => (
          <li
            className="list-none"
            key={link.value}
            onClick={() => handleClick(link)}
          >
            {link.icon}
          </li>
        ))}
      </ul>
    </div>
  );
};
