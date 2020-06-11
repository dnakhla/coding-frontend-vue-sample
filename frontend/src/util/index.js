export const useIsScrolledToBottom = w => {
  return (
    Math.max(
      w.pageYOffset,
      w.document.documentElement.scrollTop,
      w.document.body.scrollTop
    ) +
      w.innerHeight ===
    w.document.documentElement.offsetHeight
  );
};
