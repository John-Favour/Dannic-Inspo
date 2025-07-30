// components/Avatar.jsx
const getColor = (name) => {
  // You can customize this to return more colors
  const colors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#FF6B6B'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const Avatar = ({ name, size = 40 }) => {
  const bgColor = getColor(name);
  const firstLetter = name?.charAt(0).toUpperCase();

  return (
    <div
      style={{
        backgroundColor: bgColor,
        width: size,
        height: size,
        borderRadius: '50%',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
      }}
    >
      {firstLetter}
    </div>
  );
};

export default Avatar;
