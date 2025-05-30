'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

export default function Portal({ children }: PortalProps) {
  const [mounted, setMounted] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Create or get the portal root element
    let root = document.getElementById('modal-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'modal-root';
      root.style.position = 'relative';
      root.style.zIndex = '9999';
      document.body.appendChild(root);
    }
    
    setPortalRoot(root);
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  if (!mounted || !portalRoot) {
    return null;
  }

  return createPortal(children, portalRoot);
}
