import { Html, Head, Main, NextScript } from "next/document";
import {
  DocumentHeadTags,
  documentGetInitialProps,
} from "@mui/material-nextjs/v13-pagesRouter";

export default function Document(props) {
  return (
    <Html lang="en">
      <Head>
        {/* Add Winwheel.js */}
        <script src="/js/Winwheel.min.js" defer></script>
        <DocumentHeadTags {...props} />
      </Head>
      
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
