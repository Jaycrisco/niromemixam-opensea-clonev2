import { useState, useEffect } from "react";
import { PuffLoader } from "react-spinners";
import CollectionCard from "../components/CollectionCard";
import Header from "../components/Header";
import { client } from "../lib/sanityClient";

const collections = () => {
  const [collections, setCollections] = useState([]);

  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "marketItems"] {
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

    console.log(collectionData);

    setCollections(collectionData);
  };

  useEffect(() => {
    fetchCollectionData();
  }, []);

  return (
    <div className="overflow-hidden">
      <Header />

      <div className="title-container">
        <h1 className="title">Explore Collections</h1>
      </div>

      <div className="container-collection-card">
        {collections.length > 0 ? (
          <>
            {collections.map((collection, id) => (
              <CollectionCard key={id} collection={collection} />
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
export default collections;
