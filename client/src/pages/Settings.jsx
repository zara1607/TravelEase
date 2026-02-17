import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Moon, Globe, Lock, Eye, Shield, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Preferences Section */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Notifications</p>
                    <p className="text-sm text-gray-500">Receive booking updates and offers</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Dark Mode</p>
                    <p className="text-sm text-gray-500">Switch to dark theme</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </Card>

          {/* Account Settings */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Account</h2>
            <div className="space-y-2">
              {[
                { icon: Lock, label: 'Change Password', desc: 'Update your password regularly' },
                { icon: Eye, label: 'Privacy Settings', desc: 'Manage your data and privacy' },
                { icon: Globe, label: 'Language & Region', desc: 'English (India)' },
                { icon: Shield, label: 'Two-Factor Authentication', desc: 'Enhance account security' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 border-2 border-red-200">
            <h2 className="text-lg font-bold text-red-600 mb-4">Danger Zone</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Delete Account</p>
                  <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                </div>
                <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium">
                  Delete
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;