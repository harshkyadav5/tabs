import React from "react";
import Button from "./ui/Button";

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

export default function ProfilePicSelector({ selectedPic, setSelectedPic, onSubmit, onBack, submitting = false }) {
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
            <button
                key={pic}
                type="button"
                onClick={() => setSelectedPic(pic)}
                aria-label={`Choose profile picture ${pic}`}
                aria-pressed={selectedPic === pic}
                className="rounded-full"
            >
                <img
                    src={`/profile-pics/${pic}`}
                    alt=""
                    className={`w-22 h-22 rounded-full cursor-pointer object-cover border-4 shadow-md ${
                    selectedPic === pic ? "border-primary" : "border-transparent"
                    } hover:border-primary/60 transition`}
                />
            </button>
            ))}
        </div>
    </div>

    <div className="flex gap-5 mt-15 items-baseline-last justify-end">
        <Button variant="ghost" onClick={onBack}>
            Back
        </Button>
        <Button onClick={onSubmit} disabled={!selectedPic} loading={submitting} className="px-6 py-2">
            Finish Signup
        </Button>
    </div>
    </>
  );
}
