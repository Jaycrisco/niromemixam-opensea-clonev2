import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { useEffect } from "react";
import { client } from "../lib/sanityClient";
import Header from "../components/Header";
import Hero from "../components/Hero";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const connectWithMetamask = useMetamask();
  const address = useAddress();

  const welcomeUser = (userName, toastHandler = toast) => {
    console.log(userName);
    toastHandler.success(
      `Welcome back ${userName !== "Unnamed" ? ` ${userName}` : ""}!`,
      {
        style: {
          background: "#04111d",
          color: "#fff",
          maxWidth: "1000px",
        },
      }
    );
  };

  useEffect(() => {
    if (!address) return;
    (async () => {
      const userDoc = {
        _type: "users",
        _id: address,
        userName: address,
        walletAddress: address,
      };

      const result = await client.createIfNotExists(userDoc);
      welcomeUser(result.userName);
    })();
  }, [address]);

  return (
    <div>
      <Toaster position="bottom-left" reverseOrder={false} />
      {/* {address ? ( */}
      <>
        <Header />
        <Hero />
      </>
      {/* ) : (
        <div className="wallet-connect-wrapper">
          <button className="button" onClick={connectWithMetamask}>
            Connect Wallet
          </button>
          <div className="details">
            You need Chrome to be
            <br /> able to run this app.
          </div>
        </div>
      )} */}
    </div>
  );
}
