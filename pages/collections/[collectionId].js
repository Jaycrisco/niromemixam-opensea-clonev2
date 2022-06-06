import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import { client } from "../../lib/sanityClient";
import Header from "../../components/Header.jsx";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import NftCard from "../../components/NftCard";
import { FaEthereum } from "react-icons/fa";
import { useMarketplace, useNFTCollection } from "@thirdweb-dev/react";
import Link from "next/link";
import { PuffLoader } from "react-spinners";

const Collection = () => {
  const router = useRouter();
  const { collectionId } = router.query;
  const [collection, setCollection] = useState({});
  const [nfts, setNfts] = useState([]);
  const [listings, setListings] = useState([]);
  const [contractName, setContractName] = useState("");

  const nftModule = useNFTCollection(collectionId);

  // Get all NFTs in a collection
  useEffect(() => {
    if (!nftModule) return;
    (async () => {
      const nfts = await nftModule.getAll();
      setNfts(nfts);

      // const name = await nftModule.contract.name();
      //setContractName(name);
    })();
  }, [nftModule]);

  useEffect(() => {
    if (!nfts) return;
    if (!collectionId) return;
    (async () => {
      const collectionDoc = {
        _id: collectionId,
        _type: "marketItems",
        contractAddress: collectionId,
        title: contractName,
      };

      await client.createIfNotExists(collectionDoc);
    })();
  }, [contractName]);

  const marketplace = useMarketplace(
    "0xcb17BFFD2fC93405C55c193e7Ba3274bE4dE990b"
  );

  useEffect(() => {
    if (!marketplace) return;
    getListings();
  }, [marketplace]);

  const getListings = async () => {
    try {
      const list = await marketplace.getActiveListings();
      const listingContract = list.filter((item) => 
        item.assetContractAddress === collectionId
      );
      setListings(listingContract);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "marketItems" && contractAddress == "${collectionId}" ] {
      "imageUrl": profileImage.asset->url,
      "bannerImageUrl": bannerImage.asset->url,
      volumeTraded,
      createdBy,
      contractAddress,
      "creator": createdBy->userName,
      title, floorPrice,
      "allOwners": owners[]->,
      description
    }`;

    const collectionData = await sanityClient.fetch(query);

    // the query returns 1 object inside of an array
    await setCollection(collectionData[0]);
  };

  useEffect(() => {
    if (!collectionId) return;
    fetchCollectionData();
  }, [collectionId]);

  return (
    <div className="overflow-hidden">
      <Header />
      <div className="banner-image-container">
        <img
          src={
            collection?.bannerImageUrl
              ? collection.bannerImageUrl
              : "https://via.placeholder.com/200"
          }
          alt="banner"
          className="banner-image"
        />
      </div>
      <div className="container-info">
        <div className="mid-row">
          <img
            src={
              collection?.imageUrl
                ? collection.imageUrl
                : "https://via.placeholder.com/200"
            }
            alt="profile image"
            className="profile-img"
          />
        </div>
        <div className="end-row">
          <div className="social-icon-container">
            <div className="social-icon-wrapper">
              <div className="social-icon-content">
                <div className="social-icon">
                  <CgWebsite />
                </div>
                <div className="divider"></div>
                <div className="social-icon">
                  <AiOutlineInstagram />
                </div>
                <div className="divider"></div>
                <div className="social-icon">
                  <AiOutlineTwitter />
                </div>
                <div className="divider"></div>
                <div className="social-icon">
                  <HiDotsVertical />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mid-row">
          <div className="collection-title">{collection?.title}</div>
        </div>
        <div className="mid-row">
          <div className="created-by">
            Created by{" "}
            <a href="#" className="text-[#2081e2]">
              {collection?.creator}
            </a>
          </div>
        </div>
        <div className="mid-row">
          <div className="stats-container">
            <div className="collection-stat">
              <div className="stat-value">{nfts.length}</div>
              <div className="stat-name">items</div>
            </div>
            <div className="collection-stat">
              <div className="stat-value">
                {collection?.allOwners ? collection.allOwners.length : "--"}
              </div>
              <div className="stat-name">owners</div>
            </div>
            <div className="collection-stat">
              <div className="stat-value">
                <FaEthereum className="eth-logo" />
                {collection?.floorPrice ? collection.floorPrice : "--"}
              </div>
              <div className="stat-name">floor price</div>
            </div>
            <div className="collection-stat">
              <div className="stat-value">
                <FaEthereum className="eth-logo" />
                {collection?.volumeTraded ? collection.volumeTraded : "--"}
              </div>
              <div className="stat-name">volume traded</div>
            </div>
          </div>
        </div>
        <div className="mid-row">
          <div className="collection-description">
            {collection?.description}
          </div>
        </div>
      </div>
      <div className="container-nft-card">
        {nfts.length > 0 ? (
          <>
            {nfts.map((nftItem, id) => (
              <Link
                href={`/nfts/${collectionId}/${nftItem.metadata.id.toString()}`}
                key={id}
              >
                <a className="nft-link">
                  <NftCard
                    nftItem={nftItem.metadata}
                    title={collection?.title}
                    listings={listings}
                    collectionId={collectionId}
                  />
                </a>
              </Link>
            ))}
          </>
        ) : (
          <div className="loader-card">
            <PuffLoader
              color="#e4e8eb"
              size={120}
              css={{ margin: " 50px auto", display: "block" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Collection;
