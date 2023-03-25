import { useTheme } from "next-themes";
import Link from "next/link";
import styles from "@/styles/Navbar.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
    <header
      style={{ paddingTop: "90px", paddingBottom: "50px" }}
      className={styles.navContainer}
    >
      <div className="flex items-center justify-between">
        <h1>
          <Link href="/">iaine_is_also_yan</Link>
        </h1>
        <div>
          {theme === "light" ? (
            <span
              className="cursor-pointer text-xl"
              onClick={() => setTheme("dark")}
            >
              🌞
            </span>
          ) : (
            <span
              className="cursor-pointer text-xl"
              onClick={() => setTheme("light")}
            >
              🌛
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
              🔍
            </span>
          )}
        </div>
      </div>
      <nav className="mt-5 flex gap-4">
        <div style={{ fontWeight: 700 }} className="link">
          <Link href="/">posts</Link>
        </div>
        <div style={{ fontWeight: 700 }} className="link">
          <Link href="/about">about me</Link>
        </div>
      </nav>

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
    </header>
  );
};

export default Navbar;
