function dateConverter() {
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };

  const dateTimeFormat = new Intl.DateTimeFormat('en-us', dateOptions);
  const dateToday = dateTimeFormat.format(new Date());

  return dateToday;
}

exports.dateConverter = dateConverter;
