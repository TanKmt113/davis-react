import PropTypes from 'prop-types'

const SingleResume = ({ element }) => {
  const { title, duration, subTitle, text} = element;
  return (
    <div className="st-resume-timeline">
      {title && <h3 className="st-resume-timeline-title">{title}</h3>}
      {duration && <div className="st-resume-timeline-duration">{duration}</div>}
      {subTitle && <h4 className="st-resume-timeline-subtitle">{subTitle}</h4>}
      {text && <div className="st-resume-timeline-text" dangerouslySetInnerHTML={{ __html: text }}></div>}
    </div>
  )
}

SingleResume.propTypes = {
  element: PropTypes.object,
}

export default SingleResume;
