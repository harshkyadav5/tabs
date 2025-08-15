import React from "react";

const remove = <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width="200" height="200" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m18 6l-6 6m0 0l-6 6m6-6l6 6m-6-6L6 6" color="currentColor"/></svg>;

const play = <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M18.89 12.846c-.353 1.343-2.023 2.292-5.364 4.19c-3.23 1.835-4.845 2.752-6.146 2.384a3.25 3.25 0 0 1-1.424-.841C5 17.614 5 15.743 5 12s0-5.614.956-6.579a3.25 3.25 0 0 1 1.424-.84c1.301-.37 2.916.548 6.146 2.383c3.34 1.898 5.011 2.847 5.365 4.19a3.3 3.3 0 0 1 0 1.692"/></svg>;

const pause = <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width="200" height="200" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7c0-1.414 0-2.121.44-2.56C4.878 4 5.585 4 7 4s2.121 0 2.56.44C10 4.878 10 5.585 10 7v10c0 1.414 0 2.121-.44 2.56C9.122 20 8.415 20 7 20s-2.121 0-2.56-.44C4 19.122 4 18.415 4 17zm10 0c0-1.414 0-2.121.44-2.56C14.878 4 15.585 4 17 4s2.121 0 2.56.44C20 4.878 20 5.585 20 7v10c0 1.414 0 2.121-.44 2.56c-.439.44-1.146.44-2.56.44s-2.121 0-2.56-.44C14 19.122 14 18.415 14 17z" color="currentColor"/></svg>;

const ellipsis = <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="4" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="20" r="2"/></svg>;

export default function MusicCard({ title, artist, image, onPlay }) {
  return (
    <div className="aspect-[1/1] min-w-[300px] max-w-[300px] rounded-3xl shadow-md transition-shadow duration-200 overflow-hidden relative bg-gray-400/50">
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
                    <button onClick={onPlay} className="p-2 backdrop-blur-md bg-black/40 hover:bg-red-600 active:bg-red-600 text-slate-200 hover:text-white rounded-full transition duration-200">
                        { play }
                    </button>
                    {/* )} */}
                </div>
            </div>
        </div>
    </div>
  );
}
