import logo from "@/assets/icon-48.png";
import styles from "@/styles/Navbar.module.scss";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsFillMoonFill, BsFillSunFill, BsSearch } from "react-icons/bs";

interface Iprops {
  handleInput?: (val: string) => void;
}

const Navbar = ({ handleInput }: Iprops) => {
  const { theme, setTheme } = useTheme();
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();

  const handleGlobalClick = () => {
    setIsShow(false);
  };

  useEffect(() => {
    setTheme("light");
    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return (
    <div className={styles.navBarOuterContainer}>
      <div className={styles.navBarContainer}>
        <header className={styles.navWrapper}>
          <nav className={styles.navLeft}>
            <Link href="/" className={styles.navTitle}>
              <Image width={30} src={logo} alt="iaine" />
            </Link>
            <Link href="/">首页</Link>
            <Link href="/about">关于我</Link>
          </nav>

          <div className={styles.navRight}>
            {theme === "light" ? (
              <span
                className="cursor-pointer text-xl"
                onClick={() => setTheme("dark")}
              >
                <BsFillMoonFill className={styles.icon} />
              </span>
            ) : (
              <span
                className="cursor-pointer text-xl"
                onClick={() => setTheme("light")}
              >
                <BsFillSunFill className={styles.icon} />
              </span>
            )}
            {router.pathname === "/" && (
              <span
                className="cursor-pointer text-xl"
                style={{ marginLeft: 20 }}
                onClick={(e) => {
                  setIsShow(!isShow);
                  e.nativeEvent.stopImmediatePropagation(); // 阻止document上的其他点击事件触发
                }}
              >
                <BsSearch className={styles.icon} />
              </span>
            )}

            <div
              className={`${styles.inputSearchWrapper} ${
                isShow ? null : styles.hidden
              }`}
              onClick={(e) => {
                e.nativeEvent.stopImmediatePropagation(); // 阻止document上的其他点击事件触发
              }}
            >
              <input
                type="text"
                placeholder="请输入关键字"
                className={styles.inputBar}
                onChange={(e) => {
                  handleInput && handleInput(e.target.value);
                }}
              />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
