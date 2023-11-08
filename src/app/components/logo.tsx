import React from "react";
import logo from "../../../public/logo.png";
import Image from "next/image";

type Props = {};

const Logo = (props: Props) => {
  return (
    <div>
      <Image src={logo} alt="logo" width={120} height={70} />
    </div>
  );
};

export default Logo;
