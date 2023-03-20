import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";

const SyntaxHighlight = ({ style, children, ...props }: any) => (
  <SyntaxHighlighter
    style={style || nightOwl}
    language="javascript"
    showLineNumbers
    {...props}
  >
    {children}
  </SyntaxHighlighter>
);

export default SyntaxHighlight;
