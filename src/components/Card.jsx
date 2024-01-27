import React from "react";
import myImage from "../assets/newslogo.png";
import "./Card.css"; // Import the CSS file for card styles and tooltip

export default function Card(props) {
  const news = props.news;
  const title = news.title;
  const image = news.image || myImage; // Use logo image if news image is not present
  const dateTimeString = news.date; // Assuming the date is in ISO 8601 format
  const newscontent =
    news.body.substr(0, 150) + (news.body.length > 150 ? "..." : ""); // Truncate to 150 characters
  const source = news.source;
  const url = news.url;

  const openNewsInNewTab = () => {
    window.open(url, "_blank");
  };

  // Convert ISO 8601 date string to a JavaScript Date object
  const dateTime = new Date(dateTimeString);

  // Format date and time without seconds
  const formattedDate = dateTime.toLocaleDateString();
  const formattedTime = dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 h-full">
      <div
        className="card bg-white rounded-lg overflow-hidden shadow-md cursor-pointer relative h-full"
        onClick={openNewsInNewTab}
      >
        <img className="w-full h-56 object-cover" src={image} alt={myImage} />
        <div className="p-4 h-full">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 mb-2">
            <span className="highlighted">
              Date: {formattedDate}, Time: {formattedTime}
            </span>
          </p>
          <p className="text-gray-700">{newscontent}</p>
          <div className="source font-semibold text-base">
            <span className="label font-bold text-lg">Source:</span> {source}
          </div>
        </div>
        <div className="tooltip">Show full news</div>
      </div>
    </div>
  );
}
