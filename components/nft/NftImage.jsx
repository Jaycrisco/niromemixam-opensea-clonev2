import { FaEthereum } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";

const NftImage = ({ selectedNft }) => {
  return (
    <>
      <div className="top-bar">
        <div className="top-bar-content">
          <FaEthereum />
          <div className="likes-counter">
            <AiOutlineHeart />
            <span>2.3K</span>
          </div>
        </div>
      </div>
      <div className="nft-img">
        <img src={selectedNft?.image} alt={selectedNft?.name} />
      </div>
    </>
  );
};
export default NftImage;
