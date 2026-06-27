import PropTypes from 'prop-types';

const SectionHeading = ({ title, subtitle, useAos = true }) => {
  const aosProps = useAos ? { 'data-aos': 'fade-up', 'data-aos-duration': '800' } : {};

  return (
    <header className="mb-12 text-center portfolio-heading-inner" {...aosProps}>
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
  useAos: PropTypes.bool,
};

export default SectionHeading;
