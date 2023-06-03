import styles from "@/styles/Heart.module.scss";

import { CSSProperties, useState } from "react";
const [MAX_NUM, MIN_NUM] = [42, 0];

const Heart = ({ style }: { style?: CSSProperties }) => {
  const [isSmile, setIsSmile] = useState(true);
  const [visible, setVisible] = useState(false);
  const [num, setNum] = useState(MIN_NUM);

  const handleClick = () => {
    !isSmile && setIsSmile(true);
    if (num === MAX_NUM) return;

    setNum(num + 1);
    if (num === MAX_NUM - 1) {
      setVisible(true);
      hideSparkle();
    }
  };

  const hideSparkle = () => {
    setTimeout(() => {
      setVisible(false);
    }, 600);
  };

  const handleContextClick = (e: any) => {
    e.preventDefault();
    if (num === MIN_NUM) return;
    isSmile && setIsSmile(false);
    setNum(num - 1);
  };

  return (
    <div
      style={{
        position: "relative",
        width: 80,
        height: 60,
        ...style,
      }}
    >
      <div
        className={styles.heartFlex}
        onClick={() => handleClick()}
        onContextMenu={(e) => handleContextClick(e)}
      >
        <div style={{ position: "relative" }}>
          {isSmile ? <HeartSmile num={num} /> : <HeartSad num={num} />}
          <div
            className={`${styles.sparkle} ${
              visible ? styles.animate : styles.hide
            } `}
          >
            <Sparkle />
          </div>
        </div>
        <span className={styles.heartNum}>{num}</span>
      </div>
    </div>
  );
};

export default Heart;

