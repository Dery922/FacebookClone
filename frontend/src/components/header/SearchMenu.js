import React, { useState } from "react";
import { Search, Return } from "../../svg";
import useClickOutside from "../../helpers/clickOutside";
import { useRef } from "react";
export default function SearchMenu({ color, setShowSearchMenu }) {
  const [iconVisible, setIconVisible] = useState(true);

  const menu = useRef(null);
  const input = useRef(null);
  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });

  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => setShowSearchMenu(false)}
          >
            <Return color={color} />
          </div>
        </div>
        <div className="search">
          <div>
            <Search
              color={color}
              onClick={() => {
                input.current.focus();
              }}
            />
            {iconVisible && (
              <div>
                <Search color={color} />
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Search Facebook"
            ref={input}
            onFocus={() => {
              setIconVisible(false);
            }}
          />
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent searches</span>
        <a>Edit</a>
      </div>
      <div className="search_history"></div>
      <div className="search_results scrollbar"></div>
    </div>
  );
}
