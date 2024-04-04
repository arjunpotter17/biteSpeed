//icons for menu open and close state
export const MenuIcon = ({ color = "#16163D" }) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 28H32V25.3333H8V28ZM8 21.3333H32V18.6667H8V21.3333ZM8 12V14.6667H32V12H8Z"
        fill={color}
      />
    </svg>
  );
};

export const CloseMenuIcon = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28 13.6114L26.3886 12L20 18.3886L13.6114 12L12 13.6114L18.3886 20L12 26.3886L13.6114 28L20 21.6114L26.3886 28L28 26.3886L21.6114 20L28 13.6114Z"
        fill="#16163D"
      />
    </svg>
  );
};
