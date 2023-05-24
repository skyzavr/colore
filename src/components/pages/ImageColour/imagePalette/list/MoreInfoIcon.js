const MoreInfoIcon = ({ clickHandler }) => {
  return (
    <div onClick={clickHandler}>
      <svg
        width="11"
        height="17"
        viewBox="0 0 11 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 11.7143L5.5 16L1 11.7143M1 5.28571L5.5 1L10 5.28571"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
export default MoreInfoIcon;
