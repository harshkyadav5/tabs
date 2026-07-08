import React, { useEffect, useState, useContext, use } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { buildLocalSuggestions } from "../utils/suggestionsLocal";

const Icons = {
  Bookmarks: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5v14l7-5 7 5V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"/>
    </svg>
  ),
  Notes: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z"/>
    </svg>
  ),
  Clipboard: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5h6M9 3h6a2 2 0 012 2v14a2 2 0 01-2 2H9a2 2 0 01-2-2V5a2 2 0 012-2z"/>
    </svg>
  ),
  Screenshots: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16M8 4v16m8-16v16"/>
    </svg>
  ),
  Colors: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="9" strokeWidth="2"/>
    </svg>
  ),
  Music: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-2v13"/>
    </svg>
  ),
  Smart: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8a2 2 0 00-1 3.73V15h2v-3.27A2 2 0 0012 8z"/>
    </svg>
  ),
};

const CARD_GRADIENTS = {
  indigo: "from-indigo-500 to-purple-500",
  purple: "from-purple-500 to-purple-500",
  pink: "from-pink-500 to-purple-500",
};

export default function Home() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
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

  // Card builder: title, desc, action
  const Card = ({ title, desc, onClick, hoverColor="indigo" }) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{desc}</p>
      <button
        onClick={onClick}
        className={`px-4 py-1.5 text-sm rounded-xl bg-gradient-to-r ${CARD_GRADIENTS[hoverColor] || CARD_GRADIENTS.indigo} text-white font-medium hover:opacity-90 transition`}
      >
        View
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <p className="text-gray-600 text-center">Loading your suggestions…</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <p className="text-gray-600 text-center">No suggestions yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <p className="text-gray-600 mb-10 text-lg text-center">
        Personalized suggestions powered by AI
      </p>

      {/* BOOKMARKS */}
      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-gray-800">
          {Icons.Bookmarks} Bookmarks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.bookmarks?.mostVisited && (
            <Card
              title="Most visited bookmark"
              desc={`${data.bookmarks.mostVisited.title || "Untitled"} — ${data.bookmarks.mostVisited.view_count ?? 0} views`}
              onClick={() => goToBookmark(data.bookmarks.mostVisited.id)}
              hoverColor="indigo"
            />
          )}
          {data.bookmarks?.savedButUnopened && (
            <Card
              title="Saved but unopened"
              desc={data.bookmarks.savedButUnopened.title || data.bookmarks.savedButUnopened.url}
              onClick={() => goToBookmark(data.bookmarks.savedButUnopened.id)}
              hoverColor="indigo"
            />
          )}
          {!data.bookmarks?.mostVisited && !data.bookmarks?.savedButUnopened && (
            <Card title="No bookmarks yet" desc="Start saving links to see suggestions here." onClick={() => navigate("/bookmarks")} hoverColor="indigo"/>
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
            <Card
              title="Continue recent note"
              desc={data.notes.recent.title}
              onClick={() => goToNote(data.notes.recent.id)}
              hoverColor="indigo"
            />
          )}
          {data.notes?.todo && (
            <Card
              title="Notes tagged #todo"
              desc={data.notes.todo.title}
              onClick={() => goToNote(data.notes.todo.id)}
              hoverColor="indigo"
            />
          )}
          {!data.notes?.recent && !data.notes?.todo && (
            <Card title="No notes yet" desc="Create your first note to get suggestions." onClick={() => navigate("/notes")} hoverColor="indigo"/>
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
            <Card
              title="Pinned clipboard"
              desc={data.clipboard.pinned.description || data.clipboard.pinned.preview}
              onClick={() => goToClipboard(data.clipboard.pinned.id)}
              hoverColor="indigo"
            />
          )}
          {data.clipboard?.recent && (
            <Card
              title="Most recent snippet"
              desc={data.clipboard.recent.description || data.clipboard.recent.preview}
              onClick={() => goToClipboard(data.clipboard.recent.id)}
              hoverColor="indigo"
            />
          )}
          {!data.clipboard?.pinned && !data.clipboard?.recent && (
            <Card title="No snippets yet" desc="Copy something to your Clipboard to see it here." onClick={() => navigate("/clipboard")} hoverColor="indigo"/>
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
            <Card
              title="Favorite screenshot"
              desc={data.screenshots.favorite.web_url}
              onClick={() => goToScreenshot(data.screenshots.favorite.id)}
              hoverColor="purple"
            />
          )}
          {data.screenshots?.recent && (
            <Card
              title="Latest screenshot"
              desc={data.screenshots.recent.web_url}
              onClick={() => goToScreenshot(data.screenshots.recent.id)}
              hoverColor="purple"
            />
          )}
          {!data.screenshots?.favorite && !data.screenshots?.recent && (
            <Card title="No screenshots yet" desc="Capture a webpage to see it here." onClick={() => navigate("/screenshots")} hoverColor="purple"/>
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
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
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
              <button onClick={() => goToColors()} className="px-4 py-1.5 text-sm rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:opacity-90 transition">
                View
              </button>
            </div>
          ) : (
            <Card title="No colors yet" desc="Save a color to see it here." onClick={goToColors} hoverColor="indigo"/>
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
            <Card
              title="Favorite track"
              desc={`${data.music.favorite.track_name} — ${data.music.favorite.artist || "Unknown"}`}
              onClick={() => goToMusic(data.music.favorite.id)}
              hoverColor="pink"
            />
          )}
          {data.music?.recent && (
            <Card
              title="Recently added"
              desc={`${data.music.recent.track_name} — ${data.music.recent.artist || "Unknown"}`}
              onClick={() => goToMusic(data.music.recent.id)}
              hoverColor="pink"
            />
          )}
          {!data.music?.favorite && !data.music?.recent && (
            <Card title="No tracks yet" desc="Add a track to see suggestions here." onClick={() => navigate("/music")} hoverColor="pink"/>
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
            <Card
              title="Note + Bookmark connection"
              desc={`Your note "${data.notes.recent.title}" pairs with "${data.bookmarks.mostVisited.title}"`}
              onClick={() => { goToNote(data.notes.recent.id); }}
              hoverColor="purple"
            />
          ) : (
            <Card
              title="No smart picks yet"
              desc="As you create more content, we’ll surface cross-feature links here."
              onClick={() => navigate("/notes")}
              hoverColor="purple"
            />
          )}
        </div>
      </section>
    </div>
  );
}
