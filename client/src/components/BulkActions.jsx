import React from 'react';

export default function BulkActions({ 
  selectedBookmarks, 
  onSelectAll, 
  onClearSelection, 
  onBulkDelete, 
  onBulkMove,
  totalBookmarks,
  isSelectAll 
}) {
  const selectedCount = selectedBookmarks.length;

  if (selectedCount === 0) {
    return (
      <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isSelectAll}
            onChange={onSelectAll}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm text-gray-600">
            Select all ({totalBookmarks} bookmarks)
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-indigo-900">
          {selectedCount} bookmark{selectedCount !== 1 ? 's' : ''} selected
        </span>
        <button
          onClick={onClearSelection}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          Clear selection
        </button>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={onBulkMove}
          className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Move to Folder
        </button>
        <button
          onClick={onBulkDelete}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Delete Selected
        </button>
      </div>
    </div>
  );
}
