type Selectors = {
  wrapper: string;
  valueContainer: string;
  codeSampleDiv: string;
  nameDiv: string;
};

type Elements = {
  [K in keyof Selectors]: HTMLElement | null;
};

export const classNames = {
  iconName: "if--icon-name",
};

export const ids = {};

export const selectors: Selectors = {
  wrapper: ".icon-page-wrapper",
  valueContainer: "textarea.short",
  codeSampleDiv: ".if--icon-code-sample",
  nameDiv: `.${classNames.iconName}`,
};

export const getElement: (selector: string) => HTMLElement | null = (
  selector
) => document.querySelector(selector);

export const elements: () => Elements = () =>
  Object.keys(selectors).reduce((acc, selector) => {
    const key = selector as keyof Selectors;
    acc[key] = getElement(selectors[key]);
    return acc;
  }, {} as Elements);
