import PropTypes from 'prop-types';
import { wowProps } from '../../utils/wowProps';

const SectionHeading = ({ title, subtitle, useWow = true, animation = 'fadeInUp' }) => {
  const wow = useWow ? wowProps('mb-12 text-center portfolio-heading-inner', animation) : { className: 'mb-12 text-center portfolio-heading-inner' };

  return (
    <header {...wow}>
      <h2 className="font-headline-lg text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-3 bg-clip-text text-transparent bg-gradient-to-r from-text-primary via-text-primary to-text-secondary">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body-lg text-body-lg text-text-secondary max-w-2xl mx-auto mt-2 leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="w-16 h-1 bg-gradient-to-r from-accent-purple to-primary mx-auto mt-4 rounded-full"></div>
    </header>
  );
};

SectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  useWow: PropTypes.bool,
  animation: PropTypes.string,
};

export default SectionHeading;
