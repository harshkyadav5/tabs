import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import axiosInstance from "../utils/axiosInstance";
import { searchLocal } from "../utils/localSearch";
import SearchBar from "../components/SearchBar";
import Card from "../components/ui/Card";

const CATEGORY_LABELS = {
  bookmarks: "Bookmarks",
  notes: "Notes",
  clipboard: "Clipboard",
  screenshots: "Screenshots",
  colors: "Colors",
  music: "Music",
};

const CATEGORY_ROUTES = {
  bookmarks: "/bookmarks",
  notes: "/notes",
  clipboard: "/clipboard",
  screenshots: "/screenshot",
  colors: "/color-picker",
  music: "/music",
};

const itemTitle = (category, item) => {
  switch (category) {
    case "bookmarks":
      return item.title || item.url;
    case "notes":
      return item.title;
    case "clipboard":
      return item.description || "Untitled";
    case "screenshots":
      return item.web_url;
    case "colors":
      return item.label || item.hex_code;
    case "music":
      return item.track_name;
    default:
      return "";
  }
};

const itemSubtitle = (category, item) => {
  switch (category) {
    case "bookmarks":
      return item.url;
    case "notes":
      return item.content;
    case "clipboard":
      return item.content;
    case "screenshots":
      return item.image_url;
    case "colors":
      return `${item.hex_code} · ${item.rgb_code}`;
    case "music":
      return item.artist;
    default:
      return "";
  }
};

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const isLoggedIn = !!user;

  const query = searchParams.get("q") || "";
  const filtersParam = searchParams.get("filters") || "";
  const filters = filtersParam ? filtersParam.split(",") : [];

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setData(null);
      return;
    }

    const run = async () => {
      setLoading(true);
      try {
        if (isLoggedIn) {
          const res = await axiosInstance.post("/search", { query, filters, limit: 50 });
          setData(res.data);
        } else {
          setData(searchLocal(query, filters));
        }
      } catch (err) {
        showToast(err.response?.data?.error || "Search failed", "error");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [query, filtersParam, isLoggedIn]);

  const goTo = (category, id) => navigate(`${CATEGORY_ROUTES[category]}?open=${id}`);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Search</h1>

      <SearchBar className="mb-8 max-w-xl" placeholder="Search everything..." />

      {!query.trim() ? (
        <div className="text-gray-500 max-w-xl">
          Type something to search across your bookmarks, notes, clipboard, screenshots, colors, and music.
        </div>
      ) : loading ? (
        <div className="text-gray-500">Searching…</div>
      ) : !data || data.total === 0 ? (
        <div className="text-gray-500">No results for "{query}".</div>
      ) : (
        <div className="space-y-10">
          {Object.entries(data.results).map(([category, items]) => {
            if (!items || items.length === 0) return null;
            return (
              <section key={category}>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  {CATEGORY_LABELS[category]}{" "}
                  <span className="text-gray-400 font-normal">({items.length})</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item) => (
                    <Card
                      key={item.id}
                      className="cursor-pointer"
                      onClick={() => goTo(category, item.id)}
                    >
                      {category === "colors" && (
                        <div
                          className="w-full h-12 rounded-card mb-3 border border-gray-200"
                          style={{ backgroundColor: item.hex_code }}
                        />
                      )}
                      <h3 className="text-base font-medium text-gray-900 truncate mb-1">
                        {itemTitle(category, item) || "Untitled"}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {itemSubtitle(category, item)}
                      </p>
                    </Card>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
