
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import "../styles/styles.scss";


function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      desiredChainId={ChainId.Rinkeby}
      chainRpc={{
        [ChainId.Rinkeby]:'https://eth-rinkeby.alchemyapi.io/v2/U-rqO0k-zQLCqAgNdinQCKVGZthAAMPr'
      }}
      >
      <Component {...pageProps} />
    </ThirdwebProvider>
      

  );
}

export default MyApp;
