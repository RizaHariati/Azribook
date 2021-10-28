useEffect(() => {
  if (headerRef.current == null) return;
  else {
    window.onscroll = () => {
      let a = window.pageYOffset;
      const rect = headerRef.current.getBoundingClientRect();
      if (!rect) return;
      else {
        const b = rect.height;
        if (!b) return;
        if (a < b - 50) {
          setShowHeader(false);
        } else {
          setShowHeader(true);
        }
      }
    };
  }
}, [headerRef]);
