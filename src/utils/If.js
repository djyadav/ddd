const If = function ({ test, children }) {
  if (!test) {
    return null;
  }
  return children;
};

export default If;
