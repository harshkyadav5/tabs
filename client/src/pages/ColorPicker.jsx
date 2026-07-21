import React, { useState, useEffect } from "react";
import ColorCard from "../components/ColorCard";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useArchiveTrash } from "../context/ArchiveTrashContext";
import {
  getSavedColors,
  createSavedColor,
  updateSavedColor,
  deleteSavedColor,
} from "../services/colorService";
import { archiveItem } from "../services/archiveService";
import { PlusIcon } from "../components/icons";

const addColorIcon = <PlusIcon />;

const LOCAL_COLORS_KEY = "saved_colors";

const readLocal = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_COLORS_KEY)) || [];
  } catch {
    return [];
  }
};

const hexToRgb = (hex) => {
  const value = parseInt(hex.slice(1), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgb(${r},${g},${b})`;
};

const EMPTY_FORM = { hex: "#4ECDC4", label: "" };

const HEX_REGEX = /^#[0-9A-Fa-f]{6}$/;

const PRESET_COLORS = [
  "#FF6B6B",
  "#FFA94D",
  "#FFD43B",
  "#69DB7C",
  "#4ECDC4",
  "#4DABF7",
  "#748FFC",
  "#DA77F2",
  "#F783AC",
  "#495057",
];

export default function ColorPicker() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { refreshArchive } = useArchiveTrash();
  const isLoggedIn = !!user;

  const [savedColors, setSavedColors] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const isValidHex = HEX_REGEX.test(form.hex);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        try {
          const data = await getSavedColors({ is_archived: false });
          setSavedColors(data || []);
        } catch (err) {
          showToast(err.message || "Failed to load saved colors", "error");
        }
      } else {
        setSavedColors(readLocal().filter((c) => !c.is_archived));
      }
    };
    fetchData();
  }, [isLoggedIn]);

  const openAddModal = () => {
    setForm(EMPTY_FORM);
    setShowAddModal(true);
  };

  const handleSaveColor = async () => {
    setSubmitting(true);
    try {
      const rgb_code = hexToRgb(form.hex);
      if (isLoggedIn) {
        const created = await createSavedColor({
          hex_code: form.hex,
          rgb_code,
          label: form.label.trim() || null,
        });
        setSavedColors((prev) => [created, ...prev]);
      } else {
        const all = readLocal();
        const newColor = {
          id: Date.now(),
          hex_code: form.hex,
          rgb_code,
          label: form.label.trim() || null,
          is_archived: false,
          created_at: new Date().toISOString(),
          modified_at: new Date().toISOString(),
        };
        localStorage.setItem(LOCAL_COLORS_KEY, JSON.stringify([newColor, ...all]));
        setSavedColors((prev) => [newColor, ...prev]);
      }
      setShowAddModal(false);
      showToast("Color saved", "success");
    } catch (err) {
      showToast(err.message || "Failed to save color", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (isLoggedIn) {
        await deleteSavedColor(id);
      } else {
        const all = readLocal().filter((c) => c.id !== id);
        localStorage.setItem(LOCAL_COLORS_KEY, JSON.stringify(all));
      }
      setSavedColors((prev) => prev.filter((c) => c.id !== id));
      showToast("Color deleted", "success");
    } catch (err) {
      showToast(err.message || "Failed to delete color", "error");
    }
  };

  const handleSaveLabel = async (id, label) => {
    try {
      if (isLoggedIn) {
        const updated = await updateSavedColor(id, { label });
        setSavedColors((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      } else {
        const all = readLocal().map((c) => (c.id === id ? { ...c, label } : c));
        localStorage.setItem(LOCAL_COLORS_KEY, JSON.stringify(all));
        setSavedColors((prev) => prev.map((c) => (c.id === id ? { ...c, label } : c)));
      }
    } catch (err) {
      showToast(err.message || "Failed to update label", "error");
    }
  };

  const handleArchive = async (id) => {
    try {
      if (isLoggedIn) {
        await archiveItem("color", id);
        await refreshArchive();
      } else {
        const all = readLocal().map((c) => (c.id === id ? { ...c, is_archived: true } : c));
        localStorage.setItem(LOCAL_COLORS_KEY, JSON.stringify(all));
      }
      setSavedColors((prev) => prev.filter((c) => c.id !== id));
      showToast("Color archived", "success");
    } catch (err) {
      showToast(err.message || "Failed to archive color", "error");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Saved Colors</h1>
        <button
          onClick={openAddModal}
          aria-label="Add color"
          className="p-2 border border-gray-300 hover:bg-black/85 text-gray-800 hover:text-white rounded-full transition duration-200"
        >
          {addColorIcon}
        </button>
      </div>

      {savedColors.length === 0 ? (
        <div className="text-gray-500">No saved colors yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {savedColors.map((color) => (
            <ColorCard
              key={color.id}
              color={color}
              onDelete={handleDelete}
              onSaveLabel={handleSaveLabel}
              onArchive={handleArchive}
            />
          ))}
        </div>
      )}

      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Color"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button loading={submitting} disabled={!isValidHex} onClick={handleSaveColor}>
              Save Color
            </Button>
          </>
        }
      >
        <div
          className="w-full h-24 rounded-card border border-gray-200 mb-3 transition-colors"
          style={{ backgroundColor: isValidHex ? form.hex : "#f3f4f6" }}
        />

        <div className="flex items-center gap-3 mb-1">
          <label className="relative shrink-0 cursor-pointer">
            <input
              type="color"
              value={isValidHex ? form.hex : "#000000"}
              onChange={(e) => setForm({ ...form, hex: e.target.value })}
              aria-label="Pick a color"
              className="absolute inset-0 w-11 h-11 opacity-0 cursor-pointer"
            />
            <span
              className="block w-11 h-11 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-300"
              style={{ backgroundColor: isValidHex ? form.hex : "#f3f4f6" }}
            />
          </label>
          <div className="flex-1">
            <input
              value={form.hex}
              onChange={(e) => setForm({ ...form, hex: e.target.value })}
              placeholder="#RRGGBB"
              className={`w-full px-3 py-2.5 font-mono text-sm rounded-btn border bg-white outline-none focus:ring-2 focus:ring-primary ${
                isValidHex ? "border-gray-300" : "border-danger"
              }`}
            />
          </div>
        </div>
        <p className={`text-xs mt-1 mb-4 ${isValidHex ? "font-mono text-gray-500" : "text-danger"}`}>
          {isValidHex ? hexToRgb(form.hex) : "Enter a valid hex code, e.g. #4ECDC4"}
        </p>

        <p className="text-xs font-medium text-gray-500 mb-2">Quick picks</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {PRESET_COLORS.map((hex) => (
            <button
              key={hex}
              type="button"
              onClick={() => setForm((f) => ({ ...f, hex }))}
              aria-label={`Use ${hex}`}
              className={`w-7 h-7 rounded-full ring-1 ring-gray-300 shadow-sm transition ${
                form.hex.toLowerCase() === hex.toLowerCase()
                  ? "ring-2 ring-offset-2 ring-primary"
                  : ""
              }`}
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>

        <Input
          label="Label"
          type="text"
          placeholder="Optional label"
          value={form.label}
          onChange={(e) => setForm({ ...form, label: e.target.value })}
        />
      </Modal>
    </div>
  );
}
