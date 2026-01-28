import React, { useEffect, useRef } from 'react';

// Fix for: Property 'MathJax' does not exist on type 'Window & typeof globalThis'.
declare global {
  interface Window {
    MathJax: any;
  }
}

interface Props {
  text: string;
  className?: string;
}

const MathRenderer: React.FC<Props> = ({ text, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise && containerRef.current) {
      // Clean previous typesetting if needed, though usually overwriting innerHTML is enough
      containerRef.current.innerHTML = text;
      window.MathJax.typesetPromise([containerRef.current]).catch((err: any) => console.log('MathJax error:', err));
    }
  }, [text]);

  return <div ref={containerRef} className={className} />;
};

export default React.memo(MathRenderer);