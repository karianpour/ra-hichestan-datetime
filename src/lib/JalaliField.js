import React from 'react';
import jalaali from 'jalaali-js';
import PropTypes from 'prop-types';

const JalaliField = ({ source, record = {}, showTime }) => <span>{formatDate(record[source], showTime)}</span>;

JalaliField.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
  showTime: PropTypes.bool,
};

JalaliField.defaultProps = {
  addLabel: true,
  showTime: true,
};


const DATE_SEPERATOR =  '/';// this is arabic date seperator ' ؍' but it is right to left glyph and as the numbers are left to right there will be caret position problem
const MIDDLE_SEPERATOR =  '\xa0';
const TIME_SEPERATOR =  ':';

function formatDate(date, showTime){
  if(!date) return date;
  if(!(date instanceof Date)){
    date = new Date(date);
  }

  if(date.toString() === 'Invalid Date') return '##';

  return `\u200E${formatJalaliDate(date)}${showTime? MIDDLE_SEPERATOR + formatTime(date):''}`;
}

function formatJalaliDate(date){
  if(!date) return '';
  if(!(date instanceof Date)){
    date = new Date(date);
  }
  const jDate = jalaali.toJalaali(date);
  const day = jDate.jd.toString();
  const month = jDate.jm.toString();
  const year = jDate.jy.toString();
  return `${'0000'.substring(year.length)}${year}${DATE_SEPERATOR}${'00'.substring(day.length)}${day}${DATE_SEPERATOR}${'00'.substring(month.length)}${month}`;
}

function formatTime(date){
  if(!date) return '';
  let hours = date.getHours().toString()
  let minutes = date.getMinutes().toString()

  return `${'00'.substring(hours.length)}${hours}${TIME_SEPERATOR}${'00'.substring(minutes.length)}${minutes}`;
}

export default JalaliField;
