import React, { useState, useRef } from "react";

import { jsPDF } from "jspdf";
import Wrapper from "./comicStyle";
import { Loader } from "./Loader";
const API_URL =
  "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud";

const Comic = () => {
  const [panels, setPanels] = useState(Array.from({ length: 10 }, () => ""));
  const [isLoading, setIsLoading] = useState(false);
  const [comicImages, setComicImages] = useState(
    Array.from({ length: 10 }, () => null)
  );
  const printRef = useRef(null);
  // Function to generate comic images
  const generateComic = async () => {
    setIsLoading(true); // Set isLoading to true while fetching
    console.log("clicked");
    try {
      console.log(isLoading);
      const images = await Promise.all(
        panels.map(async (text, index) => {
          const response = await fetch(API_URL, {
            method: "POST",
            headers: {
              Accept: "image/png",
              Authorization:
                "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: text }),
          });
          console.log(response);
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        })
      );
      setComicImages(images);
    } catch (error) {
      console.error("Error generating comic:", error);
      setIsLoading(false); // Set isLoading to false in case of an error
      console.log(isLoading);
    } finally {
      setIsLoading(false); // Set isLoading to false when the image is loaded
      console.log(isLoading);
    }
  };
  const clearAll = () => {
    setPanels(Array.from({ length: 10 }, () => ""));
    setComicImages(Array.from({ length: 10 }, () => ""));
  };
  const printComics = () => {
    const pdf = new jsPDF();

    const totalHeight = panels.length * 50;

    panels.forEach((panel, index) => {
      const image = new Image();
      image.src = comicImages[index];

      pdf.addImage(image, "JPEG", 10, 50, 180, 200);

      if (index < panels.length - 1) {
        pdf.addPage();
      }
    });

    pdf.save("comic.pdf");
  };

  return (
    <Wrapper>
      <div className="grid">
        {panels.map((panel, index) => (
          <div key={index} className="panel-card relative">
            <label htmlFor={`panel${index + 1}`}>{`Scene ${index + 1}:`}</label>
            <textarea
              id={`panel${index + 1}`}
              name={`panel${index + 1}`}
              rows="4"
              value={panel}
              onChange={(e) => {
                const updatedPanels = [...panels];
                updatedPanels[index] = e.target.value;
                setPanels(updatedPanels);
              }}
            />
            {isLoading && (
              <div className="loader-container absolute">
                <Loader />
              </div>
            )}

            {comicImages[index] && (
              <img src={comicImages[index]} alt={`Panel ${index + 1}`} />
            )}
          </div>
        ))}
      </div>
      <div className="grid">
        <button
          className="generate-button"
          type="button"
          onClick={generateComic}
        >
          {isLoading ? "Generating..." : "Generate Comic"}
        </button>

        <button className="generate-button" type="button" onClick={clearAll}>
          Clear All
        </button>
        <button className="generate-button" type="button" onClick={printComics}>
          Save Comic
        </button>
      </div>
    </Wrapper>
  );
};

export default Comic;
