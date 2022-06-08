import { HiTag } from "react-icons/hi";
import { IoMdWallet } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { FaEthereum } from "react-icons/fa";
import { useAddress } from "@thirdweb-dev/react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import ListItem from "./ListItem";

const Purchase = ({
  isListed,
  marketplace,
  nftId,
  contract,
  nftListed,
  selectedNft,
}) => {
  const [loading, setLoading] = useState(false);
  const [toggleListItem, setToggleListItem] = useState(false);
  const address = useAddress();
  const idItemMarketplace = nftListed?.id;
  const owner = nftListed?.sellerAddress;

  const cancelListing = async () => {
    setLoading(true);
    try {
      await marketplace.direct.cancelListing(idItemMarketplace);
      confirmCancelListing();
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.code === 4001) {
        transactionRejected();
        setLoading(false);
      } else {
        otherError();
        setLoading(false);
      }
    }
  };

  const buyItem = async (
    listingId = idItemMarketplace,
    quantityDesired = 1
  ) => {
    setLoading(true);
    if (!address) {
      noWalletConnected();
      setLoading(false);
      return;
    }
    try {
      await marketplace.buyoutListing(listingId, quantityDesired);
      confirmPurchase();
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.code === 4001) {
        transactionRejected();
        setLoading(false);
      } else {
        otherError();
        setLoading(false);
      }
    }
  };

  const noWalletConnected = (toastHandler = toast) => {
    toastHandler.error(`Please connect your wallet`, {
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });
  };
  const transactionRejected = (toastHandler = toast) => {
    toastHandler.error(`Transaction rejected by the user`, {
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });
  };
  const otherError = (toastHandler = toast) => {
    toastHandler.error(`Something wrong happened, please try again later`, {
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });
  };
  const confirmPurchase = (toastHandler = toast) => {
    toastHandler.success(`Purchase successful !`, {
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });
  };
  const confirmListing = (toastHandler = toast) => {
    toastHandler.success(`Item is listed !`, {
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });
  };
  const confirmCancelListing = (toastHandler = toast) => {
    toastHandler.success(`Listing item canceled !`, {
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });
  };

  const toggleListItemFunc = () => {
    setToggleListItem(!toggleListItem);
  };

  return (
    <>
      <div className="wrapper-purchase">
        <Toaster position="bottom-left" reverseOrder={false} />
        {isListed ? (
          <>
            <div className="main-container">
              <div className="price-container">
                <div className="current">Current Price</div>
                <div className="price">
                  <img
                    src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                    alt="eth-logo"
                    className="eth-logo"
                  />
                  {/* <FaEthereum className="eth-logo" /> */}
                  <div className="price-text">
                    {nftListed.buyoutCurrencyValuePerToken.displayValue}
                  </div>
                </div>
              </div>
              {owner === address ? (
                <div className="button-container">
                  <div
                    className="button"
                    onClick={() => {
                      cancelListing();
                    }}
                  >
                    {loading ? (
                      <ClipLoader color="#e4e8eb" />
                    ) : (
                      <>
                        <IoMdWallet className="button-icon" />
                        <div className="button-text">Cancel Listing</div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="button-container">
                  {nftListed.type === 0 ? (
                    <div
                    className="button"
                    onClick={() => {
                      buyItem();
                    }}
                  >
                    {loading ? (
                      <ClipLoader color="#e4e8eb" />
                    ) : (
                      <>
                        <IoMdWallet className="button-icon" />
                        <div className="button-text">Buy Now</div>
                      </>
                    )}
                  </div>
                  ) : (
                    <div
                    className="button"
                    onClick={() => {
                      buyItem();
                    }}
                  >
                    {loading ? (
                      <ClipLoader color="#e4e8eb" />
                    ) : (
                      <>
                        <IoMdWallet className="button-icon" />
                        <div className="button-text">Place a bid</div>
                      </>
                    )}
                  </div>

                  )}
                  
                  <div className="offer button">
                    <HiTag className="button-icon" />
                    <div className="button-text">Make Offer</div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="main-container">
            {owner === address ? (
              <div className="button-container">
                <div className="button" onClick={toggleListItemFunc}>
                  {loading ? (
                    <ClipLoader color="#e4e8eb" />
                  ) : (
                    <>
                      <IoMdWallet className="button-icon" />
                      <div className="button-text">List Item</div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="button-container">
                <div className="offer button">
                  <HiTag className="button-icon" />
                  <div className="button-text">Make Offer</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {toggleListItem && (
        <ListItem
          toggleListItemFunc={toggleListItemFunc}
          selectedNft={selectedNft}
          contract={contract}
          marketplace={marketplace}
          nftId={nftId}
          confirmListing={confirmListing}
          otherError={otherError}
          transactionRejected={transactionRejected}
        />
      )}
    </>
  );
};
export default Purchase;
