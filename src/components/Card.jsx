import React from "react";
import PropTypes from "prop-types";
import myImage from "../assets/newslogo.png";
import "./Card.css";

function Card({ news }) {
  if (!news) {
    return null; // Add better error handling if needed
  }

  const { title, image, date, body, source, url } = news;

  // If image is null or undefined, set myImage as the source
  const imageSource = image || myImage;

  const openNewsInNewTab = () => {
    window.open(url, "_blank");
  };

  function handleError(event) {
    event.target.src = myImage;
  }

  const dateTime = new Date(date);
  const formattedDate = dateTime.toLocaleDateString();
  const formattedTime = dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const newsContent = body?.substr(0, 150) + (body.length > 150 ? "..." : "");

  return (
    <div className="news-card w-full md:w-5/6 lg:w-1/3 h-full">
      <div
        className="card bg-white rounded-lg overflow-hidden shadow-md cursor-pointer relative h-full"
        onClick={openNewsInNewTab}
      >
        <img
          className="card-image w-full h-56 object-cover"
          src={imageSource}
          alt={title}
          onError={handleError}
        />
        <div className="card-content p-4 h-full">
          <h2 className="card-title text-xl font-bold mb-2">{title}</h2>
          <p className="card-info text-gray-600 mb-2">
            <span className="highlighted">
              Date: {formattedDate}, Time: {formattedTime}
            </span>
          </p>
          <p className="card-description text-gray-700">{newsContent}</p>
          <div className="card-source font-semibold text-base">
            <span className="card-label font-bold text-lg">Source:</span>{" "}
            {source}
          </div>
        </div>
        <div className="tooltip">Show full news</div>
      </div>
    </div>
  );
}

Card.propTypes = {
  news: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    date: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
