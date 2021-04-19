function mapCssProp(propName, alias) {
  const hyphenProp = propName.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
  return (props) => {
    if (!!alias ? props[alias] : props[propName]) {
      return `
        ${hyphenProp}: ${!!alias ? props[alias] : props[propName]};
      `;
    }
  };
}

export default mapCssProp;
