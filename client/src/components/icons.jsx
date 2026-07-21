import React from "react";

export const ProfileIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M6.578 15.482c-1.415.842-5.125 2.562-2.865 4.715C4.816 21.248 6.045 22 7.59 22h8.818c1.546 0 2.775-.752 3.878-1.803c2.26-2.153-1.45-3.873-2.865-4.715a10.66 10.66 0 0 0-10.844 0M16.5 6.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0"
    />
  </svg>
);

export const LogoutIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m11 3l-.663.234c-2.578.91-3.868 1.365-4.602 2.403S5 8.043 5 10.777v2.445c0 2.735 0 4.102.735 5.14c.734 1.039 2.024 1.494 4.602 2.404L11 21m10-9H11m10 0c0-.7-1.994-2.008-2.5-2.5M21 12c0 .7-1.994 2.008-2.5 2.5"
    />
  </svg>
);

export const TrashIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m19.5 5.5l-.62 10.025c-.158 2.561-.237 3.842-.88 4.763a4 4 0 0 1-1.2 1.128c-.957.584-2.24.584-4.806.584c-2.57 0-3.855 0-4.814-.585a4 4 0 0 1-1.2-1.13c-.642-.922-.72-2.205-.874-4.77L4.5 5.5M3 5.5h18m-4.944 0l-.683-1.408c-.453-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.035 2c-1.066 0-1.599 0-2.04.234a2 2 0 0 0-.278.18c-.395.303-.616.788-1.058 1.757L8.053 5.5m1.447 11v-6m5 6v-6"
    />
  </svg>
);

export const ArchiveIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <path d="M2 16c0-2.339 0-3.508.536-4.362a3.5 3.5 0 0 1 1.102-1.101C4.492 10 5.66 10 8 10h8c2.339 0 3.508 0 4.362.537a3.5 3.5 0 0 1 1.102 1.1C22 12.493 22 13.662 22 16s0 3.508-.537 4.362a3.5 3.5 0 0 1-1.1 1.102C19.507 22 18.338 22 16 22H8c-2.339 0-3.508 0-4.362-.537a3.5 3.5 0 0 1-1.102-1.1C2 19.507 2 18.338 2 16m18-6c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.093C18.1 6 17.4 6 16 6H8c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 0 0-1.093 1.093C4 7.9 4 8.6 4 10m14-4c0-1.886 0-2.828-.586-3.414S15.886 2 14 2h-4c-1.886 0-2.828 0-3.414.586S6 4.114 6 6" />
      <path d="M15 14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2" />
    </g>
  </svg>
);

export const EditIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <path d="m16.214 4.982l1.402-1.401a1.982 1.982 0 0 1 2.803 2.803l-1.401 1.402m-2.804-2.804l-5.234 5.234c-1.045 1.046-1.568 1.568-1.924 2.205S8.342 14.561 8 16c1.438-.342 2.942-.7 3.579-1.056s1.16-.879 2.205-1.924l5.234-5.234m-2.804-2.804l2.804 2.804" />
      <path d="M21 12c0 4.243 0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12s0-6.364 1.318-7.682S7.758 3 12 3" />
    </g>
  </svg>
);

