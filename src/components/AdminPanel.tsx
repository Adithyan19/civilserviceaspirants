import React, { useState } from 'react';
import {
  Upload,
  FileText,
  Newspaper,
  Globe,
  Calendar,
  Clock,
  Phone,
  MapPin,
  Save,
} from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('newspapers');
  const [isUploading, setIsUploading] = useState(false);

  // Newspaper
  const [newspaperTitle, setNewspaperTitle] = useState('');
  const [newspaperDate, setNewspaperDate] = useState('');
  const [newspaperFile, setNewspaperFile] = useState<File | null>(null);

  // Question Paper
  const [examTitle, setExamTitle] = useState('');
  const [examSubject, setExamSubject] = useState('');
  const [examYear, setExamYear] = useState('');
  const [examCategory, setExamCategory] = useState('');
  const [questionPaperFile, setQuestionPaperFile] = useState<File | null>(null);

  // News
  const [newsTitle, setNewsTitle] = useState('');
  const [newsUrl, setNewsUrl] = useState('');
  const [newsCategory, setNewsCategory] = useState('General');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Event (added date field)
  const [eventForm, setEventForm] = useState({
    coverPhoto: '',
    name: '',
    description: '',
    participantLimit: '',
    venue: '',
    mode: 'offline',
    organizerContact1: '',
    organizerContact2: '',
    time: '',
    date: '',
  });
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null);
  const [isEventUploading, setIsEventUploading] = useState(false);

  const tabs = [
    { id: 'newspapers', label: 'Newspapers', icon: Newspaper },
    { id: 'questions', label: 'Question Papers', icon: FileText },
    { id: 'news', label: 'News Posts', icon: Globe },
    { id: 'events', label: 'Events', icon: Calendar },
  ];

  // ---- Newspaper save handler ----
  const handleNewspaperSave = async () => {
    if (!newspaperTitle || !newspaperDate || !newspaperFile) {
      alert('Please fill all fields and upload a PDF.');
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append('title', newspaperTitle);
    formData.append('date', newspaperDate);
    formData.append('pdf', newspaperFile);
    formData.append('type_id', '2');
    formData.append('uploaded_by', '1'); // Replace as needed
    try {
      const res = await fetch('http://localhost:5000/api/admin/newspapers', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      alert('Newspaper saved successfully!');
      setNewspaperTitle('');
      setNewspaperDate('');
      setNewspaperFile(null);
    } catch (error) {
      alert(
        'Error uploading newspaper: ' +
          (error instanceof Error ? error.message : String(error))
      );
    } finally {
      setIsUploading(false);
    }
  };

  // ---- Question paper save handler ----
  const handleQuestionPaperSave = async () => {
    if (!examTitle || !examYear || !questionPaperFile) {
      alert('Please fill all fields and upload a PDF.');
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append('title', examTitle);
    formData.append('date', examYear);
    formData.append('pdf', questionPaperFile);
    formData.append('type_id', '1');
    formData.append('uploaded_by', '1');
    try {
      const res = await fetch('http://localhost:5000/api/admin/questionpapers', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      alert('Question paper saved successfully!');
      setExamTitle('');
      setExamYear('');
      setExamCategory('');
      setExamSubject('');
      setQuestionPaperFile(null);
    } catch (error) {
      alert(
        'Error uploading question paper: ' +
          (error instanceof Error ? error.message : String(error))
      );
    } finally {
      setIsUploading(false);
    }
  };

  // ---- News submit handler ----
  const handleNewsSubmit = async () => {
    if (!newsTitle || !newsUrl || !newsCategory) {
      alert('Please enter both title and link.');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/admin/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newsTitle,
          url: newsUrl,
          category: newsCategory,
          posted_by: '1',
        }),
      });
      if (!res.ok) throw new Error('Failed to publish news');
      alert('News published successfully!');
      setNewsTitle('');
      setNewsUrl('');
    } catch (err) {
      alert('Error: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---- Event input change handler ----
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEventForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---- Event submit handler with date field ----
  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !eventForm.name ||
      !eventForm.description ||
      !eventForm.participantLimit ||
      !eventForm.venue ||
      !eventForm.organizerContact1 ||
      !eventForm.organizerContact2 ||
      !eventForm.date
    ) {
      alert('Please fill all required fields including date.');
      return;
    }

    setIsEventUploading(true);
    const formData = new FormData();

    if (coverPhotoFile) {
      formData.append('coverPhoto', coverPhotoFile);
    } else if (eventForm.coverPhoto) {
      formData.append('coverPhotoUrl', eventForm.coverPhoto);
    }

    formData.append('name', eventForm.name);
    formData.append('description', eventForm.description);
    formData.append('participantLimit', eventForm.participantLimit);
    formData.append('venue', eventForm.venue);
    formData.append('mode', eventForm.mode);
    formData.append('organizerContact1', eventForm.organizerContact1);
    formData.append('organizerContact2', eventForm.organizerContact2);
    formData.append('time', eventForm.time);
    formData.append('date', eventForm.date);

    try {
      const res = await fetch('http://localhost:5000/api/admin/events', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to create event');
      alert('Event created successfully!');
      setEventForm({
        coverPhoto: '',
        name: '',
        description: '',
        participantLimit: '',
        venue: '',
        mode: 'offline',
        organizerContact1: '',
        organizerContact2: '',
        time: '',
        date: '',
      });
      setCoverPhotoFile(null);
    } catch (err) {
      alert('Error creating event: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsEventUploading(false);
    }
  };

  // ---- Render functions for each tab ----

  const renderNewspaperUpload = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Upload Newspaper
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Newspaper Title
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newspaperTitle}
            onChange={(e) => setNewspaperTitle(e.target.value)}
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
            value={newspaperDate}
            onChange={(e) => setNewspaperDate(e.target.value)}
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
                  if (file) setNewspaperFile(file);
                }}
              />
            </label>
            {newspaperFile && (
              <span className="block text-xs mt-2 text-gray-500">
                Selected: {newspaperFile.name}
              </span>
            )}
          </div>
        </div>
      </div>
      <button
        disabled={isUploading}
        onClick={handleNewspaperSave}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Upload Question Paper
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exam Title
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={examTitle}
            onChange={(e) => setExamTitle(e.target.value)}
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
            value={examSubject}
            onChange={(e) => setExamSubject(e.target.value)}
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
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={examYear}
            onChange={(e) => setExamYear(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={examCategory}
            onChange={(e) => setExamCategory(e.target.value)}
          >
            <option value="">Select a Category</option>
            <option value="UPSC">UPSC</option>
            <option value="Kerala PSC">Kerala PSC</option>
            <option value="SSC">SSC</option>
            <option value="Banking">Banking</option>
            <option value="Railway">Railway</option>
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
                  if (file) setQuestionPaperFile(file);
                }}
              />
            </label>
            {questionPaperFile && (
              <span className="block text-xs mt-2 text-gray-500">
                Selected: {questionPaperFile.name}
              </span>
            )}
          </div>
        </div>
      </div>
      <button
        disabled={isUploading}
        onClick={handleQuestionPaperSave}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
        <h3 className="text-xl font-semibold text-gray-800">
          Manage News Posts
        </h3>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              News Link
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/news/article"
              value={newsUrl}
              onChange={(e) => setNewsUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newsCategory}
              onChange={(e) => setNewsCategory(e.target.value)}
            >
              <option>Global</option>
              <option>India</option>
              <option>Kerala</option>
              <option>Placement</option>
              <option>TKMCE</option>
              <option>UPSC</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Headline
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter news title"
              value={newsTitle}
              onChange={(e) => setNewsTitle(e.target.value)}
            />
          </div>
          <button
            onClick={handleNewsSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Publish News</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const renderEventEditor = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Create New Event
      </h2>
      <form onSubmit={handleEventSubmit} className="space-y-6">
        {/* Cover Photo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Cover Photo
          </label>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="url"
                name="coverPhoto"
                value={eventForm.coverPhoto}
                onChange={handleInputChange}
                placeholder="Enter image URL or upload"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {coverPhotoFile && (
                <div className="mt-2 text-xs text-gray-500">
                  Uploaded: {coverPhotoFile.name}
                </div>
              )}
            </div>
            <label
              htmlFor="cover-photo-upload"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload</span>
              <input
                id="cover-photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setCoverPhotoFile(file);
                }}
              />
            </label>
          </div>
        </div>

        {/* Event Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Name
          </label>
          <input
            type="text"
            name="name"
            value={eventForm.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter event name"
          />
        </div>

        {/* Event Date - NEW */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Date
          </label>
          <input
            type="date"
            name="date"
            value={eventForm.date}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Description
          </label>
          <textarea
            name="description"
            value={eventForm.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Describe the event..."
          />
        </div>

        {/* Participant Limit & Venue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Participant Limit
            </label>
            <input
              type="number"
              name="participantLimit"
              value={eventForm.participantLimit}
              onChange={handleInputChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Max participants"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Venue
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                name="venue"
                value={eventForm.venue}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Event venue"
              />
            </div>
          </div>
        </div>

        {/* Mode & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Mode
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                name="mode"
                value={eventForm.mode}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="offline">Offline</option>
                <option value="online">Online</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organizer Contact 1
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="tel"
                name="organizerContact1"
                value={eventForm.organizerContact1}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Contact number"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="time"
                name="time"
                value={eventForm.time}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organizer Contact 2
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="tel"
                name="organizerContact2"
                value={eventForm.organizerContact2}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Contact number"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isEventUploading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50"
          >
            {isEventUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Creating...</span>
              </>
            ) : (
              <>Create Event</>
            )}
          </button>
        </div>
      </form>
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
              Civil Service aspirants Club TKMCE
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
