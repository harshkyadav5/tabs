import React from "react";

const profilePics = [
  "profile-picture-01.jpg",
  "profile-picture-02.jpg",
  "profile-picture-03.jpg",
  "profile-picture-04.jpg",
  "profile-picture-05.jpg",
  "profile-picture-06.jpg",
  "profile-picture-07.jpg",
  "profile-picture-08.jpg",
  "profile-picture-09.jpg",
];

export default function ProfilePicSelector({ selectedPic, setSelectedPic, onSubmit, onBack }) {
  return (
    <>
    <div className="grid grid-cols-2">
        <div>
            <h2 className="text-3xl tracking-wide text-black text-left mt-4">
                Choose a Profile Picture
            </h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {profilePics.map((pic) => (
            <img
                key={pic}
                src={`/profile-pics/${pic}`}
                alt={pic}
                onClick={() => setSelectedPic(pic)}
                className={`w-22 h-22 rounded-full cursor-pointer object-cover border-4 shadow-md ${
                selectedPic === pic ? "border-indigo-600" : "border-transparent"
                } hover:border-indigo-400 transition`}
            />
            ))}
        </div>
    </div>

    <div className="flex gap-5 mt-15 items-baseline-last justify-end">
        <button
            onClick={onBack}
            className="px-5 py-2 tracking-wide text-black rounded-2xl hover:bg-gray-300 transition-colors duration-300 font-medium"
        >
            Back
        </button>
        <button
            onClick={onSubmit}
            disabled={!selectedPic}
            className={`px-6 py-2 tracking-wide rounded-2xl text-white transition-colors duration-300 font-medium ${
                selectedPic ? "bg-indigo-600 hover:bg-indigo-800" : "bg-gray-400 cursor-not-allowed"
            }`}
        >
            Finish Signup
        </button>
    </div>
    </>
  );
}
