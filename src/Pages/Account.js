import React, { useState, useEffect, useRef } from "react";
import Posting from "../components/main-components/Posting";
import AccountHeader from "../components/account/AccountHeader";
import AccountTimeLine from "../components/account/AccountTimeLine";
import AccountInfo from "../components/account/AccountInfo";
import { useParams } from "react-router";
import AccountSubmenu from "../components/account/AccountSubmenu";

const Account = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [pickID, setPickID] = useState(null);
  const [mainID, setmainID] = useState(null);
  const params = useParams();
  const headerRef = useRef(null);

  useEffect(() => {
    let cancel = "";
    const getID = async () => {
      const par = await params;
      if (cancel) console.log("object");
      if (!par) {
        return;
      } else {
        if (par) {
          setmainID(par.id);
          if (par.guest) setPickID(par.guest);
          else setPickID(par.id);
        }
      }
    };
    getID();
    return () => {
      cancel = true;
    };
  }, [params]);

  useEffect(() => {
    if (headerRef.current === null) return;
    if (!pickID) return;
    else {
      const handleScroll = (window.onscroll = () => {
        if (headerRef.current === null) {
          setShowHeader(false);
        } else {
          let container = headerRef.current.getBoundingClientRect().height;
          let windowY = window.pageYOffset;
          if (windowY > container - 100) {
            setShowHeader(true);
          } else {
            setShowHeader(false);
          }
        }
      });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout();
      };
    }
  }, [pickID]);

  if (!pickID || !mainID) return <div className="account-main-container"></div>;
  else {
    return (
      <div className="account-main-container">
        <div className="account-header-container" ref={headerRef}>
          <AccountHeader pickID={pickID} mainID={mainID} />
          <AccountSubmenu showHeader={showHeader} />
        </div>

        <div className="account-body-container">
          <div className="account-body">
            <AccountInfo />
            <div className="main-mid account-posts">
              {pickID === mainID && <Posting />}
              <AccountTimeLine pickID={pickID} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Account;
