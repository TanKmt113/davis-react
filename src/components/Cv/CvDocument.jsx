import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { cvData } from '../../constants/cvData';

function CvAvatar({ avatarUrl, name }) {
  return (
    <div className="cv-header-avatar">
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="cv-avatar-img" />
      ) : (
        <div className="cv-avatar-placeholder" aria-hidden="true">
          <Icon icon="material-symbols:person-outline" className="cv-icon cv-icon--lg" />
        </div>
      )}
    </div>
  );
}

CvAvatar.propTypes = {
  avatarUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
};

function CvSection({ title, icon, children }) {
  return (
    <section className="cv-section">
      <h2 className="cv-section-title">
        {icon && <Icon icon={icon} className="cv-icon" />}
        {title}
      </h2>
      {children}
    </section>
  );
}

CvSection.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  children: PropTypes.node.isRequired,
};

function ContactRow({ icon, href, label, external }) {
  const content = (
    <>
      <Icon icon={icon} className="cv-icon" />
      <span>{label}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="cv-contact-link"
      >
        {content}
      </a>
    );
  }

  return <div className="cv-contact-link">{content}</div>;
}

ContactRow.propTypes = {
  icon: PropTypes.string.isRequired,
  href: PropTypes.string,
  label: PropTypes.string.isRequired,
  external: PropTypes.bool,
};

function BulletList({ items }) {
  return (
    <ul className="cv-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

BulletList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function CvDocument({ avatarUrl = '' }) {
  const { contact } = cvData;

  return (
    <article className="cv-document">
      <header className="cv-header">
        <CvAvatar avatarUrl={avatarUrl} name={cvData.name} />
        <div className="cv-header-main">
          <p className="cv-eyebrow">Hồ sơ năng lực</p>
          <h1 className="cv-name">{cvData.name}</h1>
          <p className="cv-title">{cvData.title}</p>
          <p className="cv-location">
            <Icon icon="material-symbols:location-on-outline" className="cv-icon" />
            {cvData.location}
          </p>
          <div className="cv-contact-row">
            <ContactRow icon="material-symbols:call-outline" href={`tel:${contact.phone}`} label={contact.phone} />
            <ContactRow icon="material-symbols:mail-outline" href={`mailto:${contact.email}`} label={contact.email} />
            <ContactRow icon="mdi:linkedin" href={contact.linkedin} label="LinkedIn" external />
            <ContactRow icon="mdi:github" href={contact.github} label="GitHub" external />
          </div>
        </div>
      </header>

      <div className="cv-body">
        <CvSection title="Tổng quan" icon="material-symbols:person-outline">
          {cvData.overview.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="cv-paragraph">{paragraph}</p>
          ))}
        </CvSection>

        <CvSection title="Kinh nghiệm" icon="material-symbols:work-outline">
          {cvData.experiences.map((job) => (
            <div key={`${job.company}-${job.period}`} className="cv-exp-item">
              <div className="cv-exp-header">
                <div>
                  <h3 className="cv-exp-role">{job.role}</h3>
                  <p className="cv-exp-company">{job.company}</p>
                </div>
                <span className="cv-exp-period">{job.period}</span>
              </div>
              <p className="cv-exp-allocation">{job.allocation}</p>

              <div className="cv-subsection">
                <h4 className="cv-subsection-title">Trách nhiệm chính</h4>
                {job.leadership.map((block) => (
                  <div key={block.title} className="cv-block">
                    <h5 className="cv-block-title">{block.title}</h5>
                    <BulletList items={block.items} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CvSection>

        <CvSection title="Dự án tiêu biểu" icon="material-symbols:rocket-launch-outline">
          <div className="cv-projects-list">
            {cvData.projects.map((project, index) => (
              <div key={project.name} className="cv-project">
                <div className="cv-project-head">
                  <span className="cv-project-index">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="cv-project-name">{project.name}</h3>
                </div>
                <p className="cv-project-goal">{project.goal}</p>
                <BulletList items={project.highlights} />
                <p className="cv-project-meta">
                  <strong>Công nghệ:</strong> {project.stack}
                </p>
                <p className="cv-project-meta">
                  <strong>Vai trò:</strong> {project.role}
                </p>
              </div>
            ))}
          </div>
        </CvSection>

        <CvSection title="Kỹ năng" icon="material-symbols:code-rounded">
          <div className="cv-skills-grid">
            {cvData.skills.map((group) => (
              <div key={group.group} className="cv-skill-block">
                <h3 className="cv-skill-group">{group.group}</h3>
                <div className="cv-tags">
                  {group.items.map((skill) => (
                    <span key={skill} className="cv-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CvSection>

        <div className="cv-meta-grid">
          <CvSection title="Học vấn" icon="material-symbols:school-outline">
            <div className="cv-edu-card">
              <p className="cv-edu-school">{cvData.education.school}</p>
              <p className="cv-edu-degree">{cvData.education.degree}</p>
              <p className="cv-edu-meta">{cvData.education.period} · GPA {cvData.education.gpa}</p>
            </div>
          </CvSection>

          <CvSection title="Giải thưởng" icon="material-symbols:emoji-events-outline">
            <div className="cv-award">
              <p className="cv-award-title">{cvData.award.title}</p>
              <p className="cv-award-desc">{cvData.award.description}</p>
            </div>
          </CvSection>
        </div>

        <footer className="cv-footer">
          <span>Cập nhật: {cvData.lastUpdated}</span>
          <span>Hồ sơ năng lực — Fullstack Developer</span>
        </footer>
      </div>
    </article>
  );
}

CvDocument.propTypes = {
  avatarUrl: PropTypes.string,
};
