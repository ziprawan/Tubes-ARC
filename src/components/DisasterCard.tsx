"use client";

import { Disaster } from "@/types/disaster";
import { formatLocationName } from "@/utils/locationFormatter";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { AlertTriangle, Clock, ExternalLink, Globe2, Mountain, Waves, Wind } from "lucide-react";
import { useState } from "react";
import DisasterDetailModal from "./DisasterDetailModal2";
import Portal from "./Portal";

interface DisasterCardProps {
  disaster: Disaster;
}

const getDisasterTypeLabel = (type: string) => {
  switch (type) {
    case "earthquake":
      return "Gempa Bumi";
    case "volcano":
      return "Gunung Berapi";
    case "flood":
      return "Banjir";
    case "tornadoes":
      return "Angin Puting Beliung";
    default:
      return type;
  }
};

const getDisasterIcon = (type: string) => {
  switch (type) {
    case "earthquake":
      return <Globe2 className="h-6 w-6" />;
    case "volcano":
      return <Mountain className="h-6 w-6" />;
    case "flood":
      return <Waves className="h-6 w-6" />;
    case "tornadoes":
      return <Wind className="h-6 w-6" />;
    default:
      return <AlertTriangle className="h-6 w-6" />;
  }
};

const getDisasterTheme = (type: string) => {
  switch (type) {
    case "earthquake":
      return {
        gradient: "from-emerald-50 to-green-50",
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
        titleColor: "text-emerald-700",
        border: "border-emerald-200",
        accentColor: "bg-emerald-500",
      };
    case "volcano":
      return {
        gradient: "from-orange-50 to-amber-50",
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
        titleColor: "text-orange-700",
        border: "border-orange-200",
        accentColor: "bg-orange-500",
      };
    case "flood":
      return {
        gradient: "from-blue-50 to-cyan-50",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        titleColor: "text-blue-700",
        border: "border-blue-200",
        accentColor: "bg-blue-500",
      };
    case "tornadoes":
      return {
        gradient: "from-purple-50 to-violet-50",
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        titleColor: "text-purple-700",
        border: "border-purple-200",
        accentColor: "bg-purple-500",
      };
    default:
      return {
        gradient: "from-gray-50 to-slate-50",
        iconBg: "bg-gray-100",
        iconColor: "text-gray-600",
        titleColor: "text-gray-700",
        border: "border-gray-200",
        accentColor: "bg-gray-500",
      };
  }
};

export default function DisasterCard({ disaster }: DisasterCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const timeAgo = formatDistanceToNow(new Date(disaster.incident_time), {
    addSuffix: true,
    locale: id,
  });

  const theme = getDisasterTheme(disaster.type);

  return (
    <div
      className={`relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border ${theme.border} bg-gradient-to-br ${theme.gradient} group hover:scale-[1.02]`}
    >
      <div className="relative p-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className={`flex-shrink-0 p-3 rounded-lg ${theme.iconBg} ${theme.iconColor}`}>
            {getDisasterIcon(disaster.type)}
          </div>
          <div className="flex-1 min-w-0">
            {" "}
            <div className="flex items-center space-x-2 mb-2">
              <h3 className={`text-sm font-medium ${theme.titleColor}`}>{getDisasterTypeLabel(disaster.type)}</h3>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
        {/* Lokasi */}
        <div className="mb-4">
          <h4 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
            {formatLocationName(disaster.location_name)}
          </h4>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            {new Date(disaster.incident_time).toLocaleString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>{" "}
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors px-2 py-1 rounded hover:bg-blue-50"
          >
            <span>Lihat Detail</span>
            <ExternalLink className="h-3 w-3 ml-1" />
          </button>{" "}
        </div>
      </div>
      {/* Modal - Menggunakan Portal untuk render di luar kontainer kartu */}
      <Portal>
        <DisasterDetailModal isModalOpen={isModalOpen} onModalClose={() => setIsModalOpen(false)} disasterData={disaster} />
      </Portal>
    </div>
  );
}
