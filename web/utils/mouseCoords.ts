export const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

  e.currentTarget.style.setProperty("--mouse-x", `${x + 12}px`);
  e.currentTarget.style.setProperty("--mouse-y", `${y + 12}px`);
};
