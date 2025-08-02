import {
  GraduationCap,
  Users,
  Trophy,
  BookOpen,
  Target,
  Globe,
  ArrowRight,
  Star,
  CheckCircle,
  Bot,
  Calendar,
  Sparkles,
  Award,
  Brain,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Heart,
  Lightbulb,
  Rocket,
} from "lucide-react";
import AnimatedSection from "./animatedSection";
import StaggeredAnimation from "./staggeredAnimated";

const AboutPage = () => {
  const stats = [
    { number: "1,000+", label: "Học viên tin tựa", icon: Users },
    { number: "95%", label: "Tỷ lệ đỗ các kỳ thi", icon: Trophy },
    { number: "50+", label: "Giảng viên chuyên nghiệp", icon: GraduationCap },
    { number: "24/7", label: "AI chấm chữa bài", icon: Bot },
  ];

  const features = [
    "Phương pháp giảng dạy hiện đại, tương tác cao",
    "Giảng viên bản xứ và Việt Nam kinh nghiệm",
    "AI thông minh chấm chữa bài tự động 24/7",
    "Lộ trình học cá nhân hóa theo từng mục tiêu",
    "Kho đề thi thực tế được cập nhật liên tục",
    "Cộng đồng học tập năng động và tích cực",
  ];

  const achievements = [
    {
      icon: Award,
      title: "Top 3 EdTech Startup 2025",
      desc: "Được vinh danh trong cuộc thi khởi nghiệp quốc gia",
    },
    {
      icon: Brain,
      title: "AI Technology Pioneer",
      desc: "Tiên phong ứng dụng AI trong giáo dục tiếng Anh",
    },
    {
      icon: TrendingUp,
      title: "300% Growth Rate",
      desc: "Tăng trưởng vượt bậc trong 6 tháng đầu tiên",
    },
    {
      icon: Heart,
      title: "4.9/5 Student Rating",
      desc: "Điểm đánh giá cao từ cộng đồng học viên",
    },
  ];

  const technologies = [
    {
      name: "Machine Learning",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Natural Language Processing",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Real-time Analytics",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Cloud Computing",
      icon: Globe,
      color: "from-orange-500 to-red-500",
    },
  ];

  const founder = {
    name: "Ngô Gia An",
    role: "CEO & Founder",
    education:
      "Sinh viên năm cuối chuyên ngành Công nghệ thông tin, đam mê phát triển nền tảng học trực tuyến",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300/20 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-300/15 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-green-300/20 rounded-full animate-pulse"></div>

          {/* Floating Icons */}
          <div className="absolute top-16 right-1/4 animate-float">
            <BookOpen className="h-8 w-8 text-white/30" />
          </div>
          <div className="absolute bottom-32 left-1/3 animate-float-delayed">
            <Trophy className="h-6 w-6 text-yellow-300/40" />
          </div>
          <div className="absolute top-1/3 left-16 animate-float-slow">
            <Star className="h-10 w-10 text-white/25" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center relative z-10">
            <AnimatedSection animation="fadeIn" delay={200}>
              <div className="flex items-center justify-center mb-6 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <GraduationCap className="h-12 w-12 sm:h-16 sm:w-16 mr-3 sm:mr-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="relative">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                    BingEdu
                  </h1>
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={400}>
              <div className="mb-6">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                  <Rocket className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">
                    AI-Powered Learning Revolution
                  </span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={600}>
              <p className="text-lg sm:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed px-4 mb-8">
                Nền tảng học tiếng Anh trực tuyến hàng đầu Việt Nam, đồng hành
                cùng bạn chinh phục các kỳ thi quốc tế
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={800}>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">
                      Khởi nghiệp năm 2025
                    </span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">
                      Chứng nhận ISO 27001
                    </span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">24/7 AI Support</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={1000}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Trải nghiệm miễn phí
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                  Xem demo AI
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </header>

      {/* Achievements Banner */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-black mb-2">
                Thành tựu nổi bật
              </h2>
              <p className="text-black/70">
                Những cột mốc quan trọng trong hành trình phát triển
              </p>
            </div>
          </AnimatedSection>

          <StaggeredAnimation
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerDelay={150}
          >
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className="bg-background rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-sm">
                    {achievement.title}
                  </h3>
                  <p className="text-foreground/70 text-xs leading-relaxed">
                    {achievement.desc}
                  </p>
                </div>
              );
            })}
          </StaggeredAnimation>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">
                Con số ấn tượng
              </h2>
              <p className="text-lg text-black/70">
                Minh chứng cho chất lượng và uy tín của BingEdu
              </p>
            </div>
          </AnimatedSection>

          <StaggeredAnimation
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            staggerDelay={200}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group relative">
                  <div className="bg-background rounded-xl shadow-lg p-4 sm:p-6 transform group-hover:scale-105 transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:rotate-12 transition-transform duration-300">
                        <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-foreground mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {stat.number}
                      </div>
                    </div>
                    <div className="text-foreground/70 text-xs sm:text-sm">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </StaggeredAnimation>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Công nghệ tiên tiến
              </h2>
              <p className="text-lg sm:text-xl opacity-90 max-w-3xl mx-auto px-4">
                Nền tảng AI và Machine Learning hàng đầu thế giới
              </p>
            </div>
          </AnimatedSection>

          <StaggeredAnimation
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerDelay={150}
          >
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform group-hover:scale-105 transition-all duration-300 hover:bg-white/20">
                    <div
                      className={`bg-gradient-to-r ${tech.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold mb-2">{tech.name}</h3>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${tech.color} h-2 rounded-full transition-all duration-1000 group-hover:w-full`}
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </StaggeredAnimation>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <AnimatedSection animation="fadeInLeft">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full opacity-20"></div>
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                    Sứ mệnh của chúng tôi
                  </h2>
                </div>
                <div className="bg-background rounded-xl p-6 mb-6">
                  <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-medium">
                    "Democratizing English Education Through AI Innovation"
                  </p>
                </div>
                <p className="text-base sm:text-lg text-foreground/80 mb-6 leading-relaxed relative">
                  BingEdu được sinh ra với sứ mệnh dân chủ hóa việc học tiếng
                  Anh chất lượng cao. Chúng tôi tin rằng mọi người đều xứng đáng
                  có cơ hội tiếp cận giáo dục tiếng Anh xuất sắc, không phân
                  biệt địa lý hay hoàn cảnh kinh tế.
                </p>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                  Với công nghệ AI tiên tiến và hệ thống chấm chữa bài tự động,
                  chúng tôi tạo ra trải nghiệm học tập cá nhân hóa, giúp học
                  viên không chỉ đạt điểm số mục tiêu mà còn thực sự làm chủ
                  tiếng Anh.
                </p>

                {/* Mission Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">3+</div>
                    <div className="text-sm text-black/70">Tỉnh thành</div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      24/7
                    </div>
                    <div className="text-sm text-black/70">AI Support</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInRight" delay={200}>
              <div className="relative">
                <div className="absolute -top-20 -right-8 w-32 h-32 bg-purple-100 rounded-full opacity-20"></div>
                <img
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Students learning online"
                  width={500}
                  className="rounded-2xl shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Tại sao chọn BingEdu?
              </h2>
              <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto px-4">
                Chúng tôi kết hợp phương pháp giáo dục tiên tiến với công nghệ
                hiện đại để mang đến trải nghiệm học tập vượt trội
              </p>
            </div>
          </AnimatedSection>

          <StaggeredAnimation
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            staggerDelay={100}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-start">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-foreground/80 leading-relaxed relative z-10">
                    {feature}
                  </p>
                </div>
              </div>
            ))}
          </StaggeredAnimation>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
                Câu chuyện của chúng tôi
              </h2>
              <div className="prose prose-lg mx-auto text-foreground/80">
                <p className="text-lg sm:text-xl leading-relaxed mb-6">
                  BingEdu ra đời từ nhận thức sâu sắc về những thách thức mà học
                  viên Việt Nam gặp phải khi chinh phục các kỳ thi tiếng Anh
                  quốc tế. Năm 2025, với sự bùng nổ của công nghệ AI và học trực
                  tuyến, chúng tôi quyết định xây dựng một nền tảng hoàn toàn
                  mới.
                </p>
                <p className="text-base sm:text-lg leading-relaxed mb-6">
                  Khác với các phương pháp truyền thống, BingEdu tập trung vào
                  việc phát triển tư duy tiếng Anh tự nhiên thông qua các tình
                  huống thực tế và hệ thống AI chấm chữa bài thông minh. Chúng
                  tôi không chỉ dạy để thi mà còn giúp học viên ứng dụng tiếng
                  Anh trong cuộc sống và công việc.
                </p>
                <p className="text-base sm:text-lg leading-relaxed">
                  Với hơn 1,000 học viên tin tưởng và tỷ lệ đỗ 95%, BingEdu đã
                  và đang khẳng định vị thế là người bạn đồng hành đáng tin cậy
                  trên hành trình chinh phục tiếng Anh của mọi người.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Người sáng lập
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-foreground/70 px-4">
                Tầm nhìn và đam mê đang dẫn dắt BingEdu
              </p>
              <div className="flex justify-center mt-4">
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="scaleIn" delay={200}>
            <div className="flex justify-center">
              <div className="bg-background rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 max-w-md w-full group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-2 rounded-full">
                  <Sparkles className="h-4 w-4" />
                </div>
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-64 sm:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="p-6 sm:p-8 relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                    {founder.name}
                  </h3>
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-6 h-6 rounded-full flex items-center justify-center mr-2">
                      <GraduationCap className="h-3 w-3 text-white" />
                    </div>
                    <p className="text-blue-600 font-semibold text-lg">
                      {founder.role}
                    </p>
                  </div>
                  <p className="text-foreground/70 text-sm sm:text-base leading-relaxed">
                    {founder.education}
                  </p>

                  {/* Founder Stats */}
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">22</div>
                      <div className="text-xs text-foreground/70">Tuổi</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">
                        2025
                      </div>
                      <div className="text-xs text-foreground/70">
                        Khởi nghiệp
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Sẵn sàng bắt đầu hành trình của bạn?
            </h2>
            <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto px-4">
              Hãy để BingEdu đồng hành cùng bạn chinh phục ước mơ du học, định
              cư hay thăng tiến trong sự nghiệp
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-background text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                Khám phá khóa học
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300">
                Tư vấn miễn phí
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default AboutPage;
