import React from "react";
import { CloseIcon, PlayIcon, PauseIcon, EllipsisVerticalIcon } from "./icons";

const remove = <CloseIcon />;
const play = <PlayIcon />;
const pause = <PauseIcon />;
const ellipsis = <EllipsisVerticalIcon />;

export default function MusicCard({ title, artist, image, onPlay }) {
  return (
    <div className="aspect-[1/1] min-w-[300px] max-w-[300px] rounded-panel shadow-md transition-shadow duration-200 overflow-hidden relative bg-gray-400/50">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        <div className="p-5 absolute top-0 left-0 w-full flex justify-end items-center">
            <button onClick={onPlay} className="p-2 backdrop-blur-md bg-black/30 hover:bg-black/50 text-slate-100 hover:text-white rounded-full transition duration-200">
                { ellipsis }
            </button>
        </div>

        <div className="h-1/3 w-full absolute bottom-0 left-0">
            <div className="w-full h-full absolute bottom-0 left-0 backdrop-blur-md mask-to-b"></div>
            <div className="w-full h-full absolute bottom-0 left-0 backdrop-blur-md mask-to-b"></div>
            <div className="w-full h-full absolute bottom-0 left-0 backdrop-blur-md mask-to-b"></div>
            <div className="w-full h-full absolute bottom-0 left-0 backdrop-blur-md mask-to-b"></div>

            <div className="grid grid-cols-4 gap-1 w-full absolute bottom-0">
                <div className="col-span-3 p-5 pr-0 tracking-wide truncate mask-to-l">
                    <div>
                        <h3 className="text-size-15 font-semibold font-montserrat text-white drop-shadow-sm/40">{title}</h3>
                        <p className="font-dm-sans text-sm text-white/80 drop-shadow-sm/40">{artist}</p>
                    </div>
                </div>
                <div className="p-5 absolute bottom-0 right-0">
                    {/* {onPlay && ( */}
                    <button onClick={onPlay} className="p-2 backdrop-blur-md bg-black/40 hover:bg-music-accent active:bg-music-accent text-slate-200 hover:text-white rounded-full transition duration-200">
                        { play }
                    </button>
                    {/* )} */}
                </div>
            </div>
        </div>
    </div>
  );
}
