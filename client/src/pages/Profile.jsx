import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import {
  BookmarksNavIcon,
  NotesNavIcon,
  MusicNavIcon,
  ClipboardNavIcon,
  ScreenshotNavIcon,
  ColorPickerNavIcon,
  ArchiveIcon,
  TrashIcon,
  ImportIcon,
  ExportIcon,
} from "../components/icons";

const featureItems = [
  { label: "Bookmarks", destination: '/bookmarks', color: "bg-blue-100 text-blue-600", icon: <BookmarksNavIcon /> },
  { label: "Notes", destination: '/notes', color: "bg-yellow-100 text-yellow-600", icon: <NotesNavIcon /> },
  { label: "Music", destination: '/music', color: "bg-pink-100 text-pink-600", icon: <MusicNavIcon /> },
];

const toolItems = [
  { label: "Clipboard", destination: '/clipboard', color: "bg-green-100 text-green-600", icon: <ClipboardNavIcon /> },
  { label: "Screenshot", destination: '/screenshot', color: "bg-purple-100 text-purple-600", icon: <ScreenshotNavIcon /> },
  { label: "Color Picker", destination: '/color-picker', color: "bg-teal-100 text-teal-600", icon: <ColorPickerNavIcon /> },
];

const archivedItems = [
  { label: "Archive", destination: '/archive', color: "bg-gray-100 text-gray-600", icon: <ArchiveIcon className="w-6 h-6" /> },
];

const deletedItems = [
  { label: "Recycle Bin", destination: '/recycle-bin', color: "bg-red-100 text-red-600", icon: <TrashIcon className="w-6 h-6" /> },
];

const importIcon = <ImportIcon />;
const exportIcon = <ExportIcon />;

