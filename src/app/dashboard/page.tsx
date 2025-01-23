
"use client";
import { FC, useEffect } from 'react'
import { getSession, signOut } from 'next-auth/react'

const DashboardPage: FC = () => {

  const handleSignOut = async () => {
    // Sign out from the current session
    await signOut({ callbackUrl: '/' });
  }

  useEffect(() => {
    getSession().then((session) => {
      console.log(session);
    });
    return () => {
    }
  }, [])
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600">1,234</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Revenue</h2>
            <p className="text-3xl font-bold text-green-600">$45,678</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Active Projects</h2>
            <p className="text-3xl font-bold text-purple-600">23</p>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border-b pb-4">
                <p className="text-gray-600">Activity item {item}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <button 
        onClick={handleSignOut}
        className="mt-8 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Sign Out
      </button>
    </div>
  )
}

export default DashboardPage