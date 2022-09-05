type Props = {
  active: boolean;
};

export const Star = ({ active }: Props) => {
  return (
    <svg width="20" height="17" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 0
      c 2 17, 0 17, -7 17,
      c -8 0, -8 -3, 0 -3,
      c -8 0, -8 -3, 0 -3,
      c -8 0, -8 -3, 0 -3,
      c -8 0, -8 -3, -1 -3,
      c 7 1, 2 -3, 9 -5"
        stroke="grey"
        strokeWidth="1"
        stroke-radius="4"
        fill={active ? "rgb(200,240,100)" : "transparent"}
      />
      <polyline
        points="14 5, 18 7, 18 14, 14 15"
        stroke="grey"
        strokeWidth="1"
        fill={active ? "rgb(200,240,100)" : "transparent"}
      />
    </svg>
  );
};
