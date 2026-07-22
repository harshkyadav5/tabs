import React, { useState, useEffect } from "react";
import ScreenshotGridItem from "../components/ScreenshotGridItem";
import ScreenshotViewer from "./ScreenshotViewer";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  getScreenshots,
  createScreenshot,
  deleteScreenshot,
  toggleFavorite,
} from "../services/screenshotService";
import { PlusIcon } from "../components/icons";

const addScreenshotIcon = <PlusIcon />;

const LOCAL_SCREENSHOTS_KEY = "screenshots";

const readLocal = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_SCREENSHOTS_KEY)) || [];
  } catch {
    return [];
  }
};

const EMPTY_FORM = { web_url: "", image_url: "" };

export default function ScreenshotGallery() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const isLoggedIn = !!user;

  const [objectFit, setObjectFit] = useState("contain");
  const [screenshots, setScreenshots] = useState([]);
  const [activeImageId, setActiveImageId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const activeIndex = screenshots.findIndex((s) => s.id === activeImageId);
  const activeImage = activeIndex >= 0 ? screenshots[activeIndex] : null;

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        try {
          const data = await getScreenshots({ is_deleted: false });
          setScreenshots(data || []);
        } catch (err) {
          showToast(err.message || "Failed to load screenshots", "error");
        }
      } else {
        setScreenshots(readLocal().filter((s) => !s.is_deleted));
      }
    };
    fetchData();
  }, [isLoggedIn]);

  const toggleFit = () => {
    setObjectFit((prev) => (prev === "contain" ? "cover" : "contain"));
  };

  const openAddModal = () => {
    setForm(EMPTY_FORM);
    setFormError("");
    setShowAddModal(true);
  };

  const handleAddScreenshot = async () => {
    if (!form.web_url.trim() || !form.image_url.trim()) {
      setFormError("Both fields are required");
      return;
    }
    setSubmitting(true);
    try {
      if (isLoggedIn) {
        const created = await createScreenshot({
          web_url: form.web_url.trim(),
          image_url: form.image_url.trim(),
        });
        setScreenshots((prev) => [created, ...prev]);
      } else {
        const all = readLocal();
        const newShot = {
          id: Date.now(),
          web_url: form.web_url.trim(),
          image_url: form.image_url.trim(),
          is_deleted: false,
          is_favorite: false,
          created_at: new Date().toISOString(),
          modified_at: new Date().toISOString(),
        };
        localStorage.setItem(LOCAL_SCREENSHOTS_KEY, JSON.stringify([newShot, ...all]));
        setScreenshots((prev) => [newShot, ...prev]);
      }
      setShowAddModal(false);
      showToast("Screenshot added", "success");
    } catch (err) {
      showToast(err.message || "Failed to add screenshot", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      if (isLoggedIn) {
        const updated = await toggleFavorite(id);
        setScreenshots((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      } else {
        const all = readLocal().map((s) =>
          s.id === id ? { ...s, is_favorite: !s.is_favorite } : s
        );
        localStorage.setItem(LOCAL_SCREENSHOTS_KEY, JSON.stringify(all));
        setScreenshots((prev) =>
          prev.map((s) => (s.id === id ? { ...s, is_favorite: !s.is_favorite } : s))
        );
      }
    } catch (err) {
      showToast(err.message || "Failed to update favorite", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (isLoggedIn) {
        await deleteScreenshot(id);
      } else {
        const all = readLocal().map((s) => (s.id === id ? { ...s, is_deleted: true } : s));
        localStorage.setItem(LOCAL_SCREENSHOTS_KEY, JSON.stringify(all));
      }
      setScreenshots((prev) => prev.filter((s) => s.id !== id));
      setActiveImageId(null);
      showToast("Screenshot deleted", "success");
    } catch (err) {
      showToast(err.message || "Failed to delete screenshot", "error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {activeImage ? (
        <ScreenshotViewer
          image={activeImage}
          index={activeIndex + 1}
          total={screenshots.length}
          onBack={() => setActiveImageId(null)}
          onToggleFavorite={() => handleToggleFavorite(activeImage.id)}
          onDelete={() => handleDelete(activeImage.id)}
        />
      ) : (
        <>
          {/* Header + toggle */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Screenshots</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFit}
                className="px-4 py-1 text-sm rounded-btn bg-gray-200 hover:bg-gray-300"
              >
                Switch to {objectFit === "contain" ? "Cover" : "Contain"}
              </button>
              <button
                onClick={openAddModal}
                aria-label="Add screenshot"
                className="p-2 border border-gray-300 hover:bg-black/85 text-gray-800 hover:text-white rounded-full transition duration-200"
              >
                {addScreenshotIcon}
              </button>
            </div>
          </div>

          {screenshots.length === 0 ? (
            <div className="text-gray-500">No screenshots yet.</div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {screenshots.map((screenshot) => (
                <ScreenshotGridItem
                  key={screenshot.id}
                  screenshot={screenshot}
                  objectFit={objectFit}
                  onClick={() => setActiveImageId(screenshot.id)}
                />
              ))}
            </div>
          )}
        </>
      )}

      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Screenshot"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button loading={submitting} onClick={handleAddScreenshot}>
              Add Screenshot
            </Button>
          </>
        }
      >
        <Input
          label="Web URL"
          type="url"
          placeholder="https://example.com"
          value={form.web_url}
          onChange={(e) => {
            setForm({ ...form, web_url: e.target.value });
            setFormError("");
          }}
          error={formError && !form.web_url.trim() ? formError : undefined}
        />
        <Input
          label="Image URL"
          type="url"
          placeholder="https://example.com/screenshot.png"
          value={form.image_url}
          onChange={(e) => {
            setForm({ ...form, image_url: e.target.value });
            setFormError("");
          }}
          error={formError && !form.image_url.trim() ? formError : undefined}
        />
      </Modal>
    </div>
  );
}
