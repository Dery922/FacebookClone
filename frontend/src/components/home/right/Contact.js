import React from "react";

export default function Contact({ user }) {
  return (
    <div className="contact hover3">
      <div className="contact_img">
        <img src={user.picture} />
      </div>
      <span>
        {user.first_name} {user.last_name}
      </span>
    </div>
  );
}
