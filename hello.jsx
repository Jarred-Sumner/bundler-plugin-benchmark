import Hello from "./hello.mdx";

export default function App() {
  return (
    <main>
      <Hello
        components={{
          h1: props => <h1 style={{ color: "red" }} {...props} />,
          h2: props => <h2 style={{ color: "blue" }} {...props} />,
          h3: props => <h3 style={{ color: "green" }} {...props} />,
          h4: props => <h4 style={{ color: "orange" }} {...props} />,
          h5: props => <h5 style={{ color: "purple" }} {...props} />,
          h6: props => <h6 style={{ color: "pink" }} {...props} />,
          p: props => <p style={{ color: "black" }} {...props} />,
          a: props => <a style={{ color: "purple" }} {...props} />,
          ul: props => <ul style={{ color: "black" }} {...props} />,
          ol: props => <ol style={{ color: "black" }} {...props} />,
          li: props => <li style={{ color: "black" }} {...props} />,
          blockquote: props => <blockquote style={{ color: "black" }} {...props} />,
        }}
      />
    </main>
  );
}

import { renderToStaticMarkup } from "react-dom/server";

console.log(renderToStaticMarkup(<App />));
