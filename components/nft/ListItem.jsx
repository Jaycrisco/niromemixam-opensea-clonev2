import { useEffect, useState } from "react";
import { IoMdWallet } from "react-icons/io";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdTimelapse, MdOutlineCancel } from "react-icons/md";
import { useRouter } from "next/router";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { ClipLoader } from "react-spinners";

const ListItem = ({
  toggleListItemFunc,
  selectedNft,
  contract,
  marketplace,
  nftId,
  confirmListing,
  otherError,
  transactionRejected,
}) => {
  const [fixedPrice, setFixedPrice] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (fixedPrice) {
      document.querySelector(".fixed-price").classList.add("selected");
      document.querySelector(".auction").classList.remove("selected");
    } else {
      document.querySelector(".fixed-price").classList.remove("selected");
      document.querySelector(".auction").classList.add("selected");
    }
  }, [fixedPrice]);

  const createListing = async (e) => {
    try {
      e.preventDefault();
      const { price, duration } = e.target.elements;

      if (fixedPrice) {
        await createDirectListing(price.value, duration.value);
        router.push(`/collections/${contract}`);
      } else {
        await createAuctionListing(price.value, duration.value);
        router.push(`/collections/${contract}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createDirectListing = async (price, duration) => {
    const listingInfo = {
      assetContractAddress: contract,
      tokenId: nftId,
      startTimestamp: new Date(),
      listingDurationInSeconds: Number(duration),
      quantity: 1,
      currencyContractAddress: NATIVE_TOKEN_ADDRESS,
      buyoutPricePerToken: price,
    };

    setLoading(true);

    try {
      await marketplace?.direct.createListing(listingInfo);
      confirmListing();
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

  const createAuctionListing = async (price, duration) => {
    const listingInfo = {
      assetContractAddress: contract,
      tokenId: nftId,
      startTimestamp: new Date(),
      listingDurationInSeconds: Number(duration),
      quantity: 1,
      currencyContractAddress: NATIVE_TOKEN_ADDRESS,
      buyoutPricePerToken: price,
      reservePricePerToken: 0,
    };

    setLoading(true);

    try {
      await marketplace?.auction.createListing(listingInfo);
      confirmListing();
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

  return (
    <div className="modal">
      <div className="background" onClick={toggleListItemFunc}></div>
      <div className="listing-wrapper">
        <div className="title">Create listing</div>

        <div className="container-card">
          <div className="container-image">
            <img
              src={selectedNft?.metadata.image}
              alt=""
              className="nft-image"
            />
          </div>

          <div className="container-form">
            <div className="nft-name">{selectedNft.metadata.name}</div>
            <form className="form-listing" onSubmit={(e) => createListing(e)}>
              <div className="type-container">
                <label className="type-text">Type</label>

                <div className="type-choice">
                  <div
                    className="button-choice fixed-price"
                    onClick={() => setFixedPrice(true)}
                  >
                    <RiMoneyDollarCircleLine className="button-icon" /> Fixed
                    Price
                  </div>
                  <div
                    className="button-choice auction"
                    onClick={() => setFixedPrice(false)}
                  >
                    <MdTimelapse className="button-icon" />
                    Auction
                  </div>
                </div>
              </div>
              {fixedPrice ? (
                <>
                  <div className="price-container">
                    <label className="label-text">Price</label>
                    <div className="price">
                      <img
                        src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                        alt="eth-logo"
                        className="eth-logo"
                      />
                      <input
                        type="text"
                        name="price"
                        placeholder="Amount"
                        className="price-input"
                      />
                    </div>
                    <label className="label-text">Duration</label>
                    <div className="duration-container">
                      <select
                        className="duration"
                        name="duration"
                        defaultValue={86400}
                      >
                        <option className="duration-choice" value={86400}>
                          1 Day
                        </option>
                        <option className="duration-choice" value={604800}>
                          1 Week
                        </option>
                        <option className="duration-choice" value={2629800}>
                          1 Month
                        </option>
                      </select>
                    </div>
                    <div className="buttons">
                      <button type="submit" className="button submit">
                        {loading ? (
                          <ClipLoader color="#e4e8eb" className="loader" />
                        ) : (
                          <>
                            <IoMdWallet className="button-icon" />
                            List Item
                          </>
                        )}
                      </button>
                      <button
                        className="button cancel"
                        onClick={toggleListItemFunc}
                      >
                        <MdOutlineCancel className="button-icon" />
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="price-container">
                    <label className="label-text">Starting Price</label>
                    <div className="price">
                      <img
                        src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                        alt="eth-logo"
                        className="eth-logo"
                      />
                      <input
                        type="text"
                        name="price"
                        placeholder="Amount"
                        className="price-input"
                      />
                    </div>
                    <label className="label-text">Duration</label>
                    <div className="duration-container">
                      <select
                        className="duration"
                        defaultValue={86400}
                        name="duration"
                      >
                        <option className="duration-choice" value={86400}>
                          1 Day
                        </option>
                        <option className="duration-choice" value={604800}>
                          1 Week
                        </option>
                        <option className="duration-choice" value={2629800}>
                          1 Month
                        </option>
                      </select>
                    </div>
                    <div className="buttons">
                      <button type="submit" className="button submit">
                        {loading ? (
                          <ClipLoader color="#e4e8eb" className="loader" />
                        ) : (
                          <>
                            <IoMdWallet className="button-icon" />
                            List Item
                          </>
                        )}
                      </button>
                      <button
                        className="button cancel"
                        onClick={toggleListItemFunc}
                      >
                        <MdOutlineCancel className="button-icon" />
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListItem;
