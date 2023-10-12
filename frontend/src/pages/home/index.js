import { useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import useClickOutside from "../../helpers/clickOutside";
import { useRef, useState } from "react";

export default function Home() {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div>
      <Header />

      <LeftHome user={user} />
    </div>
  );
}