export const PinIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M3 21L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M13.2585 18.8714C9.51516 18.0215 5.97844 14.4848 5.12853 10.7415C4.99399 10.1489 4.92672 9.85266 5.12161 9.37197C5.3165 8.89129 5.55457 8.74255 6.03071 8.44509C7.10705 7.77265 8.27254 7.55888 9.48209 7.66586C11.1793 7.81598 12.0279 7.89104 12.4512 7.67048C12.8746 7.44991 13.1622 6.93417 13.7376 5.90269L14.4664 4.59604C14.9465 3.73528 15.1866 3.3049 15.7513 3.10202C16.316 2.89913 16.6558 3.02199 17.3355 3.26771C18.9249 3.84236 20.1576 5.07505 20.7323 6.66449C20.978 7.34417 21.1009 7.68401 20.898 8.2487C20.6951 8.8134 20.2647 9.05346 19.4039 9.53358L18.0672 10.2792C17.0376 10.8534 16.5229 11.1406 16.3024 11.568C16.0819 11.9955 16.162 12.8256 16.3221 14.4859C16.4399 15.7068 16.2369 16.88 15.5555 17.9697C15.2577 18.4458 15.1088 18.6839 14.6283 18.8786C14.1477 19.0733 13.8513 19.006 13.2585 18.8714Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const UnpinIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M7.5 8C6.95863 8.1281 6.49932 8.14239 5.99268 8.45891C5.07234 9.03388 4.85108 9.71674 5.08821 10.7612C5.94028 14.5139 9.48599 18.0596 13.2388 18.9117C14.2834 19.1489 14.9661 18.928 15.5416 18.0077C15.8411 17.5288 15.8716 17.0081 16 16.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 7.79915C12.1776 7.77794 12.3182 7.74034 12.4295 7.68235C13.3997 7.17686 13.9291 5.53361 14.4498 4.60009C14.9311 3.73715 15.1718 3.30567 15.7379 3.10227C16.3041 2.89888 16.6448 3.02205 17.3262 3.26839C18.9197 3.8445 20.1555 5.08032 20.7316 6.6738C20.9779 7.35521 21.1011 7.69591 20.8977 8.26204C20.6943 8.82817 20.2628 9.06884 19.3999 9.55018C18.4608 10.074 16.7954 10.6108 16.2905 11.5898C16.2345 11.6983 16.1978 11.8327 16.1769 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M3 21L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 3L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const EllipsisVerticalIcon = ({ className = "w-4 h-4", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <circle cx="12" cy="4" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="20" r="2" />
  </svg>
);

export const EllipsisHorizontalIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
  </svg>
);

export const CopyIcon = ({ className = "w-4 h-4", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <path d="M9 15c0-2.828 0-4.243.879-5.121C10.757 9 12.172 9 15 9h1c2.828 0 4.243 0 5.121.879C22 10.757 22 12.172 22 15v1c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22h-1c-2.828 0-4.243 0-5.121-.879C9 20.243 9 18.828 9 16z" />
      <path d="M17 9c-.003-2.957-.047-4.489-.908-5.538a4 4 0 0 0-.554-.554C14.43 2 12.788 2 9.5 2c-3.287 0-4.931 0-6.038.908a4 4 0 0 0-.554.554C2 4.57 2 6.212 2 9.5c0 3.287 0 4.931.908 6.038a4 4 0 0 0 .554.554c1.05.86 2.58.906 5.538.908" />
    </g>
  </svg>
);

export const CloseIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m18 6l-6 6m0 0l-6 6m6-6l6 6m-6-6L6 6"
    />
  </svg>
);

export const PlayIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.89 12.846c-.353 1.343-2.023 2.292-5.364 4.19c-3.23 1.835-4.845 2.752-6.146 2.384a3.25 3.25 0 0 1-1.424-.841C5 17.614 5 15.743 5 12s0-5.614.956-6.579a3.25 3.25 0 0 1 1.424-.84c1.301-.37 2.916.548 6.146 2.383c3.34 1.898 5.011 2.847 5.365 4.19a3.3 3.3 0 0 1 0 1.692" />
  </svg>
);

export const PauseIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M4 7c0-1.414 0-2.121.44-2.56C4.878 4 5.585 4 7 4s2.121 0 2.56.44C10 4.878 10 5.585 10 7v10c0 1.414 0 2.121-.44 2.56C9.122 20 8.415 20 7 20s-2.121 0-2.56-.44C4 19.122 4 18.415 4 17zm10 0c0-1.414 0-2.121.44-2.56C14.878 4 15.585 4 17 4s2.121 0 2.56.44C20 4.878 20 5.585 20 7v10c0 1.414 0 2.121-.44 2.56c-.439.44-1.146.44-2.56.44s-2.121 0-2.56-.44C14 19.122 14 18.415 14 17z"
    />
  </svg>
);

