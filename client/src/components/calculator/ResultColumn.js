function ResultColumn({ title, data }) {
  return (
    <ul className="feed-result-column">
      <h3 className="feed-clearfix">{title}:</h3>
      {Object.keys(data).map((key, index) => (
        <li key={key + index}>{data[key]}</li>
      ))}
    </ul>
  )
}

export default ResultColumn
