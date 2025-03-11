import React, { useEffect, useState } from "react";
import { BlobServiceClient } from "@azure/storage-blob";
import { CircularProgress, Typography } from "@mui/material";
import "./Home.css";

const Home = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const accountName = "crishstorage";
      const containerName = "memorabilia";
      const sasToken =
        "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-03-12T04:15:30Z&st=2025-03-11T20:15:30Z&spr=https&sig=R1K6RiKczUeU6H38JHO%2Fa9BuI7t95RTXBkS1yf6zdPM%3D"; // Replace with your new SAS token

      try {
        const blobServiceClient = new BlobServiceClient(
          `https://${accountName}.blob.core.windows.net?${sasToken}`
        );
        const containerClient =
          blobServiceClient.getContainerClient(containerName);

        const imageUrls = [];
        for await (const blob of containerClient.listBlobsFlat()) {
          const blobClient = containerClient.getBlobClient(blob.name);
          imageUrls.push(blobClient.url);
        }

        setImageUrls(imageUrls);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImageUrls();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <CircularProgress />
        <Typography variant="h6">Loading images...</Typography>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home">
      <Typography variant="h4" gutterBottom>
        Indian Cricket's Memorabilia
      </Typography>
      <div className="gallery">
        {imageUrls.map((url, index) => (
          <div key={index} className="image-container">
            <img
              src={url}
              alt={`Cricket Memorabilia ${index + 1}`}
              className="gallery-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
