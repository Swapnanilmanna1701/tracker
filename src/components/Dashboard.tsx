import { LogOut, Search, User, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { FilterType, Task, TaskStats } from "../types";
import { sampleTasks, storageUtils } from "../utils/localStorage";
import GlassInput from "./GlassInput";
import ParticleBackground from "./ParticleBackground";
import ProfileSection from "./ProfileSection";
import TaskFilter from "./TaskFilter";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ username, onLogout }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  // Load tasks on component mount
  useEffect(() => {
    const savedTasks = storageUtils.getTasks();
    if (savedTasks.length === 0) {
      // Load sample tasks if no tasks exist
      setTasks(sampleTasks);
      storageUtils.saveTasks(sampleTasks);
    } else {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks whenever tasks change
  useEffect(() => {
    storageUtils.saveTasks(tasks);
  }, [tasks]);

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Apply status filter
    if (activeFilter === "completed") {
      filtered = filtered.filter((task) => task.completed);
    } else if (activeFilter === "pending") {
      filtered = filtered.filter((task) => !task.completed);
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(term) ||
          task.description?.toLowerCase().includes(term) ||
          task.category?.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [tasks, activeFilter, searchTerm]);

  // Calculate task statistics
  const taskStats: TaskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;

    return { total, completed, pending };
  }, [tasks]);

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleAddTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleLogout = () => {
    storageUtils.removeUser();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <ParticleBackground />

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-violet-600/5 to-purple-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-600/5 to-cyan-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-indigo-600/3 to-purple-600/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="bg-black/20 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 p-4 sm:p-8 mb-6 sm:mb-8 relative overflow-hidden">
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-violet-500/5 rounded-2xl sm:rounded-3xl"></div>

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-violet-500/20 to-purple-600/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-violet-400/30">
                  <User className="w-7 h-7 sm:w-8 sm:h-8 text-violet-300" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-violet-200 to-purple-200 bg-clip-text text-transparent">
                    Welcome back, {username}!
                  </h1>
                  <p className="text-gray-300/80 text-base sm:text-lg">
                    Manage your tasks efficiently
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 mt-4 sm:mt-0">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="p-2 sm:p-3 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 rounded-xl hover:bg-white/10"
                >
                  <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Glass Effect Logout Button with Red Gradient */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <button
                    onClick={handleLogout}
                    className="relative flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 text-white font-semibold rounded-xl overflow-hidden transition-all duration-500 transform hover:scale-105 group"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.15) 50%, rgba(185, 28, 28, 0.15) 100%)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      boxShadow:
                        "0 8px 32px rgba(239, 68, 68, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <div className="relative z-10 flex items-center gap-2">
                      <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                      <span className="hidden sm:inline">Logout</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 via-red-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Search Bar */}
            {showSearch && (
              <div className="mt-4 sm:mt-6 relative">
                <div className="relative">
                  <GlassInput
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search tasks by title, description, or category..."
                    className="pl-10 pr-10 sm:pl-12 sm:pr-12"
                  />
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-300 hover:rotate-90"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Section */}
        <div className="mb-6 sm:mb-8">
          <ProfileSection username={username} stats={taskStats} />
        </div>

        {/* Task Filter */}
        <div className="mb-6 sm:mb-8">
          <TaskFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            stats={taskStats}
          />
        </div>

        {/* Task Form */}
        <div className="mb-6 sm:mb-8">
          <TaskForm
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            editingTask={editingTask}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        {/* Task List */}
        <div className="mb-6 sm:mb-8">
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
        </div>

        {/* Search Results Info */}
        {searchTerm && (
          <div className="text-center">
            <div className="inline-block bg-black/20 backdrop-blur-xl rounded-xl px-4 py-2 sm:px-6 sm:py-3 border border-white/10">
              <span className="text-gray-300 text-xs sm:text-sm">
                Showing{" "}
                <span className="text-violet-400 font-bold">
                  {filteredTasks.length}
                </span>{" "}
                task(s) matching
                <span className="text-white font-semibold">
                  {" "}
                  "{searchTerm}"
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
