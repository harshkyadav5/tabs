import React from "react";
import { Link } from "react-router-dom";

const featureItems = [
  { label: "Bookmarks", destination: '/bookmarks', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width="200" height="200" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 17.98V9.709c0-3.634 0-5.45 1.172-6.58S8.229 2 12 2s5.657 0 6.828 1.129C20 4.257 20 6.074 20 9.708v8.273c0 2.306 0 3.459-.773 3.871c-1.497.8-4.304-1.867-5.637-2.67c-.773-.465-1.16-.698-1.59-.698s-.817.233-1.59.698c-1.333.803-4.14 3.47-5.637 2.67C4 21.44 4 20.287 4 17.981" color="currentColor"/></svg> },
  { label: "Notes", destination: '/notes', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width="200" height="200" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M17 2v2m-5-2v2M7 2v2M3.5 16V9c0-2.828 0-4.243.879-5.121C5.257 3 6.672 3 9.5 3h5c2.828 0 4.243 0 5.121.879c.879.878.879 2.293.879 5.121v3c0 4.714 0 7.071-1.465 8.535C17.572 22 15.215 22 10.5 22h-1c-2.828 0-4.243 0-5.121-.879C3.5 20.243 3.5 18.828 3.5 16M8 15h4m-4-5h8"/><path d="M20.5 14.5A2.5 2.5 0 0 1 18 17c-.5 0-1.088-.087-1.573.043a1.25 1.25 0 0 0-.884.884c-.13.485-.043 1.074-.043 1.573A2.5 2.5 0 0 1 13 22"/></g></svg> },
  { label: "Music", destination: '/music', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width="200" height="200" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M7 9.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m0 0V2c.333.5.6 2.6 3 3"/><circle cx="10.5" cy="19.5" r="2.5"/><circle cx="20" cy="18" r="2"/><path d="M13 19.5V11c0-.91 0-1.365.247-1.648c.246-.282.747-.35 1.748-.487c3.014-.411 5.206-1.667 6.375-2.436c.28-.184.42-.276.525-.22s.105.223.105.554v11.163"/><path d="M13 13c4.8 0 8-2.333 9-3"/></g></svg> },
];

const toolItems = [
  { label: "Clipboard", destination: '/clipboard', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width="200" height="200" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M7.998 16h4m-4-5h8M7.5 3.5c-1.556.047-2.483.22-3.125.862c-.879.88-.879 2.295-.879 5.126v6.506c0 2.832 0 4.247.879 5.127C5.253 22 6.668 22 9.496 22h5c2.829 0 4.243 0 5.121-.88c.88-.879.88-2.294.88-5.126V9.488c0-2.83 0-4.246-.88-5.126c-.641-.642-1.569-.815-3.125-.862"/><path d="M7.496 3.75c0-.966.784-1.75 1.75-1.75h5.5a1.75 1.75 0 1 1 0 3.5h-5.5a1.75 1.75 0 0 1-1.75-1.75"/></g></svg> },
  { label: "Screenshot", destination: '/screenshot', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width="200" height="200" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12"/><path d="M18 13v1c0 1.886 0 2.828-.586 3.414S15.886 18 14 18h-1m-7-7v-1c0-1.886 0-2.828.586-3.414S8.114 6 10 6h1"/></g></svg> },
  { label: "Color Picker", destination: '/color-picker', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width="200" height="200" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m13.435 7l-6.276 6.276m0 0l-2.332 2.332c-.901.901-1.352 1.352-1.59 1.925C3 18.107 3 18.744 3 20.02V21h.98c1.276 0 1.913 0 2.487-.237c.573-.238 1.024-.689 1.925-1.59l5.897-5.897m-7.13 0h7.13m0 0L17 10.565m2.209-2.176L20.82 10m-1.611-1.611l.861-.862c.293-.293.44-.439.541-.582a2.1 2.1 0 0 0 0-2.434c-.102-.143-.248-.289-.54-.582c-.293-.292-.44-.438-.582-.54a2.1 2.1 0 0 0-2.434 0c-.143.102-.29.248-.582.54l-.862.862M19.21 8.39l-3.6-3.6M14 3.18l1.611 1.611" color="currentColor"/></svg> },
];

const archivedItems = [
  { label: "Archive", count: 34, destination: '/archive', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width="200" height="200" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M2 16c0-2.339 0-3.508.536-4.362a3.5 3.5 0 0 1 1.102-1.101C4.492 10 5.66 10 8 10h8c2.339 0 3.508 0 4.362.537a3.5 3.5 0 0 1 1.102 1.1C22 12.493 22 13.662 22 16s0 3.508-.537 4.362a3.5 3.5 0 0 1-1.1 1.102C19.507 22 18.338 22 16 22H8c-2.339 0-3.508 0-4.362-.537a3.5 3.5 0 0 1-1.102-1.1C2 19.507 2 18.338 2 16m18-6c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.093C18.1 6 17.4 6 16 6H8c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 0 0-1.093 1.093C4 7.9 4 8.6 4 10m14-4c0-1.886 0-2.828-.586-3.414S15.886 2 14 2h-4c-1.886 0-2.828 0-3.414.586S6 4.114 6 6"/><path d="M15 14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2"/></g></svg> },
];

const deletedItems = [
  { label: "Recycle Bin", count: 7, destination: '/recycle-bin', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width="200" height="200" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19.5 5.5l-.62 10.025c-.158 2.561-.237 3.842-.88 4.763a4 4 0 0 1-1.2 1.128c-.957.584-2.24.584-4.806.584c-2.57 0-3.855 0-4.814-.585a4 4 0 0 1-1.2-1.13c-.642-.922-.72-2.205-.874-4.77L4.5 5.5M3 5.5h18m-4.944 0l-.683-1.408c-.453-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.035 2c-1.066 0-1.599 0-2.04.234a2 2 0 0 0-.278.18c-.395.303-.616.788-1.058 1.757L8.053 5.5m1.447 11v-6m5 6v-6" color="currentColor"/></svg> },
];

export default function Profile() {
  return (
    <div className="max-w-6xl mx-auto p-6 flex gap-8">
      <div className="w-1/3 flex flex-col items-center text-center sticky top-6 self-start">
        <img
          src="/profile-pics/default.png"
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border"
        />
        <h2 className="mt-4 text-xl font-semibold">Name</h2>
        <p className="text-gray-500 text-sm">name@email.com</p>
        <p className="text-gray-400 text-xs">Joined May 2025</p>
      </div>

      <div className="w-2/3 space-y-8 overflow-y-auto pr-2">
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Account Info</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p><span className="font-medium">Name:</span>Name</p>
            <p><span className="font-medium">Username:</span>username</p>
            <p><span className="font-medium">Email:</span>name@email.com</p>
            <p><span className="font-medium">Password:</span>••••••••</p>
          </div>
          <div className="flex gap-3 mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-500 hover:shadow transition text-sm">
							Edit Info
						</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-500 hover:shadow transition text-sm">
							Change Password
						</button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Your Data</h3>

          <div className="grid grid-cols-2 gap-4">
						{[...featureItems, ...toolItems, ...archivedItems, ...deletedItems].map((item, i) => (
							<Link
								to={item.destination}
								key={i}
								className="p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl shadow-sm flex items-center gap-3 transition"
							>
								<div className="text-gray-600">{item.icon}</div>
								<div>
									<p className="text-sm font-medium text-gray-800">{item.label}</p>
									{item.count !== undefined && (
										<p className="text-xs text-gray-500">{item.count} items</p>
									)}
								</div>
							</Link>
						))}
					</div>
          <div className="flex space-x-3 mt-6">
            <button className="px-4 py-2 bg-green-600 text-white rounded-xl shadow-sm hover:bg-green-500 hover:shadow transition text-sm">
  						Export Data
						</button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-xl shadow-sm hover:bg-gray-500 hover:shadow transition text-sm">
  						Import Data
						</button>
          </div>

          <div className="mt-6">
            <h4 className="text-red-600 font-semibold">Danger Zone</h4>
            <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded-xl shadow-sm hover:bg-red-500 hover:shadow transition text-sm">
							Delete Account
						</button>
          </div>
        </div>
      </div>
    </div>
  );
}