export const EyeIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <path d="M21.544 11.045c.304.426.456.64.456.955c0 .316-.152.529-.456.955C20.178 14.871 16.689 19 12 19c-4.69 0-8.178-4.13-9.544-6.045C2.152 12.529 2 12.315 2 12c0-.316.152-.529.456-.955C3.822 9.129 7.311 5 12 5c4.69 0 8.178 4.13 9.544 6.045" />
      <path d="M15 12a3 3 0 1 0-6 0a3 3 0 0 0 6 0" />
    </g>
  </svg>
);

export const EyeOffIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <path d="M19.439 15.439a19.5 19.5 0 0 0 2.105-2.484c.304-.426.456-.64.456-.955c0-.316-.152-.529-.456-.955C20.178 9.129 16.689 5 12 5c-.908 0-1.77.155-2.582.418m-2.67 1.33c-2.017 1.36-3.506 3.195-4.292 4.297c-.304.426-.456.64-.456.955c0 .316.152.529.456.955C3.822 14.871 7.311 19 12 19c1.99 0 3.765-.744 5.253-1.747" />
      <path d="M9.858 10A2.929 2.929 0 1 0 14 14.142M3 3l18 18" />
    </g>
  </svg>
);

export const SearchIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

export const BookmarksNavIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M4 17.98V9.709c0-3.634 0-5.45 1.172-6.58S8.229 2 12 2s5.657 0 6.828 1.129C20 4.257 20 6.074 20 9.708v8.273c0 2.306 0 3.459-.773 3.871c-1.497.8-4.304-1.867-5.637-2.67c-.773-.465-1.16-.698-1.59-.698s-.817.233-1.59.698c-1.333.803-4.14 3.47-5.637 2.67C4 21.44 4 20.287 4 17.981"
    />
  </svg>
);

export const NotesNavIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <path d="M17 2v2m-5-2v2M7 2v2M3.5 16V9c0-2.828 0-4.243.879-5.121C5.257 3 6.672 3 9.5 3h5c2.828 0 4.243 0 5.121.879c.879.878.879 2.293.879 5.121v3c0 4.714 0 7.071-1.465 8.535C17.572 22 15.215 22 10.5 22h-1c-2.828 0-4.243 0-5.121-.879C3.5 20.243 3.5 18.828 3.5 16M8 15h4m-4-5h8" />
      <path d="M20.5 14.5A2.5 2.5 0 0 1 18 17c-.5 0-1.088-.087-1.573.043a1.25 1.25 0 0 0-.884.884c-.13.485-.043 1.074-.043 1.573A2.5 2.5 0 0 1 13 22" />
    </g>
  </svg>
);

export const MusicNavIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <path d="M7 9.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m0 0V2c.333.5.6 2.6 3 3" />
      <circle cx="10.5" cy="19.5" r="2.5" />
      <circle cx="20" cy="18" r="2" />
      <path d="M13 19.5V11c0-.91 0-1.365.247-1.648c.246-.282.747-.35 1.748-.487c3.014-.411 5.206-1.667 6.375-2.436c.28-.184.42-.276.525-.22s.105.223.105.554v11.163" />
      <path d="M13 13c4.8 0 8-2.333 9-3" />
    </g>
  </svg>
);

export const ClipboardNavIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <path d="M7.998 16h4m-4-5h8M7.5 3.5c-1.556.047-2.483.22-3.125.862c-.879.88-.879 2.295-.879 5.126v6.506c0 2.832 0 4.247.879 5.127C5.253 22 6.668 22 9.496 22h5c2.829 0 4.243 0 5.121-.88c.88-.879.88-2.294.88-5.126V9.488c0-2.83 0-4.246-.88-5.126c-.641-.642-1.569-.815-3.125-.862" />
      <path d="M7.496 3.75c0-.966.784-1.75 1.75-1.75h5.5a1.75 1.75 0 1 1 0 3.5h-5.5a1.75 1.75 0 0 1-1.75-1.75" />
    </g>
  </svg>
);

export const ScreenshotNavIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
      <path d="M18 13v1c0 1.886 0 2.828-.586 3.414S15.886 18 14 18h-1m-7-7v-1c0-1.886 0-2.828.586-3.414S8.114 6 10 6h1" />
    </g>
  </svg>
);

