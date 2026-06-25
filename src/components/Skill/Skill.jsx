import PropTypes from 'prop-types';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Icon } from '@iconify/react';

const Skill = ({ data }) => {
  const { title, text } = data;

  const categories = [
    {
      title: "Frontend Development",
      description: "Phát triển giao diện responsive, tối ưu SEO, mượt mà và trực quan với các framework hiện đại.",
      icon: "material-symbols:web-outline",
      iconColor: "text-primary",
      skills: ["ReactJS", "Next.js", "VueJS", "Nuxt 3", "TypeScript", "Tailwind CSS", "Bootstrap", "GSAP"]
    },
    {
      title: "Backend Development",
      description: "Xây dựng hệ thống backend hiệu năng cao, thiết kế RESTful API bảo mật và cấu trúc microservices.",
      icon: "material-symbols:dns-outline",
      iconColor: "text-accent-purple",
      skills: ["Node.js", "NestJS", "Express", "PHP", "Laravel", "RESTful API", "JWT/OAuth2", "GraphQL"]
    },
    {
      title: "Cơ sở dữ liệu & Caching",
      description: "Thiết kế cơ sở dữ liệu tối ưu, phân tích truy vấn, lập chỉ mục và quản lý dữ liệu lớn.",
      icon: "material-symbols:database-outline",
      iconColor: "text-yellow-400",
      skills: ["MySQL", "MongoDB", "PostgreSQL", "SQL Server", "Redis", "Prisma ORM", "Query Tuning"]
    },
    {
      title: "DevOps & Tự động hóa",
      description: "Triển khai tự động hóa CI/CD, container hóa ứng dụng và tự động hóa quy trình nghiệp vụ.",
      icon: "material-symbols:cloud-done-outline",
      iconColor: "text-red-400",
      skills: ["Docker", "GitHub Actions", "n8n", "AWS EC2", "aaPanel", "cPanel", "Linux / Ubuntu"]
    }
  ];

  return (
    <section id="skills" className="relative py-24 bg-transparent overflow-hidden z-10">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-accent-purple/10 blur-[100px] top-[10%] right-[-5%]"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full bg-primary-container/10 blur-[100px] bottom-[10%] left-[-5%]"></div>
      </div>

      <div className="max-w-container-max mx-auto w-full px-6 relative z-10">
        <div className="mb-16 text-center md:text-left">
          <SectionHeading title="Kỹ năng chuyên môn" />
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-text-primary mb-4 bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary">
            {title}
          </h2>
          <p className="font-body-lg text-body-lg text-text-secondary max-w-3xl leading-relaxed">
            {text}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="glass-card rounded-2xl p-8 border border-white/5 bg-surface/30 backdrop-blur-xl transition-all duration-400 hover:-translate-y-2 hover:bg-surface/50 hover:border-primary/20 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] relative overflow-hidden group"
            >
              {/* Top gradient border overlay on card hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-purple to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-surface-variant/50 rounded-xl border border-border-slate/50 flex items-center justify-center">
                  <Icon icon={cat.icon} className={`text-2xl ${cat.iconColor}`} />
                </div>
                <h3 className="font-headline-md text-headline-md text-text-primary font-semibold">{cat.title}</h3>
              </div>

              <p className="font-body-base text-body-base text-text-secondary mb-6 leading-relaxed">
                {cat.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="bg-primary/5 hover:bg-primary/20 text-primary hover:text-text-primary px-3.5 py-1.5 rounded-full font-mono-label text-mono-label border border-primary/10 transition-all duration-300 cursor-pointer"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Skill.propTypes = {
  data: PropTypes.object,
};

export default Skill;
