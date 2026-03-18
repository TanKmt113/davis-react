import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';

const SinglePortfolio = ({ data, onClickDetail }) => {
  const { title, subTitle, effect, duration, delay } = data;

  return (
    <div className="col-lg-4 col-md-6" data-aos={effect} data-aos-duration={duration} data-aos-delay={delay}>
      <div className="st-portfolio-card" onClick={() => onClickDetail(data)}>
        <div className="st-portfolio-card-icon">
          <Icon icon="mdi:code-braces" />
        </div>
        <h3 className="st-portfolio-card-title">{title}</h3>
        <p className="st-portfolio-card-subtitle">{subTitle}</p>
        <span className="st-portfolio-card-link">
          Chi tiết <Icon icon="mdi:arrow-right" />
        </span>
      </div>
    </div>
  );
};

SinglePortfolio.propTypes = {
  data: PropTypes.object,
};

export default SinglePortfolio;
