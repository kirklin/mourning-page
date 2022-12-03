export const appendStyle = (style: string) => {
  const styleEl = document.createElement("style");
  styleEl.innerHTML = style;
  document.head.append(styleEl);
};
