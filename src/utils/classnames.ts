type IClassNamePart = string | false | undefined;

export const mergeClasses = (...args: IClassNamePart[]) => {
  return args
    .filter(Boolean)
    .map((className) => (className as string).trim())
    .join(' ');
};
