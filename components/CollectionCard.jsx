import Router from "next/router";

const Collection = ({ collection }) => {

  return (
    <div
      className="wrapper-collection-card"
      onClick={() => {
        Router.push({
          pathname: `collections/${collection.contractAddress}`,
        });
      }}
    >
      <div className="img-container">
        <img
          src={collection.bannerImageUrl}
          alt="banner"
          className="banner-img"
        />
      </div>
      <div className="info-container">
        <div className="mid-row">
          <img
            src={collection.imageUrl}
            alt="profile"
            className="profile-img"
          />
        </div>
        <div className="mid-row">
          <div className="title-collection">{collection.title}</div>
        </div>
        <div className="mid-row">
          <div className="created-by">
            by{" "}
            <a href="#" className="text-[#2081e2]">
              {collection?.creator}
            </a>
          </div>
        </div>
        <div className="mid-row">
          <div className="description-collection">
            <p>{collection.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Collection;
