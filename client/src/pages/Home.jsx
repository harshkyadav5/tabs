import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { buildLocalSuggestions } from "../utils/suggestionsLocal";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import {
  BookmarksNavIcon,
  NotesNavIcon,
  ClipboardNavIcon,
  ScreenshotNavIcon,
  ColorPickerNavIcon,
  MusicNavIcon,
  SmartHomeIcon,
} from "../components/icons";

const Icons = {
  Bookmarks: <BookmarksNavIcon className="w-5 h-5 text-indigo-500" />,
  Notes: <NotesNavIcon className="w-5 h-5 text-yellow-500" />,
  Clipboard: <ClipboardNavIcon className="w-5 h-5 text-green-500" />,
  Screenshots: <ScreenshotNavIcon className="w-5 h-5 text-pink-500" />,
  Colors: <ColorPickerNavIcon className="w-5 h-5 text-purple-500" />,
  Music: <MusicNavIcon className="w-5 h-5 text-red-500" />,
  Smart: <SmartHomeIcon />,
};

export default function Home() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        if (token) {
          const res = await axios.get("/api/suggestions", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (mounted) setData(res.data);
        } else {
          const local = buildLocalSuggestions();
          if (mounted) setData(local);
        }
      } catch (e) {
        console.error("Suggestions error:", e);
        const local = buildLocalSuggestions();
        if (mounted) setData(local);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, [token]);

  const goToBookmark = (id) => navigate(`/bookmarks?open=${id}`);
  const goToNote = (id) => navigate(`/notes?open=${id}`);
  const goToClipboard = (id) => navigate(`/clipboard?open=${id}`);
  const goToScreenshot = (id) => navigate(`/screenshots?open=${id}`);
  const goToColors = () => navigate(`/colors`);
  const goToMusic = (id) => navigate(`/music?open=${id}`);

  const SuggestionCard = ({ title, desc, onClick }) => (
    <Card>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{desc}</p>
      <Button variant="secondary" onClick={onClick}>
        View
      </Button>
    </Card>
  );

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">For You</h1>
        <p className="text-gray-500">Loading your suggestions…</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">For You</h1>
        <p className="text-gray-500">No suggestions yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">For You</h1>
      <p className="text-gray-500 mb-8">
        Personalized suggestions powered by AI
      </p>

      {/* BOOKMARKS */}
      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-gray-800">
          {Icons.Bookmarks} Bookmarks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.bookmarks?.mostVisited && (
            <SuggestionCard
              title="Most visited bookmark"
              desc={`${data.bookmarks.mostVisited.title || "Untitled"} — ${data.bookmarks.mostVisited.view_count ?? 0} views`}
              onClick={() => goToBookmark(data.bookmarks.mostVisited.id)}
            />
          )}
          {data.bookmarks?.savedButUnopened && (
            <SuggestionCard
              title="Saved but unopened"
              desc={data.bookmarks.savedButUnopened.title || data.bookmarks.savedButUnopened.url}
              onClick={() => goToBookmark(data.bookmarks.savedButUnopened.id)}
            />
          )}
          {!data.bookmarks?.mostVisited && !data.bookmarks?.savedButUnopened && (
            <SuggestionCard title="No bookmarks yet" desc="Start saving links to see suggestions here." onClick={() => navigate("/bookmarks")}/>
          )}
        </div>
      </section>

      {/* NOTES */}
      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-gray-800">
          {Icons.Notes} Notes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.notes?.recent && (
            <SuggestionCard
              title="Continue recent note"
              desc={data.notes.recent.title}
              onClick={() => goToNote(data.notes.recent.id)}
            />
          )}
          {data.notes?.todo && (
            <SuggestionCard
              title="Notes tagged #todo"
              desc={data.notes.todo.title}
              onClick={() => goToNote(data.notes.todo.id)}
            />
          )}
          {!data.notes?.recent && !data.notes?.todo && (
            <SuggestionCard title="No notes yet" desc="Create your first note to get suggestions." onClick={() => navigate("/notes")}/>
          )}
        </div>
      </section>

      {/* CLIPBOARD */}
      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-gray-800">
          {Icons.Clipboard} Clipboard
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.clipboard?.pinned && (
            <SuggestionCard
              title="Pinned clipboard"
              desc={data.clipboard.pinned.description || data.clipboard.pinned.preview}
              onClick={() => goToClipboard(data.clipboard.pinned.id)}
            />
          )}
          {data.clipboard?.recent && (
            <SuggestionCard
              title="Most recent snippet"
              desc={data.clipboard.recent.description || data.clipboard.recent.preview}
              onClick={() => goToClipboard(data.clipboard.recent.id)}
            />
          )}
          {!data.clipboard?.pinned && !data.clipboard?.recent && (
            <SuggestionCard title="No snippets yet" desc="Copy something to your Clipboard to see it here." onClick={() => navigate("/clipboard")}/>
          )}
        </div>
      </section>

      {/* SCREENSHOTS */}
      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-gray-800">
          {Icons.Screenshots} Screenshots
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.screenshots?.favorite && (
            <SuggestionCard
              title="Favorite screenshot"
              desc={data.screenshots.favorite.web_url}
              onClick={() => goToScreenshot(data.screenshots.favorite.id)}
            />
          )}
          {data.screenshots?.recent && (
            <SuggestionCard
              title="Latest screenshot"
              desc={data.screenshots.recent.web_url}
              onClick={() => goToScreenshot(data.screenshots.recent.id)}
            />
          )}
          {!data.screenshots?.favorite && !data.screenshots?.recent && (
            <SuggestionCard title="No screenshots yet" desc="Capture a webpage to see it here." onClick={() => navigate("/screenshots")}/>
          )}
        </div>
      </section>

      {/* COLORS */}
      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-gray-800">
          {Icons.Colors} Colors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.colors?.latest ? (
            <Card>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Latest color</h3>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-full border"
                  style={{ background: data.colors.latest.hex_code }}
                  title={data.colors.latest.hex_code}
                />
                <div className="text-sm text-gray-600">
                  <div>{data.colors.latest.label || "Untitled"}</div>
                  <div>{data.colors.latest.hex_code} • {data.colors.latest.rgb_code}</div>
                </div>
              </div>
              <Button variant="secondary" onClick={() => goToColors()}>
                View
              </Button>
            </Card>
          ) : (
            <SuggestionCard title="No colors yet" desc="Save a color to see it here." onClick={goToColors}/>
          )}
        </div>
      </section>

      {/* MUSIC */}
      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-gray-800">
          {Icons.Music} Music
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.music?.favorite && (
            <SuggestionCard
              title="Favorite track"
              desc={`${data.music.favorite.track_name} — ${data.music.favorite.artist || "Unknown"}`}
              onClick={() => goToMusic(data.music.favorite.id)}
            />
          )}
          {data.music?.recent && (
            <SuggestionCard
              title="Recently added"
              desc={`${data.music.recent.track_name} — ${data.music.recent.artist || "Unknown"}`}
              onClick={() => goToMusic(data.music.recent.id)}
            />
          )}
          {!data.music?.favorite && !data.music?.recent && (
            <SuggestionCard title="No tracks yet" desc="Add a track to see suggestions here." onClick={() => navigate("/music")}/>
          )}
        </div>
      </section>

      {/* SMART PICKS */}
      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-gray-800">
          {Icons.Smart} Smart Picks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(data.notes?.recent && data.bookmarks?.mostVisited) ? (
            <SuggestionCard
              title="Note + Bookmark connection"
              desc={`Your note "${data.notes.recent.title}" pairs with "${data.bookmarks.mostVisited.title}"`}
              onClick={() => { goToNote(data.notes.recent.id); }}
            />
          ) : (
            <SuggestionCard
              title="No smart picks yet"
              desc="As you create more content, we’ll surface cross-feature links here."
              onClick={() => navigate("/notes")}
            />
          )}
        </div>
      </section>
    </div>
  );
}