export const ColorPickerNavIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m13.435 7l-6.276 6.276m0 0l-2.332 2.332c-.901.901-1.352 1.352-1.59 1.925C3 18.107 3 18.744 3 20.02V21h.98c1.276 0 1.913 0 2.487-.237c.573-.238 1.024-.689 1.925-1.59l5.897-5.897m-7.13 0h7.13m0 0L17 10.565m2.209-2.176L20.82 10m-1.611-1.611l.861-.862c.293-.293.44-.439.541-.582a2.1 2.1 0 0 0 0-2.434c-.102-.143-.248-.289-.54-.582c-.293-.292-.44-.438-.582-.54a2.1 2.1 0 0 0-2.434 0c-.143.102-.29.248-.582.54l-.862.862M19.21 8.39l-3.6-3.6M14 3.18l1.611 1.611"
    />
  </svg>
);

export const BookmarkThinIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5v14l7-5 7 5V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
  </svg>
);

export const NoteThinIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z" />
  </svg>
);

export const AddFolderIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M18 13.5v8m4-4h-8m-7-11h9.75c2.107 0 3.16 0 3.917.506a3 3 0 0 1 .827.827c.465.695.502 1.851.505 3.667M12 6.5l-.633-1.267c-.525-1.05-1.005-2.106-2.168-2.542C8.69 2.5 8.108 2.5 6.944 2.5c-1.816 0-2.724 0-3.406.38A3 3 0 0 0 2.38 4.038C2 4.72 2 5.628 2 7.444V10.5c0 4.714 0 7.071 1.464 8.535C4.822 20.394 6.944 20.493 11 20.5"
    />
  </svg>
);

export const FolderIcon = ({ className = "w-6 h-6", ...props }) => {
  const gradId = React.useId();
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
      </defs>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        fill={`url(#${gradId})`}
        d="M7 7h9.75c2.107 0 3.16 0 3.917.506a3 3 0 0 1 .827.827C22 9.09 22 10.143 22 12.25c0 3.511 0 5.267-.843 6.528a5 5 0 0 1-1.38 1.38C18.518 21 16.762 21 13.25 21H12c-4.714 0-7.071 0-8.536-1.465C2 18.072 2 15.715 2 11V7.944c0-1.816 0-2.724.38-3.406A3 3 0 0 1 3.538 3.38C4.22 3 5.128 3 6.944 3C8.108 3 8.69 3 9.2 3.191c1.163.436 1.643 1.493 2.168 2.542L12 7"
      />
    </svg>
  );
};