export const HeartSmile = ({ num }: { num: number }) => {
  return (
    <svg
      width="48"
      height="40.32"
      viewBox="0 0 50 42"
      fill="none"
      style={{ transform: "rotate(0deg)" }}
      className={styles.heart}
    >
      <defs>
        <linearGradient
          id="active-gradient-clgm"
          x1="25"
          y1="42"
          x2="26.3796"
          y2="0.0453673"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="hsl(353deg, 100%, 52%)"></stop>
          <stop offset="1" stop-color="hsl(313deg, 100%, 52%)"></stop>
        </linearGradient>
        <linearGradient
          id="inactive-gradient-clgm"
          x1="15"
          y1="41"
          x2="42"
          y2="-1.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#666" stop-opacity="0.4"></stop>
          <stop offset="1" stop-color="#AAA" stop-opacity="0.4"></stop>
        </linearGradient>
      </defs>
      <mask
        id="like-button-mask-clgm"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="50"
        height="42"
      >
        <path
          d="M13.2537 0.0255029C23.4033 0.0255029 25.0273 10.5191 25.0273 10.5191C25.0273 10.5191 26.6512 -0.60088 37.6129 0.0255029C44.3441 0.410148 48.7484 6.32169 48.9804 12.1981C49.7924 32.7656 28.7678 41.5 25.0273 41.5C21.2868 41.5 -0.549833 32.3459 1.07416 12.1981C1.54782 6.32169 6.29929 0.0255029 13.2537 0.0255029Z"
          fill="#000000"
        ></path>
      </mask>
      <mask
        id="active-gradient-mask-clgm"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="50"
        height="42"
      >
        <polygon
          points={`
          0,${MAX_NUM}
          50,${MAX_NUM}
          50,${MAX_NUM - num}
          0,${MAX_NUM - num}`}
          fill="#000000"
        ></polygon>
      </mask>
      <g mask="url(#like-button-mask-clgm)">
        <path
          d="M13.2537 0.0255029C23.4033 0.0255029 25.0273 10.5191 25.0273 10.5191C25.0273 10.5191 26.6512 -0.60088 37.6129 0.0255029C44.3441 0.410148 48.7484 6.32169 48.9804 12.1981C49.7924 32.7656 28.7678 41.5 25.0273 41.5C21.2868 41.5 -0.549833 32.3459 1.07416 12.1981C1.54782 6.32169 6.29929 0.0255029 13.2537 0.0255029Z"
          fill="url(#inactive-gradient-clgm)"
        >
          <path
            d="M13.2537 0.0255029C23.4033 0.0255029 25.0273 10.5191 25.0273 10.5191C25.0273 10.5191 26.6512 -0.60088 37.6129 0.0255029C44.3441 0.410148 48.7484 6.32169 48.9804 12.1981C49.7924 32.7656 28.7678 41.5 25.0273 41.5C21.2868 41.5 -0.549833 32.3459 1.07416 12.1981C1.54782 6.32169 6.29929 0.0255029 13.2537 0.0255029Z"
            fill="url(#inactive-gradient-clgm)"
          ></path>
        </path>
        <g mask="url(#active-gradient-mask-clgm)">
          <path
            d="M13.2537 0.0255029C23.4033 0.0255029 25.0273 10.5191 25.0273 10.5191C25.0273 10.5191 26.6512 -0.60088 37.6129 0.0255029C44.3441 0.410148 48.7484 6.32169 48.9804 12.1981C49.7924 32.7656 28.7678 41.5 25.0273 41.5C21.2868 41.5 -0.549833 32.3459 1.07416 12.1981C1.54782 6.32169 6.29929 0.0255029 13.2537 0.0255029Z"
            fill="url(#active-gradient-clgm)"
          ></path>
        </g>
        <g style={{ opacity: 0, transform: "translate(0px, 0px)" }}>
          <circle
            cx="15"
            cy="22"
            r="2"
            fill="#000000"
            fill-opacity="0.4"
          ></circle>
          <circle
            cx="35"
            cy="22"
            r="2"
            fill="#000000"
            fill-opacity="0.4"
          ></circle>
        </g>
        <g style={{ opacity: 1 }}>
          <path
            d="M 13 23 Q 15 19, 17 23 "
            stroke="#000000"
            stroke-opacity="0.4"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          ></path>
          <path
            d="M 33 23 Q 35 19, 37 23 "
            stroke="#000000"
            stroke-opacity="0.4"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          ></path>
        </g>
        <g>
          <mask
            id="tongue-mask"
            mask-type="alpha"
            maskUnits="userSpaceOnUse"
            x="20"
            y="27"
            width="11"
            height="6"
          >
            <path
              d="M28.3333 27H21.6666C21.6666 27 20.0001 27 20 29C19.9999 31 22.3875 33 25 33C27.6125 33 30 31 30 29C30 27 28.3333 27 28.3333 27Z"
              fill="#000000"
              fill-opacity="0.4"
            ></path>
          </mask>
          <g mask="url(#tongue-mask)" style={{ opacity: 1 }}>
            <path
              d="M28.3333 27H21.6666C21.6666 27 20.0001 27 20 29C19.9999 31 22.3875 33 25 33C27.6125 33 30 31 30 29C30 27 28.3333 27 28.3333 27Z"
              fill="#000000"
              fill-opacity="1"
            ></path>
            <circle
              cx="25"
              cy="35"
              r="5"
              fill="#DB2C49"
              fill-opacity="0.5"
            ></circle>
          </g>
          <path
            d="
      M 20 30
      Q 25 33.6 30 30
    "
            stroke="#000000"
            stroke-opacity="0.4"
            stroke-linecap="round"
            style={{ opacity: 0 }}
          ></path>
        </g>
        <g>
          <path
            d="M53.5 18.5L47 5C47 5 53.5 31.9722 24.5 36C-4.5 40.0278 1 1.5 1 1.5L-6.5 25L8.00002 44.5L15.5 52L39 49L53.5 18.5Z"
            fill="black"
            fill-opacity="0.1"
          ></path>
          <path
            d="M6.14471 8.44525C6.64924 7.12038 7.41962 5.99208 8.36394 5.15003C9.30652 4.30953 10.3901 3.78182 11.5089 3.58622"
            stroke="white"
            stroke-opacity="0.45"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M31.7084 5.95975C32.7822 4.70067 34.1021 3.81419 35.484 3.37609"
            stroke="white"
            stroke-opacity="0.45"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export const HeartSad = ({ num }: { num: number }) => {
  return (
    <svg
      width="48"
      height="40.32"
      viewBox="0 0 50 42"
      fill="none"
      style={{ transform: "rotate(0deg)" }}
      className={styles.heart}
    >
      <defs>
        <linearGradient
          id="active-gradient-clgm"
          x1="25"
          y1="42"
          x2="26.3796"
          y2="0.0453673"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="hsl(353deg, 100%, 52%)"></stop>
          <stop offset="1" stop-color="hsl(313deg, 100%, 52%)"></stop>
        </linearGradient>
        <linearGradient
          id="inactive-gradient-clgm"
          x1="15"
          y1="41"
          x2="42"
          y2="-1.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#666" stop-opacity="0.4"></stop>
          <stop offset="1" stop-color="#AAA" stop-opacity="0.4"></stop>
        </linearGradient>
      </defs>
      <mask
        id="like-button-mask-clgm"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="50"
        height="42"
      >
        <path
          d="M13.2537 0.0255029C23.4033 0.0255029 25.0273 10.5191 25.0273 10.5191C25.0273 10.5191 26.6512 -0.60088 37.6129 0.0255029C44.3441 0.410148 48.7484 6.32169 48.9804 12.1981C49.7924 32.7656 28.7678 41.5 25.0273 41.5C21.2868 41.5 -0.549833 32.3459 1.07416 12.1981C1.54782 6.32169 6.29929 0.0255029 13.2537 0.0255029Z"
          fill="#000000"
        ></path>
      </mask>
      <mask
        id="active-gradient-mask-clgm"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="50"
        height="42"
      >
        <polygon
          points={`
          0,${MAX_NUM}
          50,${MAX_NUM}
          50,${MAX_NUM - num}
          0,${MAX_NUM - num}`}
          fill="#000000"
        ></polygon>
      </mask>
      <g mask="url(#like-button-mask-clgm)">
        <path
          d="M13.2537 0.0255029C23.4033 0.0255029 25.0273 10.5191 25.0273 10.5191C25.0273 10.5191 26.6512 -0.60088 37.6129 0.0255029C44.3441 0.410148 48.7484 6.32169 48.9804 12.1981C49.7924 32.7656 28.7678 41.5 25.0273 41.5C21.2868 41.5 -0.549833 32.3459 1.07416 12.1981C1.54782 6.32169 6.29929 0.0255029 13.2537 0.0255029Z"
          fill="url(#inactive-gradient-clgm)"
        >
          <path
            d="M13.2537 0.0255029C23.4033 0.0255029 25.0273 10.5191 25.0273 10.5191C25.0273 10.5191 26.6512 -0.60088 37.6129 0.0255029C44.3441 0.410148 48.7484 6.32169 48.9804 12.1981C49.7924 32.7656 28.7678 41.5 25.0273 41.5C21.2868 41.5 -0.549833 32.3459 1.07416 12.1981C1.54782 6.32169 6.29929 0.0255029 13.2537 0.0255029Z"
            fill="url(#inactive-gradient-clgm)"
          ></path>
        </path>
        <g mask="url(#active-gradient-mask-clgm)">
          <path
            d="M13.2537 0.0255029C23.4033 0.0255029 25.0273 10.5191 25.0273 10.5191C25.0273 10.5191 26.6512 -0.60088 37.6129 0.0255029C44.3441 0.410148 48.7484 6.32169 48.9804 12.1981C49.7924 32.7656 28.7678 41.5 25.0273 41.5C21.2868 41.5 -0.549833 32.3459 1.07416 12.1981C1.54782 6.32169 6.29929 0.0255029 13.2537 0.0255029Z"
            fill="url(#active-gradient-clgm)"
          ></path>
        </g>
        <g style={{ opacity: 1, transform: "translate(0px, 0px)" }}>
          <circle
            cx="15"
            cy="22"
            r="2"
            fill="#000000"
            fill-opacity="0.4"
          ></circle>
          <circle
            cx="35"
            cy="22"
            r="2"
            fill="#000000"
            fill-opacity="0.4"
          ></circle>
        </g>
        <g style={{ opacity: 0 }}>
          <path
            d="M 13 23 Q 15 19, 17 23 "
            stroke="#000000"
            stroke-opacity="0.4"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          ></path>
          <path
            d="M 33 23 Q 35 19, 37 23 "
            stroke="#000000"
            stroke-opacity="0.4"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          ></path>
        </g>
        <g>
          <mask
            id="tongue-mask"
            mask-type="alpha"
            maskUnits="userSpaceOnUse"
            x="20"
            y="27"
            width="11"
            height="6"
          >
            <path
              d="M28.3333 27H21.6666C21.6666 27 20.0001 27 20 29C19.9999 31 22.3875 33 25 33C27.6125 33 30 31 30 29C30 27 28.3333 27 28.3333 27Z"
              fill="#000000"
              fill-opacity="0.4"
            ></path>
          </mask>
          <g mask="url(#tongue-mask)" style={{ opacity: 0 }}>
            <path
              d="M28.3333 27H21.6666C21.6666 27 20.0001 27 20 29C19.9999 31 22.3875 33 25 33C27.6125 33 30 31 30 29C30 27 28.3333 27 28.3333 27Z"
              fill="#000000"
              fill-opacity="1"
            ></path>
            <circle
              cx="25"
              cy="35"
              r="5"
              fill="#DB2C49"
              fill-opacity="0.5"
            ></circle>
          </g>
          <path
            d="
M 20 30
Q 25 25.2 30 30
"
            stroke="#000000"
            stroke-opacity="0.4"
            stroke-linecap="round"
            style={{ opacity: 1 }}
          ></path>
        </g>
        <g>
          <path
            d="M53.5 18.5L47 5C47 5 53.5 31.9722 24.5 36C-4.5 40.0278 1 1.5 1 1.5L-6.5 25L8.00002 44.5L15.5 52L39 49L53.5 18.5Z"
            fill="black"
            fill-opacity="0.1"
          ></path>
          <path
            d="M6.14471 8.44525C6.64924 7.12038 7.41962 5.99208 8.36394 5.15003C9.30652 4.30953 10.3901 3.78182 11.5089 3.58622"
            stroke="white"
            stroke-opacity="0.45"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M31.7084 5.95975C32.7822 4.70067 34.1021 3.81419 35.484 3.37609"
            stroke="white"
            stroke-opacity="0.45"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export const Sparkle = () => {
  return (
    <div style={{ width: "48px", height: "48px" }}>
      <img
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMiAyMSIgZmlsbD0ibm9u%0D%0AZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMuNTI5NDIg%0D%0AMThMMTguMzUyOSAzLjE3NjQ1TTMuNTI5NDIgMy4xNzY0NUwxMC45NDEyIDEwLjU4ODJMMTguMzUy%0D%0AOSAxOCIgc3Ryb2tlPSIjRkZFQjMzIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJy%0D%0Ab3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K"
        style={{
          width: "10px",
          height: "10px",
          transform: "translate(12.4847px, 24.5027px) rotate(13deg)",
        }}
      />
      <img
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMiAyMSIgZmlsbD0ibm9u%0D%0AZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMuNTI5NDIg%0D%0AMThMMTguMzUyOSAzLjE3NjQ1TTMuNTI5NDIgMy4xNzY0NUwxMC45NDEyIDEwLjU4ODJMMTguMzUy%0D%0AOSAxOCIgc3Ryb2tlPSIjRkZFQjMzIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJy%0D%0Ab3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K"
        style={{
          width: "10px",
          height: "10px",
          transform: "translate(-7.27681px, 13.6857px) rotate(97deg)",
        }}
      />
      <img
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzMiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAzMyAxOCIgZmlsbD0ibm9u%0D%0AZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI5LjY4MjQg%0D%0AM0wyMC43ODgzIDE0LjExNzZMMTEuODk0MSAzTDMuMDAwMDIgMTQuMTE3NiIgc3Ryb2tlPSIjRkYy%0D%0AN0ZGIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVq%0D%0Ab2luPSJyb3VuZCIvPgo8L3N2Zz4K"
        style={{
          width: "16.5px",
          height: "9px",
          transform: "translate(-36.4096px, 13.9764px) rotate(129deg)",
        }}
      />
      <img
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxMiAxOCIgZmlsbD0ibm9u%0D%0AZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyIiBo%0D%0AZWlnaHQ9IjE4IiBmaWxsPSIjNUE3RkZGIi8+Cjwvc3ZnPgo="
        style={{
          width: "6px",
          height: "9px",
          transform: "translate(-54.7919px, 15.7113px) rotate(66deg)",
        }}
      />
      <img
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxMiAxOCIgZmlsbD0ibm9u%0D%0AZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyIiBo%0D%0AZWlnaHQ9IjE4IiBmaWxsPSIjNUE3RkZGIi8+Cjwvc3ZnPgo="
        style={{
          width: "6px",
          height: "9px",
          transform: "translate(-15.733px, -19.4286px) rotate(126deg)",
        }}
      />
      <img
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMiAyMSIgZmlsbD0ibm9u%0D%0AZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMuNTQzOTcg%0D%0AMTcuNDExMUMzLjE4NjY4IDE1LjQ0NzkgMy4zMzIwOSAxMy40MjYxIDMuOTY2NjYgMTEuNTM0MkM0%0D%0ALjYwMTIyIDkuNjQyMzEgNS43MDQzIDcuOTQxNzkgNy4xNzMxNCA2LjU5MTA1QzguNjQxOTggNS4y%0D%0ANDAzMSAxMC40Mjg4IDQuMjgzMyAxMi4zNjcxIDMuODA5MTdDMTQuMzA1NSAzLjMzNTAzIDE2LjMz%0D%0AMjMgMy4zNTkyIDE4LjI1ODggMy44Nzk0MiIgc3Ryb2tlPSIjMzJGRjk4IiBzdHJva2Utd2lkdGg9%0D%0AIjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2%0D%0AZz4K"
        style={{
          width: "8px",
          height: "7px",
          transform: "translate(-12.4037px, -43.2568px) rotate(92deg)",
        }}
      />
      <img
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxMiAxOCIgZmlsbD0ibm9u%0D%0AZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyIiBo%0D%0AZWlnaHQ9IjE4IiBmaWxsPSIjNUE3RkZGIi8+Cjwvc3ZnPgo="
        style={{
          width: "6px",
          height: "9px",
          transform: "translate(14.7527px, -55.0578px) rotate(153deg)",
        }}
      />
      <img
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMiAyMSIgZmlsbD0ibm9u%0D%0AZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMuNTI5NDIg%0D%0AMThMMTguMzUyOSAzLjE3NjQ1TTMuNTI5NDIgMy4xNzY0NUwxMC45NDEyIDEwLjU4ODJMMTguMzUy%0D%0AOSAxOCIgc3Ryb2tlPSIjRkZFQjMzIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJy%0D%0Ab3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K"
        style={{
          width: "10px",
          height: "10px",
          transform: "translate(58.5602px, -7.19029px) rotate(37deg)",
        }}
      />
    </div>
  );
};
