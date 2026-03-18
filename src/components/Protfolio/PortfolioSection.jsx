import PropTypes from 'prop-types';
import './Portfolio.scss';
import SectionHeading from '../SectionHeading/SectionHeading';
import { useState } from 'react';
import SinglePortfolio from './SinglePortfolio';
import { Icon } from '@iconify/react';

const PortfolioSection = ({ data }) => {
  const { portfolioItems } = data;

  // Detail popup state
  const [selectedItem, setSelectedItem] = useState(null);

  const openDetail = (item) => {
    setSelectedItem(item);
  };

  const closeDetail = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <section id="portfolio" className="st-dark-bg">
        <div className="st-height-b100 st-height-lg-b80"></div>
        <SectionHeading title={'Dự án'} />
        <div className="container">
          <div className="row">
            {portfolioItems.map((element, index) => (
              <SinglePortfolio data={element} key={index} onClickDetail={openDetail} />
            ))}
          </div>
        </div>
        <div className="st-height-b100 st-height-lg-b80"></div>
      </section>

      {/* Detail Popup */}
      {selectedItem && (
        <div className="st-portfolio-popup-overlay" onClick={closeDetail}>
          <div className="st-portfolio-popup" onClick={(e) => e.stopPropagation()}>
            <button className="st-portfolio-popup-close" onClick={closeDetail}>
              <Icon icon="mdi:close" />
            </button>
            <h3 className="st-portfolio-popup-title">{selectedItem.title}</h3>
            <span className="st-portfolio-popup-tag">{selectedItem.subTitle}</span>
            <div className="st-portfolio-popup-desc">
              {selectedItem.description.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            {selectedItem.productLink && selectedItem.productLink !== '#' && (
              <a
                href={selectedItem.productLink}
                className="st-btn st-style1 st-color1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Xem sản phẩm <Icon icon="mdi:arrow-right" />
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

PortfolioSection.propTypes = {
  data: PropTypes.object,
};

export default PortfolioSection;
