import Header from "../../components/header";
import useClickOutside from "../../helpers/clickOutside";
import { useRef, useState } from "react";

export default function Home() {
  //function use to display the red box
  const [visible, setVisible] = useState(false);
  const el = useRef(null);
  useClickOutside(el, () => {
    setVisible(false);
  });

  return (
    <div>
      <Header />
      {visible && <div className="card" ref={el}></div>}
    </div>
  );
}
