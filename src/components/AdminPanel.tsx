import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Newspaper, 
  Globe, 
  Calendar,
  Plus,
  Edit,
  Trash2,
  Save
} from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('newspapers');
  const [isUploading, setIsUploading] = useState(false);

  const tabs = [
    { id: 'newspapers', label: 'Newspapers', icon: Newspaper },
    { id: 'questions', label: 'Question Papers', icon: FileText },
    { id: 'news', label: 'News Posts', icon: Globe },
    { id: 'events', label: 'Events', icon: Calendar }
  ];

  const handleFileUpload = async (file: File, type: string) => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      alert(`${type} uploaded successfully!`);
    }, 2000);
  };

  const renderNewspaperUpload = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Upload Newspaper</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Newspaper Title
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., The Hindu - Editorial Analysis"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload PDF
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <label htmlFor="newspaper-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Drop files here or click to upload
              </span>
              <input
                id="newspaper-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, 'Newspaper');
                }}
              />
            </label>
          </div>
        </div>
      </div>

      <button
        disabled={isUploading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 
                 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isUploading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Uploading...</span>
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            <span>Save Newspaper</span>
          </>
        )}
      </button>
    </div>
  );

  const renderQuestionPaperUpload = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Upload Question Paper</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exam Title
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., UPSC Prelims 2023"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., General Studies"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="2023"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>UPSC</option>
            <option>Kerala PSC</option>
            <option>SSC</option>
            <option>Banking</option>
            <option>Railway</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload PDF
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <label htmlFor="question-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Drop files here or click to upload
              </span>
              <input
                id="question-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, 'Question Paper');
                }}
              />
            </label>
          </div>
        </div>
      </div>

      <button
        disabled={isUploading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 
                 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isUploading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Uploading...</span>
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            <span>Save Question Paper</span>
          </>
        )}
      </button>
    </div>
  );

  const renderNewsEditor = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Manage News Posts</h3>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add News</span>
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              News Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter news title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>UPSC</option>
              <option>Kerala PSC</option>
              <option>Success Story</option>
              <option>General</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter news content..."
            />
          </div>

          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Publish News</span>
          </button>
        </div>
      </div>

      {/* Existing News List */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-800">Existing News Posts</h4>
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">
            <div>
              <h5 className="font-medium text-gray-900">Sample News Title {item}</h5>
              <p className="text-sm text-gray-500">Published on Jan {10 + item}, 2024</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800">
                <Edit className="w-4 h-4" />
              </button>
              <button className="text-red-600 hover:text-red-800">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEventEditor = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Manage Events</h3>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter event title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Event location"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event description..."
            />
          </div>

          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Create Event</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'newspapers':
        return renderNewspaperUpload();
      case 'questions':
        return renderQuestionPaperUpload();
      case 'news':
        return renderNewsEditor();
      case 'events':
        return renderEventEditor();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <div className="text-sm text-gray-500">
              Civil Servants Club TKMCE
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;