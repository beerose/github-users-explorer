import { useState, useEffect, RefObject } from "react";

export const useFocus = (ref: RefObject<HTMLElement>, defaultState = false) => {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const onFocus = () => setState(true);
    const onBlur = () => setState(false);

    element.addEventListener("focus", onFocus);
    element.addEventListener("blur", onBlur);

    return () => {
      element.removeEventListener("focus", onFocus);
      element.removeEventListener("blur", onBlur);
    };
  }, [ref]);

  return state;
};
