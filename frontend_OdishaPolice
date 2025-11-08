import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Trophy, TrendingUp, AlertCircle, FileText, Award,
  Phone, Facebook, Youtube, MapPin, Mail, Users, Shield
} from 'lucide-react';

const PoliceDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  // ======= Sample Data =======
  const overallStats = {
    totalCases: 15847,
    solvedCases: 12456,
    pendingCases: 3391,
    convictionRate: 78.6
  };

  const districtPerformance = [
    { district: 'Ganjam', arrests: 145, seizures: 89, convictions: 67, score: 95 },
    { district: 'Cuttack', arrests: 132, seizures: 78, convictions: 61, score: 88 },
    { district: 'Puri', arrests: 118, seizures: 71, convictions: 58, score: 82 },
    { district: 'Khordha', arrests: 125, seizures: 65, convictions: 54, score: 81 },
    { district: 'Balasore', arrests: 98, seizures: 52, convictions: 48, score: 73 }
  ];

  const monthlyTrends = [
    { month: 'Jan', cases: 1245, solved: 987, arrests: 234 },
    { month: 'Feb', cases: 1189, solved: 945, arrests: 267 },
    { month: 'Mar', cases: 1312, solved: 1056, arrests: 289 },
    { month: 'Apr', cases: 1267, solved: 1012, arrests: 312 },
    { month: 'May', cases: 1398, solved: 1124, arrests: 298 },
    { month: 'Jun', cases: 1423, solved: 1167, arrests: 325 }
  ];

  const driveWiseData = [
    { name: 'Narcotics', value: 245, color: '#ef4444' },
    { name: 'Firearms', value: 187, color: '#f59e0b' },
    { name: 'Sand Mining', value: 156, color: '#10b981' },
    { name: 'Missing Persons', value: 312, color: '#3b82f6' },
    { name: 'Other', value: 198, color: '#8b5cf6' }
  ];

  const topPerformers = [
    { name: 'SP Ganjam District', achievement: 'Led narcotics enforcement with 18 arrests and 89 kg seizure', image: '👮' },
    { name: 'Cuttack City Police', achievement: 'Achieved 95% conviction rate in cybercrime cases', image: '👮‍♀️' },
    { name: 'Puri SP Office', achievement: 'Recovered 45 missing persons in Q2 2024', image: '👮' }
  ];

  const pressReleases = [
    { date: '2024-10-28', title: 'Major Drug Bust: 50kg Narcotics Seized in Ganjam', category: 'Success' },
    { date: '2024-10-25', title: 'Cyber Fraud Ring Busted: 12 Arrested', category: 'Alert' },
    { date: '2024-10-20', title: 'Missing Child Recovered Within 24 Hours', category: 'Success' }
  ];

  const solvedPercentage = ((overallStats.solvedCases / overallStats.totalCases) * 100).toFixed(1);
  const pendingPercentage = ((overallStats.pendingCases / overallStats.totalCases) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <Award className="w-10 h-10 text-blue-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Smart Police Analytics</h1>
              <p className="text-blue-200 text-sm">Good Work Recognition System</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-200">Last Updated</p>
            <p className="font-semibold">Nov 4, 2025</p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 flex space-x-1">
          {['home', 'about', 'services', 'dashboard'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-semibold capitalize transition-all ${activeTab === tab
                ? 'bg-blue-900 text-white border-b-4 border-blue-500'
                : 'text-gray-700 hover:bg-blue-50'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 transform hover:scale-105 transition-transform">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">Total Cases</p>
                    <p className="text-3xl font-bold">{overallStats.totalCases.toLocaleString()}</p>
                  </div>
                  <FileText className="w-12 h-12 text-blue-500 opacity-80" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 transform hover:scale-105 transition-transform">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">Cases Solved</p>
                    <p className="text-3xl font-bold text-green-600">{overallStats.solvedCases.toLocaleString()}</p>
                    <p className="text-green-600 text-sm">{solvedPercentage}%</p>
                  </div>
                  <Trophy className="w-12 h-12 text-green-500 opacity-80" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500 transform hover:scale-105 transition-transform">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">Pending Cases</p>
                    <p className="text-3xl font-bold text-orange-600">{overallStats.pendingCases.toLocaleString()}</p>
                    <p className="text-orange-600 text-sm">{pendingPercentage}%</p>
                  </div>
                  <AlertCircle className="w-12 h-12 text-orange-500 opacity-80" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 transform hover:scale-105 transition-transform">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">Conviction Rate</p>
                    <p className="text-3xl font-bold text-purple-600">{overallStats.convictionRate}%</p>
                    <p className="text-purple-600 text-sm">+3.2% MoM</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-purple-500 opacity-80" />
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Monthly Performance Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cases" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="solved" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="arrests" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Special Drives Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={driveWiseData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {driveWiseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
                Top Performers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topPerformers.map((performer, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-3 text-center">{performer.image}</div>
                    <h4 className="font-bold text-lg text-gray-800 mb-2">{performer.name}</h4>
                    <p className="text-gray-600 text-sm">{performer.achievement}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Press Releases */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Recent Press Releases</h3>
              <div className="space-y-4">
                {pressReleases.map((release, idx) => (
                  <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-800">{release.title}</h4>
                        <p className="text-sm text-gray-500">{release.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        release.category === 'Success' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {release.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">About Smart Police Analytics</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The Smart Police Analytics platform is a comprehensive good work recognition system designed to
                track, analyze, and celebrate the achievements of police departments across the state.
              </p>
              <p>
                Our mission is to provide transparent, data-driven insights into police performance while
                recognizing excellence in law enforcement. By leveraging modern analytics and visualization
                tools, we help departments identify best practices and areas for improvement.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-4">
                  <Shield className="w-16 h-16 mx-auto text-blue-600 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Transparency</h3>
                  <p className="text-sm text-gray-600">Open data and accountability</p>
                </div>
                <div className="text-center p-4">
                  <Users className="w-16 h-16 mx-auto text-green-600 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Community</h3>
                  <p className="text-sm text-gray-600">Serving citizens effectively</p>
                </div>
                <div className="text-center p-4">
                  <Award className="w-16 h-16 mx-auto text-purple-600 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Excellence</h3>
                  <p className="text-sm text-gray-600">Recognizing outstanding work</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-blue-600 mb-3">Performance Analytics</h3>
                <p className="text-gray-700">Real-time tracking and analysis of police department performance metrics including case resolution rates, arrest statistics, and conviction outcomes.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-green-600 mb-3">Recognition System</h3>
                <p className="text-gray-700">Automated identification and celebration of outstanding police work, helping boost morale and encourage best practices.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-purple-600 mb-3">Data Visualization</h3>
                <p className="text-gray-700">Interactive charts and dashboards that make complex data accessible and actionable for decision-makers.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-orange-600 mb-3">Trend Analysis</h3>
                <p className="text-gray-700">Historical data analysis to identify patterns, predict future trends, and optimize resource allocation.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">District Performance Dashboard</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Districts</option>
                  {districtPerformance.map(d => (
                    <option key={d.district} value={d.district}>{d.district}</option>
                  ))}
                </select>
              </div>

              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={districtPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="district" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="arrests" fill="#3b82f6" />
                  <Bar dataKey="seizures" fill="#10b981" />
                  <Bar dataKey="convictions" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">District Performance Scores</h3>
              <div className="space-y-4">
                {districtPerformance.map((district, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-32 font-semibold text-gray-700">{district.district}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${district.score}%` }}
                      >
                        <span className="text-white text-sm font-bold">{district.score}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>+91-674-2393999</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>dgp@odishapolice.gov.in</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Bhubaneswar, Odisha</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Emergency Services</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">File Complaint</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Track Status</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; 2025 Smart Police Analytics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PoliceDashboard;
