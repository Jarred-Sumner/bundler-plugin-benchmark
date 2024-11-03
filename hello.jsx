import Hello from "./hello.mdx";
import Hello1 from "./hello1.mdx";
import Hello2 from "./hello2.mdx";
import Hello3 from "./hello3.mdx";
import Hello4 from "./hello4.mdx";
import Hello5 from "./hello5.mdx";
import Hello6 from "./hello6.mdx";

export default function App() {
  const components = {
    h1: (props) => <h1 style={{ color: "red" }} {...props} />,
    h2: (props) => <h2 style={{ color: "blue" }} {...props} />,
    h3: (props) => <h3 style={{ color: "green" }} {...props} />,
    h4: (props) => <h4 style={{ color: "orange" }} {...props} />,
    h5: (props) => <h5 style={{ color: "purple" }} {...props} />,
    h6: (props) => <h6 style={{ color: "pink" }} {...props} />,
    p: (props) => <p style={{ color: "black" }} {...props} />,
    a: (props) => <a style={{ color: "purple" }} {...props} />,
    ul: (props) => <ul style={{ color: "black" }} {...props} />,
    ol: (props) => <ol style={{ color: "black" }} {...props} />,
    li: (props) => <li style={{ color: "black" }} {...props} />,
    blockquote: (props) => <blockquote style={{ color: "black" }} {...props} />,
  };
  return (
    <main>
      <Hello components={components} />
      <Hello1 components={components} />
      <Hello2 components={components} />
      <Hello3 components={components} />
      <Hello4 components={components} />
      <Hello5 components={components} />
      <Hello6 components={components} />
    </main>
  );
}

import { renderToStaticMarkup } from "react-dom/server";

console.log(renderToStaticMarkup(<App />));
