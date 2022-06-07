import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import NftImage from "../../../components/nft/NftImage";
import GeneralDetails from "../../../components/nft/GeneralDetails";
import Purchase from "../../../components/nft/Purchase";
import ItemActivity from "../../../components/nft/ItemActivity";
import { client } from "../../../lib/sanityClient";
import {
  useAddress,
  useMarketplace,
  useNFTCollection,
} from "@thirdweb-dev/react";
import { PuffLoader } from "react-spinners";

const Nft = () => {
  const [selectedNft, setSelectedNft] = useState();
  const [listings, setListings] = useState([]);
  const [collection, setCollection] = useState({});
  const [isListed, setIsListed] = useState(false);
  const [nftListed, setNftListed] = useState();
  const address = useAddress();
  const router = useRouter();
  const { collections, nftId } = router.query;

  //console.log(nftId, collections, isListed)

  const nftModule = useNFTCollection(collections);

  // Get all NFTs in a collection
  useEffect(() => {
    if (!nftModule) return;
    (async () => {
      const nfts = await nftModule.getAll();

      const selectedNftItem = nfts.find(
        (nft) => nft.metadata.id.toString() === nftId
      );

      setSelectedNft(selectedNftItem);
    })();
  }, [nftModule]);

  const marketplace = useMarketplace(
    "0xcb17BFFD2fC93405C55c193e7Ba3274bE4dE990b"
  );

  useEffect(() => {
    if (!marketplace) return;
    getListings();
  }, [marketplace]);

  const getListings = async () => {
    try {
      const nftList = await marketplace.getActiveListings();
      const listingContract = nftList.filter((item) => 
        item.assetContractAddress === collections
      );
      setListings(listingContract);
    } catch (error) {
      console.log(error);
    }
  };
  
  // useEffect(() => {
  //   if (listings.id === selectedNft?.metadata.id.toString()) {
  //     setIsListed(true);
  //   } else {
  //     setIsListed(false);
  //   }
  // }, [listings, selectedNft]);

  useEffect(() => {
    const listing = listings.find((listing) => listing.asset.name === selectedNft?.metadata.name);
    if (Boolean(listing)) {
      setIsListed(true);
      setNftListed(listing)
    }
  }, [listings, selectedNft]);

  const fetchCollectionTitle = async (sanityClient = client) => {
    const query = `*[_type == "marketItems" && contractAddress == "${collections}" ] {
      title, 
    }`;

    const title = await sanityClient.fetch(query);
    await setCollection(title[0]);
  };

  useEffect(() => {
    if (!collections) return;
    fetchCollectionTitle();
  }, [collections]);

  return (
    <div>
      <Header />
      {selectedNft ? (
        <div className="nft-wrapper">
          <div className="nft-container">
            <div className="top-content">
              <div className="nft-img-container">
                <NftImage selectedNft={selectedNft?.metadata} />
              </div>
              <div className="details-container">
                <GeneralDetails
                  selectedNft={selectedNft?.metadata}
                  title={collection.title}
                  owner={selectedNft?.owner}
                  address={address}
                />
                <Purchase
                  isListed={isListed}
                  nftListed={nftListed}
                  marketplace={marketplace}
                  nftId={nftId}
                  owner={selectedNft.owner}
                  contract ={collections}
                  selectedNft={selectedNft}
                />
              </div>
            </div>
            {/* <ItemActivity /> */}
          </div>
        </div>
      ) : (
        <div className="loader-nft">
          <PuffLoader color="#e4e8eb" size={120} />
        </div>
      )}
    </div>
  );
};
export default Nft;
