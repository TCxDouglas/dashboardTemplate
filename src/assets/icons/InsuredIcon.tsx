import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export const InsuredIconSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={21}
      viewBox="0 0 21 21"
      fill="currentColor"
    >
      <path
        d="M10.578 10.938a4.798 4.798 0 01-4.792-4.792 4.798 4.798 0 014.792-4.792 4.798 4.798 0 014.792 4.792 4.798 4.798 0 01-4.792 4.792zm0-8.334a3.55 3.55 0 00-3.542 3.542 3.55 3.55 0 003.542 3.542 3.55 3.55 0 003.542-3.542 3.55 3.55 0 00-3.542-3.542zM3.42 19.27a.63.63 0 01-.625-.624c0-3.559 3.492-6.459 7.783-6.459.842 0 1.667.109 2.467.334a.62.62 0 01.433.766.62.62 0 01-.766.434 7.888 7.888 0 00-2.134-.284c-3.6 0-6.533 2.334-6.533 5.209a.63.63 0 01-.625.625z"
        fill="currentColor"
      />
      <path
        d="M15.578 19.27a3.934 3.934 0 01-3.383-1.924 3.843 3.843 0 01-.575-2.034c0-1.216.542-2.341 1.483-3.091a3.962 3.962 0 016.433 3.092c0 .725-.2 1.433-.574 2.041-.209.35-.476.667-.792.934a3.827 3.827 0 01-2.592.983zm0-6.666c-.617 0-1.2.209-1.691.6a2.687 2.687 0 00-.626 3.5 2.703 2.703 0 002.317 1.317 2.66 2.66 0 001.775-.675c.217-.183.4-.4.533-.634.267-.424.4-.908.4-1.4a2.714 2.714 0 00-2.708-2.708z"
        fill="currentColor"
      />
      <path
        d="M15.103 16.762a.618.618 0 01-.442-.183l-.825-.825a.629.629 0 010-.883.629.629 0 01.884 0l.4.4 1.333-1.234a.63.63 0 01.883.034.63.63 0 01-.033.883l-1.775 1.642a.652.652 0 01-.425.166z"
        fill="currentColor"
      />
    </svg>
  );
};

export const InsuredIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={InsuredIconSVG} {...props} />;
};
