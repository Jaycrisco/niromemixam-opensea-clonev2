import { AiFillHeart } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import { RiShareBoxLine } from "react-icons/ri";
import { FiMoreVertical } from "react-icons/fi";
import { GiShare } from "react-icons/gi";

const GeneralDetails = ({ selectedNft, title, owner, address }) => {

  return (
    <div className="wrapper-general-details">
      <div className="info-container">
        <div className="collection">{title}</div>
        <div className="nft-title">{selectedNft?.name}</div>
        <div className="other-info">
          <div className="owned-by">
            Owned by{" "}
            {owner === address ? (
              <span className="accent">you</span>
            ) : (
              <span className="accent">{owner.slice(0, 6).toUpperCase()}</span>
            )}
          </div>
          {/* <div className="likes">
            <AiFillHeart className="like-icon" />
          </div> */}
        </div>
      </div>
      <div className="action-buttons-container">
        <div className="action-buttons">
          <div className="action-button ml-2">
            <MdRefresh />
          </div>
          <div className="divider"></div>
          <div className="action-button">
            <RiShareBoxLine />
          </div>
          <div className="divider"></div>
          <div className="action-button">
            <GiShare />
          </div>
          <div className="divider"></div>
          <div className="action-button mr-2">
            <FiMoreVertical />
          </div>
        </div>
      </div>
    </div>
  );
};
export default GeneralDetails;
