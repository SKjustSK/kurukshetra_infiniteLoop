"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Camera, Clock, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { TargetLocation } from "@/types/interfaces";

interface LocationCardProps extends TargetLocation {
  imageUrl?: string;
}

export default function LocationCard({
  location_name,
  cctv_id,
  coordinates,
  timestamp,
  confidence = 0,
  imageUrl,
}: LocationCardProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(confidence * 100), 500);
    return () => clearTimeout(timer);
  }, [confidence]);

  const formattedTime = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(timestamp);

  const getConfidenceColor = () => {
    if (confidence >= 0.8) return "text-green-500";
    if (confidence >= 0.6) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <Card className="w-full max-w-sm shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="space-y-2">
        <div className="bg-muted rounded-md p-2 border-l-4 border-primary">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            <div className="font-medium text-sm truncate" title={location_name}>
              {location_name}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-1.5">
            <Camera className="h-3.5 w-3.5 text-muted-foreground" />
            <Badge variant="outline" className="font-mono text-xs">
              {cctv_id}
            </Badge>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <div className="text-muted-foreground">{formattedTime}</div>
          </div>
        </div>

        {imageUrl && (
          <div className="relative w-full h-28 overflow-hidden rounded-md bg-muted">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="Detection snapshot"
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="space-y-0.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Confidence</span>
            <span className={`font-bold ${getConfidenceColor()}`}>
              {confidence * 100}%
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </CardContent>
    </Card>
  );
}
