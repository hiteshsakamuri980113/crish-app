import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlobServiceClient } from "@azure/storage-blob";
import { CircularProgress, Typography } from "@mui/material";
import "./Home.css";

const Home = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImageUrls = async () => {
      const accountName = "crishstorage";
      const containerName = "memorabilia";
      const sasToken =
        "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-03-13T00:53:39Z&st=2025-03-12T16:53:39Z&spr=https&sig=yDbF56%2BrUoSEwCYWyZ4eRE5UhLOnkoD8c8qG%2BnPWtO8%3D"; // Replace with your new SAS token

      try {
        const blobServiceClient = new BlobServiceClient(
          `https://${accountName}.blob.core.windows.net?${sasToken}`
        );
        const containerClient =
          blobServiceClient.getContainerClient(containerName);

        const imageUrls = [];
        for await (const blob of containerClient.listBlobsFlat()) {
          // Filter only image files based on their extensions
          if (/\.(jpg|jpeg|png|gif)$/i.test(blob.name)) {
            const blobClient = containerClient.getBlobClient(blob.name);
            imageUrls.push({ name: blob.name, url: blobClient.url });
          }
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
        {imageUrls.map((image, index) => (
          <div
            key={index}
            className="image-container"
            onClick={() => navigate(`/memorabilia/${image.name}`)}
          >
            <img
              src={image.url}
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
