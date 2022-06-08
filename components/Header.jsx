import Image from "next/image";
import Link from "next/link";
import openseaLogo from "../assets/opensea.png";
import mondepluriel from "../assets/mondepluriel2.png"
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useState } from "react";
import WalletSidebar from "../components/WalletSidebar";
import { useAddress } from "@thirdweb-dev/react";

const style = {
  searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
};

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const address = useAddress();

  const walletToggle = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <div className="wrapper-header">
        <Link href="/">
          <div className="logo-container">
            <Image src={mondepluriel} height={40} width={100} />
            {/* <div className="logo-text">Opensea</div> */}
          </div>
        </Link>
        <div className="search-bar">
          <div className="search-icon">
            <AiOutlineSearch />
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Search items, collections and accounts"
          />
        </div>
        <div className="header-items">
          <Link href="/collections/">
            <div className="header-item">Collections</div>
          </Link>
          {/* <Link href="/stats/">
          <div className="header-item">Stats</div>
        </Link>
        <Link href="/ressources">
          <div className="header-item">Resources</div>
        </Link>
        <Link href="/create">
          <div className="header-item">Create</div>
        </Link> */}
          <Link href="#">
            <div className="header-icon">
              <CgProfile style={address && { color: "#4ad968" }} />
            </div>
          </Link>
          <div className="header-icon">
            <MdOutlineAccountBalanceWallet onClick={walletToggle} />
          </div>
        </div>
      </div>
      {toggle && (
        <WalletSidebar address={address} walletToggle={walletToggle} />
      )}
    </>
  );
};
export default Header;