export const StarIcon = ({ className = "w-7 h-7", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m13.728 3.444l1.76 3.549c.24.494.88.968 1.42 1.058l3.189.535c2.04.343 2.52 1.835 1.05 3.307l-2.48 2.5c-.42.423-.65 1.24-.52 1.825l.71 3.095c.56 2.45-.73 3.397-2.88 2.117l-2.99-1.785c-.54-.322-1.43-.322-1.98 0L8.019 21.43c-2.14 1.28-3.44.322-2.88-2.117l.71-3.095c.13-.585-.1-1.402-.52-1.825l-2.48-2.5C1.39 10.42 1.86 8.929 3.899 8.586l3.19-.535c.53-.09 1.17-.564 1.41-1.058l1.76-3.549c.96-1.925 2.52-1.925 3.47 0"
    />
  </svg>
);


export const ToastSuccessIcon = ({ className = "h-6 w-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10" />
      <path d="m8 12.5l2.5 2.5L16 9" />
    </g>
  </svg>
);

export const ToastWarningIcon = ({ className = "h-6 w-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M5.322 9.683c2.413-4.271 3.62-6.406 5.276-6.956a4.45 4.45 0 0 1 2.804 0c1.656.55 2.863 2.685 5.276 6.956c2.414 4.27 3.62 6.406 3.259 8.146c-.2.958-.69 1.826-1.402 2.48C19.241 21.5 16.827 21.5 12 21.5s-7.241 0-8.535-1.19a4.66 4.66 0 0 1-1.402-2.48c-.362-1.74.845-3.876 3.259-8.147M11.992 16h.009M12 13V9"
    />
  </svg>
);

export const ToastErrorIcon = ({ className = "h-6 w-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <path d="M15.5 8.5L12 12m0 0l-3.5 3.5M12 12l3.5 3.5M12 12L8.5 8.5" />
      <circle cx="12" cy="12" r="10" />
    </g>
  </svg>
);

export const ToastInfoIcon = ({ className = "h-6 w-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M11.992 15h.009M12 12V8" />
    </g>
  </svg>
);

// MusicNavbar.jsx
export const MusicNavSearchIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M17.5 17.5L22 22m-2-11a9 9 0 1 0-18 0a9 9 0 0 0 18 0"
    />
  </svg>
);

export const MusicNavHomeIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m7.088 4.764l-1 .78C4.572 6.73 3.813 7.322 3.407 8.157S3 9.956 3 11.885v2.092c0 3.786 0 5.68 1.172 6.855C5.115 21.78 6.52 21.965 9 22v-3.994c0-.932 0-1.398.152-1.766a2 2 0 0 1 1.083-1.082c.367-.152.833-.152 1.765-.152s1.398 0 1.765.152a2 2 0 0 1 1.083 1.082c.152.368.152.834.152 1.766V22c2.48-.036 3.885-.22 4.828-1.168C21 19.657 21 17.764 21 13.978v-2.092c0-1.93 0-2.894-.407-3.729s-1.165-1.427-2.681-2.611l-1-.781C14.552 2.92 13.372 2 12 2s-2.552.921-4.912 2.764"
    />
  </svg>
);

// Navbar.jsx
export const HamburgerMenuIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

// MusicPlayer.jsx
export const ShuffleIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m19.558 4l.897.976c.401.436.602.654.531.839S20.632 6 20.065 6c-1.27 0-2.788-.205-3.954.473c-.72.42-1.223 1.152-2.072 2.527M3 18h1.58c1.929 0 2.893 0 3.706-.473c.721-.42 1.223-1.152 2.072-2.527m9.2 5l.897-.976c.401-.436.602-.654.531-.839S20.632 18 20.065 18c-1.27 0-2.788.205-3.954-.473c-.813-.474-1.348-1.346-2.418-3.09l-2.99-4.875C9.635 7.82 9.1 6.947 8.287 6.473S6.51 6 4.581 6H3"
    />
  </svg>
);

export const RepeatIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m16.388 3l1.003.976c.448.436.672.654.593.839C17.906 5 17.59 5 16.955 5h-7.76C5.22 5 2 8.134 2 12c0 1.487.477 2.866 1.29 4m4.322 5l-1.003-.976c-.448-.436-.672-.654-.593-.839C6.094 19 6.41 19 7.045 19h7.76C18.78 19 22 15.866 22 12a6.84 6.84 0 0 0-1.29-4"
    />
  </svg>
);

export const RepeatOneIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M22 10V3.369c0-.304-.282-.477-.48-.295L20 4.474M14.388 3l1.003.976c.448.436.672.654.593.839C15.906 5 15.59 5 14.955 5h-5.76C5.22 5 2 8.134 2 12c0 1.487.477 2.866 1.29 4m4.322 5l-1.003-.976c-.448-.436-.672-.654-.593-.839C6.094 19 6.41 19 7.045 19h7.76c3.445 0 6.49-2.355 7.195-5.5"
    />
  </svg>
);

