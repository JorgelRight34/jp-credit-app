import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { GridLoader } from "react-spinners";
import { setLoadingHandler } from "../loadingManager";

interface LoadingScreenRef {
  showLoadingSpinner: () => void;
  hideLoadingSpinner: () => void;
}

const LoadingScreen = forwardRef<LoadingScreenRef>((_, ref) => {
  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => ({
    showLoadingSpinner: () => setShow(true),
    hideLoadingSpinner: () => setShow(false),
  }));

  useEffect(() => {
    setLoadingHandler({
      show: () => setShow(true),
      hide: () => setTimeout(() => setShow(false), 1000),
    });

    return () => setLoadingHandler(null);
  }, []);

  return (
    <div
      className={`modal-overlay ${show ? "" : "d-none"}`}
      style={{ zIndex: 1000 }}
    >
      <GridLoader color="#ffff" size={20} margin={2} speedMultiplier={1} />
    </div>
  );
});

LoadingScreen.displayName = "LoadingScreen";

export default LoadingScreen;
