import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import "../styles/styles.scss";


const connectors = {
  injected: {}
};


function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      connectors={connectors}
      desiredChainId={3000}
      chainRpc={{
        [3000]:'https://rpc.ech.network'
      }}
      
      >
      <Component {...pageProps} />
    </ThirdwebProvider>
      

  );
}

export default MyApp;
