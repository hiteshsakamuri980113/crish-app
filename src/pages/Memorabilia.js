import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BlobServiceClient } from "@azure/storage-blob";
import { CircularProgress, Typography } from "@mui/material";
import "./Memorabilia.css";

const Memorabilia = () => {
  const { imageName } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [textContent, setTextContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageAndText = async () => {
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

        // Fetch image URL
        const imageBlobClient = containerClient.getBlobClient(imageName);
        setImageUrl(imageBlobClient.url);
        console.log(`Image URL: ${imageBlobClient.url}`);

        // Fetch text content
        const textBlobClient = containerClient.getBlobClient(
          imageName.replace(/\.(jpg|jpeg|png|gif)$/i, ".txt")
        );
        const downloadBlockBlobResponse = await textBlobClient.download();
        const blob = await downloadBlockBlobResponse.blobBody;
        const text = await blob.text();
        setTextContent(text);
        console.log(`Text content: ${text}`);
      } catch (error) {
        setError(error.message);
        console.error(`Error fetching image or text: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchImageAndText();
  }, [imageName]);

  if (loading) {
    return (
      <div className="loading">
        <CircularProgress />
        <Typography variant="h6">Loading content...</Typography>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="memorabilia">
      <img src={imageUrl} alt={imageName} className="full-screen-image" />
      <div className="text-overlay">
        <Typography variant="h6">{textContent}</Typography>
      </div>
    </div>
  );
};

export default Memorabilia;
