"use client";

import React, { useState, useRef } from "react";
import { TargetLocation } from "@/types/interfaces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus } from "lucide-react";
import { example_target_found_at_1 } from "@/app/target_detection/example_target_found_at";

interface UploadTargetImageContainerProps {
  setTargetFoundAt: (locations: TargetLocation[]) => void;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_COLLAB_PUBLIC_URL;

export default function UploadTargetImageContainer({
  setTargetFoundAt,
}: UploadTargetImageContainerProps) {
  const [targetImage, setTargetImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTargetImageDisplayContainer = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Cleanup existing object URL before setting a new one
    if (targetImage) {
      URL.revokeObjectURL(targetImage);
    }

    const imageUrl = URL.createObjectURL(file);
    setTargetImage(imageUrl);
    setSelectedFile(file);
  };

  const handleTargetImageUpload = async () => {
    // if (!selectedFile) return;

    // const formData = new FormData();
    // formData.append("image_file", selectedFile);

    try {
      // const response = await fetch(`${BACKEND_URL}/photo-predict`, {
      //   method: "POST",
      //   body: formData,
      // });

      // if (!response.ok) {
      //   throw new Error(`Failed to upload image: ${response.statusText}`);
      // }

      // const data = await response.json();
      // console.log("Data fetched:", data);

      // // Reset UI and cleanup object URL
      // setTargetImage(null);
      // setSelectedFile(null);
      // if (fileInputRef.current) {
      //   fileInputRef.current.value = "";
      // }

      // const response_target_found_at: TargetLocation[] = data.metadata.map(
      //   (entry: any) => ({
      //     cctv_id: String(entry.camera_id),
      //     location_name: entry.location,
      //     coordinates: {
      //       lat: entry.latlong[0],
      //       lng: entry.latlong[1],
      //     },
      //     timestamp: new Date(entry.timestamp),
      //     ...(entry.confidence !== undefined && {
      //       confidence: entry.confidence,
      //     }),
      //   })
      // );

      // setTargetFoundAt(response_target_found_at || example_target_found_at_1);

      await new Promise((resolve) => setTimeout(resolve, 3000));
      setTargetFoundAt(example_target_found_at_1);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="w-full max-w-sm p-4 bg-white shadow-lg rounded-lg flex flex-col gap-3">
      <div className="pb-3 border-b rounded-t-lg">
        <h2 className="text-2xl font-semibold">Upload Target's Image</h2>
      </div>

      <div className="w-full aspect-video border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg p-3 bg-gray-50">
        {targetImage ? (
          <img
            src={targetImage}
            className="max-h-full max-w-full object-contain rounded-lg"
            alt="Target Preview"
          />
        ) : (
          <ImagePlus className="w-12 h-12 text-gray-400" />
        )}
      </div>

      <Input
        ref={fileInputRef}
        id="targetImage"
        type="file"
        accept="image/*"
        onChange={handleTargetImageDisplayContainer}
        className="pt-2"
      />

      <Button onClick={handleTargetImageUpload} disabled={!selectedFile}>
        Upload Target
      </Button>
    </div>
  );
}
