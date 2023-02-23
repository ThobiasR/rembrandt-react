import "bootstrap/dist/css/bootstrap.css";
import "../styles/scss/main.scss";
import "public/fonts/stylesheet.css";
import React from "react";
import { SnackbarProvider } from "notistack";
import TagManager from "react-gtm-module";

const GOOGLE_TAG_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    TagManager.initialize({ gtmId: GOOGLE_TAG_ID });
  }, []);

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      maxSnack={3}
    >
      <Component {...pageProps} />
    </SnackbarProvider>
  );
}

export default MyApp;
