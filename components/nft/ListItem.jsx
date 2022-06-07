import { useEffect, useState } from "react";
import { IoMdWallet } from "react-icons/io";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdTimelapse, MdOutlineCancel } from "react-icons/md";

const ListItem = ({ toggleListItemFunc, selectedNft, contract, marketplace }) => {
  const [fixedPrice, setFixedPrice] = useState(true);

  useEffect(() => {
    if(fixedPrice){
        document.querySelector('.fixed-price').classList.add("selected");
        document.querySelector('.auction').classList.remove("selected");
    }else {
        document.querySelector('.fixed-price').classList.remove("selected");
        document.querySelector('.auction').classList.add("selected"); 
    }
  }, [fixedPrice])

  const createListing = (e) => {
    e.preventDefault();
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
                  <button
                    className="button-choice fixed-price"
                    onClick={() => setFixedPrice(true)}
                  >
                    <RiMoneyDollarCircleLine className="button-icon" /> Fixed
                    Price
                  </button>
                  <button
                    className="button-choice auction"
                    onClick={() => setFixedPrice(false)}
                  >
                    <MdTimelapse className="button-icon" />
                    Auction
                  </button>
                </div>
              </div>
              {fixedPrice ? (
                <>
                  <div className="price-container">
                    <label className="price-text">Price</label>
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
                    <label className="price-text">Duration</label>
                    <div className="duration-container">
                      <select className="duration" pl>
                          <option className="duration-choice" value="" selected>1 Day</option>
                      </select>
                    </div>
                    <div className="buttons">
                      <button type="submit" className="button submit">
                        <IoMdWallet className="button-icon" />
                        List Item
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
                    <label className="price-text">Price</label>
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
                    <div className="buttons">
                      <button type="submit" className="button submit">
                        <IoMdWallet className="button-icon" />
                        List Item
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