export const MusicPlayerPlayIcon = ({ className = "w-8 h-8", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <g fill="none" fillRule="evenodd">
      <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
      <path
        fill="currentColor"
        d="M5.669 4.76a1.469 1.469 0 0 1 2.04-1.177c1.062.454 3.442 1.533 6.462 3.276c3.021 1.744 5.146 3.267 6.069 3.958c.788.591.79 1.763.001 2.356c-.914.687-3.013 2.19-6.07 3.956c-3.06 1.766-5.412 2.832-6.464 3.28c-.906.387-1.92-.2-2.038-1.177c-.138-1.142-.396-3.735-.396-7.237c0-3.5.257-6.092.396-7.235Z"
      />
    </g>
  </svg>
);

export const PreviousIcon = ({ className = "w-7 h-7", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <g fill="none" fillRule="evenodd">
      <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
      <path
        fill="currentColor"
        d="M19.788 5.627c.777-.359 1.68.204 1.783 1.114l.027.25l.062.653l.065.845l.044.751l.026.554l.02.593l.016.631l.008.667v.683l-.008.647l-.023.907l-.022.56l-.04.767l-.062.88l-.062.705l-.054.517c-.1.866-.943 1.372-1.714 1.018l-.608-.29l-.315-.157l-.545-.28l-.408-.218l-.442-.242l-.474-.267l-.503-.292l-.532-.318l-.558-.344l-.69-.439l-.635-.42l-.58-.397l-.525-.37l-.24-.174l-.04.86l-.049.755l-.067.835l-.062.62l-.013.12c-.1.866-.943 1.372-1.714 1.018l-.608-.29l-.315-.157l-.545-.28l-.408-.218l-.442-.242l-.722-.41l-.518-.305a47.459 47.459 0 0 1-.27-.162l-.557-.344l-.58-.368l-.275-.179l-.523-.348l-.485-.331l-.446-.314l-.594-.43l-.344-.258l-.562-.435l-.308-.247c-.67-.546-.686-1.592-.042-2.117l.432-.345l.607-.465l.367-.271l.407-.294l.684-.479l.503-.34l.54-.353l.575-.366l.573-.353l.277-.166l.533-.313l.503-.286l.47-.26l.436-.234l.757-.39l.589-.287l.225-.105c.777-.359 1.68.204 1.783 1.114l.045.427l.051.558l.052.68l.048.797l.028.592l.492-.353c.173-.123.356-.25.547-.38l.599-.403a46.8 46.8 0 0 1 .992-.638l.573-.353l.277-.166l.533-.313l.503-.286l.47-.26l.436-.234l.757-.39l.589-.287l.225-.105Z"
      />
    </g>
  </svg>
);

export const NextIcon = ({ className = "w-7 h-7", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <g fill="none" fillRule="evenodd">
      <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
      <path
        fill="currentColor"
        d="m13.212 5.627l.356.168l.458.224l.553.283l.417.22l.693.38l.503.287l.533.313l.56.34c.096.058.192.118.29.179l.575.366l.54.353l.503.34l.466.324l.625.449l.367.27l.607.466l.432.345c.644.525.627 1.57-.043 2.117l-.307.247l-.562.435l-.73.54l-.426.302l-.465.323l-.505.34a47.21 47.21 0 0 1-.266.176l-.56.362l-.295.185l-.558.344l-.532.318l-.503.292l-.474.267l-.442.242l-.599.317l-.354.181l-.712.348l-.21.099c-.772.354-1.616-.152-1.715-1.018l-.075-.74l-.068-.834l-.032-.492l-.03-.54l-.026-.583l-.496.355l-.269.189l-.58.396l-.636.42l-.689.44l-.558.343l-.787.467l-.722.41l-.442.242l-.599.317l-.354.181l-.712.348l-.21.099c-.772.354-1.616-.152-1.715-1.018l-.054-.517l-.062-.705l-.061-.88l-.04-.768l-.023-.56l-.023-.906l-.008-.647v-.683l.008-.667l.015-.631l.034-.875l.042-.783l.064-.891l.048-.546l.044-.433l.013-.118c.103-.91 1.006-1.473 1.783-1.114l.356.168l.458.224l.553.283l.417.22l.454.247l.487.274l.255.146l.533.313l.56.34a46.884 46.884 0 0 1 1.588 1.021l.574.392l.52.368l.24.173l.027-.592l.03-.544l.052-.72l.068-.772l.045-.427c.103-.91 1.006-1.473 1.783-1.114Z"
      />
    </g>
  </svg>
);

export const MusicPlayerPauseIcon = ({ className = "w-8 h-8", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M4 7c0-1.414 0-2.121.44-2.56C4.878 4 5.585 4 7 4s2.121 0 2.56.44C10 4.878 10 5.585 10 7v10c0 1.414 0 2.121-.44 2.56C9.122 20 8.415 20 7 20s-2.121 0-2.56-.44C4 19.122 4 18.415 4 17zm10 0c0-1.414 0-2.121.44-2.56C14.878 4 15.585 4 17 4s2.121 0 2.56.44C20 4.878 20 5.585 20 7v10c0 1.414 0 2.121-.44 2.56c-.439.44-1.146.44-2.56.44s-2.121 0-2.56-.44C14 19.122 14 18.415 14 17z"
    />
  </svg>
);

export const VolumeHighIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M14 14.814V9.186c0-3.145 0-4.717-.925-5.109c-.926-.391-2.015.72-4.193 2.945c-1.128 1.152-1.771 1.407-3.376 1.407c-1.403 0-2.105 0-2.61.344C1.85 9.487 2.01 10.882 2.01 12s-.159 2.513.888 3.227c.504.344 1.206.344 2.609.344c1.605 0 2.248.255 3.376 1.407c2.178 2.224 3.267 3.336 4.193 2.945c.925-.392.925-1.964.925-5.11M17 9c.625.82 1 1.863 1 3s-.375 2.18-1 3m3-8c1.25 1.366 2 3.106 2 5s-.75 3.634-2 5"
    />
  </svg>
);

export const VolumeMuteIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M18 14.814V9.186c0-3.145 0-4.717-.926-5.109c-.926-.391-2.016.72-4.195 2.945c-1.13 1.152-1.773 1.407-3.379 1.407c-1.112 0-2.473-.148-3.163.907C6 9.85 6 10.566 6 12c0 1.433 0 2.15.337 2.664c.69 1.055 2.05.907 3.163.907c1.606 0 2.25.255 3.379 1.407c2.18 2.224 3.27 3.336 4.195 2.945c.926-.392.926-1.964.926-5.11"
    />
  </svg>
);

export const FullScreenIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M8.984 2c-2.807.064-4.446.331-5.566 1.447C2.438 4.424 2.11 5.797 2 8m13.017-6c2.806.064 4.445.331 5.566 1.447c.98.977 1.308 2.35 1.417 4.553m-6.983 14c2.806-.064 4.445-.331 5.566-1.447c.98-.977 1.308-2.35 1.417-4.553M8.984 22c-2.807-.064-4.446-.331-5.566-1.447C2.438 19.576 2.11 18.203 2 16"
    />
  </svg>
);

// ScreenshotViewer.jsx
export const BackIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 6s-6 4.419-6 6s6 6 6 6"
    />
  </svg>
);

