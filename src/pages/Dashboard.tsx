import { useEffect, useState } from 'react';
import { 
  LogOut, 
  User, 
  Wheat,
  TrendingUp,
  Calendar,
  Settings,
  Bell,
  Search,
  Menu,
  ChevronRight,
  Droplets,
  Sun,
  Thermometer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface DashboardProps {
  onLogout: () => void;
}

interface UserData {
  email: string;
  id: number;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('cerealpro_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const handleLogout = () => {
    onLogout();
    toast.success('Logged out successfully');
  };

  const stats = [
    { title: 'Total Fields', value: '12', icon: Wheat, color: 'bg-amber-100 text-amber-700' },
    { title: 'Active Crops', value: '8', icon: TrendingUp, color: 'bg-green-100 text-green-700' },
    { title: 'This Month', value: '24', icon: Calendar, color: 'bg-blue-100 text-blue-700' },
  ];

  const weatherData = {
    temp: 24,
    humidity: 65,
    condition: 'Partly Cloudy',
    location: 'Farm Location'
  };

  const recentActivities = [
    { title: 'Wheat field irrigated', time: '2 hours ago', icon: Droplets },
    { title: 'Fertilizer applied - Corn', time: '5 hours ago', icon: Wheat },
    { title: 'Weather alert: Rain expected', time: '1 day ago', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Menu */}
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <img src="/logo.png" alt="CerealPro" className="w-8 h-8" />
                      CerealPro
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="mt-8 space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      <Wheat className="w-5 h-5 mr-3" />
                      My Fields
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <TrendingUp className="w-5 h-5 mr-3" />
                      Analytics
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Calendar className="w-5 h-5 mr-3" />
                      Schedule
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="w-5 h-5 mr-3" />
                      Settings
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
              
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="CerealPro" className="w-8 h-8" />
                <span className="text-xl font-bold text-gray-900 hidden sm:block">CerealPro</span>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-4 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search fields, crops..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              
              <div className="flex items-center gap-2 ml-2">
                <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {user?.email.split('@')[0]}
                </span>
              </div>

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
                className="ml-2"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {greeting}, {user?.email.split('@')[0]}!
          </h1>
          <p className="text-gray-500 mt-1">
            Here's what's happening on your farm today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weather & Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weather Card */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-500" />
                Weather
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold text-gray-900">{weatherData.temp}°C</p>
                  <p className="text-gray-500">{weatherData.condition}</p>
                  <p className="text-sm text-gray-400 mt-1">{weatherData.location}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    {weatherData.humidity}% Humidity
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    Feels like {weatherData.temp + 2}°C
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Activity</span>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  View all
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <activity.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Add Field', icon: Wheat },
              { label: 'Record Activity', icon: Calendar },
              { label: 'View Reports', icon: TrendingUp },
              { label: 'Settings', icon: Settings },
            ].map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 hover:border-gray-900 hover:bg-gray-50"
              >
                <action.icon className="w-6 h-6" />
                <span className="text-sm">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
