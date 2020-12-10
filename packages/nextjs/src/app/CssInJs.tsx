import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import { Children, PropsWithChildren, ReactElement, ReactNode, useEffect } from "react";

export const cssInJsCache = createCache({ key: "css" });

export const CssInJsWrapper = ({ children }: PropsWithChildren<unknown>): ReactElement => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return <CacheProvider value={cssInJsCache}>{children}</CacheProvider>;
};

const { extractCritical } = createEmotionServer(cssInJsCache);

export type IDocumentStyleSheets = {
  collect(children: ReactNode, options?: unknown): ReactElement;
  getStyleElement(props?: unknown): React.ReactElement;
};

export class Document extends NextDocument {
  render(): ReactElement {
    const head = this.getHead();
    return (
      <Html lang="en">
        {head && <Head>{head}</Head>}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

  getHead(): ReactElement | null {
    return null;
  }

  static getStyleSheets(): IDocumentStyleSheets | undefined {
    return undefined;
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
Document.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = Document.getStyleSheets();
  const originalRenderPage = ctx.renderPage;

  if (sheets) {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });
  }

  const initialProps = await NextDocument.getInitialProps(ctx);
  const styles = extractCritical(initialProps.html);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...Children.toArray(initialProps.styles),
      sheets ? sheets.getStyleElement() : null,
      <style
        key="emotion-style-tag"
        data-emotion-css={styles.ids.join(" ")}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: styles.css }}
      />,
    ],
  };
};
