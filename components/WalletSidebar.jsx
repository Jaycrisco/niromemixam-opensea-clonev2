import { useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { FiLogOut } from "react-icons/fi";

const WalletSidebar = ({ walletToggle, address }) => {
  const connectMetamask = useMetamask();
  const disconnect = useDisconnect();
  return (
    <div className="aside">
      <div className="background" onClick={walletToggle}></div>
      <div className="wallet-wrapper">
        {address ? (
          <>
            <div className="container-wallet">
              <div className="container-info">
                <div className="title">My Wallet</div>
                <div className="address">{`${address?.slice(
                  0,
                  6
                )}...${address?.slice(-4)}`}</div>
              </div>

              <div className="container-button">
                <div className="wallet">
                  <button className="button" onClick={disconnect}>
                    <FiLogOut className="icon" />
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="container-wallet">
              <div className="container-info">
                <div className="title">My Wallet</div>
              </div>

              <div className="container-button">
                <div className="wallet">
                  <button className="button" onClick={connectMetamask}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                      alt="metamask"
                      className="icon"
                    />
                    Connect MetaMask
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default WalletSidebar;
