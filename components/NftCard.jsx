import Router from "next/router";
import { useState, useEffect } from "react";
import { BiHeart } from "react-icons/bi";
import { FaEthereum } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";

const NftCard = ({ nftItem, title, listings, collectionId }) => {
  const [isListed, setIsListed] = useState(false);
  const [price, setPrice] = useState(0);
  const [directListing, setDirectListing] = useState(false);

  useEffect(() => {
    const listing = listings.find(
      (listing) => listing.asset.name === nftItem?.name
    );
    if (Boolean(listing)) {
      setIsListed(true);
      setPrice(listing.buyoutCurrencyValuePerToken.displayValue);
    }
    if(listing?.type === 0){
      setDirectListing(true);
    }
  }, [listings, nftItem]);

  return (
    <div className="wrapper-card">
      <div className="img-container">
        <img src={nftItem.image} alt={nftItem.name} className="nft-img" />
      </div>
      <div className="details">
        <div className="info">
          <div className="info-left">
            <div className="collection-name">{title}</div>
            <div className="asset-name">{nftItem.name}</div>
          </div>
          {listings.length > 0 ? (
            <>
              {isListed && (
                <div className="info-right">
                  <div className="price-tag">{directListing ? "Price" : "Bid"}</div>
                  <div className="price-value">
                    <FaEthereum className="eth-logo-card" />
                    {price}
                  </div>
                </div>
              )}{" "}
            </>
          ) : (
            <div className="loader">
              <ClipLoader color="#e4e8eb" />
            </div>
          )}
        </div>
        <div className="likes">
          <span className="like-icon">
            <BiHeart />
          </span>{" "}
          {nftItem.likes}
        </div>
      </div>
    </div>
  );
};
export default NftCard;
