import { useState } from "react";

const ReadMoreText = ({ text, limit = 150 }) =>{
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = text.length > limit;

  const toggleExpand = () => setIsExpanded(prev => !prev);

  return (
    <div>
      <p style={styles.paragraph}>
        {isExpanded || !isLong ? text : `${text.slice(0, limit)}...`}
      </p>
      {isLong && (
        <button onClick={toggleExpand} style={styles.button}>
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}

const styles = {
      paragraph: {
    lineHeight: "1.5",
    fontSize: "16px",
    margin:"0px 0",
    color: "#333",
  },
  button: {
    background: "none",
    color: "black",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    padding: 0,
    fontSize: "1rem"
  }
};

export default ReadMoreText;
