"use client";

import { DisasterReport, DisasterType, disasterTypeOptions } from "@/types/disaster";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { AlertTriangle, Clock, FileText, Filter, Heart, Loader2, MapPin } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import ImageGallery from "./ImageGallery";

interface ReportCardProps {
  report: DisasterReport;
  onLikeUpdate: (reportId: string, newLikesCount: number) => void;
}

const getDisasterTypeLabel = (type: DisasterType): string => {
  const option = disasterTypeOptions.find((opt) => opt.value === type);
  return option ? option.label : type.charAt(0).toUpperCase() + type.slice(1);
};

const getDisasterColor = (type: DisasterType): string => {
  switch (type) {
    case "earthquake":
      return "bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700";
    case "volcano":
      return "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-700";
    case "flood":
      return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700";
    case "tornadoes":
      return "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600";
  }
};

function ReportCard({ report, onLikeUpdate }: ReportCardProps) {
  const [currentLikes, setCurrentLikes] = useState(report.likes);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLikedInSession, setHasLikedInSession] = useState(false);

  const timeAgo = report.created_at
    ? formatDistanceToNow(new Date(report.created_at), {
        addSuffix: true,
        locale: id,
      })
    : "Tanggal tidak tersedia";

  const handleLikeClick = async () => {
    if (isLiking || hasLikedInSession) return;
    setIsLiking(true);
    try {
      const response = await fetch(`/api/reports/${report.id}/like`, { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Gagal mengirimkan bantuan (like).");
      setCurrentLikes(data.likes);
      setHasLikedInSession(true);
      onLikeUpdate(report.id, data.likes);
    } catch (error) {
      console.error("Error saat 'membantu' laporan:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const disasterColorClasses = getDisasterColor(report.disaster_category);
  const borderColorClass =
    disasterColorClasses
      .split(" ")
      .find((cls) => cls.startsWith("border-"))
      ?.replace("border-", "border-l-") || "border-l-gray-300 dark:border-l-gray-600";

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 ${borderColorClass}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${disasterColorClasses.split(" ")[0]}`}>
            <AlertTriangle className={`h-5 w-5 ${disasterColorClasses.split(" ")[1]}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{report.title}</h3>
            <div className="flex items-center space-x-2 mt-1 flex-wrap">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${disasterColorClasses}`}>
                {getDisasterTypeLabel(report.disaster_category)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">oleh {report.author}</span>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center flex-shrink-0 ml-2">
          <Clock className="h-4 w-4 mr-1" />
          {timeAgo}
        </div>
      </div>

      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-3">
        <MapPin className="h-4 w-4 mr-1.5" />
        <span>{report.location}</span>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{report.description}</p>

      {/* Menggunakan ImageGallery */}
      {report.documentation && report.documentation.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Dokumentasi:</h4>
          <ImageGallery mediaUrls={report.documentation} reportTitle={report.title} />
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLikeClick}
            disabled={isLiking || hasLikedInSession}
            className={`flex items-center space-x-1 text-gray-500 dark:text-gray-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
              hasLikedInSession ? "text-red-500 dark:text-red-400" : "hover:text-red-500 dark:hover:text-red-400"
            }`}
            title={hasLikedInSession ? "Anda sudah membantu" : "Bantu laporan ini"}
          >
            <Heart className={`h-4 w-4 ${hasLikedInSession ? "fill-current" : ""}`} />
            <span className="text-sm">Bantu</span>
            <span className="text-sm font-medium ml-0.5">({currentLikes})</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const ReportCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-l-gray-300 dark:border-l-gray-600 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div>
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 sm:w-48 mb-2"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2 sm:w-32"></div>
      </div>
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3 sm:w-20"></div>
    </div>
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 sm:w-40 mb-3"></div>
    <div className="space-y-2 mb-4">
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
    </div>
    <div className="flex space-x-2 mb-4">
      <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
    </div>
    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
      <div className="flex space-x-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
      </div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-14"></div>
    </div>
  </div>
);

export default function ReportsTimeline() {
  const [allReports, setAllReports] = useState<DisasterReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<DisasterReport[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<DisasterType | "all">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (currentFilter: DisasterType | "all" = selectedFilter) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/reports");
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: "Respons error tidak valid" }));
          throw new Error(errorData.message || `Gagal mengambil data laporan: ${response.statusText}`);
        }
        const data: DisasterReport[] = await response.json();
        setAllReports(data);
        if (currentFilter === "all") {
          setFilteredReports(data);
        } else {
          setFilteredReports(data.filter((report) => report.disaster_category === currentFilter));
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan saat mengambil laporan.";
        setError(errorMessage);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedFilter]
  );

  useEffect(() => {
    fetchData(selectedFilter);
    const handleNewReport = () => {
      console.log("Event 'reportSubmitted' diterima, mengambil ulang data...");
      fetchData(selectedFilter);
    };
    window.addEventListener("reportSubmitted", handleNewReport);
    return () => {
      window.removeEventListener("reportSubmitted", handleNewReport);
    };
  }, [fetchData, selectedFilter]);

  const handleLikeUpdateInTimeline = (reportId: string, newLikesCount: number) => {
    const updateReports = (reports: DisasterReport[]) =>
      reports.map((report) => (report.id === reportId ? { ...report, likes: newLikesCount } : report));

    setAllReports((prevAllReports) => {
      const updatedAll = updateReports(prevAllReports);
      if (selectedFilter === "all") {
        setFilteredReports(updatedAll);
      } else {
        setFilteredReports(updatedAll.filter((r) => r.disaster_category === selectedFilter));
      }
      return updatedAll;
    });
  };

  const handleFilter = (type: DisasterType | "all") => {
    setSelectedFilter(type);
    if (type === "all") {
      setFilteredReports(allReports);
    } else {
      setFilteredReports(allReports.filter((report) => report.disaster_category === type));
    }
  };

  const filterOptionsForTimeline: { value: DisasterType | "all"; label: string }[] = [
    { value: "all", label: "Semua Laporan" },
    ...disasterTypeOptions.map((opt) => ({ value: opt.value, label: opt.label })),
  ];

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filter Laporan
          </h2>
          {isLoading && <Loader2 className="h-5 w-5 animate-spin text-gray-500" />}
        </div>
        <div className="flex flex-wrap gap-2">
          {filterOptionsForTimeline.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilter(option.value as DisasterType | "all")}
              disabled={isLoading}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors disabled:opacity-50 ${
                selectedFilter === option.value
                  ? "bg-[#009E60] text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading && !allReports.length ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <ReportCardSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700 p-6 rounded-md shadow-md text-center">
          <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
          <p className="font-semibold">Gagal memuat laporan:</p>
          <p className="text-sm mb-3">{error}</p>
          <button
            onClick={() => fetchData(selectedFilter)}
            disabled={isLoading}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm disabled:opacity-50 flex items-center justify-center mx-auto"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Coba Lagi
          </button>
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
          <FileText className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Tidak ada laporan</h3>
          <p className="text-gray-500 dark:text-gray-400">
            {selectedFilter === "all"
              ? "Belum ada laporan yang masuk."
              : `Belum ada laporan untuk kategori "${getDisasterTypeLabel(selectedFilter as DisasterType)}".`}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredReports.map((report) => (
            <ReportCard key={report.id} report={report} onLikeUpdate={handleLikeUpdateInTimeline} />
          ))}
        </div>
      )}
    </div>
  );
}
