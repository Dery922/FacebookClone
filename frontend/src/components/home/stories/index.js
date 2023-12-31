import React from "react";
import "./style.css";
import { ArrowRight, Plus } from "../../../svg";
import { stories } from "../../../data/home";
import Story from "./Story";
import { useMediaQuery } from "react-responsive";

export default function Stories() {
  const Query1175px = useMediaQuery({
    query: "(max-width: 1175px)",
  });

  const Query1030px = useMediaQuery({
    query: "(max-width: 1030px)",
  });

  const Query960px = useMediaQuery({
    query: "(max-width: 960px)",
  });

  const Query850px = useMediaQuery({
    query: "(max-width: 850px)",
  });

  const max = Query850px
    ? 5
    : Query960px
    ? 4
    : Query1030px
    ? 5
    : Query1175px
    ? 4
    : stories.length;

  return (
    <div className="stories">
      <div className="create_story_card">
        <img
          src="../../../images/default_pic.png"
          className="create_story_img"
        />
        <div className="plus_story">
          <Plus color="#fff" />
        </div>
        <div className="story_create_text">Create Story</div>
      </div>
      {stories.slice(0, max).map((story, i) => (
        <Story story={story} key={i} />
      ))}
      <div className="white_circle">
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
}