export default function Profile() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [confirmDeleteData, setConfirmDeleteData] = useState(false);
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);

  return (
		<>
		<div className="pt-18 bg-white z-0 w-full mx-auto self-center">
			<div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row md:gap-8 gap-6 antialiased">
				
				<div className="flex flex-col items-start w-full md:w-64 lg:w-74 gap-4 md:sticky md:top-24 self-start md:flex-shrink-0 md:basis-auto">
					{user ? (
						<>
							<div className="flex md:flex-col md:justify-center items-center md:items-start text-left gap-4 self-start">
								<img
									src={`/profile-pics/${user.profilePicture}`}
									alt="Profile"
									className="w-[25%] h-auto sm:w-28 sm:h-28 md:w-64 md:h-64 lg:w-74 lg:h-74 rounded-full object-cover shadow-md ring-2 ring-gray-200 transition-all duration-200"
								/>
								<div className="text-left">
									<h2 className="mt-1 text-2xl font-semibold">{user.username.toUpperCase()}</h2>
									<p className="text-gray-500 text-xl">{user.email}</p>
									<p className="text-gray-400 text-lg mt-1">
										Joined{" "}
										{new Date(user.createdAt).toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</p>
								</div>
							</div>

							<div className="w-full mt-2">
								<button className="px-4 py-2 w-full bg-[#f7f9fb] text-[#25292e] font-semibold rounded-btn border border-[#d1d9e0] hover:bg-[#f3f5f7] text-sm">
									Edit Profile
								</button>
							</div>
						</>
					) : (
						<>
							<img
								src="/profile-pics/profile-picture.jpg"
								alt="Profile"
								className="w-[25%] h-auto sm:w-28 sm:h-28 md:w-64 md:h-64 lg:w-74 lg:h-74 rounded-full object-cover shadow-md ring-2 ring-gray-200 transition-all duration-200"
							/>
							<div className="text-left">
								<h2 className="mt-1 text-lg sm:text-xl font-semibold">Name</h2>
								<p className="text-gray-500 text-sm sm:text-base">name@email.com</p>
								<p className="text-gray-400 text-xs sm:text-sm mt-1">Joined May 2025</p>
							</div>
						</>
					)}
				</div>

				<div className="flex-1 space-y-8 overflow-y-auto p-6 border border-[#d1d9e0] rounded-card">
					{/* Your Data */}
					<div>
						<h3 className="text-2xl mb-4">Your Data</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
							{[...featureItems, ...toolItems, ...archivedItems, ...deletedItems].map((item, i) => (
								<Link
									to={item.destination}
									key={i}
									className="p-4 bg-white border border-gray-200 rounded-card flex items-center gap-4 transition hover:bg-gray-50 hover:border-gray-300"
								>
									<div className={`flex items-center justify-center w-12 h-12 rounded-card ${item.color}`}>
										{item.icon}
									</div>

									<div className="flex flex-col">
										<p className="text-base font-medium text-gray-800">{item.label}</p>
									</div>
								</Link>
							))}
						</div>

						<div className="flex flex-wrap gap-3 mt-6">
							<button className="flex items-center gap-3 px-4 py-2 bg-[#f7f9fb] text-gray-700 font-semibold rounded-btn border border-[#d1d9e0] hover:bg-gray-700 hover:text-white transition text-sm whitespace-nowrap">
								<div>
									{exportIcon}
								</div>
								<span className="truncate">Export Data</span>
							</button>
							<button className="flex items-center gap-3 px-4 py-2 bg-[#f7f9fb] text-green-700 font-semibold rounded-btn border border-[#d1d9e0] hover:bg-green-700 hover:text-white transition text-sm whitespace-nowrap">
								<div>
									{importIcon}
								</div>
								<span className="truncate">Import Data</span>
							</button>
						</div>

						<div className="mt-6">
							<h4 className="text-2xl mb-4">Danger Zone</h4>
							<div className="border border-red-200 rounded-btn divide-y divide-[#d1d9e0]">
								{/* Delete Data */}
								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 gap-2">
									<div className="flex flex-col">
										<span className="text-sm font-medium text-gray-800">Delete Data</span>
										<span className="text-xs text-gray-500">
											Clear your saved bookmarks, notes, clipboard, and other data.
										</span>
									</div>
									<button
										onClick={() => setConfirmDeleteData(true)}
										className="px-4 py-2 mt-2 sm:mt-0 bg-[#f7f9fb] text-red-700 font-semibold rounded-btn border border-[#d1d9e0] hover:bg-red-700 hover:text-white transition text-sm w-fit sm:w-auto whitespace-nowrap"
									>
										Delete Data
									</button>
								</div>

								{/* Delete Account */}
								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 gap-2">
									<div className="flex flex-col">
										<span className="text-sm font-medium text-gray-800">Delete Account</span>
										<span className="text-xs text-gray-500">
											Permanently remove your account and all associated data.
										</span>
									</div>
									<button
										onClick={() => setConfirmDeleteAccount(true)}
										className="px-4 py-2 mt-2 sm:mt-0 bg-[#f7f9fb] text-red-700 font-semibold rounded-btn border border-[#d1d9e0] hover:bg-red-700 hover:text-white transition text-sm w-fit sm:w-auto whitespace-nowrap"
									>
										Delete Account
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

			<ConfirmDialog
				open={confirmDeleteData}
				title="Delete all your data?"
				message="This clears your saved bookmarks, notes, clipboard, and other data. This can't be undone."
				onCancel={() => setConfirmDeleteData(false)}
				onConfirm={() => {
					showToast("Data deletion isn't available yet — contact support if you need this.", "warning");
					setConfirmDeleteData(false);
				}}
			/>

			<ConfirmDialog
				open={confirmDeleteAccount}
				title="Delete your account?"
				message="This permanently removes your account and all associated data. This can't be undone."
				onCancel={() => setConfirmDeleteAccount(false)}
				onConfirm={() => {
					showToast("Account deletion isn't available yet — contact support if you need this.", "warning");
					setConfirmDeleteAccount(false);
				}}
			/>
		</>
  );
}

