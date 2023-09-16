

import gsap from "gsap";
import { useLayoutEffect,useEffect,useRef,forwardRef } from "react";

const FadeIn = forwardRef(({ children, stagger = 0, x = 0 }, ref) => {
  const el = useRef();
  const animation = useRef();
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      animation.current = gsap.from(el.current.children, { 
        opacity: 0,
        stagger, 
        x,
        duration:0.2,
        ease: "easeInOutBounce" 
      })
    });
    return () => ctx.revert();
  }, []);
  
  useEffect(() => {
    ref.current = animation.current;
  }, [ref]);
  
  return <span ref={el}>{children}</span>
});

export default function Test() {  
  
  const animation = useRef();
  
  const toggle = () => {
    animation.current.restart()
  };
  
  return (
    <div className="app">
      <div>
        <button onClick={toggle}>Toggle</button>
      </div>
      <FadeIn stagger={0.05} x={100} ref={animation}>
        <div className="box">Box 1</div>
        <div className="box">Box 2</div>
        <div className="box">Box 1</div>
        <div className="box">Box 2</div>
        <div className="box">Box 1</div>
        <div className="box">Box 2</div>
        <div className="box">Box 1</div>
        <div className="box">Box 2</div>
        <div className="box">Box 1</div>
        <div className="box">Box 2</div>
      </FadeIn>
    </div>
  );
}


