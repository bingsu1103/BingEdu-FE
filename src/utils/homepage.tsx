import {
  Headphones,
  FileText,
  PenTool,
  BookMarked,
  Briefcase,
  MessageCircle,
  BookOpen,
} from "lucide-react";

const featuredCourses = [
  {
    id: 1,
    title: "Complete IELTS Preparation Bootcamp",
    instructor: "John Davis",
    image:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    rating: 4.9,
    students: 15420,
    price: 89.99,
    originalPrice: 199.99,
    tag: "Bestseller",
    duration: "42 hours",
  },
  {
    id: 2,
    title: "English Grammar Fundamentals",
    instructor: "Dr. Sarah Kim",
    image:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    rating: 4.8,
    students: 8930,
    price: 79.99,
    originalPrice: 149.99,
    tag: "Hot",
    duration: "28 hours",
  },
  {
    id: 3,
    title: "Business English Communication",
    instructor: "Alex Rodriguez",
    image:
      "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    rating: 4.7,
    students: 12500,
    price: 59.99,
    originalPrice: 119.99,
    tag: "New",
    duration: "35 hours",
  },
];

const categories = [
  {
    name: "IELTS Prep",
    icon: <FileText className="w-10 h-10" />,
    color: "",
  },
  {
    name: "Grammar",
    icon: <PenTool className="w-10 h-10" />,
    color: "",
  },
  {
    name: "Business English",
    icon: <Briefcase className="w-10 h-10" />,
    color: "",
  },
  {
    name: "Conversation",
    icon: <MessageCircle className="w-10 h-10" />,
    color: "",
  },
  {
    name: "Listening",
    icon: <Headphones className="w-10 h-10" />,
    color: "",
  },
  {
    name: "Writing",
    icon: <BookOpen className="w-10 h-10" />,
    color: "",
  },
];

const topStudents = [
  {
    name: "Jennifer Martinez",
    title: "IELTS Band 8.5 Achiever",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2",
    coursesCompleted: 45,
    studyHours: 320,
    rating: 4.9,
    achievement: "Top Performer",
  },
  {
    name: "Mark Thompson",
    title: "Business English Expert",
    avatar:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2",
    coursesCompleted: 38,
    studyHours: 280,
    rating: 4.8,
    achievement: "Grammar Master",
  },
  {
    name: "Lisa Wang",
    title: "Academic Writing Specialist",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2",
    coursesCompleted: 29,
    studyHours: 250,
    rating: 4.9,
    achievement: "Writing Champion",
  },
];

const liveEvents = [
  {
    id: 1,
    title: "IELTS Speaking Practice Session",
    instructor: "Sarah Chen",
    time: "2:00 PM",
    date: "Today",
    attendees: 245,
    type: "Live Session",
  },
  {
    id: 2,
    title: "Grammar Workshop: Advanced Tenses",
    instructor: "Michael Brown",
    time: "4:30 PM",
    date: "Tomorrow",
    attendees: 180,
    type: "Workshop",
  },
  {
    id: 3,
    title: "Business English Presentation Skills",
    instructor: "Emily Davis",
    time: "10:00 AM",
    date: "Sat, Nov 16",
    attendees: 120,
    type: "Masterclass",
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "listening":
      return <Headphones className="w-5 h-5" />;
    case "reading":
      return <BookOpen className="w-5 h-5" />;
    case "writing":
      return <PenTool className="w-5 h-5" />;
    case "grammar":
      return <BookMarked className="w-5 h-5" />;
    case "mixed":
      return <FileText className="w-5 h-5" />;
    default:
      return <BookOpen className="w-5 h-5" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "listening":
      return "from-blue-500 to-blue-600";
    case "reading":
      return "from-green-500 to-green-600";
    case "writing":
      return "from-purple-500 to-purple-600";
    case "grammar":
      return "from-orange-500 to-orange-600";
    case "mixed":
      return "from-pink-500 to-pink-600";
    default:
      return "from-gray-500 to-gray-600";
  }
};

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return date.toLocaleDateString();
};

export default {
  formatTimeAgo,
  getTypeColor,
  getTypeIcon,
  categories,
  liveEvents,
  topStudents,
  featuredCourses,
};
