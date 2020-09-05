import React from "react";
import style from "./_footer.module.scss";
import { populateDummyData } from "utils";
const Footer = () => {
  return (
    <div className={style.footer}>
      <span
        className={style.link}
        onClick={() => {
          populateDummyData(true);
          window.location.reload();
        }}
      >
        reset storage
      </span>
    </div>
  );
};
export default Footer;
