import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  a11yDark,
  prism,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

// https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html

const SyntaxHighlight = ({ style, children, ...props }: any) => {
  const { theme } = useTheme();
  const color = theme === "dark" ? a11yDark : prism;

  return (
    <SyntaxHighlighter style={style || color} language="javascript" {...props}>
      {children}
    </SyntaxHighlighter>
  );
};

export default SyntaxHighlight;