export const InfoIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10" />
      <path d="M12.242 17v-5c0-.471 0-.707-.146-.854c-.147-.146-.382-.146-.854-.146m.75-3h.009" />
    </g>
  </svg>
);

export const HeartIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19.463 3.994c-2.682-1.645-5.023-.982-6.429.074c-.576.433-.864.65-1.034.65s-.458-.217-1.034-.65C9.56 3.012 7.219 2.349 4.537 3.994C1.018 6.153.222 13.274 8.34 19.284C9.886 20.427 10.659 21 12 21s2.114-.572 3.66-1.717c8.118-6.008 7.322-13.13 3.803-15.289"
    />
  </svg>
);

export const DownloadIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m3 14l.234.663c.91 2.578 1.365 3.868 2.403 4.602s2.406.735 5.14.735h2.445c2.735 0 4.102 0 5.14-.735c1.039-.734 1.494-2.024 2.404-4.602L21 14m-9 0V4m0 10c-.7 0-2.008-1.994-2.5-2.5M12 14c.7 0 2.008-1.994 2.5-2.5"
    />
  </svg>
);

// BookmarkList.jsx
export const OpenInNewTabIcon = ({ className = "w-4 h-4", ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7m0 0v7m0-7L10 14" />
  </svg>
);

export const LinkIcon = ({ className = "w-4 h-4 shrink-0", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m9.5 14.5l5-5m2.346 5.11l2.61-2.61A5.272 5.272 0 1 0 12 4.544l-2.61 2.61m5.22 9.692L12 19.456A5.272 5.272 0 1 1 4.544 12l2.61-2.61"
    />
  </svg>
);

// SearchBar.jsx
export const SearchSubmitArrowIcon = ({ className = "h-5 w-5", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

export const TagIcon = ({ className = "h-4 w-4 text-purple-500", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
    />
  </svg>
);

// Profile.jsx
export const ImportIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M2.99995 17C2.99995 17.93 2.99995 18.395 3.10217 18.7765C3.37957 19.8117 4.18821 20.6204 5.22349 20.8978C5.60499 21 6.06997 21 6.99995 21L16.9999 21C17.9299 21 18.3949 21 18.7764 20.8978C19.8117 20.6204 20.6203 19.8117 20.8977 18.7765C20.9999 18.395 20.9999 17.93 20.9999 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5 7.49993C16.5 7.49993 13.1858 2.99997 12 2.99996C10.8142 2.99995 7.50002 7.49996 7.50002 7.49996M12 3.99996V16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ExportIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M2.99969 17.0002C2.99969 17.9302 2.99969 18.3952 3.10192 18.7767C3.37932 19.8119 4.18796 20.6206 5.22324 20.898C5.60474 21.0002 6.06972 21.0002 6.99969 21.0002L16.9997 21.0002C17.9297 21.0002 18.3947 21.0002 18.7762 20.898C19.8114 20.6206 20.6201 19.8119 20.8975 18.7767C20.9997 18.3952 20.9997 17.9302 20.9997 17.0002"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.4998 11.5002C16.4998 11.5002 13.1856 16.0002 11.9997 16.0002C10.8139 16.0002 7.49976 11.5002 7.49976 11.5002M11.9997 15.0002V3.00016"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Home.jsx
export const ClipboardHomeIcon = ({ className = "w-5 h-5 text-green-500", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5h6M9 3h6a2 2 0 012 2v14a2 2 0 01-2 2H9a2 2 0 01-2-2V5a2 2 0 012-2z" />
  </svg>
);

export const ScreenshotsHomeIcon = ({ className = "w-5 h-5 text-pink-500", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16M8 4v16m8-16v16" />
  </svg>
);

export const ColorsHomeIcon = ({ className = "w-5 h-5 text-purple-500", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <circle cx="12" cy="12" r="9" strokeWidth="2" />
  </svg>
);

export const MusicHomeIcon = ({ className = "w-5 h-5 text-red-500", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-2v13" />
  </svg>
);

export const SmartHomeIcon = ({ className = "w-5 h-5 text-pink-500", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8a2 2 0 00-1 3.73V15h2v-3.27A2 2 0 0012 8z" />
  </svg>
);

// pages/Bookmarks.jsx
export const AddBookmarkIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M11 2C7.229 2 5.343 2 4.172 3.129C3 4.257 3 6.074 3 9.708v8.273c0 2.306 0 3.459.773 3.871 1.496.8 4.304-1.867 5.637-2.67.773-.465 1.16-.698 1.59-.698s.817.233 1.59.698c1.333.803 4.14 3.47 5.637 2.67c.773-.412.773-1.565.773-3.871V13m-2-3V2m-4 4h8"
    />
  </svg>
);

// pages/Notes.jsx
export const AddNoteIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M16 2v2m-5-2v2M6 2v2m13.5 6c0-3.3 0-4.95-1.025-5.975S15.8 3 12.5 3h-3C6.2 3 4.55 3 3.525 4.025S2.5 6.7 2.5 10v5c0 3.3 0 4.95 1.025 5.975S6.2 22 9.5 22h3m5-8v8m4-4h-8M7 15h4m-4-5h8"
    />
  </svg>
);

// pages/ColorPicker.jsx
export const PlusIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M12 4v16m8-8H4"
    />
  </svg>
);
