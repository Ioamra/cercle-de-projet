import { useAuth } from '../../lib/store';

function AdminDashboard() {
  const { state } = useAuth();
  const { user } = state;

  if (!user || user.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
        <p className="text-gray-600 mt-2">You don't have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          <span className="h-5 w-5">⚙️</span>
          <span>Settings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="h-6 w-6 text-green-600">👥</span>
            <h2 className="text-xl font-semibold">Total Users</h2>
          </div>
          <p className="text-3xl font-bold text-green-600">1,234</p>
          <p className="text-sm text-gray-600 mt-1">+12% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="h-6 w-6 text-green-600">📖</span>
            <h2 className="text-xl font-semibold">Lessons</h2>
          </div>
          <p className="text-3xl font-bold text-green-600">45</p>
          <p className="text-sm text-gray-600 mt-1">Active lessons</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="h-6 w-6 text-green-600">❓</span>
            <h2 className="text-xl font-semibold">Quizzes</h2>
          </div>
          <p className="text-3xl font-bold text-green-600">128</p>
          <p className="text-sm text-gray-600 mt-1">Total quizzes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <span className="h-4 w-4 text-green-600">👥</span>
                  </div>
                  <div>
                    <p className="font-medium">New User {i}</p>
                    <p className="text-sm text-gray-600">user{i}@example.com</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2h ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100">Create New Quiz</button>
            <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100">Add New Lesson</button>
            <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100">Manage Users</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
