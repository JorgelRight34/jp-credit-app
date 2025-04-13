import { useRef } from "react";
import TopLoadingBar from "react-top-loading-bar";

export const loadingBarRef = { current: null as TopLoadingBar | null };

export const startLoadingBar = () => {
  loadingBarRef.current?.continuousStart();
};

export const completeLoadingBar = () => {
  loadingBarRef.current?.complete();
};

const LoadingBar = () => {
  // prettier-ignore
  loadingBarRef.current = useRef<TopLoadingBar>(null).current;

  return (
    <TopLoadingBar
      color="#d09d0c"
      ref={(ref) => (loadingBarRef.current = ref)}
    />
  );
};

export default LoadingBar;
