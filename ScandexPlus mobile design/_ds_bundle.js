/* @ds-bundle: {"format":3,"namespace":"ScandexPlusDesignSystem_c9a9df","components":[{"name":"Avatar","sourcePath":"components/Avatar/Avatar.jsx"},{"name":"BlueHeader","sourcePath":"components/BlueHeader/BlueHeader.jsx"},{"name":"ICON_PATHS","sourcePath":"components/Icon/Icon.jsx"},{"name":"Icon","sourcePath":"components/Icon/Icon.jsx"},{"name":"MobileButton","sourcePath":"components/MobileButton/MobileButton.jsx"},{"name":"MobileCard","sourcePath":"components/MobileCard/MobileCard.jsx"},{"name":"SearchField","sourcePath":"components/SearchField/SearchField.jsx"},{"name":"SegmentedControl","sourcePath":"components/SegmentedControl/SegmentedControl.jsx"},{"name":"StatusBadge","sourcePath":"components/StatusBadge/StatusBadge.jsx"},{"name":"DOC_STATUS_META","sourcePath":"components/StatusDot/StatusDot.jsx"},{"name":"StatusDot","sourcePath":"components/StatusDot/StatusDot.jsx"},{"name":"StatusLegend","sourcePath":"components/StatusDot/StatusDot.jsx"},{"name":"TabBar","sourcePath":"components/TabBar/TabBar.jsx"}],"sourceHashes":{"components/Avatar/Avatar.jsx":"99b6ff0f79d3","components/BlueHeader/BlueHeader.jsx":"da087ebecb27","components/Icon/Icon.jsx":"a640a363c4e6","components/MobileButton/MobileButton.jsx":"38348dc22dcb","components/MobileCard/MobileCard.jsx":"a4bc294bc304","components/SearchField/SearchField.jsx":"1014aa372971","components/SegmentedControl/SegmentedControl.jsx":"52b86581ac37","components/StatusBadge/StatusBadge.jsx":"64c7d5b96078","components/StatusDot/StatusDot.jsx":"780dc0ee00b6","components/TabBar/TabBar.jsx":"e40fd38df4a4","export/scandex-mobile-concept/mobile/app.jsx":"8c4b66d14d5c","export/scandex-mobile-concept/mobile/brand.jsx":"573333a792a5","export/scandex-mobile-concept/mobile/data.jsx":"a29c661b159f","export/scandex-mobile-concept/mobile/inventory.jsx":"310020aed5b9","export/scandex-mobile-concept/mobile/tweaks-panel.jsx":"6591467622ed","export/scandex-mobile-concept/mobile/ui.jsx":"1235d0d25cba","export/scandex-mobile-concept/mobile/workorders.jsx":"1bcc108c198a","mobile/android-frame.jsx":"70c8c3059eeb","mobile/app.jsx":"15274f6eb29a","mobile/brand.jsx":"573333a792a5","mobile/data.jsx":"a29c661b159f","mobile/inventory.jsx":"310020aed5b9","mobile/records.jsx":"db467136fc2a","mobile/tweaks-panel.jsx":"6591467622ed","mobile/ui.jsx":"cf78dc103c09","mobile/workorders.jsx":"1bcc108c198a","ui_kits/scandexpro/Components.jsx":"21e557e95d76","uploads/Landing Page ScandexPlus/design-canvas.jsx":"5d0e39003628","uploads/Landing Page ScandexPlus/download/tweaks-panel.jsx":"57fac7f3caf9","uploads/Landing Page ScandexPlus/ios-frame.jsx":"be3343be4b51","uploads/Landing Page ScandexPlus/tweaks-panel.jsx":"57fac7f3caf9","uploads/Landing Page ScandexPlus/v1-editorial.jsx":"1c2f432a62f0","uploads/Landing Page ScandexPlus/v2-refined-part1.jsx":"2084acb9a7f2","uploads/Landing Page ScandexPlus/v2-refined-part2.jsx":"bcfceb33827c","uploads/Landing Page ScandexPlus/v2-tech-corporate.jsx":"148376f410c9"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ScandexPlusDesignSystem_c9a9df = window.ScandexPlusDesignSystem_c9a9df || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/Avatar/Avatar.jsx
try { (() => {
// ScandexPlus Design System — Avatar
// Rounded-square initials avatar with photo fallback. Blue-tinted by default.

const Avatar = ({
  name = '',
  initials,
  src,
  size = 48,
  radius,
  color = 'var(--sdx-m-primary, #072AC8)',
  style = {}
}) => {
  const r = radius != null ? radius : Math.round(size * 0.28);
  const computed = initials != null && String(initials).trim() ? String(initials).trim().toUpperCase() : name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: r,
      flexShrink: 0,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: src ? 'transparent' : color + '14',
      border: `2px solid ${color}33`,
      fontFamily: "'Inter', sans-serif",
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size * 0.36,
      fontWeight: 800,
      color,
      lineHeight: 1
    }
  }, computed));
};
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Avatar/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/BlueHeader/BlueHeader.jsx
try { (() => {
// ScandexPlus Design System — BlueHeader
// Institutional blue gradient header with rounded bottom corners.
// Slots: back button, eyebrow, title, subtitle, brand row, trailing action.

const BlueHeader = ({
  title,
  subtitle,
  eyebrow,
  onBack,
  action,
  brand,
  compact = false,
  children,
  style = {}
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    background: 'var(--sdx-m-header, linear-gradient(135deg, #072AC8, #051E9B))',
    color: '#fff',
    position: 'relative',
    flexShrink: 0,
    padding: compact ? '44px 16px 16px' : '46px 18px 20px',
    borderBottomLeftRadius: 'var(--sdx-m-radius-header, 22px)',
    borderBottomRightRadius: 'var(--sdx-m-radius-header, 22px)',
    boxShadow: 'var(--sdx-m-shadow-header, 0 6px 18px -8px rgba(7,40,202,.5))',
    fontFamily: "'Inter', sans-serif",
    ...style
  }
}, brand && /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    marginBottom: 14
  }
}, brand), onBack && /*#__PURE__*/React.createElement("button", {
  onClick: onBack,
  style: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    padding: '6px 11px 6px 7px',
    borderRadius: 9,
    border: 'none',
    cursor: 'pointer',
    background: 'rgba(255,255,255,.15)',
    color: '#fff',
    fontSize: 13,
    fontWeight: 600,
    fontFamily: 'inherit'
  }
}, /*#__PURE__*/React.createElement("svg", {
  width: "17",
  height: "17",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#fff",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "M19 12H5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 19l-7-7 7-7"
})), "Voltar"), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    minWidth: 0,
    flex: 1
  }
}, eyebrow && /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 12.5,
    fontWeight: 600,
    color: 'rgba(255,255,255,.72)',
    letterSpacing: 0.3,
    marginBottom: 4
  }
}, eyebrow), title && /*#__PURE__*/React.createElement("h1", {
  style: {
    margin: 0,
    fontSize: compact ? 20 : 24,
    fontWeight: 800,
    letterSpacing: -0.4,
    lineHeight: 1.2
  }
}, title), subtitle && /*#__PURE__*/React.createElement("p", {
  style: {
    margin: '6px 0 0',
    fontSize: 13,
    color: 'rgba(255,255,255,.78)',
    lineHeight: 1.45
  }
}, subtitle)), action && /*#__PURE__*/React.createElement("div", {
  style: {
    flexShrink: 0
  }
}, action)), children);
Object.assign(__ds_scope, { BlueHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/BlueHeader/BlueHeader.jsx", error: String((e && e.message) || e) }); }

// components/Icon/Icon.jsx
try { (() => {
// ScandexPlus Design System — Icon (mobile)
// Lucide-style stroke icons, curated for the ScandexPRO mobile surfaces.

const ICON_PATHS = {
  home: 'M3 9.5L12 3l9 6.5M5 9.5V20a1 1 0 001 1h12a1 1 0 001-1V9.5',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35',
  user: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M16 7a4 4 0 11-8 0 4 4 0 018 0z',
  bell: 'M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0',
  plus: 'M12 5v14M5 12h14',
  check: 'M20 6L9 17l-5-5',
  'check-circle': 'M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3',
  x: 'M18 6L6 18M6 6l12 12',
  'chevron-right': 'M9 18l6-6-6-6',
  'chevron-left': 'M15 18l-6-6 6-6',
  'arrow-left': 'M19 12H5M12 19l-7-7 7-7',
  calendar: 'M3 4h18v18H3zM3 10h18M8 2v4M16 2v4',
  clock: 'M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2',
  'file-text': 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8',
  image: 'M3 3h18v18H3zM8.5 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM21 15l-5-5L5 21',
  clipboard: 'M9 4h6a1 1 0 011 1v1h1a2 2 0 012 2v11a2 2 0 01-2 2H7a2 2 0 01-2-2V8a2 2 0 012-2h1V5a1 1 0 011-1zM9 4a1 1 0 001 1h4a1 1 0 001-1',
  package: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12l8.73-5.04M12 22.08V12',
  building: 'M3 21h18M5 21V7l8-4v18M19 21V11l-6-3M9 9v.01M9 12v.01M9 15v.01M9 18v.01',
  droplet: 'M12 2.69l5.66 5.66a8 8 0 11-11.31 0z',
  paperclip: 'M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48',
  'zoom-in': 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35M11 8v6M8 11h6',
  'zoom-out': 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35M8 11h6',
  maximize: 'M8 3H5a2 2 0 00-2 2v3M21 8V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3M16 21h3a2 2 0 002-2v-3',
  download: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3',
  share: 'M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13',
  flag: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7',
  alert: 'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01',
  idcard: 'M2 4h20v16H2zM6 9h4M6 13h2M14 8h4M14 12h4M14 16h4M6 16a2 2 0 014 0',
  'more-vertical': 'M12 13a1 1 0 100-2 1 1 0 000 2zM12 6a1 1 0 100-2 1 1 0 000 2zM12 20a1 1 0 100-2 1 1 0 000 2z',
  edit: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4z',
  trash: 'M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6',
  phone: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z',
  camera: 'M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 17a4 4 0 100-8 4 4 0 000 8z',
  qr: 'M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h3v3h-3zM21 21v.01M21 15v3M15 21h3',
  filter: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
  sliders: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
  logout: 'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9'
};
const Icon = ({
  name,
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
  style = {}
}) => {
  const d = ICON_PATHS[name];
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0,
      display: 'block',
      ...style
    }
  }, d && d.split(' M').map((seg, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: i === 0 ? seg : 'M' + seg
  })));
};
Object.assign(__ds_scope, { ICON_PATHS, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Icon/Icon.jsx", error: String((e && e.message) || e) }); }

// components/MobileButton/MobileButton.jsx
try { (() => {
// ScandexPlus Design System — MobileButton
// Touch-first button. Primary uses the institutional blue gradient.

const MobileButton = ({
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  children,
  style = {}
}) => {
  const heights = {
    sm: 40,
    md: 46,
    lg: 52
  };
  const fonts = {
    sm: 13.5,
    md: 14.5,
    lg: 15.5
  };
  const h = heights[size] || 52;
  const variants = {
    primary: {
      background: disabled ? 'var(--sdx-m-border-strong, #D8E0EF)' : 'var(--sdx-m-header, linear-gradient(135deg, #072AC8, #051E9B))',
      color: '#fff',
      border: '1px solid transparent',
      boxShadow: disabled ? 'none' : '0 10px 24px -10px rgba(7,42,200,.6)'
    },
    secondary: {
      background: 'var(--sdx-m-surface-muted, #F1F5FB)',
      color: 'var(--sdx-m-text, #0F172A)',
      border: '1px solid transparent',
      boxShadow: 'none'
    },
    outline: {
      background: 'var(--sdx-m-surface, #fff)',
      color: 'var(--sdx-m-text-soft, #334155)',
      border: '1px solid var(--sdx-m-border, #E2E8F2)',
      boxShadow: 'none'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--sdx-m-primary, #072AC8)',
      border: '1px solid transparent',
      boxShadow: 'none'
    },
    danger: {
      background: 'var(--sdx-m-danger, #DC2626)',
      color: '#fff',
      border: '1px solid transparent',
      boxShadow: '0 10px 24px -10px rgba(220,38,38,.55)'
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: disabled || loading ? undefined : onClick,
    disabled: disabled || loading,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 9,
      width: fullWidth ? '100%' : 'auto',
      height: h,
      padding: fullWidth ? 0 : '0 22px',
      borderRadius: 'var(--sdx-m-radius-btn, 14px)',
      cursor: disabled || loading ? 'default' : 'pointer',
      fontFamily: "'Inter', sans-serif",
      fontSize: fonts[size] || 15.5,
      fontWeight: 700,
      letterSpacing: 0.1,
      opacity: disabled ? 0.85 : 1,
      transition: 'transform .12s, box-shadow .2s',
      WebkitTapHighlightColor: 'transparent',
      ...variants[variant],
      ...style
    }
  }, loading ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 19,
      height: 19,
      borderRadius: '50%',
      border: '2.5px solid rgba(255,255,255,.4)',
      borderTopColor: '#fff',
      animation: 'sdxmSpin .7s linear infinite'
    }
  }) : children, /*#__PURE__*/React.createElement("style", null, '@keyframes sdxmSpin{to{transform:rotate(360deg)}}'));
};
Object.assign(__ds_scope, { MobileButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/MobileButton/MobileButton.jsx", error: String((e && e.message) || e) }); }

// components/MobileCard/MobileCard.jsx
try { (() => {
// ScandexPlus Design System — MobileCard
// White surface, 16px radius, soft elevation. Optional accent left-border.

const MobileCard = ({
  variant = 'elevated',
  accent,
  padding = 14,
  onClick,
  children,
  style = {}
}) => {
  const clickable = typeof onClick === 'function';
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    role: clickable ? 'button' : undefined,
    style: {
      background: 'var(--sdx-m-surface, #fff)',
      border: '1px solid var(--sdx-m-border, #E2E8F2)',
      borderLeft: accent ? `3px solid ${accent}` : '1px solid var(--sdx-m-border, #E2E8F2)',
      borderRadius: 'var(--sdx-m-radius-card, 16px)',
      padding,
      boxShadow: variant === 'elevated' ? 'var(--sdx-m-shadow-card, 0 1px 3px rgba(15,23,42,.06), 0 6px 16px -8px rgba(15,23,42,.12))' : 'none',
      cursor: clickable ? 'pointer' : 'default',
      textAlign: 'left',
      fontFamily: "'Inter', sans-serif",
      color: 'var(--sdx-m-text, #0F172A)',
      WebkitTapHighlightColor: 'transparent',
      ...style
    }
  }, children);
};
Object.assign(__ds_scope, { MobileCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/MobileCard/MobileCard.jsx", error: String((e && e.message) || e) }); }

// components/SearchField/SearchField.jsx
try { (() => {
// ScandexPlus Design System — SearchField
// Mobile text field: leading icon, focus ring, optional valid (green) state.

const SDX_SEARCH_ICON = /*#__PURE__*/React.createElement("svg", {
  width: "19",
  height: "19",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "11",
  cy: "11",
  r: "8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M21 21l-4.35-4.35"
}));
const SearchField = ({
  value = '',
  onChange,
  placeholder = '',
  type = 'text',
  inputMode,
  leading = SDX_SEARCH_ICON,
  valid = false,
  clearable = false,
  style = {}
}) => {
  const [focused, setFocused] = React.useState(false);
  const borderColor = focused ? 'var(--sdx-m-primary, #072AC8)' : valid ? 'var(--sdx-m-doc-available, #10B981)' : 'var(--sdx-m-border, #E2E8F2)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 'var(--sdx-m-field-height, 54px)',
      padding: '0 14px',
      background: 'var(--sdx-m-surface, #fff)',
      borderRadius: 'var(--sdx-m-radius-field, 14px)',
      border: `1.5px solid ${borderColor}`,
      boxShadow: focused ? '0 0 0 4px rgba(7,42,200,.1)' : 'none',
      transition: 'border-color .15s, box-shadow .15s',
      fontFamily: "'Inter', sans-serif",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: focused ? 'var(--sdx-m-primary, #072AC8)' : 'var(--sdx-m-faint, #94A3B8)',
      display: 'flex'
    }
  }, leading), /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    type: type,
    inputMode: inputMode,
    placeholder: placeholder,
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontSize: 16,
      fontWeight: 600,
      fontFamily: 'inherit',
      color: 'var(--sdx-m-text, #0F172A)',
      letterSpacing: 0.3
    }
  }), valid && /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--sdx-m-doc-available, #10B981)",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 11.08V12a10 10 0 11-5.93-9.14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 4L12 14.01l-3-3"
  })), clearable && value && !valid && /*#__PURE__*/React.createElement("button", {
    onClick: () => onChange && onChange(''),
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: 2,
      display: 'flex',
      color: 'var(--sdx-m-faint, #94A3B8)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6L6 18M6 6l12 12"
  }))));
};
Object.assign(__ds_scope, { SearchField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/SearchField/SearchField.jsx", error: String((e && e.message) || e) }); }

// components/SegmentedControl/SegmentedControl.jsx
try { (() => {
// ScandexPlus Design System — SegmentedControl
// Mobile tab/segmented control. Active segment fills with primary.
// Use for app selectors and status tabs (Todas / Realizadas / Canceladas).

const SegmentedControl = ({
  options = [],
  value,
  onChange,
  size = 'md',
  style = {}
}) => {
  const h = size === 'sm' ? 36 : size === 'lg' ? 44 : 40;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      background: 'var(--sdx-m-surface-muted, #F1F5FB)',
      borderRadius: 12,
      padding: 4,
      gap: 2,
      fontFamily: "'Inter', sans-serif",
      ...style
    }
  }, options.map(o => {
    const on = value === o.key;
    return /*#__PURE__*/React.createElement("button", {
      key: o.key,
      onClick: () => onChange && onChange(o.key),
      style: {
        flex: 1,
        height: h,
        borderRadius: 9,
        border: 'none',
        cursor: 'pointer',
        background: on ? 'var(--sdx-m-primary, #072AC8)' : 'transparent',
        color: on ? '#fff' : 'var(--sdx-m-muted, #64748B)',
        fontSize: size === 'sm' ? 12 : 12.5,
        fontWeight: 700,
        fontFamily: 'inherit',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        transition: 'background .15s, color .15s',
        WebkitTapHighlightColor: 'transparent'
      }
    }, o.label, o.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        opacity: on ? 0.9 : 0.7
      }
    }, o.count));
  }));
};
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/SegmentedControl/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/StatusBadge/StatusBadge.jsx
try { (() => {
// ScandexPlus Design System — StatusBadge
// Pill badge with a leading dot. soft (tinted) or solid (filled).

const StatusBadge = ({
  label,
  color = '#2563EB',
  variant = 'soft',
  dot = true,
  size = 'md',
  style = {}
}) => {
  const compact = size === 'sm';
  const solid = variant === 'solid';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: compact ? '2px 8px' : '3px 10px',
      borderRadius: 999,
      background: solid ? color : color + '18',
      color: solid ? '#fff' : color,
      fontSize: compact ? 10.5 : 11.5,
      fontWeight: 600,
      letterSpacing: 0.1,
      whiteSpace: 'nowrap',
      fontFamily: "'Inter', sans-serif",
      ...style
    }
  }, dot && !solid && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: color
    }
  }), label);
};
Object.assign(__ds_scope, { StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/StatusBadge/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/StatusDot/StatusDot.jsx
try { (() => {
// ScandexPlus Design System — StatusDot & StatusLegend
// Document-status "bolinhas" — the visual language the surgical team already knows.

const DOC_STATUS_META = {
  available: {
    label: 'Documento disponível',
    fill: 'var(--sdx-m-doc-available, #10B981)',
    ring: 'var(--sdx-m-doc-available-ring, #059669)'
  },
  processing: {
    label: 'Em processamento',
    fill: 'var(--sdx-m-doc-processing, #3B82F6)',
    ring: 'var(--sdx-m-doc-processing-ring, #2563EB)'
  },
  altered: {
    label: 'Informação alterada',
    fill: 'var(--sdx-m-doc-altered, #EAB308)',
    ring: 'var(--sdx-m-doc-altered-ring, #CA8A04)'
  },
  missing_info: {
    label: 'Faltando páginas/info',
    fill: 'var(--sdx-m-doc-missing, #F97316)',
    ring: 'var(--sdx-m-doc-missing-ring, #EA580C)'
  },
  absent: {
    label: 'Documento ausente',
    fill: 'var(--sdx-m-doc-absent, #EF4444)',
    ring: 'var(--sdx-m-doc-absent-ring, #DC2626)'
  }
};
const REPORTED_META = {
  label: 'Reportado com problema',
  fill: 'var(--sdx-m-doc-altered, #EAB308)',
  ring: 'var(--sdx-m-doc-altered-ring, #CA8A04)'
};
const StatusDot = ({
  status = 'available',
  reported = false,
  size = 16
}) => {
  if (reported) {
    return /*#__PURE__*/React.createElement("span", {
      title: REPORTED_META.label,
      style: {
        display: 'inline-flex',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: size + 4,
      height: size + 4,
      viewBox: "0 0 24 24",
      fill: REPORTED_META.fill,
      stroke: REPORTED_META.ring,
      strokeWidth: "1.5",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M10.3 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.7 3.86a2 2 0 00-3.4 0z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 9.5v4",
      stroke: "#fff",
      strokeWidth: "2",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "16.6",
      r: "1.1",
      fill: "#fff",
      stroke: "none"
    })));
  }
  const m = DOC_STATUS_META[status] || DOC_STATUS_META.available;
  return /*#__PURE__*/React.createElement("span", {
    title: m.label,
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      background: m.fill,
      border: `2px solid ${m.ring}`,
      flexShrink: 0,
      display: 'inline-block'
    }
  });
};
const StatusLegend = ({
  style = {}
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    fontFamily: "'Inter', sans-serif",
    ...style
  }
}, Object.keys(DOC_STATUS_META).map(k => /*#__PURE__*/React.createElement("div", {
  key: k,
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 10
  }
}, /*#__PURE__*/React.createElement(StatusDot, {
  status: k,
  size: 14
}), /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 12.5,
    color: 'var(--sdx-m-text-soft, #334155)'
  }
}, DOC_STATUS_META[k].label))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 10
  }
}, /*#__PURE__*/React.createElement(StatusDot, {
  reported: true,
  size: 16
}), /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 12.5,
    color: 'var(--sdx-m-text-soft, #334155)'
  }
}, REPORTED_META.label)));
Object.assign(__ds_scope, { DOC_STATUS_META, StatusDot, StatusLegend });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/StatusDot/StatusDot.jsx", error: String((e && e.message) || e) }); }

// components/TabBar/TabBar.jsx
try { (() => {
// ScandexPlus Design System — TabBar
// Bottom navigation. Active item uses the accent/primary color.

const __SDX_NS = 'ScandexPlusDesignSystem_c9a9df';
const TabBar = ({
  items = [],
  active,
  onChange,
  accent = 'var(--sdx-m-primary, #072AC8)',
  style = {}
}) => {
  const Icon = typeof window !== 'undefined' && window[__SDX_NS] && window[__SDX_NS].Icon || null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      background: 'var(--sdx-m-surface, #fff)',
      borderTop: '1px solid var(--sdx-m-border, #E2E8F2)',
      paddingTop: 8,
      paddingBottom: 20,
      fontFamily: "'Inter', sans-serif",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
    }
  }, items.map(t => {
    const on = active === t.key;
    const color = on ? accent : 'var(--sdx-m-faint, #94A3B8)';
    return /*#__PURE__*/React.createElement("button", {
      key: t.key,
      onClick: () => onChange && onChange(t.key),
      style: {
        flex: 1,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '5px 0',
        fontFamily: 'inherit',
        WebkitTapHighlightColor: 'transparent'
      }
    }, Icon && /*#__PURE__*/React.createElement(Icon, {
      name: t.icon,
      size: 22,
      color: color,
      strokeWidth: on ? 2.4 : 2
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10.5,
        fontWeight: on ? 700 : 500,
        color
      }
    }, t.label));
  })));
};
Object.assign(__ds_scope, { TabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/TabBar/TabBar.jsx", error: String((e && e.message) || e) }); }

// export/scandex-mobile-concept/mobile/app.jsx
try { (() => {
// ScandexPRO Mobile — App shell, scaffolds, home, login, navigation

// ── Shared layout scaffolds ─────────────────────────────────────────────────
function BlueHeader({
  children,
  compact
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, ${T.primary}, ${T.primaryDark})`,
      padding: compact ? '44px 18px 18px' : '46px 18px 20px',
      color: '#fff',
      position: 'relative',
      flexShrink: 0,
      boxShadow: '0 6px 18px -8px rgba(7,40,202,.5)'
    }
  }, children);
}
function ModuleScreen({
  cfg,
  title,
  subtitle,
  onNew,
  newLabel,
  newIcon = 'plus',
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(BlueHeader, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 23,
      fontWeight: 800,
      letterSpacing: -0.3,
      fontFamily: T.font
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '5px 0 0',
      fontSize: 13,
      color: 'rgba(255,255,255,.78)',
      fontFamily: T.font
    }
  }, subtitle)), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      border: 'none',
      cursor: 'pointer',
      background: 'rgba(255,255,255,.14)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 19,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 9,
      right: 10,
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: '#FBBF24',
      border: '1.5px solid #1538C9'
    }
  }))), onNew && /*#__PURE__*/React.createElement("button", {
    onClick: onNew,
    style: {
      marginTop: 16,
      width: '100%',
      height: 44,
      borderRadius: 12,
      border: 'none',
      cursor: 'pointer',
      background: '#fff',
      color: T.primary,
      fontSize: 14,
      fontWeight: 700,
      fontFamily: T.font,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: newIcon,
    size: 18,
    color: T.primary
  }), " ", newLabel)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      background: T.bg,
      paddingTop: onNew ? 10 : 12
    }
  }, children));
}
function DetailScaffold({
  cfg,
  onBack,
  eyebrow,
  title,
  badge,
  headerExtra,
  compact,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 60,
      display: 'flex',
      flexDirection: 'column',
      background: T.bg
    }
  }, /*#__PURE__*/React.createElement(BlueHeader, {
    compact: compact
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      marginBottom: 12,
      padding: '6px 10px 6px 6px',
      borderRadius: 9,
      border: 'none',
      cursor: 'pointer',
      background: 'rgba(255,255,255,.14)',
      color: '#fff',
      fontSize: 13,
      fontWeight: 600,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 17,
    color: "#fff"
  }), " Voltar"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      color: 'rgba(255,255,255,.7)',
      letterSpacing: 0.3,
      fontFamily: T.font
    }
  }, eyebrow), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 20,
      fontWeight: 800,
      letterSpacing: -0.2,
      fontFamily: T.font,
      lineHeight: 1.25
    }
  }, title), badge && /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      marginTop: 3
    }
  }, badge)), headerExtra), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: 16
    }
  }, children));
}
function EmptyState({
  icon,
  text
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      padding: '56px 24px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 60,
      height: 60,
      borderRadius: 18,
      background: T.surfaceMuted,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 26,
    color: T.faint
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: T.muted,
      fontFamily: T.font
    }
  }, text));
}

// ── Home / Dashboard ────────────────────────────────────────────────────────
function StatTile({
  value,
  label,
  icon,
  tone,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      flex: 1,
      textAlign: 'left',
      cursor: 'pointer',
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      padding: 13,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: `${tone}15`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 9
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 17,
    color: tone
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      color: T.text,
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: T.muted,
      marginTop: 4
    }
  }, label));
}
function HomeScreen({
  cfg,
  user,
  onGoOrders,
  onGoInventory,
  onOpenWO,
  onOpenItem
}) {
  const lowItems = INVENTORY.filter(i => i.itemType !== 'equipment' && i.minQty > 0 && i.currentQty < i.minQty);
  const recent = WORK_ORDERS.filter(w => w.status === 'open' || w.status === 'in_progress' || w.status === 'waiting').slice(0, 3);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(BlueHeader, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(BrandTile, {
    size: 28,
    radius: 9,
    shadow: false
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: '#fff',
      letterSpacing: -0.2,
      fontFamily: T.font
    }
  }, "ScandexPRO", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      verticalAlign: 'super',
      fontWeight: 600,
      opacity: 0.7
    }
  }, "\u2122"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'rgba(255,255,255,.75)',
      fontFamily: T.font
    }
  }, "Bem-vindo de volta,"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '3px 0 0',
      fontSize: 22,
      fontWeight: 800,
      letterSpacing: -0.3,
      fontFamily: T.font
    }
  }, user.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 8,
      fontSize: 12,
      color: 'rgba(255,255,255,.8)',
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "building",
    size: 13,
    color: "rgba(255,255,255,.8)"
  }), " ", user.unit, " \xB7 ", user.dept)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 13,
      background: 'rgba(255,255,255,.16)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 15,
      fontWeight: 700,
      color: '#fff',
      fontFamily: T.font,
      flexShrink: 0
    }
  }, user.name.split(' ').map(w => w[0]).join('').slice(0, 2)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      background: T.bg,
      padding: '16px 16px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    value: WO_STATS.activeNow,
    label: "OS ativas",
    icon: "clipboard",
    tone: cfg.accent,
    onClick: onGoOrders
  }), /*#__PURE__*/React.createElement(StatTile, {
    value: WO_STATS.openedToday,
    label: "Abertas hoje",
    icon: "zap",
    tone: "#EA580C",
    onClick: onGoOrders
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    value: INV_STATS.lowStock,
    label: "Estoque baixo",
    icon: "alert",
    tone: "#DC2626",
    onClick: onGoInventory
  }), /*#__PURE__*/React.createElement(StatTile, {
    value: INV_STATS.inMaintenance,
    label: "Em manuten\xE7\xE3o",
    icon: "wrench",
    tone: "#CA8A04",
    onClick: onGoInventory
  })), /*#__PURE__*/React.createElement(SectionTitle, null, "M\xF3dulos"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement(ModuleTile, {
    icon: "clipboard",
    label: "Ordens de Servi\xE7o",
    sub: `${WO_STATS.activeNow} ativas`,
    accent: cfg.accent,
    onClick: onGoOrders
  }), /*#__PURE__*/React.createElement(ModuleTile, {
    icon: "package",
    label: "Invent\xE1rio",
    sub: `${INV_STATS.lowStock} alertas`,
    accent: cfg.accent,
    onClick: onGoInventory
  })), lowItems.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SectionTitle, {
    action: /*#__PURE__*/React.createElement(TextLink, {
      onClick: onGoInventory
    }, "Ver tudo")
  }, "Estoque em alerta"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      padding: '2px 14px',
      marginBottom: 22
    }
  }, lowItems.map((it, i) => {
    const tone = stockStatusOf(it);
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => onOpenItem(it),
      style: {
        width: '100%',
        textAlign: 'left',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        padding: '12px 0',
        borderBottom: i < lowItems.length - 1 ? `1px solid ${T.surfaceMuted}` : 'none',
        fontFamily: T.font
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 34,
        height: 34,
        borderRadius: 9,
        background: `${tone.solid}14`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "alert",
      size: 16,
      color: tone.solid
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        fontWeight: 600,
        color: T.text,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, it.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: T.muted
      }
    }, it.currentQty, " ", it.unit, " \xB7 m\xEDn. ", it.minQty)), /*#__PURE__*/React.createElement(Badge, {
      tone: tone,
      style: cfg.badgeStyle,
      size: "sm"
    }));
  }))), /*#__PURE__*/React.createElement(SectionTitle, {
    action: /*#__PURE__*/React.createElement(TextLink, {
      onClick: onGoOrders
    }, "Ver tudo")
  }, "Ordens em aberto"), recent.map(wo => /*#__PURE__*/React.createElement(WOCard, {
    key: wo.id,
    wo: wo,
    cfg: cfg,
    onOpen: onOpenWO
  }))));
}
function SectionTitle({
  children,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: T.text,
      letterSpacing: 0.2,
      fontFamily: T.font
    }
  }, children), action);
}
function TextLink({
  children,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      fontSize: 12.5,
      fontWeight: 600,
      color: T.primary,
      fontFamily: T.font
    }
  }, children);
}
function ModuleTile({
  icon,
  label,
  sub,
  accent,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      flex: 1,
      textAlign: 'left',
      cursor: 'pointer',
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      padding: 14,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: `${accent}12`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 11
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 20,
    color: accent
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 700,
      color: T.text,
      lineHeight: 1.25
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: T.muted,
      marginTop: 3
    }
  }, sub));
}

// ── Profile ─────────────────────────────────────────────────────────────────
function ProfileScreen({
  cfg,
  user,
  onLogout
}) {
  const rows = [{
    icon: 'user',
    label: 'Meus dados'
  }, {
    icon: 'bell',
    label: 'Notificações'
  }, {
    icon: 'qr',
    label: 'Etiquetas e impressão'
  }, {
    icon: 'download',
    label: 'Dados offline',
    note: 'Em breve'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(BlueHeader, null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 23,
      fontWeight: 800,
      fontFamily: T.font
    }
  }, "Perfil")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      background: T.bg,
      padding: '16px 16px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      padding: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 15,
      background: `${cfg.accent}15`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      fontWeight: 800,
      color: cfg.accent,
      fontFamily: T.font
    }
  }, user.name.split(' ').map(w => w[0]).join('').slice(0, 2)), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: T.text,
      fontFamily: T.font
    }
  }, user.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: T.muted,
      fontFamily: T.font
    }
  }, user.dept, " \xB7 ", user.role))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      overflow: 'hidden',
      marginBottom: 18
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r.label,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 13,
      padding: '14px 15px',
      borderBottom: i < rows.length - 1 ? `1px solid ${T.surfaceMuted}` : 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: r.icon,
    size: 18,
    color: T.muted
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14,
      color: T.text,
      fontFamily: T.font
    }
  }, r.label), r.note && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: T.faint,
      fontFamily: T.font,
      marginRight: 4
    }
  }, r.note), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 16,
    color: T.faint
  })))), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    style: {
      width: '100%',
      height: 48,
      borderRadius: 13,
      border: `1px solid ${T.border}`,
      background: T.surface,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      fontSize: 14,
      fontWeight: 600,
      color: T.danger,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "logout",
    size: 17,
    color: T.danger
  }), " Sair do ScandexPRO\u2122"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    width: 120
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: T.faint,
      fontFamily: T.font
    }
  }, "ScandexPRO\u2122 Mobile \xB7 v1.0 \xB7 build demo"))));
}

// ── Login ───────────────────────────────────────────────────────────────────
function LoginScreen({
  onLogin
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 80,
      display: 'flex',
      flexDirection: 'column',
      background: `linear-gradient(160deg, ${T.primaryDark}, ${T.primary} 55%, #0B1A8F)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 28px'
    }
  }, /*#__PURE__*/React.createElement(BrandTile, {
    size: 72
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '24px 0 0',
      fontSize: 30,
      fontWeight: 800,
      color: '#fff',
      letterSpacing: -0.5,
      fontFamily: T.font
    }
  }, "ScandexPRO\u2122"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 0',
      fontSize: 14,
      color: 'rgba(255,255,255,.78)',
      fontFamily: T.font,
      lineHeight: 1.5
    }
  }, "Insira suas credenciais para acessar o ScandexPRO\u2122."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 30,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 50,
      borderRadius: 13,
      background: 'rgba(255,255,255,.12)',
      border: '1px solid rgba(255,255,255,.18)',
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '0 15px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user",
    size: 18,
    color: "rgba(255,255,255,.7)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14.5,
      color: 'rgba(255,255,255,.95)',
      fontFamily: T.font
    }
  }, "carlos.andrade")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 50,
      borderRadius: 13,
      background: 'rgba(255,255,255,.12)',
      border: '1px solid rgba(255,255,255,.18)',
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '0 15px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "tag",
    size: 18,
    color: "rgba(255,255,255,.7)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14.5,
      color: 'rgba(255,255,255,.95)',
      fontFamily: T.font,
      letterSpacing: 3
    }
  }, "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"))), /*#__PURE__*/React.createElement("button", {
    onClick: onLogin,
    style: {
      marginTop: 22,
      height: 52,
      borderRadius: 14,
      border: 'none',
      cursor: 'pointer',
      background: '#fff',
      color: T.primary,
      fontSize: 15.5,
      fontWeight: 700,
      fontFamily: T.font,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, "Entrar ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18,
    color: T.primary
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 28px 38px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'rgba(255,255,255,.55)',
      fontFamily: T.font,
      fontStyle: 'italic'
    }
  }, "Hospital do Olho Julio C\xE2ndido de Brito"), /*#__PURE__*/React.createElement(PoweredBy, {
    tone: "light"
  })));
}

// ── Bottom tab bar ──────────────────────────────────────────────────────────
function TabBar({
  active,
  onChange,
  accent
}) {
  const tabs = [{
    key: 'home',
    label: 'Início',
    icon: 'home'
  }, {
    key: 'orders',
    label: 'Ordens',
    icon: 'clipboard'
  }, {
    key: 'inventory',
    label: 'Inventário',
    icon: 'package'
  }, {
    key: 'profile',
    label: 'Perfil',
    icon: 'user'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      background: T.surface,
      borderTop: `1px solid ${T.border}`,
      paddingBottom: 22,
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
    }
  }, tabs.map(t => {
    const on = active === t.key;
    return /*#__PURE__*/React.createElement("button", {
      key: t.key,
      onClick: () => onChange(t.key),
      style: {
        flex: 1,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '5px 0',
        fontFamily: T.font
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: t.icon,
      size: 22,
      color: on ? accent : T.faint,
      strokeWidth: on ? 2.4 : 2
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10.5,
        fontWeight: on ? 700 : 500,
        color: on ? accent : T.faint
      }
    }, t.label));
  })));
}

// ── Root App ────────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#0728CA",
  "badgeStyle": "soft",
  "cardStyle": "elevated",
  "density": "comfortable"
} /*EDITMODE-END*/;
const USER = {
  name: 'Carlos Andrade',
  dept: 'Suporte TI',
  unit: 'HO — JCB',
  role: 'Técnico',
  username: 'carlos.andrade'
};
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [booting, setBooting] = React.useState(true);
  const [authed, setAuthed] = React.useState(false);
  const [tab, setTab] = React.useState('home');
  const [overlay, setOverlay] = React.useState(null); // {type:'wo'|'item'|'newWo'|'scan', payload}
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    const id = setTimeout(() => setBooting(false), 2200);
    return () => clearTimeout(id);
  }, []);
  const cfg = {
    accent: t.accent,
    badgeStyle: t.badgeStyle,
    cardStyle: t.cardStyle,
    density: t.density
  };
  const go = key => {
    setOverlay(null);
    setTab(key);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };
  const openWO = wo => setOverlay({
    type: 'wo',
    payload: wo
  });
  const openItem = it => setOverlay({
    type: 'item',
    payload: it
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px 0',
      background: 'radial-gradient(circle at 50% 0%, #1c2438, #0b0f1a)'
    }
  }, /*#__PURE__*/React.createElement(PhoneFrame, {
    statusDark: authed && !overlay && tab === 'home' ? true : overlay ? true : authed ? false : true
  }, /*#__PURE__*/React.createElement("div", {
    ref: scrollRef,
    style: {
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, tab === 'home' && /*#__PURE__*/React.createElement(HomeScreen, {
    cfg: cfg,
    user: USER,
    onGoOrders: () => go('orders'),
    onGoInventory: () => go('inventory'),
    onOpenWO: openWO,
    onOpenItem: openItem
  }), tab === 'orders' && /*#__PURE__*/React.createElement(WorkOrdersScreen, {
    cfg: cfg,
    onOpen: openWO,
    onNew: () => setOverlay({
      type: 'newWo'
    })
  }), tab === 'inventory' && /*#__PURE__*/React.createElement(InventoryScreen, {
    cfg: cfg,
    onOpen: openItem,
    onScan: () => setOverlay({
      type: 'scan'
    })
  }), tab === 'profile' && /*#__PURE__*/React.createElement(ProfileScreen, {
    cfg: cfg,
    user: USER,
    onLogout: () => setAuthed(false)
  })), /*#__PURE__*/React.createElement(TabBar, {
    active: tab,
    onChange: go,
    accent: cfg.accent
  }), overlay?.type === 'wo' && /*#__PURE__*/React.createElement(WorkOrderDetail, {
    wo: overlay.payload,
    cfg: cfg,
    onBack: () => setOverlay(null)
  }), overlay?.type === 'item' && /*#__PURE__*/React.createElement(InventoryDetail, {
    item: overlay.payload,
    cfg: cfg,
    onBack: () => setOverlay(null)
  }), overlay?.type === 'newWo' && /*#__PURE__*/React.createElement(NewWorkOrder, {
    cfg: cfg,
    onBack: () => setOverlay(null)
  }), overlay?.type === 'scan' && /*#__PURE__*/React.createElement(ScanView, {
    cfg: cfg,
    onClose: () => setOverlay(null),
    onDetected: it => setOverlay({
      type: 'item',
      payload: it
    })
  }), !authed && /*#__PURE__*/React.createElement(LoginScreen, {
    onLogin: () => {
      setAuthed(true);
      setTab('home');
    }
  }), booting && /*#__PURE__*/React.createElement(SplashScreen, {
    label: "Iniciando sess\xE3o\u2026"
  })), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Marca"
  }), /*#__PURE__*/React.createElement(TweakColor, {
    label: "Cor de destaque",
    value: t.accent,
    options: ['#0728CA', '#0F9488', '#7C3AED', '#0F172A'],
    onChange: v => setTweak('accent', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Componentes"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Status",
    value: t.badgeStyle,
    options: ['soft', 'solid'],
    onChange: v => setTweak('badgeStyle', v)
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Cards",
    value: t.cardStyle,
    options: ['flat', 'elevated'],
    onChange: v => setTweak('cardStyle', v)
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Densidade",
    value: t.density,
    options: ['comfortable', 'compact'],
    onChange: v => setTweak('density', v)
  })));
}

// ── New inventory item (simple form) ────────────────────────────────────────
function NewInventoryItem({
  cfg,
  onBack
}) {
  const [type, setType] = React.useState('MATERIAL');
  const isEquip = type === 'EQUIPAMENTO';
  return /*#__PURE__*/React.createElement(DetailScaffold, {
    cfg: cfg,
    onBack: onBack,
    eyebrow: "Novo item",
    title: "Cadastrar no estoque",
    compact: true
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "Tipo principal"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, Object.entries(INV_TYPE).map(([k, v]) => {
    const on = type === k;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => setType(k),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 12px',
        borderRadius: 10,
        cursor: 'pointer',
        border: `1.5px solid ${on ? cfg.accent : T.border}`,
        background: on ? `${cfg.accent}10` : T.surface,
        color: on ? cfg.accent : T.muted,
        fontSize: 12.5,
        fontWeight: 600,
        fontFamily: T.font
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: v.icon,
      size: 15,
      color: on ? cfg.accent : T.faint
    }), " ", v.label);
  }))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Dados do item"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, {
    required: true
  }, "Nome"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "Nome do item"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "SKU"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "C\xF3digo"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "Unidade"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "UN",
    value: "UN",
    chevron: true
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "Localiza\xE7\xE3o"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "Onde fica",
    chevron: true
  })), isEquip ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "Patrim\xF4nio"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "Etiqueta"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "N\xBA de s\xE9rie"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "S\xE9rie"
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "Inicial"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "0"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "M\xEDnimo"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "0"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "M\xE1ximo"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "0"
  }))))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Foto e etiqueta"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      flex: 1,
      height: 76,
      borderRadius: 12,
      border: `1.5px dashed ${T.borderStrong}`,
      background: T.surfaceMuted,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      cursor: 'pointer',
      color: T.muted,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "camera",
    size: 20,
    color: cfg.accent
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 600
    }
  }, "Foto")), /*#__PURE__*/React.createElement("button", {
    style: {
      flex: 1,
      height: 76,
      borderRadius: 12,
      border: `1.5px dashed ${T.borderStrong}`,
      background: T.surfaceMuted,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      cursor: 'pointer',
      color: T.muted,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "qr",
    size: 20,
    color: cfg.accent
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 600
    }
  }, "Gerar etiqueta")))), /*#__PURE__*/React.createElement("button", {
    style: {
      width: '100%',
      height: 50,
      borderRadius: 14,
      border: 'none',
      cursor: 'pointer',
      background: cfg.accent,
      color: '#fff',
      fontSize: 15,
      fontWeight: 700,
      fontFamily: T.font,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      boxShadow: `0 8px 20px -6px ${cfg.accent}66`
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 18,
    color: "#fff"
  }), " Cadastrar item"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 12
    }
  }));
}
Object.assign(window, {
  App,
  ModuleScreen,
  DetailScaffold,
  EmptyState,
  HomeScreen,
  ProfileScreen,
  LoginScreen,
  TabBar,
  NewInventoryItem,
  SectionTitle,
  TextLink,
  ModuleTile,
  StatTile
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/scandex-mobile-concept/mobile/app.jsx", error: String((e && e.message) || e) }); }

// export/scandex-mobile-concept/mobile/brand.jsx
try { (() => {
// ScandexPRO Mobile — Brand assets (logos, splash/loading screen)
// Logo files: uploads/secundaria.png (circular badge, transparent),
//             uploads/LOGO PRINCIPAL (2).png (scandex+ wordmark, white bg → light surfaces only)

const LOGO_BADGE = 'uploads/secundaria.png';
const LOGO_WORDMARK = 'uploads/LOGO PRINCIPAL (2).png';

// White squircle "app tile" holding the circular badge
function BrandTile({
  size = 84,
  radius,
  badge = 0.74,
  shadow = true
}) {
  const r = radius != null ? radius : Math.round(size * 0.27);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: r,
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      boxShadow: shadow ? '0 14px 34px -12px rgba(0,0,0,.5)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO_BADGE,
    alt: "Scandex",
    style: {
      width: size * badge,
      height: size * badge,
      objectFit: 'contain',
      display: 'block'
    }
  }));
}

// Bare circular badge (use on light surfaces; dark charcoal circle)
function BrandBadge({
  size = 32
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: LOGO_BADGE,
    alt: "Scandex",
    style: {
      width: size,
      height: size,
      objectFit: 'contain',
      display: 'block',
      flexShrink: 0
    }
  });
}

// scandex+ wordmark — ONLY on white/light backgrounds (image has white bg)
function Wordmark({
  width = 132
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: LOGO_WORDMARK,
    alt: "scandex+ Servi\xE7os Digitais",
    style: {
      width,
      height: 'auto',
      objectFit: 'contain',
      display: 'block',
      mixBlendMode: 'multiply'
    }
  });
}

// "powered by" lockup inside a white pill (safe on any background)
function PoweredBy({
  tone = 'light'
}) {
  const light = tone === 'light';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontStyle: 'italic',
      color: light ? 'rgba(255,255,255,.6)' : T.faint,
      fontFamily: T.font
    }
  }, "powered by"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: '#fff',
      borderRadius: 999,
      padding: '5px 12px 5px 6px'
    }
  }, /*#__PURE__*/React.createElement(BrandBadge, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 800,
      color: '#2B2B2B',
      fontFamily: T.font,
      letterSpacing: -0.2
    }
  }, "scandex", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#3E8FBE'
    }
  }, "+"))));
}

// ── Splash / Loading screen ─────────────────────────────────────────────────
// Reusable stylized boot screen with the Scandex logo.
function SplashScreen({
  label = 'Carregando…'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 90,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: `radial-gradient(120% 90% at 50% 18%, ${T.primary} 0%, ${T.primaryDark} 52%, #06165F 100%)`,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sdx-ring",
    style: {
      position: 'absolute',
      width: 420,
      height: 420,
      borderRadius: '50%',
      border: '1px solid rgba(255,255,255,.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "sdx-ring",
    style: {
      position: 'absolute',
      width: 300,
      height: 300,
      borderRadius: '50%',
      border: '1px solid rgba(255,255,255,.08)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "sdx-pulse",
    style: {
      position: 'absolute',
      width: 104,
      height: 104,
      borderRadius: 30,
      background: 'rgba(255,255,255,.16)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "sdx-pulse sdx-pulse-2",
    style: {
      position: 'absolute',
      width: 104,
      height: 104,
      borderRadius: 30,
      background: 'rgba(255,255,255,.10)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "sdx-tile-float"
  }, /*#__PURE__*/React.createElement(BrandTile, {
    size: 96
  }))), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 27,
      fontWeight: 800,
      color: '#fff',
      letterSpacing: -0.4
    }
  }, "ScandexPRO\u2122"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '7px 0 0',
      fontSize: 13,
      color: 'rgba(255,255,255,.62)'
    }
  }, "Gest\xE3o de servi\xE7os e invent\xE1rio"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 168,
      height: 4,
      borderRadius: 999,
      background: 'rgba(255,255,255,.16)',
      overflow: 'hidden',
      marginTop: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sdx-progress",
    style: {
      height: '100%',
      width: '42%',
      borderRadius: 999,
      background: 'rgba(255,255,255,.95)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 13,
      fontSize: 12,
      color: 'rgba(255,255,255,.5)',
      letterSpacing: 0.3
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 38
    }
  }, /*#__PURE__*/React.createElement(PoweredBy, {
    tone: "light"
  })));
}
Object.assign(window, {
  LOGO_BADGE,
  LOGO_WORDMARK,
  BrandTile,
  BrandBadge,
  Wordmark,
  PoweredBy,
  SplashScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/scandex-mobile-concept/mobile/brand.jsx", error: String((e && e.message) || e) }); }

// export/scandex-mobile-concept/mobile/data.jsx
try { (() => {
// ScandexPRO Mobile — Mock data (schema-faithful, pt-BR)

// ── Work Orders (type WorkOrder) ────────────────────────────────────────────
const WORK_ORDERS = [{
  id: 'wo1',
  code: 'OS-2025-0418',
  serviceType: 'Manutenção corretiva',
  category: 'TI / Infraestrutura',
  unitName: 'Hospital do Olho — JCB',
  department: 'Centro Cirúrgico',
  openedAt: '2025-06-09T08:12:00',
  requestedByName: 'Enf. Patrícia Lemos',
  requesterContact: '(85) 99812-4471',
  responsibleTechnicianName: 'Carlos Andrade',
  technicalTeam: 'Suporte TI',
  status: 'in_progress',
  priority: 'urgent',
  source: 'whatsapp',
  expectedCompletionAt: '2025-06-09T12:00:00',
  escalationCount: 1,
  attendanceNotes: 'Monitor do mapa cirúrgico sem sinal. Verificado cabo HDMI rompido, troca em andamento.',
  resolutionStatus: null,
  materials: [{
    description: 'Cabo HDMI 2.0 — 3m',
    quantity: 1,
    unit: 'UN'
  }, {
    description: 'Adaptador DisplayPort→HDMI',
    quantity: 1,
    unit: 'UN'
  }]
}, {
  id: 'wo2',
  code: 'OS-2025-0417',
  serviceType: 'Instalação de equipamento',
  category: 'Equipamentos',
  unitName: 'Hospital do Olho — JCB',
  department: 'Recepção Térreo',
  openedAt: '2025-06-09T07:40:00',
  requestedByName: 'Marcos Vinícius',
  requesterContact: '(85) 99655-2210',
  responsibleTechnicianName: 'Júlia Tavares',
  technicalTeam: 'Suporte TI',
  status: 'open',
  priority: 'high',
  source: 'web',
  expectedCompletionAt: '2025-06-09T16:00:00',
  escalationCount: 0,
  attendanceNotes: null,
  resolutionStatus: null,
  materials: [{
    description: 'Impressora térmica Zebra ZD220',
    quantity: 1,
    unit: 'UN'
  }]
}, {
  id: 'wo3',
  code: 'OS-2025-0416',
  serviceType: 'Transporte / Coleta',
  category: 'Logística',
  unitName: 'Unidade Moacyr',
  department: 'Almoxarifado',
  openedAt: '2025-06-09T06:55:00',
  requestedByName: 'Sandra Beltrão',
  requesterContact: null,
  responsibleTechnicianName: 'Equipe Logística',
  technicalTeam: 'Logística',
  status: 'waiting',
  priority: 'normal',
  source: 'external',
  expectedCompletionAt: '2025-06-09T18:00:00',
  escalationCount: 0,
  attendanceNotes: 'Aguardando liberação do setor de origem para coleta dos insumos.',
  resolutionStatus: null,
  materials: []
}, {
  id: 'wo4',
  code: 'OS-2025-0414',
  serviceType: 'Manutenção corretiva',
  category: 'Redes',
  unitName: 'Hospital do Olho — JCB',
  department: 'Faturamento',
  openedAt: '2025-06-08T15:22:00',
  requestedByName: 'Renato Gomes',
  requesterContact: '(85) 98123-7788',
  responsibleTechnicianName: 'Carlos Andrade',
  technicalTeam: 'Redes',
  status: 'completed',
  priority: 'high',
  source: 'web',
  expectedCompletionAt: '2025-06-08T17:00:00',
  finishedAt: '2025-06-08T16:35:00',
  escalationCount: 0,
  attendanceNotes: 'Switch do andar reiniciado e porta reconfigurada. Conectividade restabelecida.',
  resolutionStatus: 'resolved',
  resolutionNotes: 'Porta 14 do switch substituída.',
  materials: [{
    description: 'Patch cord Cat6 — 1,5m',
    quantity: 2,
    unit: 'UN'
  }]
}, {
  id: 'wo5',
  code: 'OS-2025-0411',
  serviceType: 'Preventiva',
  category: 'Equipamentos',
  unitName: 'Hospital do Olho — JCB',
  department: 'Diagnóstico',
  openedAt: '2025-06-08T10:05:00',
  requestedByName: 'Dra. Helena Castro',
  requesterContact: '(85) 99440-1190',
  responsibleTechnicianName: 'Júlia Tavares',
  technicalTeam: 'Suporte TI',
  status: 'delivered',
  priority: 'normal',
  source: 'web',
  expectedCompletionAt: '2025-06-08T14:00:00',
  finishedAt: '2025-06-08T13:10:00',
  escalationCount: 0,
  attendanceNotes: 'Limpeza e atualização do firmware da estação de captura. Entregue ao setor.',
  resolutionStatus: 'resolved',
  materials: []
}, {
  id: 'wo6',
  code: 'OS-2025-0409',
  serviceType: 'Suporte software',
  category: 'TI / Sistemas',
  unitName: 'Unidade Moacyr',
  department: 'Administrativo',
  openedAt: '2025-06-07T09:18:00',
  requestedByName: 'Felipe Moura',
  requesterContact: null,
  responsibleTechnicianName: null,
  technicalTeam: 'Suporte TI',
  status: 'cancelled',
  priority: 'low',
  source: 'whatsapp',
  expectedCompletionAt: null,
  escalationCount: 0,
  attendanceNotes: 'Solicitante resolveu por conta própria. OS cancelada.',
  resolutionStatus: 'unresolved',
  materials: []
}];
const WO_STATS = {
  totalGlobal: 1284,
  openedToday: 12,
  completedToday: 7,
  activeNow: 18,
  overdue: 3
};

// Activity timeline for a WO detail
const WO_TIMELINE = {
  wo1: [{
    at: '08:12',
    label: 'OS aberta via WhatsApp',
    by: 'Enf. Patrícia Lemos',
    tone: 'open'
  }, {
    at: '08:21',
    label: 'Atribuída a Carlos Andrade',
    by: 'Triagem automática',
    tone: 'open'
  }, {
    at: '08:40',
    label: 'Escalada — prioridade urgente',
    by: 'Sistema',
    tone: 'waiting'
  }, {
    at: '09:05',
    label: 'Atendimento iniciado',
    by: 'Carlos Andrade',
    tone: 'in_progress'
  }]
};

// ── Inventory (type InventoryItem) ──────────────────────────────────────────
const INVENTORY = [{
  id: 'it1',
  sku: 'TI-NTB-0231',
  name: 'Notebook Dell Latitude 3420',
  itemType: 'equipment',
  primaryType: 'EQUIPAMENTO',
  category: 'EQUIPAMENTO',
  unit: 'UN',
  currentQty: 1,
  minQty: 0,
  maxQty: 0,
  assetTag: 'HMOJCB-002311',
  serialNumber: 'BR7K2L3',
  currentLocation: 'Faturamento — Sala 4',
  brand: 'Dell',
  model: 'Latitude 3420',
  equipmentStatus: 'FUNCIONANDO',
  operatingSystem: 'Windows 11 Pro',
  technicalSpecs: [{
    key: 'PROCESSADOR',
    value: 'INTEL CORE I5 1135G7'
  }, {
    key: 'MEMORIA RAM',
    value: 'DDR4 8GB 1X'
  }, {
    key: 'ARMAZENAMENTO',
    value: 'SSD NVME 256GB 1X'
  }],
  notes: 'Patrimônio etiquetado. Em uso pela equipe de faturamento.'
}, {
  id: 'it2',
  sku: 'TI-MON-0102',
  name: 'Monitor LG 24" Full HD',
  itemType: 'equipment',
  primaryType: 'EQUIPAMENTO',
  category: 'EQUIPAMENTO',
  unit: 'UN',
  currentQty: 1,
  minQty: 0,
  maxQty: 0,
  assetTag: 'HMOJCB-001029',
  serialNumber: '208NTRA9',
  currentLocation: 'Centro Cirúrgico — Mapa',
  brand: 'LG',
  model: '24MK430H',
  equipmentStatus: 'EM MANUTENCAO',
  operatingSystem: null,
  technicalSpecs: [{
    key: 'POLEGADAS',
    value: '24"'
  }, {
    key: 'RESOLUCAO',
    value: '1920x1080'
  }, {
    key: 'PORTAS',
    value: '1x HDMI'
  }],
  notes: 'Sem sinal de vídeo. Vinculado à OS-2025-0418.'
}, {
  id: 'it3',
  name: 'Cabo HDMI 2.0 — 3m',
  sku: 'MAT-CAB-0440',
  itemType: 'consumable',
  primaryType: 'MATERIAL',
  category: 'MATERIAL',
  unit: 'UN',
  currentQty: 3,
  minQty: 10,
  maxQty: 60,
  assetTag: null,
  serialNumber: null,
  currentLocation: 'Almoxarifado TI — Prateleira B2',
  brand: 'Multilaser',
  model: null,
  equipmentStatus: null,
  operatingSystem: null,
  technicalSpecs: [],
  notes: 'Consumo recorrente em OS de manutenção.'
}, {
  id: 'it4',
  name: 'Patch cord Cat6 — 1,5m',
  sku: 'MAT-RDE-0220',
  itemType: 'consumable',
  primaryType: 'MATERIAL',
  category: 'MATERIAL',
  unit: 'UN',
  currentQty: 14,
  minQty: 12,
  maxQty: 80,
  assetTag: null,
  serialNumber: null,
  currentLocation: 'Almoxarifado TI — Prateleira B1',
  brand: 'Furukawa',
  model: null,
  equipmentStatus: null,
  operatingSystem: null,
  technicalSpecs: [],
  notes: ''
}, {
  id: 'it5',
  name: 'Toner HP 26A Preto',
  sku: 'SUP-TON-0078',
  itemType: 'consumable',
  primaryType: 'SUPRIMENTO',
  category: 'SUPRIMENTO',
  unit: 'UN',
  currentQty: 6,
  minQty: 8,
  maxQty: 24,
  assetTag: null,
  serialNumber: null,
  currentLocation: 'Almoxarifado Central — A4',
  brand: 'HP',
  model: 'CF226A',
  equipmentStatus: null,
  operatingSystem: null,
  technicalSpecs: [],
  notes: 'Compatível com LaserJet Pro M402.'
}, {
  id: 'it6',
  name: 'Mouse óptico USB',
  sku: 'PER-MOU-0345',
  itemType: 'consumable',
  primaryType: 'PERIFERICO',
  category: 'PERIFERICO',
  unit: 'UN',
  currentQty: 22,
  minQty: 10,
  maxQty: 50,
  assetTag: null,
  serialNumber: null,
  currentLocation: 'Almoxarifado TI — Prateleira C3',
  brand: 'Logitech',
  model: 'B100',
  equipmentStatus: null,
  operatingSystem: null,
  technicalSpecs: [{
    key: 'PORTAS',
    value: '1x USB'
  }],
  notes: ''
}, {
  id: 'it7',
  name: 'Chave de fenda de precisão (kit)',
  sku: 'FER-KIT-0011',
  itemType: 'consumable',
  primaryType: 'FERRAMENTA',
  category: 'FERRAMENTA',
  unit: 'UN',
  currentQty: 4,
  minQty: 2,
  maxQty: 8,
  assetTag: null,
  serialNumber: null,
  currentLocation: 'Bancada TI',
  brand: 'Sata',
  model: '24-em-1',
  equipmentStatus: null,
  operatingSystem: null,
  technicalSpecs: [],
  notes: 'Ferramenta de bancada para manutenção de hardware.'
}, {
  id: 'it8',
  name: 'Impressora térmica Zebra ZD220',
  sku: 'TI-IMP-0067',
  itemType: 'equipment',
  primaryType: 'EQUIPAMENTO',
  category: 'EQUIPAMENTO',
  unit: 'UN',
  currentQty: 1,
  minQty: 0,
  maxQty: 0,
  assetTag: 'HMOJCB-000674',
  serialNumber: 'ZD2K88X1',
  currentLocation: 'Estoque TI — aguardando instalação',
  brand: 'Zebra',
  model: 'ZD220',
  equipmentStatus: 'AGUARDANDO INSTALACAO',
  operatingSystem: null,
  technicalSpecs: [{
    key: 'VELOCIDADE',
    value: '152MM/S'
  }, {
    key: 'RESOLUCAO',
    value: '203DPI'
  }],
  notes: 'Vinculada à OS-2025-0417 (instalação na recepção).'
}];
const INV_STATS = {
  totalItems: 612,
  lowStock: 9,
  equipment: 184,
  inMaintenance: 5
};

// ── Movements (type Movement) ───────────────────────────────────────────────
const MOVEMENTS = [{
  id: 'm1',
  itemName: 'Cabo HDMI 2.0 — 3m',
  movementType: 'out',
  qty: 1,
  sourceKind: 'work_order',
  sourceLabel: 'OS-2025-0418',
  userName: 'Carlos Andrade',
  createdAt: '2025-06-09T09:08:00'
}, {
  id: 'm2',
  itemName: 'Patch cord Cat6 — 1,5m',
  movementType: 'out',
  qty: 2,
  sourceKind: 'work_order',
  sourceLabel: 'OS-2025-0414',
  userName: 'Carlos Andrade',
  createdAt: '2025-06-08T16:30:00'
}, {
  id: 'm3',
  itemName: 'Toner HP 26A Preto',
  movementType: 'in',
  qty: 12,
  sourceKind: 'restock',
  sourceLabel: 'PR-2025-0091',
  userName: 'Almox. Central',
  createdAt: '2025-06-08T11:02:00'
}, {
  id: 'm4',
  itemName: 'Mouse óptico USB',
  movementType: 'transfer',
  qty: 5,
  sourceKind: 'internal_unit',
  sourceLabel: 'Unidade Moacyr',
  userName: 'Sandra Beltrão',
  createdAt: '2025-06-07T14:45:00'
}, {
  id: 'm5',
  itemName: 'Notebook Dell Latitude 3420',
  movementType: 'adjustment',
  qty: 1,
  sourceKind: 'adjustment',
  sourceLabel: 'Inventário físico',
  userName: 'Júlia Tavares',
  createdAt: '2025-06-07T09:20:00'
}, {
  id: 'm6',
  itemName: 'Cabo HDMI 2.0 — 3m',
  movementType: 'in',
  qty: 20,
  sourceKind: 'supplier',
  sourceLabel: 'TechSupri LTDA',
  userName: 'Almox. TI',
  createdAt: '2025-06-06T08:15:00'
}];

// ── Restock orders (type RestockOrder) ──────────────────────────────────────
const RESTOCK = [{
  id: 'r1',
  code: 'PR-2025-0094',
  supplierName: 'TechSupri LTDA',
  status: 'sent',
  expectedAt: '2025-06-12',
  createdByName: 'Júlia Tavares',
  createdAt: '2025-06-09',
  items: [{
    itemName: 'Cabo HDMI 2.0 — 3m',
    qtyOrdered: 30,
    qtyReceived: 0,
    unitPrice: 18.9
  }, {
    itemName: 'Toner HP 26A Preto',
    qtyOrdered: 12,
    qtyReceived: 0,
    unitPrice: 142.0
  }]
}, {
  id: 'r2',
  code: 'PR-2025-0092',
  supplierName: 'Unidade Moacyr',
  status: 'partially_received',
  expectedAt: '2025-06-10',
  createdByName: 'Sandra Beltrão',
  createdAt: '2025-06-08',
  items: [{
    itemName: 'Patch cord Cat6 — 1,5m',
    qtyOrdered: 40,
    qtyReceived: 20,
    unitPrice: null
  }]
}, {
  id: 'r3',
  code: 'PR-2025-0091',
  supplierName: 'Office Print Distribuidora',
  status: 'received',
  expectedAt: '2025-06-08',
  createdByName: 'Almox. Central',
  createdAt: '2025-06-06',
  items: [{
    itemName: 'Toner HP 26A Preto',
    qtyOrdered: 12,
    qtyReceived: 12,
    unitPrice: 138.5
  }]
}];
const RESTOCK_STATUS = {
  draft: {
    label: 'Rascunho',
    solid: '#64748B',
    soft: '#EEF2F7',
    fg: '#475569'
  },
  sent: {
    label: 'Enviado',
    solid: '#2563EB',
    soft: '#EAF1FE',
    fg: '#1D4ED8'
  },
  partially_received: {
    label: 'Recebido parcial',
    solid: '#CA8A04',
    soft: '#FEF7E0',
    fg: '#A16207'
  },
  received: {
    label: 'Recebido',
    solid: '#059669',
    soft: '#E6F6EF',
    fg: '#047857'
  },
  cancelled: {
    label: 'Cancelado',
    solid: '#DC2626',
    soft: '#FDECEC',
    fg: '#B91C1C'
  }
};

// ── Helpers ─────────────────────────────────────────────────────────────────
function stockStatusOf(item) {
  if (item.itemType === 'equipment') {
    const s = (item.equipmentStatus || '').toUpperCase();
    if (s.includes('NAO FUNC') || s.includes('DEFEIT')) return STOCK_TONE.defeito;
    if (s.includes('MANUT') || s.includes('AGUARD')) return STOCK_TONE.manutencao;
    if (s.includes('BAIX')) return STOCK_TONE.baixado;
    return STOCK_TONE.funcionando;
  }
  if (item.minQty <= 0) return STOCK_TONE.normal;
  if (item.currentQty < item.minQty) return STOCK_TONE.baixo;
  if (item.currentQty < item.minQty * 1.2) return STOCK_TONE.atencao;
  return STOCK_TONE.normal;
}
function fmtTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
}
function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit'
  });
}
function relDay(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const now = new Date('2025-06-09T10:00:00');
  const days = Math.floor((now - d) / 86400000);
  if (days <= 0) return 'Hoje';
  if (days === 1) return 'Ontem';
  return `Há ${days} dias`;
}
Object.assign(window, {
  WORK_ORDERS,
  WO_STATS,
  WO_TIMELINE,
  INVENTORY,
  INV_STATS,
  MOVEMENTS,
  RESTOCK,
  RESTOCK_STATUS,
  stockStatusOf,
  fmtTime,
  fmtDate,
  relDay
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/scandex-mobile-concept/mobile/data.jsx", error: String((e && e.message) || e) }); }

// export/scandex-mobile-concept/mobile/inventory.jsx
try { (() => {
// ScandexPRO Mobile — Inventário module

// ── Item card ───────────────────────────────────────────────────────────────
function InvCard({
  item,
  cfg,
  onOpen
}) {
  const tone = stockStatusOf(item);
  const ty = INV_TYPE[item.primaryType];
  const isEquip = item.itemType === 'equipment';
  const low = !isEquip && item.minQty > 0 && item.currentQty < item.minQty;
  const pct = item.maxQty > 0 ? Math.min(100, Math.round(item.currentQty / item.maxQty * 100)) : item.minQty > 0 ? Math.min(100, Math.round(item.currentQty / (item.minQty * 1.5) * 100)) : 100;
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpen(item),
    style: {
      width: '100%',
      textAlign: 'left',
      cursor: 'pointer',
      display: 'block',
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      padding: 13,
      boxShadow: cfg.cardStyle === 'elevated' ? '0 1px 3px rgba(15,23,42,.06), 0 6px 16px -8px rgba(15,23,42,.12)' : 'none',
      fontFamily: T.font,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 11,
      flexShrink: 0,
      background: `${cfg.accent}12`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ty.icon,
    size: 21,
    color: cfg.accent
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      color: T.text,
      lineHeight: 1.3
    }
  }, item.name), /*#__PURE__*/React.createElement(Badge, {
    tone: tone,
    style: cfg.badgeStyle,
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: cfg.accent,
      fontWeight: 600,
      fontFamily: T.font
    }
  }, item.sku || item.assetTag), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 3,
      borderRadius: '50%',
      background: T.faint
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: T.faint
    }
  }, ty.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 7
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 13,
    color: T.faint
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: T.muted,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, item.currentLocation || 'Sem localização')))), !isEquip && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 11,
      paddingTop: 11,
      borderTop: `1px solid ${T.surfaceMuted}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: T.muted
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: low ? T.danger : T.text,
      fontSize: 14
    }
  }, item.currentQty), " ", item.unit, " em estoque"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: T.faint
    }
  }, "m\xEDn. ", item.minQty)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      borderRadius: 3,
      background: T.surfaceMuted,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      borderRadius: 3,
      background: tone.solid
    }
  }))), isEquip && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 11,
      paddingTop: 11,
      borderTop: `1px solid ${T.surfaceMuted}`,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "hash",
    size: 13,
    color: T.faint
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: T.muted
    }
  }, item.brand, " ", item.model, " \xB7 S\xE9rie ", item.serialNumber)));
}

// ── Movement row ────────────────────────────────────────────────────────────
function MovementRow({
  m
}) {
  const tone = MOVE_TONE[m.movementType];
  const sign = m.movementType === 'in' ? '+' : m.movementType === 'out' ? '−' : '±';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '11px 0',
      borderBottom: `1px solid ${T.surfaceMuted}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 10,
      flexShrink: 0,
      background: `${tone.color}14`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: tone.icon,
    size: 17,
    color: tone.color
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 500,
      color: T.text,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, m.itemName), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: T.faint,
      marginTop: 1
    }
  }, tone.label, " \xB7 ", m.sourceLabel, " \xB7 ", fmtDate(m.createdAt), " ", fmtTime(m.createdAt))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: tone.color,
      flexShrink: 0
    }
  }, sign, m.qty));
}

// ── Restock row ─────────────────────────────────────────────────────────────
function RestockCard({
  r,
  cfg
}) {
  const tone = RESTOCK_STATUS[r.status];
  const totalOrdered = r.items.reduce((s, i) => s + i.qtyOrdered, 0);
  const totalReceived = r.items.reduce((s, i) => s + i.qtyReceived, 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      padding: 13,
      marginBottom: 10,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      marginBottom: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: cfg.accent
    }
  }, r.code), /*#__PURE__*/React.createElement(Badge, {
    tone: tone,
    style: cfg.badgeStyle,
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "truck",
    size: 14,
    color: T.faint
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: T.muted
    }
  }, r.supplierName)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, r.items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: T.textSoft,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, it.itemName), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: it.qtyReceived >= it.qtyOrdered ? '#047857' : T.muted,
      flexShrink: 0
    }
  }, it.qtyReceived, "/", it.qtyOrdered)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 11,
      paddingTop: 10,
      borderTop: `1px solid ${T.surfaceMuted}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: T.faint,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 12,
    color: T.faint
  }), " Prev. ", new Date(r.expectedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit'
  })), r.status !== 'received' && r.status !== 'cancelled' && /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '6px 12px',
      borderRadius: 9,
      border: 'none',
      cursor: 'pointer',
      background: `${cfg.accent}14`,
      color: cfg.accent,
      fontSize: 12,
      fontWeight: 700,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 13,
    color: cfg.accent
  }), " Receber")));
}

// ── Inventory screen (read-only): list + scan entry ─────────────────────────
function InventoryScreen({
  cfg,
  onOpen,
  onScan
}) {
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState('all');
  const counts = React.useMemo(() => {
    const c = {
      all: INVENTORY.length
    };
    INVENTORY.forEach(i => {
      c[i.primaryType] = (c[i.primaryType] || 0) + 1;
    });
    return c;
  }, []);
  const chips = [{
    key: 'all',
    label: 'Todos',
    count: counts.all
  }, {
    key: 'EQUIPAMENTO',
    label: 'Equipamentos',
    count: counts.EQUIPAMENTO
  }, {
    key: 'MATERIAL',
    label: 'Materiais',
    count: counts.MATERIAL
  }, {
    key: 'SUPRIMENTO',
    label: 'Suprimentos',
    count: counts.SUPRIMENTO
  }, {
    key: 'PERIFERICO',
    label: 'Periféricos',
    count: counts.PERIFERICO
  }, {
    key: 'FERRAMENTA',
    label: 'Ferramentas',
    count: counts.FERRAMENTA
  }].filter(c => c.count);
  const list = INVENTORY.filter(i => {
    if (filter !== 'all' && i.primaryType !== filter) return false;
    if (q) {
      const t = (i.name + (i.sku || '') + (i.assetTag || '') + (i.brand || '') + (i.currentLocation || '')).toLowerCase();
      if (!t.includes(q.toLowerCase())) return false;
    }
    return true;
  });
  return /*#__PURE__*/React.createElement(ModuleScreen, {
    cfg: cfg,
    title: "Invent\xE1rio",
    subtitle: `${INV_STATS.totalItems} itens · somente consulta`,
    onNew: onScan,
    newLabel: "Escanear QR Code",
    newIcon: "scan"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 16px 12px'
    }
  }, /*#__PURE__*/React.createElement(SearchField, {
    value: q,
    onChange: setQ,
    placeholder: "Buscar item, SKU, patrim\xF4nio\u2026"
  })), /*#__PURE__*/React.createElement(ChipRow, {
    chips: chips,
    active: filter,
    onPick: setFilter,
    accent: cfg.accent
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 24px'
    }
  }, list.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    icon: "package",
    text: "Nenhum item encontrado."
  }) : list.map(it => /*#__PURE__*/React.createElement(InvCard, {
    key: it.id,
    item: it,
    cfg: cfg,
    onOpen: onOpen
  }))));
}

// ── Scan view (camera QR reader → opens item) ───────────────────────────────
function ScanView({
  cfg,
  onClose,
  onDetected
}) {
  const [detecting, setDetecting] = React.useState(null); // item being "read"
  const scannable = INVENTORY;
  const read = item => {
    if (detecting) return;
    setDetecting(item);
    setTimeout(() => onDetected(item), 780);
  };
  const corner = pos => {
    const base = {
      position: 'absolute',
      width: 30,
      height: 30,
      border: `3px solid ${cfg.accent}`
    };
    const map = {
      tl: {
        top: -2,
        left: -2,
        borderRight: 'none',
        borderBottom: 'none',
        borderTopLeftRadius: 10
      },
      tr: {
        top: -2,
        right: -2,
        borderLeft: 'none',
        borderBottom: 'none',
        borderTopRightRadius: 10
      },
      bl: {
        bottom: -2,
        left: -2,
        borderRight: 'none',
        borderTop: 'none',
        borderBottomLeftRadius: 10
      },
      br: {
        bottom: -2,
        right: -2,
        borderLeft: 'none',
        borderTop: 'none',
        borderBottomRightRadius: 10
      }
    };
    return /*#__PURE__*/React.createElement("span", {
      style: {
        ...base,
        ...map[pos]
      }
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 70,
      background: '#0A0E18',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement("style", null, `
        @keyframes sdxScanLine { 0%{ top: 6%; } 50%{ top: 88%; } 100%{ top: 6%; } }
        @keyframes sdxFadeUp { from{ opacity:0; transform: translateY(8px);} to{opacity:1; transform:none;} }
      `), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(120% 80% at 50% 30%, #243153 0%, #131a2b 45%, #080b14 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.5,
      background: 'repeating-linear-gradient(115deg, rgba(255,255,255,.015) 0 2px, transparent 2px 9px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 3,
      padding: '46px 16px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      width: 38,
      height: 38,
      borderRadius: 11,
      border: 'none',
      cursor: 'pointer',
      background: 'rgba(255,255,255,.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 19,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#fff',
      fontSize: 15,
      fontWeight: 700
    }
  }, "Escanear etiqueta"), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 11,
      border: 'none',
      cursor: 'pointer',
      background: 'rgba(255,255,255,.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    size: 18,
    color: "#fff"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 3,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 22,
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 234,
      height: 234,
      borderRadius: 12
    }
  }, corner('tl'), corner('tr'), corner('bl'), corner('br'), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 6,
      borderRadius: 8,
      background: 'rgba(255,255,255,.03)'
    }
  }), !detecting && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '5%',
      right: '5%',
      height: 2,
      borderRadius: 2,
      background: cfg.accent,
      boxShadow: `0 0 14px 1px ${cfg.accent}`,
      animation: 'sdxScanLine 2.4s ease-in-out infinite'
    }
  }), detecting && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      animation: 'sdxFadeUp .2s ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: '#059669',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 0 8px rgba(5,150,105,.18)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 28,
    color: "#fff",
    strokeWidth: 3
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#fff',
      fontSize: 13,
      fontWeight: 700
    }
  }, "Etiqueta reconhecida"))), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgba(255,255,255,.72)',
      fontSize: 13.5,
      textAlign: 'center',
      lineHeight: 1.5,
      margin: 0,
      maxWidth: 240
    }
  }, detecting ? `Abrindo ${detecting.name}…` : 'Aponte a câmera para o QR Code da etiqueta do item para abrir os detalhes.')), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 3,
      background: T.surface,
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
      padding: '16px 0 28px',
      boxShadow: '0 -8px 30px rgba(0,0,0,.3)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '0 16px 11px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "qr",
    size: 14,
    color: T.faint
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: T.faint,
      fontWeight: 700,
      letterSpacing: 0.4,
      textTransform: 'uppercase'
    }
  }, "Simular leitura (prot\xF3tipo)")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      overflowX: 'auto',
      padding: '0 16px',
      scrollbarWidth: 'none'
    }
  }, scannable.map(it => {
    const ty = INV_TYPE[it.primaryType];
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => read(it),
      style: {
        flexShrink: 0,
        width: 118,
        textAlign: 'left',
        cursor: 'pointer',
        background: T.bg,
        border: `1px solid ${T.border}`,
        borderRadius: 12,
        padding: 11,
        fontFamily: T.font
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 34,
        height: 34,
        borderRadius: 9,
        background: `${cfg.accent}12`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 9
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ty.icon,
      size: 17,
      color: cfg.accent
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: cfg.accent,
        fontFamily: "'Courier New', monospace"
      }
    }, it.assetTag || it.sku), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: T.textSoft,
        marginTop: 3,
        lineHeight: 1.3,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical'
      }
    }, it.name));
  }))));
}

// ── Item detail ─────────────────────────────────────────────────────────────
function InventoryDetail({
  item,
  cfg,
  onBack
}) {
  const tone = stockStatusOf(item);
  const ty = INV_TYPE[item.primaryType];
  const isEquip = item.itemType === 'equipment';
  const itemMoves = MOVEMENTS.filter(m => m.itemName === item.name);
  return /*#__PURE__*/React.createElement(DetailScaffold, {
    cfg: cfg,
    onBack: onBack,
    eyebrow: item.sku || item.assetTag || ty.label,
    title: item.name,
    badge: /*#__PURE__*/React.createElement(Badge, {
      tone: tone,
      style: "solid"
    }),
    headerExtra: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginTop: 10,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        color: 'rgba(255,255,255,.78)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ty.icon,
      size: 14,
      color: "rgba(255,255,255,.78)"
    }), " ", ty.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        color: 'rgba(255,255,255,.78)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "map-pin",
      size: 14,
      color: "rgba(255,255,255,.78)"
    }), " ", item.currentLocation))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 150,
      borderRadius: 14,
      marginBottom: 12,
      overflow: 'hidden',
      position: 'relative',
      background: `repeating-linear-gradient(135deg, ${T.surfaceMuted}, ${T.surfaceMuted} 11px, #FFF 11px, #FFF 22px)`,
      border: `1px solid ${T.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "camera",
    size: 24,
    color: T.faint
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: T.faint,
      fontFamily: "'Courier New', monospace"
    }
  }, "foto do item / patrim\xF4nio")), /*#__PURE__*/React.createElement("button", {
    style: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '7px 11px',
      borderRadius: 9,
      border: 'none',
      cursor: 'pointer',
      background: 'rgba(15,23,42,.78)',
      color: '#fff',
      fontSize: 12,
      fontWeight: 600,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "qr",
    size: 13,
    color: "#fff"
  }), " QR")), !isEquip ? /*#__PURE__*/React.createElement(SectionCard, {
    title: "Estoque"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 4,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 34,
      fontWeight: 800,
      color: tone.solid,
      lineHeight: 1
    }
  }, item.currentQty), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: T.muted,
      marginBottom: 3
    }
  }, item.unit)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      borderRadius: 4,
      background: T.surfaceMuted,
      overflow: 'hidden',
      margin: '12px 0 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${item.maxQty ? Math.min(100, item.currentQty / item.maxQty * 100) : 100}%`,
      height: '100%',
      background: tone.solid,
      borderRadius: 4
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 11.5,
      color: T.faint
    }
  }, /*#__PURE__*/React.createElement("span", null, "M\xEDnimo ", item.minQty), /*#__PURE__*/React.createElement("span", null, "M\xE1ximo ", item.maxQty || '—'))) : /*#__PURE__*/React.createElement(SectionCard, {
    title: "Patrim\xF4nio"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(StatItem, {
    label: "Etiqueta"
  }, item.assetTag), /*#__PURE__*/React.createElement(StatItem, {
    label: "N\xBA de s\xE9rie"
  }, item.serialNumber), /*#__PURE__*/React.createElement(StatItem, {
    label: "Marca"
  }, item.brand), /*#__PURE__*/React.createElement(StatItem, {
    label: "Modelo"
  }, item.model), item.operatingSystem && /*#__PURE__*/React.createElement(StatItem, {
    label: "Sistema"
  }, item.operatingSystem), /*#__PURE__*/React.createElement(StatItem, {
    label: "Estado"
  }, item.equipmentStatus))), item.technicalSpecs.length > 0 && /*#__PURE__*/React.createElement(SectionCard, {
    title: "Especifica\xE7\xF5es t\xE9cnicas"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, item.technicalSpecs.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: T.surfaceMuted,
      borderRadius: 9,
      padding: '8px 11px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: T.faint,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 0.4
    }
  }, s.key), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: T.text,
      fontWeight: 600,
      marginTop: 2
    }
  }, s.value))))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Identifica\xE7\xE3o"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(StatItem, {
    label: "SKU"
  }, item.sku || '—'), /*#__PURE__*/React.createElement(StatItem, {
    label: "Unidade"
  }, item.unit), /*#__PURE__*/React.createElement(StatItem, {
    label: "Categoria"
  }, ty.label), /*#__PURE__*/React.createElement(StatItem, {
    label: "Localiza\xE7\xE3o"
  }, item.currentLocation || '—')), item.notes && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontSize: 13,
      color: T.textSoft,
      lineHeight: 1.5,
      background: T.surfaceMuted,
      borderRadius: 10,
      padding: 11
    }
  }, item.notes)), itemMoves.length > 0 && /*#__PURE__*/React.createElement(SectionCard, {
    title: "Hist\xF3rico de movimenta\xE7\xF5es"
  }, itemMoves.map(m => /*#__PURE__*/React.createElement(MovementRow, {
    key: m.id,
    m: m
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8
    }
  }));
}
Object.assign(window, {
  InventoryScreen,
  ScanView,
  InventoryDetail,
  InvCard,
  MovementRow,
  RestockCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/scandex-mobile-concept/mobile/inventory.jsx", error: String((e && e.message) || e) }); }

// export/scandex-mobile-concept/mobile/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/scandex-mobile-concept/mobile/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// export/scandex-mobile-concept/mobile/ui.jsx
try { (() => {
// ScandexPRO Mobile — Theme, Icons, Primitives, Phone Shell
// Brand/data source: sdx-joao/ScandexGed + sdx-joao/Sdx-Mobile

// ── Theme (from Sdx-Mobile/src/theme/colors.ts + web globals.css) ──────────
const T = {
  primary: '#0728CA',
  primaryDark: '#051E9B',
  primaryFg: '#FFFFFF',
  teal: '#0F9488',
  bg: '#F5F7FB',
  surface: '#FFFFFF',
  surfaceMuted: '#F1F5FB',
  text: '#0F172A',
  textSoft: '#334155',
  muted: '#64748B',
  faint: '#94A3B8',
  border: '#E2E8F2',
  borderStrong: '#D8E0EF',
  danger: '#DC2626',
  dangerSoft: '#FEE2E2',
  font: "'Inter', system-ui, -apple-system, sans-serif"
};

// Work-order status — labels + tones (mobile STATUS_LABEL + statusColors)
const WO_STATUS = {
  open: {
    label: 'Aberta',
    solid: '#2563EB',
    soft: '#EAF1FE',
    fg: '#1D4ED8'
  },
  in_progress: {
    label: 'Em andamento',
    solid: '#CA8A04',
    soft: '#FEF7E0',
    fg: '#A16207'
  },
  waiting: {
    label: 'Aguardando',
    solid: '#EA580C',
    soft: '#FEEFE4',
    fg: '#C2410C'
  },
  delivered: {
    label: 'Entregue',
    solid: '#059669',
    soft: '#E6F6EF',
    fg: '#047857'
  },
  completed: {
    label: 'Concluída',
    solid: '#059669',
    soft: '#E6F6EF',
    fg: '#047857'
  },
  cancelled: {
    label: 'Cancelada',
    solid: '#DC2626',
    soft: '#FDECEC',
    fg: '#B91C1C'
  }
};
const WO_PRIORITY = {
  low: {
    label: 'Baixa',
    color: '#64748B',
    soft: '#EEF2F7'
  },
  normal: {
    label: 'Normal',
    color: '#2563EB',
    soft: '#EAF1FE'
  },
  high: {
    label: 'Alta',
    color: '#EA580C',
    soft: '#FEEFE4'
  },
  urgent: {
    label: 'Urgente',
    color: '#DC2626',
    soft: '#FDECEC'
  }
};

// Inventory primary types
const INV_TYPE = {
  EQUIPAMENTO: {
    label: 'Equipamento',
    short: 'Equip.',
    icon: 'monitor'
  },
  PERIFERICO: {
    label: 'Periférico',
    short: 'Perif.',
    icon: 'mouse'
  },
  FERRAMENTA: {
    label: 'Ferramenta',
    short: 'Ferr.',
    icon: 'wrench'
  },
  MATERIAL: {
    label: 'Material',
    short: 'Mat.',
    icon: 'cable'
  },
  SUPRIMENTO: {
    label: 'Suprimento',
    short: 'Supr.',
    icon: 'package'
  }
};

// Stock status tones (getStockStatus logic)
const STOCK_TONE = {
  funcionando: {
    label: 'Funcionando',
    solid: '#2563EB',
    soft: '#EAF1FE',
    fg: '#1D4ED8'
  },
  manutencao: {
    label: 'Manutenção',
    solid: '#CA8A04',
    soft: '#FEF7E0',
    fg: '#A16207'
  },
  defeito: {
    label: 'Não funcionando',
    solid: '#DC2626',
    soft: '#FDECEC',
    fg: '#B91C1C'
  },
  baixado: {
    label: 'Baixado',
    solid: '#64748B',
    soft: '#EEF2F7',
    fg: '#475569'
  },
  normal: {
    label: 'Normal',
    solid: '#059669',
    soft: '#E6F6EF',
    fg: '#047857'
  },
  atencao: {
    label: 'Atenção',
    solid: '#CA8A04',
    soft: '#FEF7E0',
    fg: '#A16207'
  },
  baixo: {
    label: 'Baixo',
    solid: '#DC2626',
    soft: '#FDECEC',
    fg: '#B91C1C'
  }
};
const MOVE_TONE = {
  in: {
    label: 'Entrada',
    color: '#059669',
    icon: 'arrow-down-circle'
  },
  out: {
    label: 'Saída',
    color: '#DC2626',
    icon: 'arrow-up-circle'
  },
  adjustment: {
    label: 'Ajuste',
    color: '#CA8A04',
    icon: 'refresh'
  },
  transfer: {
    label: 'Transferência',
    color: '#2563EB',
    icon: 'shuffle'
  }
};

// ── Icons (Lucide-style stroke paths) ──────────────────────────────────────
const ICONS = {
  home: 'M3 9.5L12 3l9 6.5M5 9.5V20a1 1 0 001 1h12a1 1 0 001-1V9.5',
  clipboard: 'M9 4h6a1 1 0 011 1v1h1a2 2 0 012 2v11a2 2 0 01-2 2H7a2 2 0 01-2-2V8a2 2 0 012-2h1V5a1 1 0 011-1zM9 4a1 1 0 001 1h4a1 1 0 001-1',
  package: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12l8.73-5.04M12 22.08V12',
  user: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M16 7a4 4 0 11-8 0 4 4 0 018 0z',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35',
  plus: 'M12 5v14M5 12h14',
  bell: 'M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0',
  'chevron-right': 'M9 18l6-6-6-6',
  'chevron-left': 'M15 18l-6-6 6-6',
  'arrow-left': 'M19 12H5M12 19l-7-7 7-7',
  filter: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
  'map-pin': 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M15 10a3 3 0 11-6 0 3 3 0 016 0z',
  wrench: 'M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.7-.4-.4-2.7 2.5-2.5z',
  clock: 'M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2',
  alert: 'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01',
  check: 'M20 6L9 17l-5-5',
  'check-circle': 'M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3',
  truck: 'M1 3h15v13H1zM16 8h4l3 3v5h-7 M5.5 18.5a2 2 0 100-4 2 2 0 000 4z M18.5 18.5a2 2 0 100-4 2 2 0 000 4z',
  box: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z',
  archive: 'M21 8v13H3V8M1 3h22v5H1zM10 12h4',
  'arrow-up-circle': 'M12 22a10 10 0 100-20 10 10 0 000 20zM16 12l-4-4-4 4M12 16V8',
  'arrow-down-circle': 'M12 22a10 10 0 100-20 10 10 0 000 20zM8 12l4 4 4-4M12 8v8',
  refresh: 'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15',
  shuffle: 'M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5',
  camera: 'M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 17a4 4 0 100-8 4 4 0 000 8z',
  qr: 'M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h3v3h-3zM21 21v.01M21 15v3M15 21h3',
  phone: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z',
  tag: 'M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01',
  layers: 'M12 2l10 6-10 6L2 8l10-6z M2 16l10 6 10-6 M2 12l10 6 10-6',
  history: 'M3 3v5h5 M3.05 13A9 9 0 106 5.3L3 8 M12 7v5l4 2',
  cpu: 'M4 4h16v16H4zM9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3',
  monitor: 'M2 3h20v14H2zM8 21h8M12 17v4',
  mouse: 'M5 9a7 7 0 0114 0v6a7 7 0 01-14 0zM12 5v4',
  cable: 'M4 9a2 2 0 012-2h2v6a2 2 0 002 2h4a2 2 0 002-2V7h2a2 2 0 012 2 M4 9v6a2 2 0 002 2M20 9v6a2 2 0 01-2 2',
  x: 'M18 6L6 18M6 6l12 12',
  calendar: 'M3 4h18v18H3zM3 10h18M8 2v4M16 2v4',
  building: 'M3 21h18M5 21V7l8-4v18M19 21V11l-6-3M9 9v.01M9 12v.01M9 15v.01M9 18v.01',
  hash: 'M4 9h16M4 15h16M10 3L8 21M16 3l-2 18',
  cart: 'M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2zM1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6',
  'trending-up': 'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6',
  'more-vertical': 'M12 13a1 1 0 100-2 1 1 0 000 2zM12 6a1 1 0 100-2 1 1 0 000 2zM12 20a1 1 0 100-2 1 1 0 000 2z',
  send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
  zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  sliders: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
  logout: 'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9',
  whatsapp: 'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z',
  flame: 'M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z',
  scan: 'M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2M7 12h10',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  download: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3'
};
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
  style = {}
}) {
  const d = ICONS[name];
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0,
      display: 'block',
      ...style
    }
  }, d && d.split(' M').map((seg, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: i === 0 ? seg : 'M' + seg
  })));
}

// ── Badge (pill with dot) ───────────────────────────────────────────────────
function Badge({
  tone,
  label,
  style: badgeStyle = 'soft',
  size = 'md',
  dot = true
}) {
  const compact = size === 'sm';
  if (badgeStyle === 'solid') {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: compact ? '2px 8px' : '3px 10px',
        borderRadius: 999,
        background: tone.solid,
        color: '#fff',
        fontSize: compact ? 10.5 : 11.5,
        fontWeight: 600,
        letterSpacing: 0.1,
        whiteSpace: 'nowrap',
        fontFamily: T.font
      }
    }, tone.label || label);
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: compact ? '2px 8px' : '3px 10px',
      borderRadius: 999,
      background: tone.soft,
      color: tone.fg || tone.solid,
      fontSize: compact ? 10.5 : 11.5,
      fontWeight: 600,
      letterSpacing: 0.1,
      whiteSpace: 'nowrap',
      fontFamily: T.font
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: tone.solid
    }
  }), tone.label || label);
}

// ── Filter chips row ────────────────────────────────────────────────────────
function ChipRow({
  chips,
  active,
  onPick,
  accent
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      padding: '0 16px 2px',
      scrollbarWidth: 'none',
      WebkitOverflowScrolling: 'touch'
    }
  }, chips.map(c => {
    const on = active === c.key;
    return /*#__PURE__*/React.createElement("button", {
      key: c.key,
      onClick: () => onPick(c.key),
      style: {
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '7px 13px',
        borderRadius: 999,
        cursor: 'pointer',
        border: `1px solid ${on ? accent : T.border}`,
        background: on ? accent : T.surface,
        color: on ? '#fff' : T.textSoft,
        fontSize: 12.5,
        fontWeight: 600,
        fontFamily: T.font,
        whiteSpace: 'nowrap',
        transition: 'all .15s'
      }
    }, c.label, c.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        padding: '0 5px',
        borderRadius: 999,
        minWidth: 16,
        background: on ? 'rgba(255,255,255,.25)' : T.surfaceMuted,
        color: on ? '#fff' : T.muted
      }
    }, c.count));
  }));
}

// ── Search field ────────────────────────────────────────────────────────────
function SearchField({
  value,
  onChange,
  placeholder
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 12px',
      height: 42,
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 17,
    color: T.faint
  }), /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: e => onChange(e.target.value),
    placeholder: placeholder,
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontSize: 14,
      fontFamily: T.font,
      color: T.text
    }
  }), value && /*#__PURE__*/React.createElement("button", {
    onClick: () => onChange(''),
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: 2,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 15,
    color: T.faint
  })));
}

// ── Phone shell (custom ScandexPRO frame) ───────────────────────────────────
function StatusBar({
  dark
}) {
  const c = dark ? '#fff' : T.text;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 18px 0 22px',
      position: 'relative',
      flexShrink: 0,
      background: 'transparent'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 600,
      color: c,
      fontFamily: T.font,
      letterSpacing: 0.2
    }
  }, "9:41"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12",
    fill: c
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7",
    width: "3",
    height: "5",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.5",
    y: "4.5",
    width: "3",
    height: "7.5",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "2",
    width: "3",
    height: "10",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13.5",
    y: "0",
    width: "3",
    height: "12",
    rx: "1"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "12",
    viewBox: "0 0 16 12",
    fill: c
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 2.2c2 0 3.8.8 5.1 2.1l1.1-1.2A9 9 0 0 0 8 .5 9 9 0 0 0 1.8 3.1l1.1 1.2A7.2 7.2 0 0 1 8 2.2zM8 5.6c1.1 0 2.1.4 2.8 1.2l1.1-1.2A5.7 5.7 0 0 0 8 4a5.7 5.7 0 0 0-3.9 1.6l1.1 1.2A4 4 0 0 1 8 5.6zM8 9l1.9-2A2.7 2.7 0 0 0 8 6.4 2.7 2.7 0 0 0 6.1 7z"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "25",
    height: "12",
    viewBox: "0 0 25 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.7",
    y: "0.7",
    width: "21",
    height: "10.6",
    rx: "2.7",
    stroke: c,
    strokeOpacity: "0.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2.2",
    y: "2.2",
    width: "16",
    height: "7.6",
    rx: "1.5",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "23",
    y: "4",
    width: "1.5",
    height: "4",
    rx: "0.75",
    fill: c,
    fillOpacity: "0.5"
  }))));
}
function PhoneFrame({
  children,
  dark,
  statusDark
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 390,
      height: 844,
      borderRadius: 46,
      padding: 5,
      flexShrink: 0,
      background: 'linear-gradient(150deg,#2b3550,#0c1326)',
      boxShadow: '0 40px 90px -20px rgba(15,23,42,.55), 0 0 0 1px rgba(255,255,255,.04)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      borderRadius: 41,
      overflow: 'hidden',
      background: dark ? '#0B1020' : T.bg,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(StatusBar, {
    dark: statusDark
  })), children));
}
Object.assign(window, {
  T,
  WO_STATUS,
  WO_PRIORITY,
  INV_TYPE,
  STOCK_TONE,
  MOVE_TONE,
  Icon,
  Badge,
  ChipRow,
  SearchField,
  PhoneFrame,
  StatusBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/scandex-mobile-concept/mobile/ui.jsx", error: String((e && e.message) || e) }); }

// export/scandex-mobile-concept/mobile/workorders.jsx
try { (() => {
// ScandexPRO Mobile — Ordens de Serviço module

function MetaRow({
  icon,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 14,
    color: T.faint
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: T.muted,
      fontFamily: T.font,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, children));
}
function SourceMark({
  source
}) {
  if (source === 'whatsapp') return /*#__PURE__*/React.createElement(Icon, {
    name: "whatsapp",
    size: 14,
    color: "#16A34A"
  });
  if (source === 'external') return /*#__PURE__*/React.createElement(Icon, {
    name: "send",
    size: 13,
    color: T.faint
  });
  return null;
}

// ── WO Card ─────────────────────────────────────────────────────────────────
function WOCard({
  wo,
  cfg,
  onOpen
}) {
  const st = WO_STATUS[wo.status];
  const pr = WO_PRIORITY[wo.priority];
  const overdue = wo.expectedCompletionAt && new Date(wo.expectedCompletionAt) < new Date('2025-06-09T10:00:00') && wo.status !== 'completed' && wo.status !== 'delivered' && wo.status !== 'cancelled';
  const pad = cfg.density === 'compact' ? 12 : 14;
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpen(wo),
    style: {
      width: '100%',
      textAlign: 'left',
      cursor: 'pointer',
      display: 'block',
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderLeft: `3px solid ${pr.color}`,
      borderRadius: 14,
      padding: pad,
      boxShadow: cfg.cardStyle === 'elevated' ? '0 1px 3px rgba(15,23,42,.06), 0 6px 16px -8px rgba(15,23,42,.12)' : 'none',
      fontFamily: T.font,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: cfg.accent,
      letterSpacing: 0.2
    }
  }, wo.code), /*#__PURE__*/React.createElement(SourceMark, {
    source: wo.source
  })), /*#__PURE__*/React.createElement(Badge, {
    tone: st,
    style: cfg.badgeStyle
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      color: T.text,
      marginBottom: 3,
      lineHeight: 1.3
    }
  }, wo.serviceType), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: T.faint,
      marginBottom: 10
    }
  }, wo.category), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(MetaRow, {
    icon: "building"
  }, wo.department, " \xB7 ", wo.unitName.replace('Hospital do Olho — ', 'HO ')), /*#__PURE__*/React.createElement(MetaRow, {
    icon: "user"
  }, wo.responsibleTechnicianName || 'Não atribuída')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 11,
      paddingTop: 10,
      borderTop: `1px solid ${T.surfaceMuted}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 11.5,
      fontWeight: 600,
      color: pr.color
    }
  }, wo.priority === 'urgent' && /*#__PURE__*/React.createElement(Icon, {
    name: "flame",
    size: 13,
    color: pr.color
  }), pr.label), wo.escalationCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      fontSize: 11,
      fontWeight: 600,
      color: '#C2410C'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trending-up",
    size: 12,
    color: "#C2410C"
  }), " Escalada")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 11.5,
      color: overdue ? T.danger : T.faint,
      fontWeight: overdue ? 600 : 400
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 12,
    color: overdue ? T.danger : T.faint
  }), overdue ? 'Atrasada' : wo.status === 'completed' || wo.status === 'delivered' ? fmtTime(wo.finishedAt) : `Prev. ${fmtTime(wo.expectedCompletionAt)}`)));
}

// ── WO List screen ──────────────────────────────────────────────────────────
function WorkOrdersScreen({
  cfg,
  onOpen,
  onNew
}) {
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState('all');
  const counts = React.useMemo(() => {
    const c = {
      all: WORK_ORDERS.length
    };
    WORK_ORDERS.forEach(w => {
      c[w.status] = (c[w.status] || 0) + 1;
    });
    return c;
  }, []);
  const chips = [{
    key: 'all',
    label: 'Todas',
    count: counts.all
  }, {
    key: 'open',
    label: 'Abertas',
    count: counts.open
  }, {
    key: 'in_progress',
    label: 'Em andamento',
    count: counts.in_progress
  }, {
    key: 'waiting',
    label: 'Aguardando',
    count: counts.waiting
  }, {
    key: 'completed',
    label: 'Concluídas',
    count: counts.completed
  }];
  const list = WORK_ORDERS.filter(w => {
    if (filter !== 'all' && w.status !== filter) return false;
    if (q) {
      const t = (w.code + w.serviceType + w.department + (w.responsibleTechnicianName || '') + w.requestedByName).toLowerCase();
      if (!t.includes(q.toLowerCase())) return false;
    }
    return true;
  });
  return /*#__PURE__*/React.createElement(ModuleScreen, {
    cfg: cfg,
    title: "Ordens de Servi\xE7o",
    subtitle: `${WO_STATS.activeNow} ativas · ${WO_STATS.openedToday} abertas hoje`,
    onNew: onNew,
    newLabel: "Nova OS"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 16px 12px'
    }
  }, /*#__PURE__*/React.createElement(SearchField, {
    value: q,
    onChange: setQ,
    placeholder: "Buscar por c\xF3digo, setor, t\xE9cnico\u2026"
  })), /*#__PURE__*/React.createElement(ChipRow, {
    chips: chips,
    active: filter,
    onPick: setFilter,
    accent: cfg.accent
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 24px'
    }
  }, list.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    icon: "clipboard",
    text: "Nenhuma ordem encontrada."
  }) : list.map(wo => /*#__PURE__*/React.createElement(WOCard, {
    key: wo.id,
    wo: wo,
    cfg: cfg,
    onOpen: onOpen
  }))));
}

// ── WO Detail screen ────────────────────────────────────────────────────────
function StatItem({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: T.faint,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 0.4,
      marginBottom: 3
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: T.text,
      fontWeight: 500,
      lineHeight: 1.35
    }
  }, children));
}
function SectionCard({
  title,
  action,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      padding: 14,
      marginBottom: 12
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: T.text,
      letterSpacing: 0.2
    }
  }, title), action), children);
}
function WorkOrderDetail({
  wo,
  cfg,
  onBack
}) {
  const [status, setStatus] = React.useState(wo.status);
  const st = WO_STATUS[status];
  const pr = WO_PRIORITY[wo.priority];
  const timeline = WO_TIMELINE[wo.id];
  const flow = ['open', 'in_progress', 'waiting', 'completed'];
  return /*#__PURE__*/React.createElement(DetailScaffold, {
    cfg: cfg,
    onBack: onBack,
    eyebrow: wo.code,
    title: wo.serviceType,
    badge: /*#__PURE__*/React.createElement(Badge, {
      tone: st,
      style: "solid"
    }),
    headerExtra: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginTop: 10,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 12.5,
        fontWeight: 600,
        color: '#fff',
        background: 'rgba(255,255,255,.16)',
        padding: '4px 10px',
        borderRadius: 999
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: pr.color
      }
    }), " Prioridade ", pr.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        color: 'rgba(255,255,255,.75)'
      }
    }, wo.category))
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "Atualizar status"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 7,
      overflowX: 'auto',
      scrollbarWidth: 'none',
      paddingBottom: 2
    }
  }, flow.map(s => {
    const on = status === s;
    const tone = WO_STATUS[s];
    return /*#__PURE__*/React.createElement("button", {
      key: s,
      onClick: () => setStatus(s),
      style: {
        flexShrink: 0,
        padding: '8px 13px',
        borderRadius: 10,
        cursor: 'pointer',
        border: `1px solid ${on ? tone.solid : T.border}`,
        background: on ? tone.soft : T.surface,
        color: on ? tone.fg : T.muted,
        fontSize: 12.5,
        fontWeight: 600,
        fontFamily: T.font,
        whiteSpace: 'nowrap'
      }
    }, tone.label);
  })), status !== wo.status && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 11,
      fontSize: 12,
      color: T.muted,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle",
    size: 14,
    color: cfg.accent
  }), "Novo status pronto para registrar (demo).")), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Solicita\xE7\xE3o"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(StatItem, {
    label: "Unidade"
  }, wo.unitName), /*#__PURE__*/React.createElement(StatItem, {
    label: "Setor"
  }, wo.department), /*#__PURE__*/React.createElement(StatItem, {
    label: "Solicitante"
  }, wo.requestedByName), /*#__PURE__*/React.createElement(StatItem, {
    label: "Contato"
  }, wo.requesterContact || '—'), /*#__PURE__*/React.createElement(StatItem, {
    label: "Abertura"
  }, fmtDate(wo.openedAt), " \xB7 ", fmtTime(wo.openedAt)), /*#__PURE__*/React.createElement(StatItem, {
    label: "Previs\xE3o"
  }, wo.expectedCompletionAt ? `${fmtDate(wo.expectedCompletionAt)} · ${fmtTime(wo.expectedCompletionAt)}` : '—')), wo.requesterContact && /*#__PURE__*/React.createElement("button", {
    style: {
      marginTop: 14,
      width: '100%',
      height: 42,
      borderRadius: 11,
      cursor: 'pointer',
      border: `1px solid ${T.border}`,
      background: T.surface,
      color: T.textSoft,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      fontSize: 13.5,
      fontWeight: 600,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: wo.source === 'whatsapp' ? 'whatsapp' : 'phone',
    size: 16,
    color: wo.source === 'whatsapp' ? '#16A34A' : cfg.accent
  }), "Contatar solicitante")), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Atendimento"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(StatItem, {
    label: "Respons\xE1vel"
  }, wo.responsibleTechnicianName || 'Não atribuída'), /*#__PURE__*/React.createElement(StatItem, {
    label: "Equipe"
  }, wo.technicalTeam || '—'), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: T.faint,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 0.4,
      marginBottom: 5
    }
  }, "Observa\xE7\xF5es"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: T.textSoft,
      lineHeight: 1.5,
      background: T.surfaceMuted,
      borderRadius: 10,
      padding: 11
    }
  }, wo.attendanceNotes || 'Sem observações registradas.')))), wo.materials.length > 0 && /*#__PURE__*/React.createElement(SectionCard, {
    title: `Materiais (${wo.materials.length})`
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, wo.materials.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 8,
      background: T.surfaceMuted,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "box",
    size: 15,
    color: T.muted
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: T.text,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, m.description)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: T.textSoft,
      flexShrink: 0
    }
  }, m.quantity, " ", m.unit))))), timeline && /*#__PURE__*/React.createElement(SectionCard, {
    title: "Hist\xF3rico"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, timeline.map((ev, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: WO_STATUS[ev.tone].solid,
      marginTop: 4
    }
  }), i < timeline.length - 1 && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 2,
      flex: 1,
      background: T.border,
      margin: '2px 0'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: i < timeline.length - 1 ? 14 : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: T.text,
      fontWeight: 500
    }
  }, ev.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: T.faint,
      marginTop: 1
    }
  }, ev.at, " \xB7 ", ev.by)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8
    }
  }));
}

// ── New WO (simple form) ────────────────────────────────────────────────────
function FieldLabel({
  children,
  required
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      color: T.textSoft,
      marginBottom: 6
    }
  }, children, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.danger
    }
  }, " *"));
}
function FakeInput({
  placeholder,
  value,
  chevron
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      borderRadius: 11,
      border: `1px solid ${T.border}`,
      background: T.surface,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 13px',
      fontSize: 14,
      color: value ? T.text : T.faint,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, value || placeholder), chevron && /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 16,
    color: T.faint,
    style: {
      transform: 'rotate(90deg)'
    }
  }));
}
function NewWorkOrder({
  cfg,
  onBack
}) {
  const [priority, setPriority] = React.useState('normal');
  return /*#__PURE__*/React.createElement(DetailScaffold, {
    cfg: cfg,
    onBack: onBack,
    eyebrow: "Nova ordem",
    title: "Abrir OS",
    compact: true
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "Detalhes do servi\xE7o"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, {
    required: true
  }, "Tipo de servi\xE7o"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "Selecionar tipo",
    chevron: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "Categoria"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "Selecionar categoria",
    chevron: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, {
    required: true
  }, "Unidade"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "Unidade",
    value: "HO \u2014 JCB",
    chevron: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, {
    required: true
  }, "Setor"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "Setor",
    chevron: true
  }))))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Prioridade"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, Object.entries(WO_PRIORITY).map(([k, p]) => {
    const on = priority === k;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => setPriority(k),
      style: {
        flex: 1,
        padding: '9px 4px',
        borderRadius: 11,
        cursor: 'pointer',
        border: `1.5px solid ${on ? p.color : T.border}`,
        background: on ? p.soft : T.surface,
        color: on ? p.color : T.muted,
        fontSize: 12,
        fontWeight: 600,
        fontFamily: T.font
      }
    }, p.label);
  }))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Solicitante"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, {
    required: true
  }, "Nome"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "Quem solicitou",
    chevron: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "Contato"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "(85) 9 0000-0000"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "Descri\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 86,
      borderRadius: 11,
      border: `1px solid ${T.border}`,
      background: T.surface,
      padding: 12,
      fontSize: 14,
      color: T.faint,
      fontFamily: T.font
    }
  }, "Descreva o problema ou a solicita\xE7\xE3o\u2026")))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Anexos"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      flex: 1,
      height: 76,
      borderRadius: 12,
      border: `1.5px dashed ${T.borderStrong}`,
      background: T.surfaceMuted,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      cursor: 'pointer',
      color: T.muted,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "camera",
    size: 20,
    color: cfg.accent
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 600
    }
  }, "Foto")), /*#__PURE__*/React.createElement("button", {
    style: {
      flex: 1,
      height: 76,
      borderRadius: 12,
      border: `1.5px dashed ${T.borderStrong}`,
      background: T.surfaceMuted,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      cursor: 'pointer',
      color: T.muted,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "scan",
    size: 20,
    color: cfg.accent
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 600
    }
  }, "Escanear ativo")))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      width: '100%',
      height: 50,
      borderRadius: 14,
      border: 'none',
      cursor: 'pointer',
      background: cfg.accent,
      color: '#fff',
      fontSize: 15,
      fontWeight: 700,
      fontFamily: T.font,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      boxShadow: `0 8px 20px -6px ${cfg.accent}66`
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 18,
    color: "#fff"
  }), " Abrir ordem de servi\xE7o"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 12
    }
  }));
}
Object.assign(window, {
  WorkOrdersScreen,
  WorkOrderDetail,
  NewWorkOrder,
  MetaRow,
  StatItem,
  SectionCard,
  FieldLabel,
  FakeInput
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/scandex-mobile-concept/mobile/workorders.jsx", error: String((e && e.message) || e) }); }

// mobile/android-frame.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// Android.jsx — Simplified Android (Material 3) device frame
// Status bar + top app bar + content + gesture nav + keyboard.
// Based on Figma M3 spec. No dependencies, no image assets.
// Exports (to window): AndroidDevice, AndroidStatusBar, AndroidAppBar, AndroidListItem, AndroidNavBar, AndroidKeyboard
//
// Usage — wrap your screen content in <AndroidDevice> to get the bezel, status
// bar and gesture nav (props: title, large, keyboard, dark):
//
//   <AndroidDevice title="Inbox" large>
//     ...your screen content...
//   </AndroidDevice>
//   <AndroidDevice title="Compose" keyboard>…</AndroidDevice>
/* END USAGE */

const MD_C = {
  surface: '#f4fbf8',
  surfaceVariant: '#dae5e1',
  inverseOnSurface: '#ecf2ef',
  secondaryContainer: '#cde8e1',
  primaryFixedDim: '#83d5c6',
  onSurface: '#171d1b',
  onSurfaceVar: '#49454f',
  onPrimaryContainer: '#00201c',
  primary: '#006a60',
  frameBorder: 'rgba(116,119,117,0.5)'
};

// ─────────────────────────────────────────────────────────────
// Status bar (time left, wifi/cell/battery right)
// ─────────────────────────────────────────────────────────────
function AndroidStatusBar({
  dark = false
}) {
  const c = dark ? '#fff' : MD_C.onSurface;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      position: 'relative',
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 128,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 400,
      letterSpacing: 0.25,
      lineHeight: '20px',
      color: c
    }
  }, "9:30")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: 8,
      transform: 'translateX(-50%)',
      width: 24,
      height: 24,
      borderRadius: 100,
      background: '#2e2e2e'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      paddingRight: 2
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    style: {
      marginRight: -2
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 13.3L.67 5.97a10.37 10.37 0 0114.66 0L8 13.3z",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    style: {
      marginRight: -2
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14.67 14.67V1.33L1.33 14.67h13.34z",
    fill: c
  }))), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3.75",
    y: "2",
    width: "8.5",
    height: "13",
    rx: "1.5",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "5.5",
    y: "0.9",
    width: "5",
    height: "2",
    rx: "0.5",
    fill: c
  }))));
}

// ─────────────────────────────────────────────────────────────
// Top app bar (Material 3 small/medium)
// ─────────────────────────────────────────────────────────────
function AndroidAppBar({
  title = 'Title',
  large = false
}) {
  const iconDot = /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: MD_C.onSurfaceVar,
      opacity: 0.3
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: MD_C.surface,
      padding: '4px 4px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, iconDot, !large && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 22,
      fontWeight: 400,
      color: MD_C.onSurface,
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, title), large && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), iconDot), large && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 16px 20px',
      fontSize: 28,
      fontWeight: 400,
      color: MD_C.onSurface,
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// List item (Material 3)
// ─────────────────────────────────────────────────────────────
function AndroidListItem({
  headline,
  supporting,
  leading
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '12px 16px',
      minHeight: 56,
      boxSizing: 'border-box',
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, leading && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: MD_C.primary,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      fontWeight: 500,
      flexShrink: 0
    }
  }, leading), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: MD_C.onSurface,
      lineHeight: '24px'
    }
  }, headline), supporting && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: MD_C.onSurfaceVar,
      lineHeight: '20px'
    }
  }, supporting)));
}

// ─────────────────────────────────────────────────────────────
// Gesture nav bar (pill)
// ─────────────────────────────────────────────────────────────
function AndroidNavBar({
  dark = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 108,
      height: 4,
      borderRadius: 2,
      background: dark ? '#fff' : MD_C.onSurface,
      opacity: 0.4
    }
  }));
}

// ─────────────────────────────────────────────────────────────
// Device frame — wraps everything
// ─────────────────────────────────────────────────────────────
function AndroidDevice({
  children,
  width = 412,
  height = 892,
  dark = false,
  title,
  large = false,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 18,
      overflow: 'hidden',
      background: dark ? '#1d1b20' : MD_C.surface,
      border: `8px solid ${MD_C.frameBorder}`,
      boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement(AndroidStatusBar, {
    dark: dark
  }), title !== undefined && /*#__PURE__*/React.createElement(AndroidAppBar, {
    title: title,
    large: large
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(AndroidKeyboard, null), /*#__PURE__*/React.createElement(AndroidNavBar, {
    dark: dark
  }));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — Gboard (Material 3)
// ─────────────────────────────────────────────────────────────
function AndroidKeyboard() {
  let _k = 0;
  const key = (l, {
    flex = 1,
    bg = MD_C.surface,
    r = 6,
    minW,
    fs = 21
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: _k++,
    style: {
      height: 46,
      borderRadius: r,
      flex,
      minWidth: minW,
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Roboto, system-ui',
      fontSize: fs,
      color: MD_C.onPrimaryContainer
    }
  }, l);
  const row = (keys, style = {}) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      justifyContent: 'center',
      ...style
    }
  }, keys.map(l => key(l)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: MD_C.inverseOnSurface,
      padding: '0 8px 8px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], {
    padding: '0 20px'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, key('', {
    bg: MD_C.surfaceVariant
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flex: 7,
      minWidth: 274
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l))), key('', {
    bg: MD_C.surfaceVariant
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, key('?123', {
    bg: MD_C.secondaryContainer,
    r: 100,
    minW: 58,
    fs: 14
  }), key(',', {
    bg: MD_C.surfaceVariant
  }), key('', {
    flex: 3,
    minW: 154
  }), key('.', {
    bg: MD_C.surfaceVariant
  }), key('', {
    bg: MD_C.primaryFixedDim,
    r: 100,
    minW: 58
  }))));
}
Object.assign(window, {
  AndroidDevice,
  AndroidStatusBar,
  AndroidAppBar,
  AndroidListItem,
  AndroidNavBar,
  AndroidKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "mobile/android-frame.jsx", error: String((e && e.message) || e) }); }

// mobile/app.jsx
try { (() => {
// ScandexPRO Mobile — App shell, scaffolds, home, login, navigation

// ── Shared layout scaffolds ─────────────────────────────────────────────────
function BlueHeader({
  children,
  compact
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, ${T.primary}, ${T.primaryDark})`,
      padding: compact ? '44px 18px 18px' : '46px 18px 20px',
      color: '#fff',
      position: 'relative',
      flexShrink: 0,
      boxShadow: '0 6px 18px -8px rgba(7,40,202,.5)'
    }
  }, children);
}
function ModuleScreen({
  cfg,
  title,
  subtitle,
  onNew,
  newLabel,
  newIcon = 'plus',
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(BlueHeader, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 23,
      fontWeight: 800,
      letterSpacing: -0.3,
      fontFamily: T.font
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '5px 0 0',
      fontSize: 13,
      color: 'rgba(255,255,255,.78)',
      fontFamily: T.font
    }
  }, subtitle)), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      border: 'none',
      cursor: 'pointer',
      background: 'rgba(255,255,255,.14)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 19,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 9,
      right: 10,
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: '#FBBF24',
      border: '1.5px solid #1538C9'
    }
  }))), onNew && /*#__PURE__*/React.createElement("button", {
    onClick: onNew,
    style: {
      marginTop: 16,
      width: '100%',
      height: 44,
      borderRadius: 12,
      border: 'none',
      cursor: 'pointer',
      background: '#fff',
      color: T.primary,
      fontSize: 14,
      fontWeight: 700,
      fontFamily: T.font,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: newIcon,
    size: 18,
    color: T.primary
  }), " ", newLabel)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      background: T.bg,
      paddingTop: onNew ? 10 : 12
    }
  }, children));
}
function DetailScaffold({
  cfg,
  onBack,
  eyebrow,
  title,
  badge,
  headerExtra,
  compact,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 60,
      display: 'flex',
      flexDirection: 'column',
      background: T.bg
    }
  }, /*#__PURE__*/React.createElement(BlueHeader, {
    compact: compact
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      marginBottom: 12,
      padding: '6px 10px 6px 6px',
      borderRadius: 9,
      border: 'none',
      cursor: 'pointer',
      background: 'rgba(255,255,255,.14)',
      color: '#fff',
      fontSize: 13,
      fontWeight: 600,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 17,
    color: "#fff"
  }), " Voltar"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      color: 'rgba(255,255,255,.7)',
      letterSpacing: 0.3,
      fontFamily: T.font
    }
  }, eyebrow), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 20,
      fontWeight: 800,
      letterSpacing: -0.2,
      fontFamily: T.font,
      lineHeight: 1.25
    }
  }, title), badge && /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      marginTop: 3
    }
  }, badge)), headerExtra), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: 16
    }
  }, children));
}
function EmptyState({
  icon,
  text
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      padding: '56px 24px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 60,
      height: 60,
      borderRadius: 18,
      background: T.surfaceMuted,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 26,
    color: T.faint
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: T.muted,
      fontFamily: T.font
    }
  }, text));
}

// ── Home / Dashboard ────────────────────────────────────────────────────────
function StatTile({
  value,
  label,
  icon,
  tone,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      flex: 1,
      textAlign: 'left',
      cursor: 'pointer',
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      padding: 13,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: `${tone}15`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 9
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 17,
    color: tone
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      color: T.text,
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: T.muted,
      marginTop: 4
    }
  }, label));
}
function HomeScreen({
  cfg,
  user,
  onGoOrders,
  onGoInventory,
  onGoRecords,
  onOpenWO,
  onOpenItem
}) {
  const lowItems = INVENTORY.filter(i => i.itemType !== 'equipment' && i.minQty > 0 && i.currentQty < i.minQty);
  const recent = WORK_ORDERS.filter(w => w.status === 'open' || w.status === 'in_progress' || w.status === 'waiting').slice(0, 3);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(BlueHeader, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(BrandTile, {
    size: 28,
    radius: 9,
    shadow: false
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: '#fff',
      letterSpacing: -0.2,
      fontFamily: T.font
    }
  }, "ScandexPRO", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      verticalAlign: 'super',
      fontWeight: 600,
      opacity: 0.7
    }
  }, "\u2122"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'rgba(255,255,255,.75)',
      fontFamily: T.font
    }
  }, "Bem-vindo de volta,"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '3px 0 0',
      fontSize: 22,
      fontWeight: 800,
      letterSpacing: -0.3,
      fontFamily: T.font
    }
  }, user.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 8,
      fontSize: 12,
      color: 'rgba(255,255,255,.8)',
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "building",
    size: 13,
    color: "rgba(255,255,255,.8)"
  }), " ", user.unit, " \xB7 ", user.dept)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 13,
      background: 'rgba(255,255,255,.16)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 15,
      fontWeight: 700,
      color: '#fff',
      fontFamily: T.font,
      flexShrink: 0
    }
  }, user.name.split(' ').map(w => w[0]).join('').slice(0, 2)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      background: T.bg,
      padding: '16px 16px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    value: WO_STATS.activeNow,
    label: "OS ativas",
    icon: "clipboard",
    tone: cfg.accent,
    onClick: onGoOrders
  }), /*#__PURE__*/React.createElement(StatTile, {
    value: WO_STATS.openedToday,
    label: "Abertas hoje",
    icon: "zap",
    tone: "#EA580C",
    onClick: onGoOrders
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    value: INV_STATS.lowStock,
    label: "Estoque baixo",
    icon: "alert",
    tone: "#DC2626",
    onClick: onGoInventory
  }), /*#__PURE__*/React.createElement(StatTile, {
    value: INV_STATS.inMaintenance,
    label: "Em manuten\xE7\xE3o",
    icon: "wrench",
    tone: "#CA8A04",
    onClick: onGoInventory
  })), /*#__PURE__*/React.createElement(SectionTitle, null, "M\xF3dulos"), /*#__PURE__*/React.createElement("button", {
    onClick: onGoRecords,
    style: {
      width: '100%',
      textAlign: 'left',
      cursor: 'pointer',
      background: `linear-gradient(135deg, ${cfg.accent}, ${T.primaryDark})`,
      border: 'none',
      borderRadius: 16,
      padding: 16,
      marginBottom: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      fontFamily: T.font,
      boxShadow: `0 10px 24px -10px ${cfg.accent}99`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 13,
      background: 'rgba(255,255,255,.18)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 23,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: '#fff',
      letterSpacing: -0.2
    }
  }, "Prontu\xE1rios"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'rgba(255,255,255,.8)',
      marginTop: 2
    }
  }, "Buscar paciente e documentos")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 20,
    color: "rgba(255,255,255,.85)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement(ModuleTile, {
    icon: "clipboard",
    label: "Ordens de Servi\xE7o",
    sub: `${WO_STATS.activeNow} ativas`,
    accent: cfg.accent,
    onClick: onGoOrders
  }), /*#__PURE__*/React.createElement(ModuleTile, {
    icon: "package",
    label: "Invent\xE1rio",
    sub: `${INV_STATS.lowStock} alertas`,
    accent: cfg.accent,
    onClick: onGoInventory
  })), lowItems.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SectionTitle, {
    action: /*#__PURE__*/React.createElement(TextLink, {
      onClick: onGoInventory
    }, "Ver tudo")
  }, "Estoque em alerta"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      padding: '2px 14px',
      marginBottom: 22
    }
  }, lowItems.map((it, i) => {
    const tone = stockStatusOf(it);
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => onOpenItem(it),
      style: {
        width: '100%',
        textAlign: 'left',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        padding: '12px 0',
        borderBottom: i < lowItems.length - 1 ? `1px solid ${T.surfaceMuted}` : 'none',
        fontFamily: T.font
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 34,
        height: 34,
        borderRadius: 9,
        background: `${tone.solid}14`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "alert",
      size: 16,
      color: tone.solid
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        fontWeight: 600,
        color: T.text,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, it.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: T.muted
      }
    }, it.currentQty, " ", it.unit, " \xB7 m\xEDn. ", it.minQty)), /*#__PURE__*/React.createElement(Badge, {
      tone: tone,
      style: cfg.badgeStyle,
      size: "sm"
    }));
  }))), /*#__PURE__*/React.createElement(SectionTitle, {
    action: /*#__PURE__*/React.createElement(TextLink, {
      onClick: onGoOrders
    }, "Ver tudo")
  }, "Ordens em aberto"), recent.map(wo => /*#__PURE__*/React.createElement(WOCard, {
    key: wo.id,
    wo: wo,
    cfg: cfg,
    onOpen: onOpenWO
  }))));
}
function SectionTitle({
  children,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: T.text,
      letterSpacing: 0.2,
      fontFamily: T.font
    }
  }, children), action);
}
function TextLink({
  children,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      fontSize: 12.5,
      fontWeight: 600,
      color: T.primary,
      fontFamily: T.font
    }
  }, children);
}
function ModuleTile({
  icon,
  label,
  sub,
  accent,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      flex: 1,
      textAlign: 'left',
      cursor: 'pointer',
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      padding: 14,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: `${accent}12`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 11
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 20,
    color: accent
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 700,
      color: T.text,
      lineHeight: 1.25
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: T.muted,
      marginTop: 3
    }
  }, sub));
}

// ── Profile ─────────────────────────────────────────────────────────────────
function ProfileScreen({
  cfg,
  user,
  onLogout
}) {
  const rows = [{
    icon: 'user',
    label: 'Meus dados'
  }, {
    icon: 'bell',
    label: 'Notificações'
  }, {
    icon: 'qr',
    label: 'Etiquetas e impressão'
  }, {
    icon: 'download',
    label: 'Dados offline',
    note: 'Em breve'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(BlueHeader, null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 23,
      fontWeight: 800,
      fontFamily: T.font
    }
  }, "Perfil")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      background: T.bg,
      padding: '16px 16px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      padding: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 15,
      background: `${cfg.accent}15`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      fontWeight: 800,
      color: cfg.accent,
      fontFamily: T.font
    }
  }, user.name.split(' ').map(w => w[0]).join('').slice(0, 2)), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: T.text,
      fontFamily: T.font
    }
  }, user.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: T.muted,
      fontFamily: T.font
    }
  }, user.dept, " \xB7 ", user.role))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      overflow: 'hidden',
      marginBottom: 18
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r.label,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 13,
      padding: '14px 15px',
      borderBottom: i < rows.length - 1 ? `1px solid ${T.surfaceMuted}` : 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: r.icon,
    size: 18,
    color: T.muted
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14,
      color: T.text,
      fontFamily: T.font
    }
  }, r.label), r.note && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: T.faint,
      fontFamily: T.font,
      marginRight: 4
    }
  }, r.note), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 16,
    color: T.faint
  })))), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    style: {
      width: '100%',
      height: 48,
      borderRadius: 13,
      border: `1px solid ${T.border}`,
      background: T.surface,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      fontSize: 14,
      fontWeight: 600,
      color: T.danger,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "logout",
    size: 17,
    color: T.danger
  }), " Sair do ScandexPRO\u2122"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    width: 120
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: T.faint,
      fontFamily: T.font
    }
  }, "ScandexPRO\u2122 Mobile \xB7 v1.0 \xB7 build demo"))));
}

// ── Login ───────────────────────────────────────────────────────────────────
function LoginScreen({
  onLogin
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 80,
      display: 'flex',
      flexDirection: 'column',
      background: `linear-gradient(160deg, ${T.primaryDark}, ${T.primary} 55%, #0B1A8F)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 28px'
    }
  }, /*#__PURE__*/React.createElement(BrandTile, {
    size: 72
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '24px 0 0',
      fontSize: 30,
      fontWeight: 800,
      color: '#fff',
      letterSpacing: -0.5,
      fontFamily: T.font
    }
  }, "ScandexPRO\u2122"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 0',
      fontSize: 14,
      color: 'rgba(255,255,255,.78)',
      fontFamily: T.font,
      lineHeight: 1.5
    }
  }, "Insira suas credenciais para acessar o ScandexPRO\u2122."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 30,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 50,
      borderRadius: 13,
      background: 'rgba(255,255,255,.12)',
      border: '1px solid rgba(255,255,255,.18)',
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '0 15px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user",
    size: 18,
    color: "rgba(255,255,255,.7)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14.5,
      color: 'rgba(255,255,255,.95)',
      fontFamily: T.font
    }
  }, "carlos.andrade")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 50,
      borderRadius: 13,
      background: 'rgba(255,255,255,.12)',
      border: '1px solid rgba(255,255,255,.18)',
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '0 15px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "tag",
    size: 18,
    color: "rgba(255,255,255,.7)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14.5,
      color: 'rgba(255,255,255,.95)',
      fontFamily: T.font,
      letterSpacing: 3
    }
  }, "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"))), /*#__PURE__*/React.createElement("button", {
    onClick: onLogin,
    style: {
      marginTop: 22,
      height: 52,
      borderRadius: 14,
      border: 'none',
      cursor: 'pointer',
      background: '#fff',
      color: T.primary,
      fontSize: 15.5,
      fontWeight: 700,
      fontFamily: T.font,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, "Entrar ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18,
    color: T.primary
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 28px 38px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'rgba(255,255,255,.55)',
      fontFamily: T.font,
      fontStyle: 'italic'
    }
  }, "Hospital do Olho Julio C\xE2ndido de Brito"), /*#__PURE__*/React.createElement(PoweredBy, {
    tone: "light"
  })));
}

// ── Bottom tab bar ──────────────────────────────────────────────────────────
function TabBar({
  active,
  onChange,
  accent
}) {
  const tabs = [{
    key: 'home',
    label: 'Início',
    icon: 'home'
  }, {
    key: 'records',
    label: 'Prontuários',
    icon: 'file-text'
  }, {
    key: 'orders',
    label: 'Ordens',
    icon: 'clipboard'
  }, {
    key: 'inventory',
    label: 'Inventário',
    icon: 'package'
  }, {
    key: 'profile',
    label: 'Perfil',
    icon: 'user'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      background: T.surface,
      borderTop: `1px solid ${T.border}`,
      paddingBottom: 22,
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
    }
  }, tabs.map(t => {
    const on = active === t.key;
    return /*#__PURE__*/React.createElement("button", {
      key: t.key,
      onClick: () => onChange(t.key),
      style: {
        flex: 1,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '5px 0',
        fontFamily: T.font
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: t.icon,
      size: 22,
      color: on ? accent : T.faint,
      strokeWidth: on ? 2.4 : 2
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10.5,
        fontWeight: on ? 700 : 500,
        color: on ? accent : T.faint
      }
    }, t.label));
  })));
}

// ── Root App ────────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#0728CA",
  "badgeStyle": "soft",
  "cardStyle": "elevated",
  "density": "comfortable"
} /*EDITMODE-END*/;
const USER = {
  name: 'Carlos Andrade',
  dept: 'Suporte TI',
  unit: 'HO — JCB',
  role: 'Técnico',
  username: 'carlos.andrade'
};
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [booting, setBooting] = React.useState(true);
  const [authed, setAuthed] = React.useState(false);
  const [tab, setTab] = React.useState('home');
  const [overlay, setOverlay] = React.useState(null); // {type:'wo'|'item'|'newWo'|'scan', payload}
  const [recDoc, setRecDoc] = React.useState(null); // {surgery, patient}
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    const id = setTimeout(() => setBooting(false), 2200);
    return () => clearTimeout(id);
  }, []);
  const cfg = {
    accent: t.accent,
    badgeStyle: t.badgeStyle,
    cardStyle: t.cardStyle,
    density: t.density
  };
  const go = key => {
    setOverlay(null);
    setRecDoc(null);
    setTab(key);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };
  const openWO = wo => setOverlay({
    type: 'wo',
    payload: wo
  });
  const openItem = it => setOverlay({
    type: 'item',
    payload: it
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px 0',
      background: 'radial-gradient(circle at 50% 0%, #1c2438, #0b0f1a)'
    }
  }, /*#__PURE__*/React.createElement(PhoneFrame, {
    statusDark: authed && !overlay && tab === 'home' ? true : overlay ? true : authed ? false : true
  }, /*#__PURE__*/React.createElement("div", {
    ref: scrollRef,
    style: {
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, tab === 'home' && /*#__PURE__*/React.createElement(HomeScreen, {
    cfg: cfg,
    user: USER,
    onGoOrders: () => go('orders'),
    onGoInventory: () => go('inventory'),
    onGoRecords: () => go('records'),
    onOpenWO: openWO,
    onOpenItem: openItem
  }), tab === 'records' && /*#__PURE__*/React.createElement(RecordsScreen, {
    cfg: cfg,
    onOpenDoc: (s, p) => setRecDoc({
      surgery: s,
      patient: p
    })
  }), tab === 'orders' && /*#__PURE__*/React.createElement(WorkOrdersScreen, {
    cfg: cfg,
    onOpen: openWO,
    onNew: () => setOverlay({
      type: 'newWo'
    })
  }), tab === 'inventory' && /*#__PURE__*/React.createElement(InventoryScreen, {
    cfg: cfg,
    onOpen: openItem,
    onScan: () => setOverlay({
      type: 'scan'
    })
  }), tab === 'profile' && /*#__PURE__*/React.createElement(ProfileScreen, {
    cfg: cfg,
    user: USER,
    onLogout: () => setAuthed(false)
  })), /*#__PURE__*/React.createElement(TabBar, {
    active: tab,
    onChange: go,
    accent: cfg.accent
  }), overlay?.type === 'wo' && /*#__PURE__*/React.createElement(WorkOrderDetail, {
    wo: overlay.payload,
    cfg: cfg,
    onBack: () => setOverlay(null)
  }), overlay?.type === 'item' && /*#__PURE__*/React.createElement(InventoryDetail, {
    item: overlay.payload,
    cfg: cfg,
    onBack: () => setOverlay(null)
  }), overlay?.type === 'newWo' && /*#__PURE__*/React.createElement(NewWorkOrder, {
    cfg: cfg,
    onBack: () => setOverlay(null)
  }), overlay?.type === 'scan' && /*#__PURE__*/React.createElement(ScanView, {
    cfg: cfg,
    onClose: () => setOverlay(null),
    onDetected: it => setOverlay({
      type: 'item',
      payload: it
    })
  }), recDoc && /*#__PURE__*/React.createElement(DocViewer, {
    surgery: recDoc.surgery,
    patient: recDoc.patient,
    onBack: () => setRecDoc(null)
  }), !authed && /*#__PURE__*/React.createElement(LoginScreen, {
    onLogin: () => {
      setAuthed(true);
      setTab('home');
    }
  }), booting && /*#__PURE__*/React.createElement(SplashScreen, {
    label: "Iniciando sess\xE3o\u2026"
  })), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Marca"
  }), /*#__PURE__*/React.createElement(TweakColor, {
    label: "Cor de destaque",
    value: t.accent,
    options: ['#0728CA', '#0F9488', '#7C3AED', '#0F172A'],
    onChange: v => setTweak('accent', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Componentes"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Status",
    value: t.badgeStyle,
    options: ['soft', 'solid'],
    onChange: v => setTweak('badgeStyle', v)
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Cards",
    value: t.cardStyle,
    options: ['flat', 'elevated'],
    onChange: v => setTweak('cardStyle', v)
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Densidade",
    value: t.density,
    options: ['comfortable', 'compact'],
    onChange: v => setTweak('density', v)
  })));
}

// ── New inventory item (simple form) ────────────────────────────────────────
function NewInventoryItem({
  cfg,
  onBack
}) {
  const [type, setType] = React.useState('MATERIAL');
  const isEquip = type === 'EQUIPAMENTO';
  return /*#__PURE__*/React.createElement(DetailScaffold, {
    cfg: cfg,
    onBack: onBack,
    eyebrow: "Novo item",
    title: "Cadastrar no estoque",
    compact: true
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "Tipo principal"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, Object.entries(INV_TYPE).map(([k, v]) => {
    const on = type === k;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => setType(k),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 12px',
        borderRadius: 10,
        cursor: 'pointer',
        border: `1.5px solid ${on ? cfg.accent : T.border}`,
        background: on ? `${cfg.accent}10` : T.surface,
        color: on ? cfg.accent : T.muted,
        fontSize: 12.5,
        fontWeight: 600,
        fontFamily: T.font
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: v.icon,
      size: 15,
      color: on ? cfg.accent : T.faint
    }), " ", v.label);
  }))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Dados do item"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, {
    required: true
  }, "Nome"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "Nome do item"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "SKU"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "C\xF3digo"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "Unidade"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "UN",
    value: "UN",
    chevron: true
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "Localiza\xE7\xE3o"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "Onde fica",
    chevron: true
  })), isEquip ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "Patrim\xF4nio"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "Etiqueta"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "N\xBA de s\xE9rie"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "S\xE9rie"
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "Inicial"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "0"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "M\xEDnimo"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "0"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "M\xE1ximo"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "0"
  }))))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Foto e etiqueta"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      flex: 1,
      height: 76,
      borderRadius: 12,
      border: `1.5px dashed ${T.borderStrong}`,
      background: T.surfaceMuted,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      cursor: 'pointer',
      color: T.muted,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "camera",
    size: 20,
    color: cfg.accent
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 600
    }
  }, "Foto")), /*#__PURE__*/React.createElement("button", {
    style: {
      flex: 1,
      height: 76,
      borderRadius: 12,
      border: `1.5px dashed ${T.borderStrong}`,
      background: T.surfaceMuted,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      cursor: 'pointer',
      color: T.muted,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "qr",
    size: 20,
    color: cfg.accent
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 600
    }
  }, "Gerar etiqueta")))), /*#__PURE__*/React.createElement("button", {
    style: {
      width: '100%',
      height: 50,
      borderRadius: 14,
      border: 'none',
      cursor: 'pointer',
      background: cfg.accent,
      color: '#fff',
      fontSize: 15,
      fontWeight: 700,
      fontFamily: T.font,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      boxShadow: `0 8px 20px -6px ${cfg.accent}66`
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 18,
    color: "#fff"
  }), " Cadastrar item"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 12
    }
  }));
}
Object.assign(window, {
  App,
  ModuleScreen,
  DetailScaffold,
  EmptyState,
  HomeScreen,
  ProfileScreen,
  LoginScreen,
  TabBar,
  NewInventoryItem,
  SectionTitle,
  TextLink,
  ModuleTile,
  StatTile
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "mobile/app.jsx", error: String((e && e.message) || e) }); }

// mobile/brand.jsx
try { (() => {
// ScandexPRO Mobile — Brand assets (logos, splash/loading screen)
// Logo files: uploads/secundaria.png (circular badge, transparent),
//             uploads/LOGO PRINCIPAL (2).png (scandex+ wordmark, white bg → light surfaces only)

const LOGO_BADGE = 'uploads/secundaria.png';
const LOGO_WORDMARK = 'uploads/LOGO PRINCIPAL (2).png';

// White squircle "app tile" holding the circular badge
function BrandTile({
  size = 84,
  radius,
  badge = 0.74,
  shadow = true
}) {
  const r = radius != null ? radius : Math.round(size * 0.27);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: r,
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      boxShadow: shadow ? '0 14px 34px -12px rgba(0,0,0,.5)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO_BADGE,
    alt: "Scandex",
    style: {
      width: size * badge,
      height: size * badge,
      objectFit: 'contain',
      display: 'block'
    }
  }));
}

// Bare circular badge (use on light surfaces; dark charcoal circle)
function BrandBadge({
  size = 32
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: LOGO_BADGE,
    alt: "Scandex",
    style: {
      width: size,
      height: size,
      objectFit: 'contain',
      display: 'block',
      flexShrink: 0
    }
  });
}

// scandex+ wordmark — ONLY on white/light backgrounds (image has white bg)
function Wordmark({
  width = 132
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: LOGO_WORDMARK,
    alt: "scandex+ Servi\xE7os Digitais",
    style: {
      width,
      height: 'auto',
      objectFit: 'contain',
      display: 'block',
      mixBlendMode: 'multiply'
    }
  });
}

// "powered by" lockup inside a white pill (safe on any background)
function PoweredBy({
  tone = 'light'
}) {
  const light = tone === 'light';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontStyle: 'italic',
      color: light ? 'rgba(255,255,255,.6)' : T.faint,
      fontFamily: T.font
    }
  }, "powered by"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: '#fff',
      borderRadius: 999,
      padding: '5px 12px 5px 6px'
    }
  }, /*#__PURE__*/React.createElement(BrandBadge, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 800,
      color: '#2B2B2B',
      fontFamily: T.font,
      letterSpacing: -0.2
    }
  }, "scandex", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#3E8FBE'
    }
  }, "+"))));
}

// ── Splash / Loading screen ─────────────────────────────────────────────────
// Reusable stylized boot screen with the Scandex logo.
function SplashScreen({
  label = 'Carregando…'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 90,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: `radial-gradient(120% 90% at 50% 18%, ${T.primary} 0%, ${T.primaryDark} 52%, #06165F 100%)`,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sdx-ring",
    style: {
      position: 'absolute',
      width: 420,
      height: 420,
      borderRadius: '50%',
      border: '1px solid rgba(255,255,255,.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "sdx-ring",
    style: {
      position: 'absolute',
      width: 300,
      height: 300,
      borderRadius: '50%',
      border: '1px solid rgba(255,255,255,.08)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "sdx-pulse",
    style: {
      position: 'absolute',
      width: 104,
      height: 104,
      borderRadius: 30,
      background: 'rgba(255,255,255,.16)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "sdx-pulse sdx-pulse-2",
    style: {
      position: 'absolute',
      width: 104,
      height: 104,
      borderRadius: 30,
      background: 'rgba(255,255,255,.10)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "sdx-tile-float"
  }, /*#__PURE__*/React.createElement(BrandTile, {
    size: 96
  }))), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 27,
      fontWeight: 800,
      color: '#fff',
      letterSpacing: -0.4
    }
  }, "ScandexPRO\u2122"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '7px 0 0',
      fontSize: 13,
      color: 'rgba(255,255,255,.62)'
    }
  }, "Gest\xE3o de servi\xE7os e invent\xE1rio"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 168,
      height: 4,
      borderRadius: 999,
      background: 'rgba(255,255,255,.16)',
      overflow: 'hidden',
      marginTop: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sdx-progress",
    style: {
      height: '100%',
      width: '42%',
      borderRadius: 999,
      background: 'rgba(255,255,255,.95)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 13,
      fontSize: 12,
      color: 'rgba(255,255,255,.5)',
      letterSpacing: 0.3
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 38
    }
  }, /*#__PURE__*/React.createElement(PoweredBy, {
    tone: "light"
  })));
}
Object.assign(window, {
  LOGO_BADGE,
  LOGO_WORDMARK,
  BrandTile,
  BrandBadge,
  Wordmark,
  PoweredBy,
  SplashScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "mobile/brand.jsx", error: String((e && e.message) || e) }); }

// mobile/data.jsx
try { (() => {
// ScandexPRO Mobile — Mock data (schema-faithful, pt-BR)

// ── Work Orders (type WorkOrder) ────────────────────────────────────────────
const WORK_ORDERS = [{
  id: 'wo1',
  code: 'OS-2025-0418',
  serviceType: 'Manutenção corretiva',
  category: 'TI / Infraestrutura',
  unitName: 'Hospital do Olho — JCB',
  department: 'Centro Cirúrgico',
  openedAt: '2025-06-09T08:12:00',
  requestedByName: 'Enf. Patrícia Lemos',
  requesterContact: '(85) 99812-4471',
  responsibleTechnicianName: 'Carlos Andrade',
  technicalTeam: 'Suporte TI',
  status: 'in_progress',
  priority: 'urgent',
  source: 'whatsapp',
  expectedCompletionAt: '2025-06-09T12:00:00',
  escalationCount: 1,
  attendanceNotes: 'Monitor do mapa cirúrgico sem sinal. Verificado cabo HDMI rompido, troca em andamento.',
  resolutionStatus: null,
  materials: [{
    description: 'Cabo HDMI 2.0 — 3m',
    quantity: 1,
    unit: 'UN'
  }, {
    description: 'Adaptador DisplayPort→HDMI',
    quantity: 1,
    unit: 'UN'
  }]
}, {
  id: 'wo2',
  code: 'OS-2025-0417',
  serviceType: 'Instalação de equipamento',
  category: 'Equipamentos',
  unitName: 'Hospital do Olho — JCB',
  department: 'Recepção Térreo',
  openedAt: '2025-06-09T07:40:00',
  requestedByName: 'Marcos Vinícius',
  requesterContact: '(85) 99655-2210',
  responsibleTechnicianName: 'Júlia Tavares',
  technicalTeam: 'Suporte TI',
  status: 'open',
  priority: 'high',
  source: 'web',
  expectedCompletionAt: '2025-06-09T16:00:00',
  escalationCount: 0,
  attendanceNotes: null,
  resolutionStatus: null,
  materials: [{
    description: 'Impressora térmica Zebra ZD220',
    quantity: 1,
    unit: 'UN'
  }]
}, {
  id: 'wo3',
  code: 'OS-2025-0416',
  serviceType: 'Transporte / Coleta',
  category: 'Logística',
  unitName: 'Unidade Moacyr',
  department: 'Almoxarifado',
  openedAt: '2025-06-09T06:55:00',
  requestedByName: 'Sandra Beltrão',
  requesterContact: null,
  responsibleTechnicianName: 'Equipe Logística',
  technicalTeam: 'Logística',
  status: 'waiting',
  priority: 'normal',
  source: 'external',
  expectedCompletionAt: '2025-06-09T18:00:00',
  escalationCount: 0,
  attendanceNotes: 'Aguardando liberação do setor de origem para coleta dos insumos.',
  resolutionStatus: null,
  materials: []
}, {
  id: 'wo4',
  code: 'OS-2025-0414',
  serviceType: 'Manutenção corretiva',
  category: 'Redes',
  unitName: 'Hospital do Olho — JCB',
  department: 'Faturamento',
  openedAt: '2025-06-08T15:22:00',
  requestedByName: 'Renato Gomes',
  requesterContact: '(85) 98123-7788',
  responsibleTechnicianName: 'Carlos Andrade',
  technicalTeam: 'Redes',
  status: 'completed',
  priority: 'high',
  source: 'web',
  expectedCompletionAt: '2025-06-08T17:00:00',
  finishedAt: '2025-06-08T16:35:00',
  escalationCount: 0,
  attendanceNotes: 'Switch do andar reiniciado e porta reconfigurada. Conectividade restabelecida.',
  resolutionStatus: 'resolved',
  resolutionNotes: 'Porta 14 do switch substituída.',
  materials: [{
    description: 'Patch cord Cat6 — 1,5m',
    quantity: 2,
    unit: 'UN'
  }]
}, {
  id: 'wo5',
  code: 'OS-2025-0411',
  serviceType: 'Preventiva',
  category: 'Equipamentos',
  unitName: 'Hospital do Olho — JCB',
  department: 'Diagnóstico',
  openedAt: '2025-06-08T10:05:00',
  requestedByName: 'Dra. Helena Castro',
  requesterContact: '(85) 99440-1190',
  responsibleTechnicianName: 'Júlia Tavares',
  technicalTeam: 'Suporte TI',
  status: 'delivered',
  priority: 'normal',
  source: 'web',
  expectedCompletionAt: '2025-06-08T14:00:00',
  finishedAt: '2025-06-08T13:10:00',
  escalationCount: 0,
  attendanceNotes: 'Limpeza e atualização do firmware da estação de captura. Entregue ao setor.',
  resolutionStatus: 'resolved',
  materials: []
}, {
  id: 'wo6',
  code: 'OS-2025-0409',
  serviceType: 'Suporte software',
  category: 'TI / Sistemas',
  unitName: 'Unidade Moacyr',
  department: 'Administrativo',
  openedAt: '2025-06-07T09:18:00',
  requestedByName: 'Felipe Moura',
  requesterContact: null,
  responsibleTechnicianName: null,
  technicalTeam: 'Suporte TI',
  status: 'cancelled',
  priority: 'low',
  source: 'whatsapp',
  expectedCompletionAt: null,
  escalationCount: 0,
  attendanceNotes: 'Solicitante resolveu por conta própria. OS cancelada.',
  resolutionStatus: 'unresolved',
  materials: []
}];
const WO_STATS = {
  totalGlobal: 1284,
  openedToday: 12,
  completedToday: 7,
  activeNow: 18,
  overdue: 3
};

// Activity timeline for a WO detail
const WO_TIMELINE = {
  wo1: [{
    at: '08:12',
    label: 'OS aberta via WhatsApp',
    by: 'Enf. Patrícia Lemos',
    tone: 'open'
  }, {
    at: '08:21',
    label: 'Atribuída a Carlos Andrade',
    by: 'Triagem automática',
    tone: 'open'
  }, {
    at: '08:40',
    label: 'Escalada — prioridade urgente',
    by: 'Sistema',
    tone: 'waiting'
  }, {
    at: '09:05',
    label: 'Atendimento iniciado',
    by: 'Carlos Andrade',
    tone: 'in_progress'
  }]
};

// ── Inventory (type InventoryItem) ──────────────────────────────────────────
const INVENTORY = [{
  id: 'it1',
  sku: 'TI-NTB-0231',
  name: 'Notebook Dell Latitude 3420',
  itemType: 'equipment',
  primaryType: 'EQUIPAMENTO',
  category: 'EQUIPAMENTO',
  unit: 'UN',
  currentQty: 1,
  minQty: 0,
  maxQty: 0,
  assetTag: 'HMOJCB-002311',
  serialNumber: 'BR7K2L3',
  currentLocation: 'Faturamento — Sala 4',
  brand: 'Dell',
  model: 'Latitude 3420',
  equipmentStatus: 'FUNCIONANDO',
  operatingSystem: 'Windows 11 Pro',
  technicalSpecs: [{
    key: 'PROCESSADOR',
    value: 'INTEL CORE I5 1135G7'
  }, {
    key: 'MEMORIA RAM',
    value: 'DDR4 8GB 1X'
  }, {
    key: 'ARMAZENAMENTO',
    value: 'SSD NVME 256GB 1X'
  }],
  notes: 'Patrimônio etiquetado. Em uso pela equipe de faturamento.'
}, {
  id: 'it2',
  sku: 'TI-MON-0102',
  name: 'Monitor LG 24" Full HD',
  itemType: 'equipment',
  primaryType: 'EQUIPAMENTO',
  category: 'EQUIPAMENTO',
  unit: 'UN',
  currentQty: 1,
  minQty: 0,
  maxQty: 0,
  assetTag: 'HMOJCB-001029',
  serialNumber: '208NTRA9',
  currentLocation: 'Centro Cirúrgico — Mapa',
  brand: 'LG',
  model: '24MK430H',
  equipmentStatus: 'EM MANUTENCAO',
  operatingSystem: null,
  technicalSpecs: [{
    key: 'POLEGADAS',
    value: '24"'
  }, {
    key: 'RESOLUCAO',
    value: '1920x1080'
  }, {
    key: 'PORTAS',
    value: '1x HDMI'
  }],
  notes: 'Sem sinal de vídeo. Vinculado à OS-2025-0418.'
}, {
  id: 'it3',
  name: 'Cabo HDMI 2.0 — 3m',
  sku: 'MAT-CAB-0440',
  itemType: 'consumable',
  primaryType: 'MATERIAL',
  category: 'MATERIAL',
  unit: 'UN',
  currentQty: 3,
  minQty: 10,
  maxQty: 60,
  assetTag: null,
  serialNumber: null,
  currentLocation: 'Almoxarifado TI — Prateleira B2',
  brand: 'Multilaser',
  model: null,
  equipmentStatus: null,
  operatingSystem: null,
  technicalSpecs: [],
  notes: 'Consumo recorrente em OS de manutenção.'
}, {
  id: 'it4',
  name: 'Patch cord Cat6 — 1,5m',
  sku: 'MAT-RDE-0220',
  itemType: 'consumable',
  primaryType: 'MATERIAL',
  category: 'MATERIAL',
  unit: 'UN',
  currentQty: 14,
  minQty: 12,
  maxQty: 80,
  assetTag: null,
  serialNumber: null,
  currentLocation: 'Almoxarifado TI — Prateleira B1',
  brand: 'Furukawa',
  model: null,
  equipmentStatus: null,
  operatingSystem: null,
  technicalSpecs: [],
  notes: ''
}, {
  id: 'it5',
  name: 'Toner HP 26A Preto',
  sku: 'SUP-TON-0078',
  itemType: 'consumable',
  primaryType: 'SUPRIMENTO',
  category: 'SUPRIMENTO',
  unit: 'UN',
  currentQty: 6,
  minQty: 8,
  maxQty: 24,
  assetTag: null,
  serialNumber: null,
  currentLocation: 'Almoxarifado Central — A4',
  brand: 'HP',
  model: 'CF226A',
  equipmentStatus: null,
  operatingSystem: null,
  technicalSpecs: [],
  notes: 'Compatível com LaserJet Pro M402.'
}, {
  id: 'it6',
  name: 'Mouse óptico USB',
  sku: 'PER-MOU-0345',
  itemType: 'consumable',
  primaryType: 'PERIFERICO',
  category: 'PERIFERICO',
  unit: 'UN',
  currentQty: 22,
  minQty: 10,
  maxQty: 50,
  assetTag: null,
  serialNumber: null,
  currentLocation: 'Almoxarifado TI — Prateleira C3',
  brand: 'Logitech',
  model: 'B100',
  equipmentStatus: null,
  operatingSystem: null,
  technicalSpecs: [{
    key: 'PORTAS',
    value: '1x USB'
  }],
  notes: ''
}, {
  id: 'it7',
  name: 'Chave de fenda de precisão (kit)',
  sku: 'FER-KIT-0011',
  itemType: 'consumable',
  primaryType: 'FERRAMENTA',
  category: 'FERRAMENTA',
  unit: 'UN',
  currentQty: 4,
  minQty: 2,
  maxQty: 8,
  assetTag: null,
  serialNumber: null,
  currentLocation: 'Bancada TI',
  brand: 'Sata',
  model: '24-em-1',
  equipmentStatus: null,
  operatingSystem: null,
  technicalSpecs: [],
  notes: 'Ferramenta de bancada para manutenção de hardware.'
}, {
  id: 'it8',
  name: 'Impressora térmica Zebra ZD220',
  sku: 'TI-IMP-0067',
  itemType: 'equipment',
  primaryType: 'EQUIPAMENTO',
  category: 'EQUIPAMENTO',
  unit: 'UN',
  currentQty: 1,
  minQty: 0,
  maxQty: 0,
  assetTag: 'HMOJCB-000674',
  serialNumber: 'ZD2K88X1',
  currentLocation: 'Estoque TI — aguardando instalação',
  brand: 'Zebra',
  model: 'ZD220',
  equipmentStatus: 'AGUARDANDO INSTALACAO',
  operatingSystem: null,
  technicalSpecs: [{
    key: 'VELOCIDADE',
    value: '152MM/S'
  }, {
    key: 'RESOLUCAO',
    value: '203DPI'
  }],
  notes: 'Vinculada à OS-2025-0417 (instalação na recepção).'
}];
const INV_STATS = {
  totalItems: 612,
  lowStock: 9,
  equipment: 184,
  inMaintenance: 5
};

// ── Movements (type Movement) ───────────────────────────────────────────────
const MOVEMENTS = [{
  id: 'm1',
  itemName: 'Cabo HDMI 2.0 — 3m',
  movementType: 'out',
  qty: 1,
  sourceKind: 'work_order',
  sourceLabel: 'OS-2025-0418',
  userName: 'Carlos Andrade',
  createdAt: '2025-06-09T09:08:00'
}, {
  id: 'm2',
  itemName: 'Patch cord Cat6 — 1,5m',
  movementType: 'out',
  qty: 2,
  sourceKind: 'work_order',
  sourceLabel: 'OS-2025-0414',
  userName: 'Carlos Andrade',
  createdAt: '2025-06-08T16:30:00'
}, {
  id: 'm3',
  itemName: 'Toner HP 26A Preto',
  movementType: 'in',
  qty: 12,
  sourceKind: 'restock',
  sourceLabel: 'PR-2025-0091',
  userName: 'Almox. Central',
  createdAt: '2025-06-08T11:02:00'
}, {
  id: 'm4',
  itemName: 'Mouse óptico USB',
  movementType: 'transfer',
  qty: 5,
  sourceKind: 'internal_unit',
  sourceLabel: 'Unidade Moacyr',
  userName: 'Sandra Beltrão',
  createdAt: '2025-06-07T14:45:00'
}, {
  id: 'm5',
  itemName: 'Notebook Dell Latitude 3420',
  movementType: 'adjustment',
  qty: 1,
  sourceKind: 'adjustment',
  sourceLabel: 'Inventário físico',
  userName: 'Júlia Tavares',
  createdAt: '2025-06-07T09:20:00'
}, {
  id: 'm6',
  itemName: 'Cabo HDMI 2.0 — 3m',
  movementType: 'in',
  qty: 20,
  sourceKind: 'supplier',
  sourceLabel: 'TechSupri LTDA',
  userName: 'Almox. TI',
  createdAt: '2025-06-06T08:15:00'
}];

// ── Restock orders (type RestockOrder) ──────────────────────────────────────
const RESTOCK = [{
  id: 'r1',
  code: 'PR-2025-0094',
  supplierName: 'TechSupri LTDA',
  status: 'sent',
  expectedAt: '2025-06-12',
  createdByName: 'Júlia Tavares',
  createdAt: '2025-06-09',
  items: [{
    itemName: 'Cabo HDMI 2.0 — 3m',
    qtyOrdered: 30,
    qtyReceived: 0,
    unitPrice: 18.9
  }, {
    itemName: 'Toner HP 26A Preto',
    qtyOrdered: 12,
    qtyReceived: 0,
    unitPrice: 142.0
  }]
}, {
  id: 'r2',
  code: 'PR-2025-0092',
  supplierName: 'Unidade Moacyr',
  status: 'partially_received',
  expectedAt: '2025-06-10',
  createdByName: 'Sandra Beltrão',
  createdAt: '2025-06-08',
  items: [{
    itemName: 'Patch cord Cat6 — 1,5m',
    qtyOrdered: 40,
    qtyReceived: 20,
    unitPrice: null
  }]
}, {
  id: 'r3',
  code: 'PR-2025-0091',
  supplierName: 'Office Print Distribuidora',
  status: 'received',
  expectedAt: '2025-06-08',
  createdByName: 'Almox. Central',
  createdAt: '2025-06-06',
  items: [{
    itemName: 'Toner HP 26A Preto',
    qtyOrdered: 12,
    qtyReceived: 12,
    unitPrice: 138.5
  }]
}];
const RESTOCK_STATUS = {
  draft: {
    label: 'Rascunho',
    solid: '#64748B',
    soft: '#EEF2F7',
    fg: '#475569'
  },
  sent: {
    label: 'Enviado',
    solid: '#2563EB',
    soft: '#EAF1FE',
    fg: '#1D4ED8'
  },
  partially_received: {
    label: 'Recebido parcial',
    solid: '#CA8A04',
    soft: '#FEF7E0',
    fg: '#A16207'
  },
  received: {
    label: 'Recebido',
    solid: '#059669',
    soft: '#E6F6EF',
    fg: '#047857'
  },
  cancelled: {
    label: 'Cancelado',
    solid: '#DC2626',
    soft: '#FDECEC',
    fg: '#B91C1C'
  }
};

// ── Helpers ─────────────────────────────────────────────────────────────────
function stockStatusOf(item) {
  if (item.itemType === 'equipment') {
    const s = (item.equipmentStatus || '').toUpperCase();
    if (s.includes('NAO FUNC') || s.includes('DEFEIT')) return STOCK_TONE.defeito;
    if (s.includes('MANUT') || s.includes('AGUARD')) return STOCK_TONE.manutencao;
    if (s.includes('BAIX')) return STOCK_TONE.baixado;
    return STOCK_TONE.funcionando;
  }
  if (item.minQty <= 0) return STOCK_TONE.normal;
  if (item.currentQty < item.minQty) return STOCK_TONE.baixo;
  if (item.currentQty < item.minQty * 1.2) return STOCK_TONE.atencao;
  return STOCK_TONE.normal;
}
function fmtTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
}
function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit'
  });
}
function relDay(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const now = new Date('2025-06-09T10:00:00');
  const days = Math.floor((now - d) / 86400000);
  if (days <= 0) return 'Hoje';
  if (days === 1) return 'Ontem';
  return `Há ${days} dias`;
}
Object.assign(window, {
  WORK_ORDERS,
  WO_STATS,
  WO_TIMELINE,
  INVENTORY,
  INV_STATS,
  MOVEMENTS,
  RESTOCK,
  RESTOCK_STATUS,
  stockStatusOf,
  fmtTime,
  fmtDate,
  relDay
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "mobile/data.jsx", error: String((e && e.message) || e) }); }

// mobile/inventory.jsx
try { (() => {
// ScandexPRO Mobile — Inventário module

// ── Item card ───────────────────────────────────────────────────────────────
function InvCard({
  item,
  cfg,
  onOpen
}) {
  const tone = stockStatusOf(item);
  const ty = INV_TYPE[item.primaryType];
  const isEquip = item.itemType === 'equipment';
  const low = !isEquip && item.minQty > 0 && item.currentQty < item.minQty;
  const pct = item.maxQty > 0 ? Math.min(100, Math.round(item.currentQty / item.maxQty * 100)) : item.minQty > 0 ? Math.min(100, Math.round(item.currentQty / (item.minQty * 1.5) * 100)) : 100;
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpen(item),
    style: {
      width: '100%',
      textAlign: 'left',
      cursor: 'pointer',
      display: 'block',
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      padding: 13,
      boxShadow: cfg.cardStyle === 'elevated' ? '0 1px 3px rgba(15,23,42,.06), 0 6px 16px -8px rgba(15,23,42,.12)' : 'none',
      fontFamily: T.font,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 11,
      flexShrink: 0,
      background: `${cfg.accent}12`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ty.icon,
    size: 21,
    color: cfg.accent
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      color: T.text,
      lineHeight: 1.3
    }
  }, item.name), /*#__PURE__*/React.createElement(Badge, {
    tone: tone,
    style: cfg.badgeStyle,
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: cfg.accent,
      fontWeight: 600,
      fontFamily: T.font
    }
  }, item.sku || item.assetTag), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 3,
      borderRadius: '50%',
      background: T.faint
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: T.faint
    }
  }, ty.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 7
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 13,
    color: T.faint
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: T.muted,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, item.currentLocation || 'Sem localização')))), !isEquip && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 11,
      paddingTop: 11,
      borderTop: `1px solid ${T.surfaceMuted}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: T.muted
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: low ? T.danger : T.text,
      fontSize: 14
    }
  }, item.currentQty), " ", item.unit, " em estoque"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: T.faint
    }
  }, "m\xEDn. ", item.minQty)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      borderRadius: 3,
      background: T.surfaceMuted,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      borderRadius: 3,
      background: tone.solid
    }
  }))), isEquip && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 11,
      paddingTop: 11,
      borderTop: `1px solid ${T.surfaceMuted}`,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "hash",
    size: 13,
    color: T.faint
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: T.muted
    }
  }, item.brand, " ", item.model, " \xB7 S\xE9rie ", item.serialNumber)));
}

// ── Movement row ────────────────────────────────────────────────────────────
function MovementRow({
  m
}) {
  const tone = MOVE_TONE[m.movementType];
  const sign = m.movementType === 'in' ? '+' : m.movementType === 'out' ? '−' : '±';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '11px 0',
      borderBottom: `1px solid ${T.surfaceMuted}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 10,
      flexShrink: 0,
      background: `${tone.color}14`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: tone.icon,
    size: 17,
    color: tone.color
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 500,
      color: T.text,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, m.itemName), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: T.faint,
      marginTop: 1
    }
  }, tone.label, " \xB7 ", m.sourceLabel, " \xB7 ", fmtDate(m.createdAt), " ", fmtTime(m.createdAt))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: tone.color,
      flexShrink: 0
    }
  }, sign, m.qty));
}

// ── Restock row ─────────────────────────────────────────────────────────────
function RestockCard({
  r,
  cfg
}) {
  const tone = RESTOCK_STATUS[r.status];
  const totalOrdered = r.items.reduce((s, i) => s + i.qtyOrdered, 0);
  const totalReceived = r.items.reduce((s, i) => s + i.qtyReceived, 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      padding: 13,
      marginBottom: 10,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      marginBottom: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: cfg.accent
    }
  }, r.code), /*#__PURE__*/React.createElement(Badge, {
    tone: tone,
    style: cfg.badgeStyle,
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "truck",
    size: 14,
    color: T.faint
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: T.muted
    }
  }, r.supplierName)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, r.items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: T.textSoft,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, it.itemName), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: it.qtyReceived >= it.qtyOrdered ? '#047857' : T.muted,
      flexShrink: 0
    }
  }, it.qtyReceived, "/", it.qtyOrdered)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 11,
      paddingTop: 10,
      borderTop: `1px solid ${T.surfaceMuted}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: T.faint,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 12,
    color: T.faint
  }), " Prev. ", new Date(r.expectedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit'
  })), r.status !== 'received' && r.status !== 'cancelled' && /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '6px 12px',
      borderRadius: 9,
      border: 'none',
      cursor: 'pointer',
      background: `${cfg.accent}14`,
      color: cfg.accent,
      fontSize: 12,
      fontWeight: 700,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 13,
    color: cfg.accent
  }), " Receber")));
}

// ── Inventory screen (read-only): list + scan entry ─────────────────────────
function InventoryScreen({
  cfg,
  onOpen,
  onScan
}) {
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState('all');
  const counts = React.useMemo(() => {
    const c = {
      all: INVENTORY.length
    };
    INVENTORY.forEach(i => {
      c[i.primaryType] = (c[i.primaryType] || 0) + 1;
    });
    return c;
  }, []);
  const chips = [{
    key: 'all',
    label: 'Todos',
    count: counts.all
  }, {
    key: 'EQUIPAMENTO',
    label: 'Equipamentos',
    count: counts.EQUIPAMENTO
  }, {
    key: 'MATERIAL',
    label: 'Materiais',
    count: counts.MATERIAL
  }, {
    key: 'SUPRIMENTO',
    label: 'Suprimentos',
    count: counts.SUPRIMENTO
  }, {
    key: 'PERIFERICO',
    label: 'Periféricos',
    count: counts.PERIFERICO
  }, {
    key: 'FERRAMENTA',
    label: 'Ferramentas',
    count: counts.FERRAMENTA
  }].filter(c => c.count);
  const list = INVENTORY.filter(i => {
    if (filter !== 'all' && i.primaryType !== filter) return false;
    if (q) {
      const t = (i.name + (i.sku || '') + (i.assetTag || '') + (i.brand || '') + (i.currentLocation || '')).toLowerCase();
      if (!t.includes(q.toLowerCase())) return false;
    }
    return true;
  });
  return /*#__PURE__*/React.createElement(ModuleScreen, {
    cfg: cfg,
    title: "Invent\xE1rio",
    subtitle: `${INV_STATS.totalItems} itens · somente consulta`,
    onNew: onScan,
    newLabel: "Escanear QR Code",
    newIcon: "scan"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 16px 12px'
    }
  }, /*#__PURE__*/React.createElement(SearchField, {
    value: q,
    onChange: setQ,
    placeholder: "Buscar item, SKU, patrim\xF4nio\u2026"
  })), /*#__PURE__*/React.createElement(ChipRow, {
    chips: chips,
    active: filter,
    onPick: setFilter,
    accent: cfg.accent
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 24px'
    }
  }, list.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    icon: "package",
    text: "Nenhum item encontrado."
  }) : list.map(it => /*#__PURE__*/React.createElement(InvCard, {
    key: it.id,
    item: it,
    cfg: cfg,
    onOpen: onOpen
  }))));
}

// ── Scan view (camera QR reader → opens item) ───────────────────────────────
function ScanView({
  cfg,
  onClose,
  onDetected
}) {
  const [detecting, setDetecting] = React.useState(null); // item being "read"
  const scannable = INVENTORY;
  const read = item => {
    if (detecting) return;
    setDetecting(item);
    setTimeout(() => onDetected(item), 780);
  };
  const corner = pos => {
    const base = {
      position: 'absolute',
      width: 30,
      height: 30,
      border: `3px solid ${cfg.accent}`
    };
    const map = {
      tl: {
        top: -2,
        left: -2,
        borderRight: 'none',
        borderBottom: 'none',
        borderTopLeftRadius: 10
      },
      tr: {
        top: -2,
        right: -2,
        borderLeft: 'none',
        borderBottom: 'none',
        borderTopRightRadius: 10
      },
      bl: {
        bottom: -2,
        left: -2,
        borderRight: 'none',
        borderTop: 'none',
        borderBottomLeftRadius: 10
      },
      br: {
        bottom: -2,
        right: -2,
        borderLeft: 'none',
        borderTop: 'none',
        borderBottomRightRadius: 10
      }
    };
    return /*#__PURE__*/React.createElement("span", {
      style: {
        ...base,
        ...map[pos]
      }
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 70,
      background: '#0A0E18',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement("style", null, `
        @keyframes sdxScanLine { 0%{ top: 6%; } 50%{ top: 88%; } 100%{ top: 6%; } }
        @keyframes sdxFadeUp { from{ opacity:0; transform: translateY(8px);} to{opacity:1; transform:none;} }
      `), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(120% 80% at 50% 30%, #243153 0%, #131a2b 45%, #080b14 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.5,
      background: 'repeating-linear-gradient(115deg, rgba(255,255,255,.015) 0 2px, transparent 2px 9px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 3,
      padding: '46px 16px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      width: 38,
      height: 38,
      borderRadius: 11,
      border: 'none',
      cursor: 'pointer',
      background: 'rgba(255,255,255,.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 19,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#fff',
      fontSize: 15,
      fontWeight: 700
    }
  }, "Escanear etiqueta"), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 11,
      border: 'none',
      cursor: 'pointer',
      background: 'rgba(255,255,255,.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    size: 18,
    color: "#fff"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 3,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 22,
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 234,
      height: 234,
      borderRadius: 12
    }
  }, corner('tl'), corner('tr'), corner('bl'), corner('br'), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 6,
      borderRadius: 8,
      background: 'rgba(255,255,255,.03)'
    }
  }), !detecting && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '5%',
      right: '5%',
      height: 2,
      borderRadius: 2,
      background: cfg.accent,
      boxShadow: `0 0 14px 1px ${cfg.accent}`,
      animation: 'sdxScanLine 2.4s ease-in-out infinite'
    }
  }), detecting && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      animation: 'sdxFadeUp .2s ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: '#059669',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 0 8px rgba(5,150,105,.18)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 28,
    color: "#fff",
    strokeWidth: 3
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#fff',
      fontSize: 13,
      fontWeight: 700
    }
  }, "Etiqueta reconhecida"))), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgba(255,255,255,.72)',
      fontSize: 13.5,
      textAlign: 'center',
      lineHeight: 1.5,
      margin: 0,
      maxWidth: 240
    }
  }, detecting ? `Abrindo ${detecting.name}…` : 'Aponte a câmera para o QR Code da etiqueta do item para abrir os detalhes.')), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 3,
      background: T.surface,
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
      padding: '16px 0 28px',
      boxShadow: '0 -8px 30px rgba(0,0,0,.3)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '0 16px 11px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "qr",
    size: 14,
    color: T.faint
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: T.faint,
      fontWeight: 700,
      letterSpacing: 0.4,
      textTransform: 'uppercase'
    }
  }, "Simular leitura (prot\xF3tipo)")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      overflowX: 'auto',
      padding: '0 16px',
      scrollbarWidth: 'none'
    }
  }, scannable.map(it => {
    const ty = INV_TYPE[it.primaryType];
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => read(it),
      style: {
        flexShrink: 0,
        width: 118,
        textAlign: 'left',
        cursor: 'pointer',
        background: T.bg,
        border: `1px solid ${T.border}`,
        borderRadius: 12,
        padding: 11,
        fontFamily: T.font
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 34,
        height: 34,
        borderRadius: 9,
        background: `${cfg.accent}12`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 9
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ty.icon,
      size: 17,
      color: cfg.accent
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: cfg.accent,
        fontFamily: "'Courier New', monospace"
      }
    }, it.assetTag || it.sku), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: T.textSoft,
        marginTop: 3,
        lineHeight: 1.3,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical'
      }
    }, it.name));
  }))));
}

// ── Item detail ─────────────────────────────────────────────────────────────
function InventoryDetail({
  item,
  cfg,
  onBack
}) {
  const tone = stockStatusOf(item);
  const ty = INV_TYPE[item.primaryType];
  const isEquip = item.itemType === 'equipment';
  const itemMoves = MOVEMENTS.filter(m => m.itemName === item.name);
  return /*#__PURE__*/React.createElement(DetailScaffold, {
    cfg: cfg,
    onBack: onBack,
    eyebrow: item.sku || item.assetTag || ty.label,
    title: item.name,
    badge: /*#__PURE__*/React.createElement(Badge, {
      tone: tone,
      style: "solid"
    }),
    headerExtra: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginTop: 10,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        color: 'rgba(255,255,255,.78)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ty.icon,
      size: 14,
      color: "rgba(255,255,255,.78)"
    }), " ", ty.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        color: 'rgba(255,255,255,.78)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "map-pin",
      size: 14,
      color: "rgba(255,255,255,.78)"
    }), " ", item.currentLocation))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 150,
      borderRadius: 14,
      marginBottom: 12,
      overflow: 'hidden',
      position: 'relative',
      background: `repeating-linear-gradient(135deg, ${T.surfaceMuted}, ${T.surfaceMuted} 11px, #FFF 11px, #FFF 22px)`,
      border: `1px solid ${T.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "camera",
    size: 24,
    color: T.faint
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: T.faint,
      fontFamily: "'Courier New', monospace"
    }
  }, "foto do item / patrim\xF4nio")), /*#__PURE__*/React.createElement("button", {
    style: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '7px 11px',
      borderRadius: 9,
      border: 'none',
      cursor: 'pointer',
      background: 'rgba(15,23,42,.78)',
      color: '#fff',
      fontSize: 12,
      fontWeight: 600,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "qr",
    size: 13,
    color: "#fff"
  }), " QR")), !isEquip ? /*#__PURE__*/React.createElement(SectionCard, {
    title: "Estoque"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 4,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 34,
      fontWeight: 800,
      color: tone.solid,
      lineHeight: 1
    }
  }, item.currentQty), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: T.muted,
      marginBottom: 3
    }
  }, item.unit)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      borderRadius: 4,
      background: T.surfaceMuted,
      overflow: 'hidden',
      margin: '12px 0 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${item.maxQty ? Math.min(100, item.currentQty / item.maxQty * 100) : 100}%`,
      height: '100%',
      background: tone.solid,
      borderRadius: 4
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 11.5,
      color: T.faint
    }
  }, /*#__PURE__*/React.createElement("span", null, "M\xEDnimo ", item.minQty), /*#__PURE__*/React.createElement("span", null, "M\xE1ximo ", item.maxQty || '—'))) : /*#__PURE__*/React.createElement(SectionCard, {
    title: "Patrim\xF4nio"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(StatItem, {
    label: "Etiqueta"
  }, item.assetTag), /*#__PURE__*/React.createElement(StatItem, {
    label: "N\xBA de s\xE9rie"
  }, item.serialNumber), /*#__PURE__*/React.createElement(StatItem, {
    label: "Marca"
  }, item.brand), /*#__PURE__*/React.createElement(StatItem, {
    label: "Modelo"
  }, item.model), item.operatingSystem && /*#__PURE__*/React.createElement(StatItem, {
    label: "Sistema"
  }, item.operatingSystem), /*#__PURE__*/React.createElement(StatItem, {
    label: "Estado"
  }, item.equipmentStatus))), item.technicalSpecs.length > 0 && /*#__PURE__*/React.createElement(SectionCard, {
    title: "Especifica\xE7\xF5es t\xE9cnicas"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, item.technicalSpecs.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: T.surfaceMuted,
      borderRadius: 9,
      padding: '8px 11px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: T.faint,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 0.4
    }
  }, s.key), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: T.text,
      fontWeight: 600,
      marginTop: 2
    }
  }, s.value))))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Identifica\xE7\xE3o"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(StatItem, {
    label: "SKU"
  }, item.sku || '—'), /*#__PURE__*/React.createElement(StatItem, {
    label: "Unidade"
  }, item.unit), /*#__PURE__*/React.createElement(StatItem, {
    label: "Categoria"
  }, ty.label), /*#__PURE__*/React.createElement(StatItem, {
    label: "Localiza\xE7\xE3o"
  }, item.currentLocation || '—')), item.notes && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontSize: 13,
      color: T.textSoft,
      lineHeight: 1.5,
      background: T.surfaceMuted,
      borderRadius: 10,
      padding: 11
    }
  }, item.notes)), itemMoves.length > 0 && /*#__PURE__*/React.createElement(SectionCard, {
    title: "Hist\xF3rico de movimenta\xE7\xF5es"
  }, itemMoves.map(m => /*#__PURE__*/React.createElement(MovementRow, {
    key: m.id,
    m: m
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8
    }
  }));
}
Object.assign(window, {
  InventoryScreen,
  ScanView,
  InventoryDetail,
  InvCard,
  MovementRow,
  RestockCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "mobile/inventory.jsx", error: String((e && e.message) || e) }); }

// mobile/records.jsx
try { (() => {
// ScandexPRO Mobile — Prontuários (medical records) module
// Fluxo: Buscar → Ver paciente + cirurgias → Abrir documento.

// ── Document status system ("as bolinhas") — §6 do brief — CRÍTICO ──────────
const DOC_STATUS = {
  available: {
    label: 'Documento disponível',
    color: '#10B981',
    ring: '#059669',
    soft: '#E7F8F0'
  },
  processing: {
    label: 'Em processamento',
    color: '#3B82F6',
    ring: '#2563EB',
    soft: '#E9F1FE'
  },
  altered: {
    label: 'Informação alterada',
    color: '#EAB308',
    ring: '#CA8A04',
    soft: '#FBF4DC'
  },
  missing_info: {
    label: 'Faltando páginas/info',
    color: '#F97316',
    ring: '#EA580C',
    soft: '#FEEEE1'
  },
  absent: {
    label: 'Documento ausente',
    color: '#EF4444',
    ring: '#DC2626',
    soft: '#FDECEC'
  },
  reported: {
    label: 'Reportado com problema',
    color: '#EAB308',
    ring: '#CA8A04',
    soft: '#FBF4DC'
  }
};

// ── Mock patients (schema-faithful) ─────────────────────────────────────────
const PATIENTS = {
  '123456': {
    prontuario: '123456',
    name: 'Maria Aparecida Nogueira da Silva',
    age: 64,
    birthDate: '12/03/1961',
    cpf: '472.118.965-04',
    susNumber: '706 0042 8815 0007',
    bloodType: 'O+',
    cep: '60192-340',
    address: 'Rua das Acácias, 128 — Aldeota, Fortaleza/CE',
    photoUrl: null,
    barcodeBase: '123-4567-8901',
    isNew: false,
    surgeries: [{
      id: 's1',
      date: '28/05/2025',
      name: 'Facectomia + LIO — OD',
      specialty: 'Catarata',
      status: 'performed',
      documentType: 'pdf',
      pages: 6,
      docStatus: 'available',
      isReported: false,
      anexos: 2
    }, {
      id: 's2',
      date: '18/06/2025',
      prog: true,
      name: 'Facectomia + LIO — OE',
      specialty: 'Catarata',
      status: 'scheduled',
      documentType: null,
      pages: 0,
      docStatus: 'processing',
      isReported: false,
      anexos: 0
    }, {
      id: 's3',
      date: '15/03/2025',
      name: 'Mapeamento de retina',
      specialty: 'Retina',
      status: 'performed',
      documentType: 'image',
      pages: 3,
      docStatus: 'altered',
      isReported: false,
      anexos: 0
    }, {
      id: 's4',
      date: '20/08/2024',
      name: 'Yag laser — capsulotomia',
      specialty: 'Catarata',
      status: 'performed',
      documentType: 'pdf',
      pages: 4,
      docStatus: 'missing_info',
      isReported: true,
      anexos: 1
    }, {
      id: 's5',
      date: '02/11/2024',
      name: 'Trabeculectomia — OE',
      specialty: 'Glaucoma',
      status: 'cancelled',
      cancellationReason: 'Paciente remarcou por motivos pessoais',
      documentType: null,
      pages: 0,
      docStatus: 'absent',
      isReported: false,
      anexos: 0
    }]
  },
  '884220': {
    prontuario: '884220',
    name: 'João Batista Ferreira',
    age: 57,
    birthDate: '04/09/1968',
    cpf: '318.904.226-71',
    susNumber: '700 8821 3390 0042',
    bloodType: 'A−',
    cep: '60150-160',
    address: 'Av. Dom Luís, 1200, ap. 704 — Meireles, Fortaleza/CE',
    photoUrl: null,
    barcodeBase: '884-2201-0033',
    isNew: false,
    surgeries: [{
      id: 'j1',
      date: '10/06/2025',
      name: 'Transplante de córnea — OD',
      specialty: 'Córnea',
      status: 'performed',
      documentType: 'pdf',
      pages: 8,
      docStatus: 'available',
      isReported: false,
      anexos: 3
    }, {
      id: 'j2',
      date: '02/02/2025',
      name: 'Vitrectomia posterior — OD',
      specialty: 'Retina',
      status: 'performed',
      documentType: 'pdf',
      pages: 5,
      docStatus: 'available',
      isReported: false,
      anexos: 0
    }]
  },
  '100345': {
    prontuario: '100345',
    name: 'Antônia Helena Vasconcelos',
    age: 71,
    birthDate: '23/07/1954',
    cpf: '205.667.138-90',
    susNumber: '709 1003 4500 0011',
    bloodType: 'B+',
    cep: '60810-000',
    address: 'Rua Tibúrcio Cavalcante, 45 — Joaquim Távora, Fortaleza/CE',
    photoUrl: null,
    barcodeBase: '100-3450-0022',
    isNew: false,
    surgeries: []
  }
};
const CPF_INDEX = Object.fromEntries(Object.values(PATIENTS).map(p => [p.cpf.replace(/\D/g, ''), p.prontuario]));
const RECENT = ['123456', '884220', '100345'];
const RECORDS_APPS = [{
  key: 'surg',
  label: 'Cirurgias — HO'
}, {
  key: 'legal',
  label: 'Jurídico — HO'
}];

// ── Status dot (a "bolinha") ────────────────────────────────────────────────
function StatusDot({
  surgery,
  size = 16
}) {
  const key = surgery.isReported ? 'reported' : surgery.docStatus;
  const s = DOC_STATUS[key];
  if (surgery.isReported) {
    return /*#__PURE__*/React.createElement("span", {
      title: s.label,
      style: {
        display: 'inline-flex',
        position: 'relative',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: size + 4,
      height: size + 4,
      viewBox: "0 0 24 24",
      fill: s.color,
      stroke: s.ring,
      strokeWidth: "1.5",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M10.3 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.7 3.86a2 2 0 00-3.4 0z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 9.5v4",
      stroke: "#fff",
      strokeWidth: "2",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "16.6",
      r: "1.1",
      fill: "#fff",
      stroke: "none"
    })));
  }
  return /*#__PURE__*/React.createElement("span", {
    title: s.label,
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      background: s.color,
      border: `2px solid ${s.ring}`,
      flexShrink: 0,
      display: 'block'
    }
  });
}

// ── Status legend (reusable) ────────────────────────────────────────────────
function StatusLegend() {
  const items = ['available', 'processing', 'altered', 'missing_info', 'absent'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, items.map(k => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      borderRadius: '50%',
      background: DOC_STATUS[k].color,
      border: `2px solid ${DOC_STATUS[k].ring}`,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: T.textSoft,
      fontFamily: T.font
    }
  }, DOC_STATUS[k].label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: DOC_STATUS.reported.color,
    stroke: DOC_STATUS.reported.ring,
    strokeWidth: "1.5",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10.3 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.7 3.86a2 2 0 00-3.4 0z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 9.5v4",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "16.6",
    r: "1.1",
    fill: "#fff",
    stroke: "none"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: T.textSoft,
      fontFamily: T.font
    }
  }, "Reportado com problema")));
}

// ── Toast ───────────────────────────────────────────────────────────────────
function Toast({
  kind,
  text
}) {
  const danger = kind === 'error';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 16,
      right: 16,
      bottom: 28,
      zIndex: 70,
      background: danger ? T.danger : '#059669',
      color: '#fff',
      borderRadius: 13,
      padding: '13px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      boxShadow: '0 14px 30px -10px rgba(15,23,42,.5)',
      fontFamily: T.font,
      animation: 'sdxToastIn .26s ease'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: danger ? 'alert' : 'check-circle',
    size: 18,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 600
    }
  }, text));
}

// ── Screen 1 — Busca de paciente ────────────────────────────────────────────
function maskCPF(v) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  let out = d;
  if (d.length > 9) out = `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;else if (d.length > 6) out = `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;else if (d.length > 3) out = `${d.slice(0, 3)}.${d.slice(3)}`;
  return out;
}
function FieldShell({
  icon,
  children,
  focused,
  valid
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 54,
      padding: '0 14px',
      background: T.surface,
      borderRadius: 14,
      border: `1.5px solid ${focused ? T.primary : valid ? '#10B981' : T.border}`,
      boxShadow: focused ? `0 0 0 4px ${T.primary}1a` : 'none',
      transition: 'border-color .15s, box-shadow .15s'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 19,
    color: focused ? T.primary : T.faint
  }), children);
}
function SearchScreen({
  onFound,
  onNotFound,
  onOpenLegend
}) {
  const [app, setApp] = React.useState('surg');
  const [pront, setPront] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [focus, setFocus] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const prontDigits = pront.replace(/\D/g, '');
  const cpfDigits = cpf.replace(/\D/g, '');
  const prontValid = prontDigits.length >= 5;
  const cpfValid = cpfDigits.length === 11;
  const canSearch = prontValid || cpfValid;
  const submit = () => {
    if (!canSearch || loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (prontValid) {
        const hit = PATIENTS[prontDigits];
        if (hit) onFound(hit);else onFound({
          prontuario: prontDigits,
          isNew: true,
          surgeries: []
        });
        return;
      }
      // CPF path
      const key = CPF_INDEX[cpfDigits];
      if (key) onFound(PATIENTS[key]);else onNotFound('Paciente não encontrado para este CPF');
    }, 650);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(BlueHeader, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(BrandTile, {
    size: 26,
    radius: 8,
    shadow: false
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: '#fff',
      letterSpacing: -0.2,
      fontFamily: T.font
    }
  }, "Prontu\xE1rios")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 25,
      fontWeight: 800,
      letterSpacing: -0.4,
      fontFamily: T.font
    }
  }, "Buscar paciente"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 13,
      color: 'rgba(255,255,255,.78)',
      fontFamily: T.font,
      lineHeight: 1.45
    }
  }, "Informe o prontu\xE1rio (\u22655 d\xEDgitos) ou um CPF v\xE1lido.")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      background: T.bg,
      padding: '18px 18px 26px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      background: T.surfaceMuted,
      borderRadius: 12,
      padding: 4,
      marginBottom: 20
    }
  }, RECORDS_APPS.map(a => {
    const on = app === a.key;
    return /*#__PURE__*/React.createElement("button", {
      key: a.key,
      onClick: () => setApp(a.key),
      style: {
        flex: 1,
        height: 40,
        borderRadius: 9,
        border: 'none',
        cursor: 'pointer',
        background: on ? T.primary : 'transparent',
        color: on ? '#fff' : T.muted,
        fontSize: 12.5,
        fontWeight: 700,
        fontFamily: T.font,
        transition: 'all .15s'
      }
    }, a.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: T.muted,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      marginBottom: 8
    }
  }, "Prontu\xE1rio"), /*#__PURE__*/React.createElement(FieldShell, {
    icon: "search",
    focused: focus === 'p',
    valid: prontValid && focus !== 'p'
  }, /*#__PURE__*/React.createElement("input", {
    value: pront,
    onChange: e => setPront(e.target.value.replace(/[^\d]/g, '')),
    onFocus: () => setFocus('p'),
    onBlur: () => setFocus(null),
    inputMode: "numeric",
    placeholder: "Ex.: 123456",
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontSize: 16,
      fontWeight: 600,
      fontFamily: T.font,
      color: T.text,
      letterSpacing: 0.5
    }
  }), prontValid && /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle",
    size: 18,
    color: "#10B981"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      margin: '16px 2px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: T.border
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: T.faint,
      fontFamily: T.font
    }
  }, "ou"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: T.border
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: T.muted,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      marginBottom: 8
    }
  }, "CPF"), /*#__PURE__*/React.createElement(FieldShell, {
    icon: "idcard",
    focused: focus === 'c',
    valid: cpfValid && focus !== 'c'
  }, /*#__PURE__*/React.createElement("input", {
    value: cpf,
    onChange: e => setCpf(maskCPF(e.target.value)),
    onFocus: () => setFocus('c'),
    onBlur: () => setFocus(null),
    inputMode: "numeric",
    placeholder: "000.000.000-00",
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontSize: 16,
      fontWeight: 600,
      fontFamily: T.font,
      color: T.text,
      letterSpacing: 0.5
    }
  }), cpfValid && /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle",
    size: 18,
    color: "#10B981"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: submit,
    disabled: !canSearch || loading,
    style: {
      marginTop: 24,
      width: '100%',
      height: 54,
      borderRadius: 15,
      border: 'none',
      cursor: canSearch && !loading ? 'pointer' : 'default',
      background: canSearch ? `linear-gradient(135deg, ${T.primary}, ${T.primaryDark})` : T.borderStrong,
      color: '#fff',
      fontSize: 15.5,
      fontWeight: 700,
      fontFamily: T.font,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 9,
      boxShadow: canSearch ? `0 10px 24px -8px ${T.primary}80` : 'none',
      transition: 'background .2s'
    }
  }, loading ? /*#__PURE__*/React.createElement("span", {
    className: "sdx-spin",
    style: {
      width: 19,
      height: 19,
      borderRadius: '50%',
      border: '2.5px solid rgba(255,255,255,.4)',
      borderTopColor: '#fff',
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 19,
    color: "#fff"
  }), " Buscar")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 30,
      fontSize: 11,
      fontWeight: 700,
      color: T.muted,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      marginBottom: 11
    }
  }, "Buscas recentes"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, RECENT.map(p => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => onFound(PATIENTS[p]),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      padding: '9px 13px',
      borderRadius: 999,
      border: `1px solid ${T.border}`,
      background: T.surface,
      cursor: 'pointer',
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 14,
    color: T.faint
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: T.textSoft
    }
  }, p)))), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenLegend,
    style: {
      marginTop: 26,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontFamily: T.font,
      fontSize: 12.5,
      fontWeight: 600,
      color: T.muted
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "alert",
    size: 15,
    color: T.faint
  }), " O que significam as cores de status?")));
}

// ── Screen 2 — Detalhes do paciente ─────────────────────────────────────────
function PatientField({
  label,
  value,
  full
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      gridColumn: full ? '1 / -1' : 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: T.faint,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 4
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      color: T.text,
      fontWeight: 600,
      lineHeight: 1.35,
      wordBreak: 'break-word'
    }
  }, value || '—'));
}
function SurgeryTab({
  active,
  label,
  count,
  on,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      flex: 1,
      height: 38,
      borderRadius: 9,
      border: 'none',
      cursor: 'pointer',
      background: on ? T.primary : 'transparent',
      color: on ? '#fff' : T.muted,
      fontSize: 12.5,
      fontWeight: 700,
      fontFamily: T.font,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5
    }
  }, label, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      opacity: on ? 0.85 : 0.7
    }
  }, count));
}
function SurgeryCard({
  s,
  onOpenDoc
}) {
  const cancelled = s.status === 'cancelled';
  const noDoc = s.docStatus === 'absent' || s.docStatus === 'processing';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      padding: 14,
      boxShadow: '0 1px 3px rgba(15,23,42,.05)',
      marginBottom: 10,
      opacity: cancelled ? 0.92 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 3
    }
  }, /*#__PURE__*/React.createElement(StatusDot, {
    surgery: s,
    size: 16
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      fontSize: 11.5,
      color: s.prog ? T.primary : T.muted,
      fontWeight: 700,
      letterSpacing: 0.2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 13,
    color: s.prog ? T.primary : T.faint
  }), s.prog ? `Data Prog. ${s.date}` : s.date), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 700,
      color: T.text,
      marginTop: 5,
      lineHeight: 1.3
    }
  }, s.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: T.muted,
      marginTop: 2
    }
  }, s.specialty), cancelled && s.cancellationReason && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: T.danger,
      marginTop: 6,
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 12,
    color: T.danger
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, s.cancellationReason)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      marginTop: 12,
      paddingTop: 11,
      borderTop: `1px solid ${T.surfaceMuted}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, s.anexos > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 11.5,
      fontWeight: 600,
      color: T.muted,
      background: T.surfaceMuted,
      padding: '4px 8px',
      borderRadius: 999
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "paperclip",
    size: 12,
    color: T.muted
  }), " ", s.anexos), s.documentType && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 11.5,
      color: T.faint,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.documentType === 'pdf' ? 'file-text' : 'image',
    size: 13,
    color: T.faint
  }), s.documentType.toUpperCase(), s.pages ? ` · ${s.pages}p` : '')), /*#__PURE__*/React.createElement("button", {
    onClick: () => !noDoc && onOpenDoc(s),
    disabled: noDoc,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '8px 13px',
      borderRadius: 10,
      border: 'none',
      cursor: noDoc ? 'default' : 'pointer',
      fontFamily: T.font,
      fontSize: 12.5,
      fontWeight: 700,
      background: noDoc ? T.surfaceMuted : `${T.primary}12`,
      color: noDoc ? T.faint : T.primary
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 14,
    color: noDoc ? T.faint : T.primary
  }), " Ver Documento")));
}
function PatientDetail({
  patient,
  cfg,
  onBack,
  onOpenDoc
}) {
  const [tab, setTab] = React.useState('all');
  const surgeries = patient.surgeries || [];
  const performed = surgeries.filter(s => s.status !== 'cancelled');
  const cancelled = surgeries.filter(s => s.status === 'cancelled');
  const list = tab === 'all' ? surgeries : tab === 'performed' ? performed : cancelled;
  const initials = patient.name ? patient.name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('') : '?';
  return /*#__PURE__*/React.createElement(DetailScaffold, {
    cfg: cfg,
    onBack: onBack,
    eyebrow: `Prontuário ${patient.prontuario}`,
    title: patient.isNew ? 'Paciente não cadastrado' : patient.name,
    compact: true
  }, patient.isNew ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      border: `1.5px dashed #D9A441`,
      background: '#FEF7E6',
      borderRadius: 16,
      padding: 22,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 16,
      background: '#FBEBC6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 14px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user",
    size: 26,
    color: "#B45309"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: '#92500E',
      fontFamily: T.font
    }
  }, "Paciente n\xE3o encontrado"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '7px 0 18px',
      fontSize: 13,
      color: '#A16207',
      fontFamily: T.font,
      lineHeight: 1.5
    }
  }, "O prontu\xE1rio ", /*#__PURE__*/React.createElement("strong", null, patient.prontuario), " ainda n\xE3o est\xE1 cadastrado no sistema."), /*#__PURE__*/React.createElement("button", {
    style: {
      width: '100%',
      height: 50,
      borderRadius: 13,
      border: 'none',
      cursor: 'pointer',
      background: '#B45309',
      color: '#fff',
      fontSize: 14.5,
      fontWeight: 700,
      fontFamily: T.font,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 18,
    color: "#fff"
  }), " Cadastrar novo paciente")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 18,
      padding: 18,
      marginBottom: 16,
      boxShadow: '0 1px 3px rgba(15,23,42,.05)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 96,
      height: 96,
      borderRadius: 24,
      background: `${T.primary}0d`,
      border: `2px solid ${T.primary}33`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 30,
      fontWeight: 800,
      color: T.primary,
      fontFamily: T.font
    }
  }, initials)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9,
      fontSize: 12,
      fontStyle: 'italic',
      color: '#B7861F',
      fontWeight: 600,
      fontFamily: T.font,
      letterSpacing: 0.4
    }
  }, patient.barcodeBase)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(PatientField, {
    label: "Nome Completo",
    value: patient.name,
    full: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px 14px'
    }
  }, /*#__PURE__*/React.createElement(PatientField, {
    label: "Idade",
    value: `${patient.age} anos`
  }), /*#__PURE__*/React.createElement(PatientField, {
    label: "Nascimento",
    value: patient.birthDate
  }), /*#__PURE__*/React.createElement(PatientField, {
    label: "CPF",
    value: patient.cpf
  }), /*#__PURE__*/React.createElement(PatientField, {
    label: "Tipo Sangu\xEDneo",
    value: patient.bloodType
  }), /*#__PURE__*/React.createElement(PatientField, {
    label: "Prontu\xE1rio",
    value: patient.prontuario
  }), /*#__PURE__*/React.createElement(PatientField, {
    label: "CEP",
    value: patient.cep
  }), /*#__PURE__*/React.createElement(PatientField, {
    label: "Cart\xE3o SUS",
    value: patient.susNumber,
    full: true
  }), /*#__PURE__*/React.createElement(PatientField, {
    label: "Endere\xE7o",
    value: patient.address,
    full: true
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '4px 2px 12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: T.text,
      fontFamily: T.font,
      letterSpacing: -0.2
    }
  }, "Hist\xF3rico de Cirurgias"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: T.muted,
      fontFamily: T.font
    }
  }, surgeries.length, " registro", surgeries.length === 1 ? '' : 's')), surgeries.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    icon: "file-text",
    text: "Nenhuma cirurgia registrada para este paciente."
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      background: T.surfaceMuted,
      borderRadius: 11,
      padding: 4,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(SurgeryTab, {
    on: tab === 'all',
    label: "Todas",
    count: surgeries.length,
    onClick: () => setTab('all')
  }), /*#__PURE__*/React.createElement(SurgeryTab, {
    on: tab === 'performed',
    label: "Realizadas",
    count: performed.length,
    onClick: () => setTab('performed')
  }), /*#__PURE__*/React.createElement(SurgeryTab, {
    on: tab === 'cancelled',
    label: "Canceladas",
    count: cancelled.length,
    onClick: () => setTab('cancelled')
  })), list.map(s => /*#__PURE__*/React.createElement(SurgeryCard, {
    key: s.id,
    s: s,
    onOpenDoc: onOpenDoc
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8
    }
  }));
}

// ── Screen 3 — Visualizador de documento ────────────────────────────────────
function ScannedPage({
  pageNum
}) {
  // Faux scanned medical-record page placeholder (clean, no real PII)
  const lines = [92, 78, 85, 64, 88, 72, 80, 58, 90, 67, 83, 75];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 300,
      background: '#fff',
      borderRadius: 4,
      padding: '26px 24px',
      boxShadow: '0 8px 30px rgba(0,0,0,.4)',
      fontFamily: T.font,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '2px solid #1f2937',
      paddingBottom: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: '#1f2937',
      letterSpacing: 0.5
    }
  }, "HOSPITAL DO OLHO \u2014 JCB"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      color: '#9ca3af',
      marginTop: 2,
      letterSpacing: 0.5
    }
  }, "PRONTU\xC1RIO CIR\xDARGICO DIGITALIZADO")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 6,
      background: '#eef2f7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "droplet",
    size: 15,
    color: "#cbd5e1"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '7px 14px',
      marginBottom: 16
    }
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      width: '52%',
      background: '#cbd5e1',
      borderRadius: 2,
      marginBottom: 4
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      width: '84%',
      background: '#1f2937',
      borderRadius: 2,
      opacity: 0.82
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 5,
      width: '34%',
      background: '#94a3b8',
      borderRadius: 2,
      marginBottom: 11
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7
    }
  }, lines.map((w, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: 4,
      width: `${w}%`,
      background: '#e2e8f0',
      borderRadius: 2
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 18,
      bottom: 14,
      fontSize: 8,
      color: '#cbd5e1',
      fontWeight: 600
    }
  }, "P\xE1g. ", pageNum));
}
function DocViewer({
  surgery,
  patient,
  onBack
}) {
  const total = surgery.pages || 1;
  const [page, setPage] = React.useState(1);
  const [zoom, setZoom] = React.useState(1);
  const [menu, setMenu] = React.useState(false);
  const z = d => setZoom(v => Math.min(2.4, Math.max(0.6, +(v + d).toFixed(2))));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 75,
      display: 'flex',
      flexDirection: 'column',
      background: '#0B1020'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, ${T.primary}, ${T.primaryDark})`,
      padding: '44px 14px 12px',
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      width: 36,
      height: 36,
      borderRadius: 10,
      border: 'none',
      cursor: 'pointer',
      background: 'rgba(255,255,255,.16)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 19,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 700,
      color: '#fff',
      fontFamily: T.font,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, surgery.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'rgba(255,255,255,.72)',
      fontFamily: T.font
    }
  }, patient.name?.split(' ').slice(0, 2).join(' '), " \xB7 Pront. ", patient.prontuario)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setMenu(m => !m),
    style: {
      width: 36,
      height: 36,
      borderRadius: 10,
      border: 'none',
      cursor: 'pointer',
      background: 'rgba(255,255,255,.16)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more-vertical",
    size: 19,
    color: "#fff"
  })), menu && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 78,
      right: 14,
      zIndex: 80,
      background: T.surface,
      borderRadius: 13,
      boxShadow: '0 16px 40px -10px rgba(0,0,0,.5)',
      overflow: 'hidden',
      minWidth: 196
    }
  }, [{
    i: 'download',
    l: 'Baixar'
  }, {
    i: 'share',
    l: 'Compartilhar'
  }, {
    i: 'flag',
    l: 'Reportar problema',
    danger: true
  }].map((m, idx) => /*#__PURE__*/React.createElement("button", {
    key: m.l,
    onClick: () => setMenu(false),
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '13px 15px',
      border: 'none',
      cursor: 'pointer',
      background: T.surface,
      fontFamily: T.font,
      fontSize: 13.5,
      fontWeight: 600,
      color: m.danger ? T.danger : T.text,
      borderTop: idx ? `1px solid ${T.surfaceMuted}` : 'none',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: m.i,
    size: 17,
    color: m.danger ? T.danger : T.muted
  }), " ", m.l)))), /*#__PURE__*/React.createElement("div", {
    onClick: () => setMenu(false),
    style: {
      flex: 1,
      overflow: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      background: 'radial-gradient(120% 80% at 50% 0%, #161d33, #0B1020)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transform: `scale(${zoom})`,
      transition: 'transform .18s ease',
      transformOrigin: 'center'
    }
  }, /*#__PURE__*/React.createElement(ScannedPage, {
    pageNum: page
  }))), total > 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage(p => Math.max(1, p - 1)),
    disabled: page === 1,
    style: navBtn('left', page === 1)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: 22,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage(p => Math.min(total, p + 1)),
    disabled: page === total,
    style: navBtn('right', page === total)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 22,
    color: "#fff"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 26,
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      background: 'rgba(17,24,42,.82)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,.1)',
      borderRadius: 999,
      padding: 6,
      pointerEvents: 'auto',
      boxShadow: '0 12px 30px rgba(0,0,0,.45)'
    }
  }, /*#__PURE__*/React.createElement(CtrlBtn, {
    icon: "zoom-out",
    onClick: () => z(-0.2)
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 50,
      textAlign: 'center',
      fontSize: 12.5,
      fontWeight: 700,
      color: '#fff',
      fontFamily: T.font
    }
  }, Math.round(zoom * 100), "%"), /*#__PURE__*/React.createElement(CtrlBtn, {
    icon: "zoom-in",
    onClick: () => z(0.2)
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 22,
      background: 'rgba(255,255,255,.16)',
      margin: '0 4px'
    }
  }), /*#__PURE__*/React.createElement(CtrlBtn, {
    icon: "maximize",
    onClick: () => {
      setZoom(1);
      setPage(1);
    }
  }), total > 1 && /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 52,
      textAlign: 'center',
      fontSize: 12.5,
      fontWeight: 700,
      color: 'rgba(255,255,255,.85)',
      fontFamily: T.font
    }
  }, page, "/", total))));
}
function navBtn(side, disabled) {
  return {
    position: 'absolute',
    top: '50%',
    [side]: 8,
    transform: 'translateY(-50%)',
    zIndex: 70,
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: 'none',
    cursor: disabled ? 'default' : 'pointer',
    background: 'rgba(17,24,42,.6)',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.25 : 1
  };
}
function CtrlBtn({
  icon,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      width: 38,
      height: 38,
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 19,
    color: "#fff"
  }));
}

// ── Legend sheet ────────────────────────────────────────────────────────────
function LegendSheet({
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 78,
      background: 'rgba(11,16,32,.5)',
      display: 'flex',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      background: T.surface,
      borderRadius: '22px 22px 0 0',
      padding: '10px 22px 34px',
      animation: 'sdxSheetIn .28s ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 4,
      borderRadius: 999,
      background: T.border,
      margin: '0 auto 18px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 800,
      color: T.text,
      fontFamily: T.font,
      marginBottom: 4
    }
  }, "Status do documento"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 18px',
      fontSize: 12.5,
      color: T.muted,
      fontFamily: T.font
    }
  }, "A bolinha ao lado de cada cirurgia indica o estado do documento."), /*#__PURE__*/React.createElement(StatusLegend, null)));
}

// ── Root Prontuários screen (internal stack) ────────────────────────────────
function RecordsScreen({
  cfg,
  onOpenDoc
}) {
  const [view, setView] = React.useState({
    name: 'search'
  });
  const [toast, setToast] = React.useState(null);
  const [legend, setLegend] = React.useState(false);
  React.useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(id);
  }, [toast]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(SearchScreen, {
    onFound: p => setView({
      name: 'details',
      patient: p
    }),
    onNotFound: msg => setToast({
      kind: 'error',
      text: msg
    }),
    onOpenLegend: () => setLegend(true)
  }), view.name === 'details' && /*#__PURE__*/React.createElement(PatientDetail, {
    patient: view.patient,
    cfg: cfg,
    onBack: () => setView({
      name: 'search'
    }),
    onOpenDoc: s => onOpenDoc(s, view.patient)
  }), legend && /*#__PURE__*/React.createElement(LegendSheet, {
    onClose: () => setLegend(false)
  }), toast && /*#__PURE__*/React.createElement(Toast, {
    kind: toast.kind,
    text: toast.text
  }));
}
Object.assign(window, {
  DOC_STATUS,
  PATIENTS,
  StatusDot,
  StatusLegend,
  RecordsScreen,
  SearchScreen,
  PatientDetail,
  DocViewer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "mobile/records.jsx", error: String((e && e.message) || e) }); }

// mobile/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "mobile/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// mobile/ui.jsx
try { (() => {
// ScandexPRO Mobile — Theme, Icons, Primitives, Phone Shell
// Brand/data source: sdx-joao/ScandexGed + sdx-joao/Sdx-Mobile

// ── Theme (from Sdx-Mobile/src/theme/colors.ts + web globals.css) ──────────
const T = {
  primary: '#0728CA',
  primaryDark: '#051E9B',
  primaryFg: '#FFFFFF',
  teal: '#0F9488',
  bg: '#F5F7FB',
  surface: '#FFFFFF',
  surfaceMuted: '#F1F5FB',
  text: '#0F172A',
  textSoft: '#334155',
  muted: '#64748B',
  faint: '#94A3B8',
  border: '#E2E8F2',
  borderStrong: '#D8E0EF',
  danger: '#DC2626',
  dangerSoft: '#FEE2E2',
  font: "'Inter', system-ui, -apple-system, sans-serif"
};

// Work-order status — labels + tones (mobile STATUS_LABEL + statusColors)
const WO_STATUS = {
  open: {
    label: 'Aberta',
    solid: '#2563EB',
    soft: '#EAF1FE',
    fg: '#1D4ED8'
  },
  in_progress: {
    label: 'Em andamento',
    solid: '#CA8A04',
    soft: '#FEF7E0',
    fg: '#A16207'
  },
  waiting: {
    label: 'Aguardando',
    solid: '#EA580C',
    soft: '#FEEFE4',
    fg: '#C2410C'
  },
  delivered: {
    label: 'Entregue',
    solid: '#059669',
    soft: '#E6F6EF',
    fg: '#047857'
  },
  completed: {
    label: 'Concluída',
    solid: '#059669',
    soft: '#E6F6EF',
    fg: '#047857'
  },
  cancelled: {
    label: 'Cancelada',
    solid: '#DC2626',
    soft: '#FDECEC',
    fg: '#B91C1C'
  }
};
const WO_PRIORITY = {
  low: {
    label: 'Baixa',
    color: '#64748B',
    soft: '#EEF2F7'
  },
  normal: {
    label: 'Normal',
    color: '#2563EB',
    soft: '#EAF1FE'
  },
  high: {
    label: 'Alta',
    color: '#EA580C',
    soft: '#FEEFE4'
  },
  urgent: {
    label: 'Urgente',
    color: '#DC2626',
    soft: '#FDECEC'
  }
};

// Inventory primary types
const INV_TYPE = {
  EQUIPAMENTO: {
    label: 'Equipamento',
    short: 'Equip.',
    icon: 'monitor'
  },
  PERIFERICO: {
    label: 'Periférico',
    short: 'Perif.',
    icon: 'mouse'
  },
  FERRAMENTA: {
    label: 'Ferramenta',
    short: 'Ferr.',
    icon: 'wrench'
  },
  MATERIAL: {
    label: 'Material',
    short: 'Mat.',
    icon: 'cable'
  },
  SUPRIMENTO: {
    label: 'Suprimento',
    short: 'Supr.',
    icon: 'package'
  }
};

// Stock status tones (getStockStatus logic)
const STOCK_TONE = {
  funcionando: {
    label: 'Funcionando',
    solid: '#2563EB',
    soft: '#EAF1FE',
    fg: '#1D4ED8'
  },
  manutencao: {
    label: 'Manutenção',
    solid: '#CA8A04',
    soft: '#FEF7E0',
    fg: '#A16207'
  },
  defeito: {
    label: 'Não funcionando',
    solid: '#DC2626',
    soft: '#FDECEC',
    fg: '#B91C1C'
  },
  baixado: {
    label: 'Baixado',
    solid: '#64748B',
    soft: '#EEF2F7',
    fg: '#475569'
  },
  normal: {
    label: 'Normal',
    solid: '#059669',
    soft: '#E6F6EF',
    fg: '#047857'
  },
  atencao: {
    label: 'Atenção',
    solid: '#CA8A04',
    soft: '#FEF7E0',
    fg: '#A16207'
  },
  baixo: {
    label: 'Baixo',
    solid: '#DC2626',
    soft: '#FDECEC',
    fg: '#B91C1C'
  }
};
const MOVE_TONE = {
  in: {
    label: 'Entrada',
    color: '#059669',
    icon: 'arrow-down-circle'
  },
  out: {
    label: 'Saída',
    color: '#DC2626',
    icon: 'arrow-up-circle'
  },
  adjustment: {
    label: 'Ajuste',
    color: '#CA8A04',
    icon: 'refresh'
  },
  transfer: {
    label: 'Transferência',
    color: '#2563EB',
    icon: 'shuffle'
  }
};

// ── Icons (Lucide-style stroke paths) ──────────────────────────────────────
const ICONS = {
  home: 'M3 9.5L12 3l9 6.5M5 9.5V20a1 1 0 001 1h12a1 1 0 001-1V9.5',
  clipboard: 'M9 4h6a1 1 0 011 1v1h1a2 2 0 012 2v11a2 2 0 01-2 2H7a2 2 0 01-2-2V8a2 2 0 012-2h1V5a1 1 0 011-1zM9 4a1 1 0 001 1h4a1 1 0 001-1',
  package: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12l8.73-5.04M12 22.08V12',
  user: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M16 7a4 4 0 11-8 0 4 4 0 018 0z',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35',
  plus: 'M12 5v14M5 12h14',
  bell: 'M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0',
  'chevron-right': 'M9 18l6-6-6-6',
  'chevron-left': 'M15 18l-6-6 6-6',
  'arrow-left': 'M19 12H5M12 19l-7-7 7-7',
  filter: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
  'map-pin': 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M15 10a3 3 0 11-6 0 3 3 0 016 0z',
  wrench: 'M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.7-.4-.4-2.7 2.5-2.5z',
  clock: 'M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2',
  alert: 'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01',
  check: 'M20 6L9 17l-5-5',
  'check-circle': 'M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3',
  truck: 'M1 3h15v13H1zM16 8h4l3 3v5h-7 M5.5 18.5a2 2 0 100-4 2 2 0 000 4z M18.5 18.5a2 2 0 100-4 2 2 0 000 4z',
  box: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z',
  archive: 'M21 8v13H3V8M1 3h22v5H1zM10 12h4',
  'arrow-up-circle': 'M12 22a10 10 0 100-20 10 10 0 000 20zM16 12l-4-4-4 4M12 16V8',
  'arrow-down-circle': 'M12 22a10 10 0 100-20 10 10 0 000 20zM8 12l4 4 4-4M12 8v8',
  refresh: 'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15',
  shuffle: 'M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5',
  camera: 'M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 17a4 4 0 100-8 4 4 0 000 8z',
  qr: 'M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h3v3h-3zM21 21v.01M21 15v3M15 21h3',
  phone: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z',
  tag: 'M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01',
  layers: 'M12 2l10 6-10 6L2 8l10-6z M2 16l10 6 10-6 M2 12l10 6 10-6',
  history: 'M3 3v5h5 M3.05 13A9 9 0 106 5.3L3 8 M12 7v5l4 2',
  cpu: 'M4 4h16v16H4zM9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3',
  monitor: 'M2 3h20v14H2zM8 21h8M12 17v4',
  mouse: 'M5 9a7 7 0 0114 0v6a7 7 0 01-14 0zM12 5v4',
  cable: 'M4 9a2 2 0 012-2h2v6a2 2 0 002 2h4a2 2 0 002-2V7h2a2 2 0 012 2 M4 9v6a2 2 0 002 2M20 9v6a2 2 0 01-2 2',
  x: 'M18 6L6 18M6 6l12 12',
  calendar: 'M3 4h18v18H3zM3 10h18M8 2v4M16 2v4',
  building: 'M3 21h18M5 21V7l8-4v18M19 21V11l-6-3M9 9v.01M9 12v.01M9 15v.01M9 18v.01',
  hash: 'M4 9h16M4 15h16M10 3L8 21M16 3l-2 18',
  cart: 'M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2zM1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6',
  'trending-up': 'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6',
  'more-vertical': 'M12 13a1 1 0 100-2 1 1 0 000 2zM12 6a1 1 0 100-2 1 1 0 000 2zM12 20a1 1 0 100-2 1 1 0 000 2z',
  send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
  zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  sliders: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
  logout: 'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9',
  whatsapp: 'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z',
  flame: 'M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z',
  scan: 'M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2M7 12h10',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  download: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3',
  'file-text': 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8',
  image: 'M3 3h18v18H3zM8.5 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM21 15l-5-5L5 21',
  'zoom-in': 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35M11 8v6M8 11h6',
  'zoom-out': 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35M8 11h6',
  maximize: 'M8 3H5a2 2 0 00-2 2v3M21 8V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3M16 21h3a2 2 0 002-2v-3',
  share: 'M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13',
  flag: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7',
  edit: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4z',
  trash: 'M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6',
  droplet: 'M12 2.69l5.66 5.66a8 8 0 11-11.31 0z',
  paperclip: 'M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48',
  'chevron-left-double': 'M11 17l-5-5 5-5M18 17l-5-5 5-5',
  'first-page': 'M11 17l-5-5 5-5M17 17V7',
  idcard: 'M2 4h20v16H2zM6 9h4M6 13h2M14 8h4M14 12h4M14 16h4M6 16a2 2 0 014 0'
};
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
  style = {}
}) {
  const d = ICONS[name];
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0,
      display: 'block',
      ...style
    }
  }, d && d.split(' M').map((seg, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: i === 0 ? seg : 'M' + seg
  })));
}

// ── Badge (pill with dot) ───────────────────────────────────────────────────
function Badge({
  tone,
  label,
  style: badgeStyle = 'soft',
  size = 'md',
  dot = true
}) {
  const compact = size === 'sm';
  if (badgeStyle === 'solid') {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: compact ? '2px 8px' : '3px 10px',
        borderRadius: 999,
        background: tone.solid,
        color: '#fff',
        fontSize: compact ? 10.5 : 11.5,
        fontWeight: 600,
        letterSpacing: 0.1,
        whiteSpace: 'nowrap',
        fontFamily: T.font
      }
    }, tone.label || label);
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: compact ? '2px 8px' : '3px 10px',
      borderRadius: 999,
      background: tone.soft,
      color: tone.fg || tone.solid,
      fontSize: compact ? 10.5 : 11.5,
      fontWeight: 600,
      letterSpacing: 0.1,
      whiteSpace: 'nowrap',
      fontFamily: T.font
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: tone.solid
    }
  }), tone.label || label);
}

// ── Filter chips row ────────────────────────────────────────────────────────
function ChipRow({
  chips,
  active,
  onPick,
  accent
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      padding: '0 16px 2px',
      scrollbarWidth: 'none',
      WebkitOverflowScrolling: 'touch'
    }
  }, chips.map(c => {
    const on = active === c.key;
    return /*#__PURE__*/React.createElement("button", {
      key: c.key,
      onClick: () => onPick(c.key),
      style: {
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '7px 13px',
        borderRadius: 999,
        cursor: 'pointer',
        border: `1px solid ${on ? accent : T.border}`,
        background: on ? accent : T.surface,
        color: on ? '#fff' : T.textSoft,
        fontSize: 12.5,
        fontWeight: 600,
        fontFamily: T.font,
        whiteSpace: 'nowrap',
        transition: 'all .15s'
      }
    }, c.label, c.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        padding: '0 5px',
        borderRadius: 999,
        minWidth: 16,
        background: on ? 'rgba(255,255,255,.25)' : T.surfaceMuted,
        color: on ? '#fff' : T.muted
      }
    }, c.count));
  }));
}

// ── Search field ────────────────────────────────────────────────────────────
function SearchField({
  value,
  onChange,
  placeholder
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 12px',
      height: 42,
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 17,
    color: T.faint
  }), /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: e => onChange(e.target.value),
    placeholder: placeholder,
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontSize: 14,
      fontFamily: T.font,
      color: T.text
    }
  }), value && /*#__PURE__*/React.createElement("button", {
    onClick: () => onChange(''),
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: 2,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 15,
    color: T.faint
  })));
}

// ── Phone shell (custom ScandexPRO frame) ───────────────────────────────────
function StatusBar({
  dark
}) {
  const c = dark ? '#fff' : T.text;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 18px 0 22px',
      position: 'relative',
      flexShrink: 0,
      background: 'transparent'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 600,
      color: c,
      fontFamily: T.font,
      letterSpacing: 0.2
    }
  }, "9:41"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12",
    fill: c
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7",
    width: "3",
    height: "5",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.5",
    y: "4.5",
    width: "3",
    height: "7.5",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "2",
    width: "3",
    height: "10",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13.5",
    y: "0",
    width: "3",
    height: "12",
    rx: "1"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "12",
    viewBox: "0 0 16 12",
    fill: c
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 2.2c2 0 3.8.8 5.1 2.1l1.1-1.2A9 9 0 0 0 8 .5 9 9 0 0 0 1.8 3.1l1.1 1.2A7.2 7.2 0 0 1 8 2.2zM8 5.6c1.1 0 2.1.4 2.8 1.2l1.1-1.2A5.7 5.7 0 0 0 8 4a5.7 5.7 0 0 0-3.9 1.6l1.1 1.2A4 4 0 0 1 8 5.6zM8 9l1.9-2A2.7 2.7 0 0 0 8 6.4 2.7 2.7 0 0 0 6.1 7z"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "25",
    height: "12",
    viewBox: "0 0 25 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.7",
    y: "0.7",
    width: "21",
    height: "10.6",
    rx: "2.7",
    stroke: c,
    strokeOpacity: "0.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2.2",
    y: "2.2",
    width: "16",
    height: "7.6",
    rx: "1.5",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "23",
    y: "4",
    width: "1.5",
    height: "4",
    rx: "0.75",
    fill: c,
    fillOpacity: "0.5"
  }))));
}
function PhoneFrame({
  children,
  dark,
  statusDark
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 390,
      height: 844,
      borderRadius: 46,
      padding: 5,
      flexShrink: 0,
      background: 'linear-gradient(150deg,#2b3550,#0c1326)',
      boxShadow: '0 40px 90px -20px rgba(15,23,42,.55), 0 0 0 1px rgba(255,255,255,.04)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      borderRadius: 41,
      overflow: 'hidden',
      background: dark ? '#0B1020' : T.bg,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(StatusBar, {
    dark: statusDark
  })), children));
}
Object.assign(window, {
  T,
  WO_STATUS,
  WO_PRIORITY,
  INV_TYPE,
  STOCK_TONE,
  MOVE_TONE,
  Icon,
  Badge,
  ChipRow,
  SearchField,
  PhoneFrame,
  StatusBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "mobile/ui.jsx", error: String((e && e.message) || e) }); }

// mobile/workorders.jsx
try { (() => {
// ScandexPRO Mobile — Ordens de Serviço module

function MetaRow({
  icon,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 14,
    color: T.faint
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: T.muted,
      fontFamily: T.font,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, children));
}
function SourceMark({
  source
}) {
  if (source === 'whatsapp') return /*#__PURE__*/React.createElement(Icon, {
    name: "whatsapp",
    size: 14,
    color: "#16A34A"
  });
  if (source === 'external') return /*#__PURE__*/React.createElement(Icon, {
    name: "send",
    size: 13,
    color: T.faint
  });
  return null;
}

// ── WO Card ─────────────────────────────────────────────────────────────────
function WOCard({
  wo,
  cfg,
  onOpen
}) {
  const st = WO_STATUS[wo.status];
  const pr = WO_PRIORITY[wo.priority];
  const overdue = wo.expectedCompletionAt && new Date(wo.expectedCompletionAt) < new Date('2025-06-09T10:00:00') && wo.status !== 'completed' && wo.status !== 'delivered' && wo.status !== 'cancelled';
  const pad = cfg.density === 'compact' ? 12 : 14;
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpen(wo),
    style: {
      width: '100%',
      textAlign: 'left',
      cursor: 'pointer',
      display: 'block',
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderLeft: `3px solid ${pr.color}`,
      borderRadius: 14,
      padding: pad,
      boxShadow: cfg.cardStyle === 'elevated' ? '0 1px 3px rgba(15,23,42,.06), 0 6px 16px -8px rgba(15,23,42,.12)' : 'none',
      fontFamily: T.font,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: cfg.accent,
      letterSpacing: 0.2
    }
  }, wo.code), /*#__PURE__*/React.createElement(SourceMark, {
    source: wo.source
  })), /*#__PURE__*/React.createElement(Badge, {
    tone: st,
    style: cfg.badgeStyle
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      color: T.text,
      marginBottom: 3,
      lineHeight: 1.3
    }
  }, wo.serviceType), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: T.faint,
      marginBottom: 10
    }
  }, wo.category), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(MetaRow, {
    icon: "building"
  }, wo.department, " \xB7 ", wo.unitName.replace('Hospital do Olho — ', 'HO ')), /*#__PURE__*/React.createElement(MetaRow, {
    icon: "user"
  }, wo.responsibleTechnicianName || 'Não atribuída')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 11,
      paddingTop: 10,
      borderTop: `1px solid ${T.surfaceMuted}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 11.5,
      fontWeight: 600,
      color: pr.color
    }
  }, wo.priority === 'urgent' && /*#__PURE__*/React.createElement(Icon, {
    name: "flame",
    size: 13,
    color: pr.color
  }), pr.label), wo.escalationCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      fontSize: 11,
      fontWeight: 600,
      color: '#C2410C'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trending-up",
    size: 12,
    color: "#C2410C"
  }), " Escalada")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 11.5,
      color: overdue ? T.danger : T.faint,
      fontWeight: overdue ? 600 : 400
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 12,
    color: overdue ? T.danger : T.faint
  }), overdue ? 'Atrasada' : wo.status === 'completed' || wo.status === 'delivered' ? fmtTime(wo.finishedAt) : `Prev. ${fmtTime(wo.expectedCompletionAt)}`)));
}

// ── WO List screen ──────────────────────────────────────────────────────────
function WorkOrdersScreen({
  cfg,
  onOpen,
  onNew
}) {
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState('all');
  const counts = React.useMemo(() => {
    const c = {
      all: WORK_ORDERS.length
    };
    WORK_ORDERS.forEach(w => {
      c[w.status] = (c[w.status] || 0) + 1;
    });
    return c;
  }, []);
  const chips = [{
    key: 'all',
    label: 'Todas',
    count: counts.all
  }, {
    key: 'open',
    label: 'Abertas',
    count: counts.open
  }, {
    key: 'in_progress',
    label: 'Em andamento',
    count: counts.in_progress
  }, {
    key: 'waiting',
    label: 'Aguardando',
    count: counts.waiting
  }, {
    key: 'completed',
    label: 'Concluídas',
    count: counts.completed
  }];
  const list = WORK_ORDERS.filter(w => {
    if (filter !== 'all' && w.status !== filter) return false;
    if (q) {
      const t = (w.code + w.serviceType + w.department + (w.responsibleTechnicianName || '') + w.requestedByName).toLowerCase();
      if (!t.includes(q.toLowerCase())) return false;
    }
    return true;
  });
  return /*#__PURE__*/React.createElement(ModuleScreen, {
    cfg: cfg,
    title: "Ordens de Servi\xE7o",
    subtitle: `${WO_STATS.activeNow} ativas · ${WO_STATS.openedToday} abertas hoje`,
    onNew: onNew,
    newLabel: "Nova OS"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 16px 12px'
    }
  }, /*#__PURE__*/React.createElement(SearchField, {
    value: q,
    onChange: setQ,
    placeholder: "Buscar por c\xF3digo, setor, t\xE9cnico\u2026"
  })), /*#__PURE__*/React.createElement(ChipRow, {
    chips: chips,
    active: filter,
    onPick: setFilter,
    accent: cfg.accent
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 24px'
    }
  }, list.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    icon: "clipboard",
    text: "Nenhuma ordem encontrada."
  }) : list.map(wo => /*#__PURE__*/React.createElement(WOCard, {
    key: wo.id,
    wo: wo,
    cfg: cfg,
    onOpen: onOpen
  }))));
}

// ── WO Detail screen ────────────────────────────────────────────────────────
function StatItem({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: T.faint,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 0.4,
      marginBottom: 3
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: T.text,
      fontWeight: 500,
      lineHeight: 1.35
    }
  }, children));
}
function SectionCard({
  title,
  action,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      padding: 14,
      marginBottom: 12
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: T.text,
      letterSpacing: 0.2
    }
  }, title), action), children);
}
function WorkOrderDetail({
  wo,
  cfg,
  onBack
}) {
  const [status, setStatus] = React.useState(wo.status);
  const st = WO_STATUS[status];
  const pr = WO_PRIORITY[wo.priority];
  const timeline = WO_TIMELINE[wo.id];
  const flow = ['open', 'in_progress', 'waiting', 'completed'];
  return /*#__PURE__*/React.createElement(DetailScaffold, {
    cfg: cfg,
    onBack: onBack,
    eyebrow: wo.code,
    title: wo.serviceType,
    badge: /*#__PURE__*/React.createElement(Badge, {
      tone: st,
      style: "solid"
    }),
    headerExtra: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginTop: 10,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 12.5,
        fontWeight: 600,
        color: '#fff',
        background: 'rgba(255,255,255,.16)',
        padding: '4px 10px',
        borderRadius: 999
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: pr.color
      }
    }), " Prioridade ", pr.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        color: 'rgba(255,255,255,.75)'
      }
    }, wo.category))
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "Atualizar status"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 7,
      overflowX: 'auto',
      scrollbarWidth: 'none',
      paddingBottom: 2
    }
  }, flow.map(s => {
    const on = status === s;
    const tone = WO_STATUS[s];
    return /*#__PURE__*/React.createElement("button", {
      key: s,
      onClick: () => setStatus(s),
      style: {
        flexShrink: 0,
        padding: '8px 13px',
        borderRadius: 10,
        cursor: 'pointer',
        border: `1px solid ${on ? tone.solid : T.border}`,
        background: on ? tone.soft : T.surface,
        color: on ? tone.fg : T.muted,
        fontSize: 12.5,
        fontWeight: 600,
        fontFamily: T.font,
        whiteSpace: 'nowrap'
      }
    }, tone.label);
  })), status !== wo.status && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 11,
      fontSize: 12,
      color: T.muted,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle",
    size: 14,
    color: cfg.accent
  }), "Novo status pronto para registrar (demo).")), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Solicita\xE7\xE3o"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(StatItem, {
    label: "Unidade"
  }, wo.unitName), /*#__PURE__*/React.createElement(StatItem, {
    label: "Setor"
  }, wo.department), /*#__PURE__*/React.createElement(StatItem, {
    label: "Solicitante"
  }, wo.requestedByName), /*#__PURE__*/React.createElement(StatItem, {
    label: "Contato"
  }, wo.requesterContact || '—'), /*#__PURE__*/React.createElement(StatItem, {
    label: "Abertura"
  }, fmtDate(wo.openedAt), " \xB7 ", fmtTime(wo.openedAt)), /*#__PURE__*/React.createElement(StatItem, {
    label: "Previs\xE3o"
  }, wo.expectedCompletionAt ? `${fmtDate(wo.expectedCompletionAt)} · ${fmtTime(wo.expectedCompletionAt)}` : '—')), wo.requesterContact && /*#__PURE__*/React.createElement("button", {
    style: {
      marginTop: 14,
      width: '100%',
      height: 42,
      borderRadius: 11,
      cursor: 'pointer',
      border: `1px solid ${T.border}`,
      background: T.surface,
      color: T.textSoft,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      fontSize: 13.5,
      fontWeight: 600,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: wo.source === 'whatsapp' ? 'whatsapp' : 'phone',
    size: 16,
    color: wo.source === 'whatsapp' ? '#16A34A' : cfg.accent
  }), "Contatar solicitante")), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Atendimento"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(StatItem, {
    label: "Respons\xE1vel"
  }, wo.responsibleTechnicianName || 'Não atribuída'), /*#__PURE__*/React.createElement(StatItem, {
    label: "Equipe"
  }, wo.technicalTeam || '—'), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: T.faint,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 0.4,
      marginBottom: 5
    }
  }, "Observa\xE7\xF5es"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: T.textSoft,
      lineHeight: 1.5,
      background: T.surfaceMuted,
      borderRadius: 10,
      padding: 11
    }
  }, wo.attendanceNotes || 'Sem observações registradas.')))), wo.materials.length > 0 && /*#__PURE__*/React.createElement(SectionCard, {
    title: `Materiais (${wo.materials.length})`
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, wo.materials.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 8,
      background: T.surfaceMuted,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "box",
    size: 15,
    color: T.muted
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: T.text,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, m.description)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: T.textSoft,
      flexShrink: 0
    }
  }, m.quantity, " ", m.unit))))), timeline && /*#__PURE__*/React.createElement(SectionCard, {
    title: "Hist\xF3rico"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, timeline.map((ev, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: WO_STATUS[ev.tone].solid,
      marginTop: 4
    }
  }), i < timeline.length - 1 && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 2,
      flex: 1,
      background: T.border,
      margin: '2px 0'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: i < timeline.length - 1 ? 14 : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: T.text,
      fontWeight: 500
    }
  }, ev.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: T.faint,
      marginTop: 1
    }
  }, ev.at, " \xB7 ", ev.by)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8
    }
  }));
}

// ── New WO (simple form) ────────────────────────────────────────────────────
function FieldLabel({
  children,
  required
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      color: T.textSoft,
      marginBottom: 6
    }
  }, children, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.danger
    }
  }, " *"));
}
function FakeInput({
  placeholder,
  value,
  chevron
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      borderRadius: 11,
      border: `1px solid ${T.border}`,
      background: T.surface,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 13px',
      fontSize: 14,
      color: value ? T.text : T.faint,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, value || placeholder), chevron && /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 16,
    color: T.faint,
    style: {
      transform: 'rotate(90deg)'
    }
  }));
}
function NewWorkOrder({
  cfg,
  onBack
}) {
  const [priority, setPriority] = React.useState('normal');
  return /*#__PURE__*/React.createElement(DetailScaffold, {
    cfg: cfg,
    onBack: onBack,
    eyebrow: "Nova ordem",
    title: "Abrir OS",
    compact: true
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "Detalhes do servi\xE7o"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, {
    required: true
  }, "Tipo de servi\xE7o"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "Selecionar tipo",
    chevron: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "Categoria"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "Selecionar categoria",
    chevron: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, {
    required: true
  }, "Unidade"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "Unidade",
    value: "HO \u2014 JCB",
    chevron: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, {
    required: true
  }, "Setor"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "Setor",
    chevron: true
  }))))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Prioridade"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, Object.entries(WO_PRIORITY).map(([k, p]) => {
    const on = priority === k;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => setPriority(k),
      style: {
        flex: 1,
        padding: '9px 4px',
        borderRadius: 11,
        cursor: 'pointer',
        border: `1.5px solid ${on ? p.color : T.border}`,
        background: on ? p.soft : T.surface,
        color: on ? p.color : T.muted,
        fontSize: 12,
        fontWeight: 600,
        fontFamily: T.font
      }
    }, p.label);
  }))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Solicitante"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, {
    required: true
  }, "Nome"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "Quem solicitou",
    chevron: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "Contato"), /*#__PURE__*/React.createElement(FakeInput, {
    placeholder: "(85) 9 0000-0000"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, null, "Descri\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 86,
      borderRadius: 11,
      border: `1px solid ${T.border}`,
      background: T.surface,
      padding: 12,
      fontSize: 14,
      color: T.faint,
      fontFamily: T.font
    }
  }, "Descreva o problema ou a solicita\xE7\xE3o\u2026")))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Anexos"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      flex: 1,
      height: 76,
      borderRadius: 12,
      border: `1.5px dashed ${T.borderStrong}`,
      background: T.surfaceMuted,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      cursor: 'pointer',
      color: T.muted,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "camera",
    size: 20,
    color: cfg.accent
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 600
    }
  }, "Foto")), /*#__PURE__*/React.createElement("button", {
    style: {
      flex: 1,
      height: 76,
      borderRadius: 12,
      border: `1.5px dashed ${T.borderStrong}`,
      background: T.surfaceMuted,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      cursor: 'pointer',
      color: T.muted,
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "scan",
    size: 20,
    color: cfg.accent
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 600
    }
  }, "Escanear ativo")))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      width: '100%',
      height: 50,
      borderRadius: 14,
      border: 'none',
      cursor: 'pointer',
      background: cfg.accent,
      color: '#fff',
      fontSize: 15,
      fontWeight: 700,
      fontFamily: T.font,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      boxShadow: `0 8px 20px -6px ${cfg.accent}66`
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 18,
    color: "#fff"
  }), " Abrir ordem de servi\xE7o"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 12
    }
  }));
}
Object.assign(window, {
  WorkOrdersScreen,
  WorkOrderDetail,
  NewWorkOrder,
  MetaRow,
  StatItem,
  SectionCard,
  FieldLabel,
  FakeInput
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "mobile/workorders.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scandexpro/Components.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// ScandexPRO UI Kit — Shared Primitives
// Exported to window for use by other components

const SDX_COLORS = {
  primary: '#245594',
  primaryDark: '#1b3f6e',
  teal: '#4DB6AC',
  white: '#ffffff',
  bg: '#f4f7fc',
  card: '#ffffff',
  border: '#dce8f5',
  muted: '#f4f7fc',
  mutedFg: '#8a9db8',
  fg: '#1e2d42',
  destructive: 'hsl(0, 84.2%, 60.2%)'
};

// ── Button ────────────────────────────────────────────────────
const SDXButton = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled,
  style = {},
  className = ''
}) => {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: '1px solid transparent',
    borderRadius: 8,
    transition: 'all 0.15s',
    opacity: disabled ? 0.5 : 1,
    padding: size === 'sm' ? '5px 12px' : size === 'lg' ? '10px 20px' : '8px 16px',
    fontSize: size === 'sm' ? 12 : 13
  };
  const variants = {
    primary: {
      background: SDX_COLORS.primary,
      color: '#fff'
    },
    destructive: {
      background: SDX_COLORS.destructive,
      color: '#fff'
    },
    outline: {
      background: '#fff',
      color: SDX_COLORS.fg,
      borderColor: SDX_COLORS.border
    },
    ghost: {
      background: 'transparent',
      color: SDX_COLORS.fg
    },
    secondary: {
      background: SDX_COLORS.muted,
      color: SDX_COLORS.fg
    },
    accent: {
      background: SDX_COLORS.teal,
      color: '#fff'
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    style: {
      ...base,
      ...variants[variant],
      ...style
    },
    onClick: onClick,
    disabled: disabled
  }, children);
};

// ── Input ─────────────────────────────────────────────────────
const SDXInput = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    marginBottom: 12
  }
}, label && /*#__PURE__*/React.createElement("label", {
  style: {
    display: 'block',
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 4,
    color: SDX_COLORS.fg
  }
}, label), /*#__PURE__*/React.createElement("input", {
  type: type,
  placeholder: placeholder,
  value: value,
  onChange: onChange,
  style: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '8px 10px',
    background: '#e5e7eb',
    border: `1px solid ${error ? SDX_COLORS.destructive : '#9ca3af'}`,
    borderRadius: 6,
    fontSize: 13,
    fontFamily: 'Inter, sans-serif',
    color: '#111827',
    outline: 'none'
  }
}), error && /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11,
    color: SDX_COLORS.destructive,
    marginTop: 3
  }
}, error));

// ── Badge ─────────────────────────────────────────────────────
const ROLE_STYLES = {
  SuperAdministrador: {
    background: '#fef3c7',
    color: '#92400e',
    border: '1px solid #fcd34d'
  },
  Admin: {
    background: '#ede9fe',
    color: '#5b21b6',
    border: '1px solid #c4b5fd'
  },
  Gerente: {
    background: '#d1fae5',
    color: '#065f46',
    border: '1px solid #6ee7b7'
  },
  User: {
    background: '#dbeafe',
    color: '#1e40af',
    border: '1px solid #93c5fd'
  },
  Colaborador: {
    background: SDX_COLORS.muted,
    color: '#374151',
    border: `1px solid ${SDX_COLORS.border}`
  }
};
const ROLE_LABELS = {
  SuperAdministrador: 'Super Admin',
  Admin: 'Admin',
  Gerente: 'Gerente',
  User: 'Usuário',
  Colaborador: 'Colaborador'
};
const SDXRoleBadge = ({
  role
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 7px',
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '.05em',
    textTransform: 'uppercase',
    fontFamily: 'Inter, sans-serif',
    ...(ROLE_STYLES[role] || ROLE_STYLES.Colaborador)
  }
}, ROLE_LABELS[role] || role);
const SDXBadge = ({
  children,
  variant = 'secondary'
}) => {
  const styles = {
    secondary: {
      background: SDX_COLORS.muted,
      color: SDX_COLORS.fg
    },
    outline: {
      background: 'transparent',
      border: `1px solid ${SDX_COLORS.border}`,
      color: SDX_COLORS.fg
    },
    success: {
      background: '#d1fae5',
      color: '#065f46'
    },
    destructive: {
      background: SDX_COLORS.destructive,
      color: '#fff'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '2px 7px',
      borderRadius: 4,
      fontSize: 10,
      fontWeight: 600,
      fontFamily: 'Inter, sans-serif',
      ...styles[variant]
    }
  }, children);
};

// ── Card ──────────────────────────────────────────────────────
const SDXCard = ({
  children,
  style = {}
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    background: '#fff',
    borderRadius: 8,
    border: `1px solid ${SDX_COLORS.border}`,
    boxShadow: '0 4px 6px -1px rgb(0 0 0/.1), 0 2px 4px -2px rgb(0 0 0/.1)',
    overflow: 'hidden',
    ...style
  }
}, children);

// ── Status dot ────────────────────────────────────────────────
const STATUS_COLORS = {
  available: {
    bg: '#34d399',
    border: '#059669'
  },
  absent: {
    bg: '#f87171',
    border: '#dc2626'
  },
  missing_info: {
    bg: '#fb923c',
    border: '#ea580c'
  },
  processing: {
    bg: '#60a5fa',
    border: '#2563eb'
  },
  altered: {
    bg: '#facc15',
    border: '#ca8a04'
  }
};
const SDXStatusDot = ({
  status,
  size = 10
}) => {
  const c = STATUS_COLORS[status] || STATUS_COLORS.absent;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      flexShrink: 0,
      background: c.bg,
      border: `2px solid ${c.border}`,
      boxShadow: '0 1px 3px rgb(0 0 0/.2)'
    }
  });
};

// ── Avatar ────────────────────────────────────────────────────
const SDXAvatar = ({
  name = '',
  size = 32,
  src
}) => {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'U';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: 6,
      overflow: 'hidden',
      flexShrink: 0,
      background: 'rgba(7,42,200,0.15)',
      border: '1.5px solid rgba(7,42,200,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.35,
      fontWeight: 700,
      color: SDX_COLORS.primary
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials);
};

// ── Toast (simple inline) ─────────────────────────────────────
const SDXToast = ({
  title,
  desc,
  variant = 'default',
  onClose
}) => {
  const bg = variant === 'destructive' ? '#fef2f2' : variant === 'accent' ? '#f0fdf4' : '#fff';
  const border = variant === 'destructive' ? '#fca5a5' : variant === 'accent' ? '#86efac' : SDX_COLORS.border;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 999,
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: 10,
      padding: '12px 16px',
      boxShadow: '0 10px 25px rgb(0 0 0/.15)',
      minWidth: 260,
      maxWidth: 360,
      fontFamily: 'Inter, sans-serif'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: SDX_COLORS.fg
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: 16,
      color: SDX_COLORS.mutedFg,
      lineHeight: 1
    }
  }, "\xD7")), desc && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: SDX_COLORS.mutedFg,
      marginTop: 3
    }
  }, desc));
};

// ── Lucide-like SVG Icons ─────────────────────────────────────
const Icon = ({
  path,
  size = 16,
  color = 'currentColor',
  ...paths
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, path && /*#__PURE__*/React.createElement("path", {
  d: path
}), Object.entries(paths).map(([tag, d], i) => {
  if (tag === 'circle') return /*#__PURE__*/React.createElement("circle", _extends({
    key: i
  }, d));
  if (tag === 'line') return /*#__PURE__*/React.createElement("line", _extends({
    key: i
  }, d));
  if (tag === 'polyline') return /*#__PURE__*/React.createElement("polyline", {
    key: i,
    points: d
  });
  if (tag === 'rect') return /*#__PURE__*/React.createElement("rect", _extends({
    key: i
  }, d));
  return /*#__PURE__*/React.createElement("path", {
    key: i,
    d: d
  });
}));

// Export to window
Object.assign(window, {
  SDX_COLORS,
  SDXButton,
  SDXInput,
  SDXCard,
  SDXRoleBadge,
  SDXBadge,
  SDXStatusDot,
  SDXAvatar,
  SDXToast,
  Icon,
  ROLE_LABELS,
  ROLE_STYLES,
  STATUS_COLORS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scandexpro/Components.jsx", error: String((e && e.message) || e) }); }

// uploads/Landing Page ScandexPlus/design-canvas.jsx
try { (() => {
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Artboards are reorderable (grip-drag), labels/titles are inline-editable,
// and any artboard can be opened in a fullscreen focus overlay (←/→/Esc).
// State persists to a .design-canvas.state.json sidecar via the host
// bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}', '.dc-card{transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px}', '.dc-grip{cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{cursor:pointer;border-radius:4px;padding:3px 6px;display:flex;align-items:center;transition:background .12s}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-expand{position:absolute;bottom:100%;right:0;margin-bottom:5px;z-index:2;opacity:0;transition:opacity .12s,background .12s;', '  width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center}', '.dc-expand:hover{background:rgba(0,0,0,.06);color:#2a251f}', '[data-dc-slot]:hover .dc-expand{opacity:1}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, focused
// artboard). Order/titles/labels persist to a .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Only direct DCSection > DCArtboard children are
  // walked — wrapping them in other elements opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  React.Children.forEach(children, sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const srcIds = [];
    React.Children.forEach(sec.props.children, ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (!aid) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if (e.ctrlKey) {
        // trackpad pinch (or explicit ctrl+wheel)
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(children);
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const srcOrder = artboards.map(a => a.props.id ?? a.props.label);
  const sec = ctx && sid && ctx.section(sid) || {};
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 80,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px 56px'
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow",
    style: {
      position: 'absolute',
      bottom: '100%',
      left: -4,
      marginBottom: 4,
      color: DC.label
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    onPointerDown: e => e.stopPropagation(),
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    const ns = sectionOrder[(secIdx + d + sectionOrder.length) % sectionOrder.length];
    const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
    if (first) ctx.setFocus(`${ns}/${first}`);
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "uploads/Landing Page ScandexPlus/design-canvas.jsx", error: String((e && e.message) || e) }); }

// uploads/Landing Page ScandexPlus/download/tweaks-panel.jsx
try { (() => {
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;width:100%;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;

  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}
function TweakColor({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
    type: "color",
    className: "twk-swatch",
    value: value,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "uploads/Landing Page ScandexPlus/download/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// uploads/Landing Page ScandexPlus/ios-frame.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports (to window): IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard
//
// Usage — wrap your screen content in <IOSDevice> to get the bezel, status bar
// and home indicator (props: title, dark, keyboard):
//
//   <IOSDevice title="Settings">
//     ...your screen content...
//   </IOSDevice>
//   <IOSDevice dark title="Search" keyboard>…</IOSDevice>
/* END USAGE */

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 48,
      overflow: 'hidden',
      position: 'relative',
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 126,
      height: 37,
      borderRadius: 24,
      background: '#000',
      zIndex: 50
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(IOSStatusBar, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
    title: title,
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      height: 34,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingBottom: 8,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 139,
      height: 5,
      borderRadius: 100,
      background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
    }
  })));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "uploads/Landing Page ScandexPlus/ios-frame.jsx", error: String((e && e.message) || e) }); }

// uploads/Landing Page ScandexPlus/tweaks-panel.jsx
try { (() => {
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;width:100%;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;

  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}
function TweakColor({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
    type: "color",
    className: "twk-swatch",
    value: value,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "uploads/Landing Page ScandexPlus/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// uploads/Landing Page ScandexPlus/v1-editorial.jsx
try { (() => {
// V1 — Editorial Minimalist
// Bold oversized type, lots of white, the arrow-plus glyph as a punctuation mark.
// Design pillars: refinement, generous whitespace, single-color discipline.

const V1_INK = '#1F2937';
const V1_INK_SOFT = '#6B7280';
const V1_LINE = '#E5E7EB';
const V1_BLUE = '#3B7BA8'; // submarca blue (primary accent)
const V1_BLUE_LIGHT = '#9CC8D6'; // logo principal blue
const V1_PAPER = '#FAFAF7'; // off-white paper

// The arrow+ glyph — the brand's defining signature, used everywhere as punctuation
const ArrowPlus = ({
  size = 24,
  color = V1_BLUE,
  style
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size * 0.55,
  viewBox: "0 0 100 55",
  fill: "none",
  style: style
}, /*#__PURE__*/React.createElement("path", {
  d: "M2 38 Q 22 50, 50 32 L 60 28 L 56 22 L 64 24 L 66 16 L 68 24 L 76 22 L 70 28 L 76 36 L 68 30 Z",
  fill: color,
  opacity: "0"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 36 Q 25 50, 52 30",
  stroke: color,
  strokeWidth: "3.5",
  strokeLinecap: "round",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M52 30 L 44 28 M52 30 L 50 22",
  stroke: color,
  strokeWidth: "3.5",
  strokeLinecap: "round",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M70 14 L 70 36 M 60 25 L 80 25",
  stroke: color,
  strokeWidth: "3.5",
  strokeLinecap: "round",
  fill: "none"
}));

// Simple word-mark recreated — uses the brand "scandex+" feel without leaning on the raster
const Wordmark = ({
  color = V1_INK,
  size = 28
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: size * 0.25,
    fontFamily: '"Sora", system-ui',
    fontWeight: 700,
    fontSize: size,
    letterSpacing: '-0.02em',
    color,
    lineHeight: 1
  }
}, /*#__PURE__*/React.createElement("span", null, "scandex"), /*#__PURE__*/React.createElement(ArrowPlus, {
  size: size * 1.1,
  color: color === V1_INK ? V1_BLUE : color,
  style: {
    marginBottom: -size * 0.1
  }
}));
const V1Nav = () => /*#__PURE__*/React.createElement("nav", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '32px 64px',
    borderBottom: `1px solid ${V1_LINE}`,
    position: 'sticky',
    top: 0,
    background: V1_PAPER,
    zIndex: 10
  }
}, /*#__PURE__*/React.createElement(Wordmark, {
  size: 24
}), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 40,
    fontFamily: 'Sora, system-ui',
    fontSize: 14,
    fontWeight: 500,
    color: V1_INK
  }
}, /*#__PURE__*/React.createElement("a", {
  style: {
    color: 'inherit',
    textDecoration: 'none'
  }
}, "Sobre"), /*#__PURE__*/React.createElement("a", {
  style: {
    color: 'inherit',
    textDecoration: 'none'
  }
}, "Servi\xE7os"), /*#__PURE__*/React.createElement("a", {
  style: {
    color: 'inherit',
    textDecoration: 'none'
  }
}, "Stack"), /*#__PURE__*/React.createElement("a", {
  style: {
    color: 'inherit',
    textDecoration: 'none'
  }
}, "Contato")), /*#__PURE__*/React.createElement("button", {
  style: {
    border: `1px solid ${V1_INK}`,
    background: V1_INK,
    color: V1_PAPER,
    padding: '12px 24px',
    borderRadius: 999,
    fontFamily: 'Sora, system-ui',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 8
  }
}, "Falar no WhatsApp", /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 16
  }
}, "\u2192")));
const V1Hero = () => /*#__PURE__*/React.createElement("section", {
  style: {
    padding: '120px 64px 100px',
    position: 'relative'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontFamily: 'Sora, system-ui',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: V1_INK_SOFT,
    marginBottom: 80
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    width: 32,
    height: 1,
    background: V1_INK_SOFT
  }
}), "Software house \xB7 Servi\xE7os digitais \xB7 Desde 2018"), /*#__PURE__*/React.createElement("h1", {
  style: {
    fontFamily: '"Fraunces", "Times New Roman", serif',
    fontWeight: 300,
    fontSize: 'clamp(72px, 11vw, 168px)',
    lineHeight: 0.92,
    letterSpacing: '-0.04em',
    color: V1_INK,
    margin: 0,
    textWrap: 'balance'
  }
}, "Gest\xE3o.", /*#__PURE__*/React.createElement("br", null), "Mem\xF3ria.", /*#__PURE__*/React.createElement("br", null), "Conformidade.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
  style: {
    fontStyle: 'italic',
    fontWeight: 300,
    color: V1_BLUE,
    position: 'relative'
  }
}, "Sob controle", /*#__PURE__*/React.createElement(ArrowPlus, {
  size: 120,
  color: V1_BLUE,
  style: {
    display: 'inline-block',
    marginLeft: 24,
    transform: 'translateY(-20px)'
  }
}))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 80,
    marginTop: 100,
    alignItems: 'start'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    gridColumn: '2 / 4',
    maxWidth: 640
  }
}, /*#__PURE__*/React.createElement("p", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 22,
    lineHeight: 1.45,
    color: V1_INK,
    fontWeight: 400,
    margin: 0,
    textWrap: 'pretty'
  }
}, "Transformamos arquivos, processos e rotinas em sistemas que sua equipe realmente usa.", /*#__PURE__*/React.createElement("span", {
  style: {
    color: V1_INK_SOFT
  }
}, " Software sob medida, digitaliza\xE7\xE3o documental e consultoria para quem precisa p\xF4r ordem na opera\xE7\xE3o.")), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 16,
    marginTop: 48
  }
}, /*#__PURE__*/React.createElement("button", {
  style: {
    background: V1_BLUE,
    color: 'white',
    border: 'none',
    padding: '18px 32px',
    borderRadius: 999,
    fontFamily: 'Sora, system-ui',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 10
  }
}, "Falar com a Scandex+", /*#__PURE__*/React.createElement("span", null, "\u2192")), /*#__PURE__*/React.createElement("button", {
  style: {
    background: 'transparent',
    color: V1_INK,
    border: `1px solid ${V1_INK}`,
    padding: '18px 32px',
    borderRadius: 999,
    fontFamily: 'Sora, system-ui',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer'
  }
}, "Ver servi\xE7os")))), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 140,
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    borderTop: `1px solid ${V1_LINE}`,
    borderBottom: `1px solid ${V1_LINE}`
  }
}, [['7+', 'anos digitalizando legados'], ['2.4M', 'documentos sob custódia'], ['43', 'clientes ativos no Brasil'], ['99.97%', 'uptime médio em 2025']].map(([n, l], i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  style: {
    padding: '40px 32px',
    borderRight: i < 3 ? `1px solid ${V1_LINE}` : 'none'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: '"Fraunces", serif',
    fontWeight: 300,
    fontSize: 56,
    letterSpacing: '-0.03em',
    color: V1_INK,
    lineHeight: 1
  }
}, n), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 13,
    color: V1_INK_SOFT,
    marginTop: 12,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontWeight: 500
  }
}, l)))));
const V1About = () => /*#__PURE__*/React.createElement("section", {
  style: {
    padding: '160px 64px',
    borderTop: `1px solid ${V1_LINE}`
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: 80,
    alignItems: 'start'
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: V1_BLUE
  }
}, "(01) \u2014 Sobre")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
  style: {
    fontFamily: '"Fraunces", serif',
    fontWeight: 300,
    fontSize: 'clamp(36px, 4vw, 56px)',
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
    color: V1_INK,
    margin: 0,
    textWrap: 'pretty'
  }
}, "Somos uma ", /*#__PURE__*/React.createElement("em", {
  style: {
    color: V1_BLUE,
    fontStyle: 'italic'
  }
}, "software house"), " brasileira que nasceu dentro de um arquivo hospitalar \u2014 e aprendeu, na pr\xE1tica, a tirar empresas da gaveta e p\xF4r na nuvem."), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 48,
    marginTop: 80
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 13,
    fontWeight: 600,
    color: V1_INK_SOFT,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: 12
  }
}, "Para quem"), /*#__PURE__*/React.createElement("p", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 16,
    lineHeight: 1.6,
    color: V1_INK,
    margin: 0
  }
}, "Hospitais e cl\xEDnicas, escrit\xF3rios de advocacia, prefeituras, escolas, farm\xE1cias \u2014 empresas com d\xE9cadas de papel acumulado e processos que pedem ordem.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 13,
    fontWeight: 600,
    color: V1_INK_SOFT,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: 12
  }
}, "O que fazemos"), /*#__PURE__*/React.createElement("p", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 16,
    lineHeight: 1.6,
    color: V1_INK,
    margin: 0
  }
}, "Digitalizamos, indexamos e conectamos. E depois constru\xEDmos o sistema sob medida que mant\xE9m tudo isso vivo e us\xE1vel pela sua equipe."))))));
const V1_SERVICES = [{
  n: '01',
  title: 'Software sob medida',
  body: 'Sistemas web e desktop construídos do zero para o seu fluxo. Next.js, TypeScript, integrações com ERPs e legados.',
  tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Electron']
}, {
  n: '02',
  title: 'Digitalização (GED)',
  body: 'Captura, indexação e custódia de documentos físicos. Do scanner ao OCR; do OCR à busca. Conforme LGPD e CFM.',
  tags: ['OCR', 'LGPD', 'TIFF/PDF', 'Indexação']
}, {
  n: '03',
  title: 'Automação de processos',
  body: 'RPA e workflows para tirar a planilha do meio do caminho. Aprovações, rotinas, integrações entre sistemas.',
  tags: ['RPA', 'BPMN', 'APIs', 'Webhooks']
}, {
  n: '04',
  title: 'Consultoria em transformação digital',
  body: 'Diagnóstico de operação, mapa de sistemas e roadmap de modernização. Antes de codar, entendemos.',
  tags: ['Diagnóstico', 'Roadmap', 'Arquitetura']
}, {
  n: '05',
  title: 'Suporte técnico e manutenção',
  body: 'Sustentação contínua, monitoramento de uptime, plantão para horário de pico hospitalar e SLAs claros.',
  tags: ['SLA', 'Monitoramento', '24/7']
}];
const V1Services = () => {
  const [open, setOpen] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '160px 64px',
      background: 'white',
      borderTop: `1px solid ${V1_LINE}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gap: 80,
      marginBottom: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Sora, system-ui',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: V1_BLUE
    }
  }, "(02) \u2014 Servi\xE7os"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: '"Fraunces", serif',
      fontWeight: 300,
      fontSize: 'clamp(40px, 5vw, 72px)',
      lineHeight: 1.05,
      letterSpacing: '-0.03em',
      color: V1_INK,
      margin: 0
    }
  }, "Cinco frentes.", /*#__PURE__*/React.createElement("br", null), "Um \xFAnico ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: V1_BLUE,
      fontStyle: 'italic'
    }
  }, "princ\xEDpio"), ": p\xF4r a opera\xE7\xE3o sob controle.")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: `1px solid ${V1_LINE}`
    }
  }, V1_SERVICES.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onClick: () => setOpen(open === i ? -1 : i),
    style: {
      borderBottom: `1px solid ${V1_LINE}`,
      padding: '32px 0',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '80px 1fr 2fr 80px',
      gap: 32,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Sora, system-ui',
      fontSize: 13,
      color: V1_INK_SOFT,
      fontWeight: 500
    }
  }, s.n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Fraunces", serif',
      fontWeight: 300,
      fontSize: 36,
      letterSpacing: '-0.02em',
      color: V1_INK
    }
  }, s.title), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: open === i ? 200 : 0,
      opacity: open === i ? 1 : 0,
      overflow: 'hidden',
      transition: 'all 0.4s ease'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'Sora, system-ui',
      fontSize: 16,
      lineHeight: 1.6,
      color: V1_INK_SOFT,
      margin: 0,
      marginBottom: 16
    }
  }, s.body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, s.tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      fontFamily: 'Sora, system-ui',
      fontSize: 12,
      fontWeight: 500,
      padding: '6px 12px',
      border: `1px solid ${V1_LINE}`,
      borderRadius: 999,
      color: V1_INK
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      color: V1_BLUE,
      textAlign: 'right',
      transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
      transition: 'transform 0.3s ease'
    }
  }, "+"))))));
};
const V1_STACK = [{
  cat: 'Frontend',
  items: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Electron']
}, {
  cat: 'Backend',
  items: ['Node.js', 'PostgreSQL', 'Redis', 'tRPC', 'Prisma']
}, {
  cat: 'Infra',
  items: ['AWS', 'Docker', 'GitHub Actions', 'Cloudflare']
}, {
  cat: 'GED & OCR',
  items: ['Tesseract', 'Kofax', 'TIFF/PDF/A', 'Barcode']
}];
const V1Stack = () => /*#__PURE__*/React.createElement("section", {
  style: {
    padding: '160px 64px',
    background: V1_PAPER,
    borderTop: `1px solid ${V1_LINE}`
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: 80,
    marginBottom: 80
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: V1_BLUE
  }
}, "(03) \u2014 Stack"), /*#__PURE__*/React.createElement("h2", {
  style: {
    fontFamily: '"Fraunces", serif',
    fontWeight: 300,
    fontSize: 'clamp(40px, 5vw, 72px)',
    lineHeight: 1.05,
    letterSpacing: '-0.03em',
    color: V1_INK,
    margin: 0
  }
}, "Ferramentas ", /*#__PURE__*/React.createElement("em", {
  style: {
    color: V1_BLUE,
    fontStyle: 'italic'
  }
}, "maduras"), ", escolhidas a dedo.")), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 48
  }
}, V1_STACK.map((s, i) => /*#__PURE__*/React.createElement("div", {
  key: i
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 13,
    fontWeight: 600,
    color: V1_BLUE,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    paddingBottom: 16,
    borderBottom: `1px solid ${V1_LINE}`,
    marginBottom: 24
  }
}, s.cat), /*#__PURE__*/React.createElement("ul", {
  style: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  }
}, s.items.map(it => /*#__PURE__*/React.createElement("li", {
  key: it,
  style: {
    fontFamily: '"Fraunces", serif',
    fontWeight: 300,
    fontSize: 28,
    letterSpacing: '-0.02em',
    color: V1_INK,
    lineHeight: 1.4
  }
}, it)))))));
const V1CTA = () => /*#__PURE__*/React.createElement("section", {
  style: {
    padding: '160px 64px',
    background: V1_INK,
    color: 'white',
    position: 'relative',
    overflow: 'hidden'
  }
}, /*#__PURE__*/React.createElement(ArrowPlus, {
  size: 800,
  color: "rgba(155, 200, 214, 0.06)",
  style: {
    position: 'absolute',
    right: -100,
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none'
  }
}), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'relative',
    maxWidth: 900
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: V1_BLUE_LIGHT,
    marginBottom: 32
  }
}, "(04) \u2014 Pr\xF3ximo passo"), /*#__PURE__*/React.createElement("h2", {
  style: {
    fontFamily: '"Fraunces", serif',
    fontWeight: 300,
    fontSize: 'clamp(56px, 8vw, 128px)',
    lineHeight: 0.95,
    letterSpacing: '-0.03em',
    color: 'white',
    margin: 0
  }
}, "Vamos p\xF4r", /*#__PURE__*/React.createElement("br", null), "sua opera\xE7\xE3o", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", {
  style: {
    color: V1_BLUE_LIGHT,
    fontStyle: 'italic'
  }
}, "sob controle"), "?"), /*#__PURE__*/React.createElement("p", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 20,
    lineHeight: 1.5,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 48,
    maxWidth: 560
  }
}, "Conte um pouco do seu cen\xE1rio \u2014 arquivos, sistemas, gargalos. Em at\xE9 24 horas devolvemos um diagn\xF3stico inicial e um caminho."), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 16,
    marginTop: 56
  }
}, /*#__PURE__*/React.createElement("button", {
  style: {
    background: V1_BLUE_LIGHT,
    color: V1_INK,
    border: 'none',
    padding: '22px 36px',
    borderRadius: 999,
    fontFamily: 'Sora, system-ui',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 12
  }
}, /*#__PURE__*/React.createElement("svg", {
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, /*#__PURE__*/React.createElement("path", {
  d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
})), "Falar no WhatsApp"), /*#__PURE__*/React.createElement("button", {
  style: {
    background: 'transparent',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.3)',
    padding: '22px 36px',
    borderRadius: 999,
    fontFamily: 'Sora, system-ui',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer'
  }
}, "contato@scandexplus.com.br"))));
const V1Footer = () => /*#__PURE__*/React.createElement("footer", {
  style: {
    padding: '64px',
    background: V1_INK,
    color: 'rgba(255,255,255,0.5)',
    borderTop: '1px solid rgba(255,255,255,0.1)'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 24
  }
}, /*#__PURE__*/React.createElement(Wordmark, {
  color: "white",
  size: 20
}), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 13
  }
}, "\xA9 2026 Scandex+ Servi\xE7os Digitais \xB7 Belo Horizonte / MG"), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 13,
    fontStyle: 'italic'
  }
}, "Powered by ScandexPRO\u2122")));
const V1Cursor = () => {
  const [pos, setPos] = React.useState({
    x: -100,
    y: -100
  });
  const [hovering, setHovering] = React.useState(false);
  React.useEffect(() => {
    const move = e => {
      setPos({
        x: e.clientX,
        y: e.clientY
      });
      const t = e.target;
      setHovering(t && (t.tagName === 'BUTTON' || t.tagName === 'A' || t.closest('button') || t.closest('a')));
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      left: pos.x,
      top: pos.y,
      pointerEvents: 'none',
      width: hovering ? 56 : 12,
      height: hovering ? 56 : 12,
      borderRadius: '50%',
      background: hovering ? V1_BLUE : V1_INK,
      mixBlendMode: 'difference',
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.2s ease, height 0.2s ease',
      zIndex: 9999
    }
  });
};
const LandingV1 = () => /*#__PURE__*/React.createElement("div", {
  style: {
    background: V1_PAPER,
    minHeight: '100vh',
    cursor: 'none'
  }
}, /*#__PURE__*/React.createElement(V1Cursor, null), /*#__PURE__*/React.createElement(V1Nav, null), /*#__PURE__*/React.createElement(V1Hero, null), /*#__PURE__*/React.createElement(V1About, null), /*#__PURE__*/React.createElement(V1Services, null), /*#__PURE__*/React.createElement(V1Stack, null), /*#__PURE__*/React.createElement(V1CTA, null), /*#__PURE__*/React.createElement(V1Footer, null));
window.LandingV1 = LandingV1;
})(); } catch (e) { __ds_ns.__errors.push({ path: "uploads/Landing Page ScandexPlus/v1-editorial.jsx", error: String((e && e.message) || e) }); }

// uploads/Landing Page ScandexPlus/v2-refined-part1.jsx
try { (() => {
// V2.1 — Refined tech corporate landing for Scandex+
// Focus areas: typography polish, big numbers section, ScandexPRO solution block,
// headline copy variations, micro-interactions, tweakable.

const COLORS = {
  blue: '#3B7BA8',
  blueDeep: '#2E6388',
  blueLight: '#9CC8D6',
  blueTint: '#EAF2F6',
  ink: '#0F1620',
  inkSoft: '#5A6573',
  line: '#E2E8EE',
  paper: '#F6F7F9'
};

// Headline copy variations
const HEADLINES = {
  controle: {
    eyebrow: 'Nova marca · Equipe sênior em digitalização',
    h1: ['Gestão.', 'Memória.', 'Conformidade.'],
    accent: 'Sob controle',
    sub: 'Empresa recém-fundada por profissionais com mais de uma década digitalizando arquivos do setor público e privado. +1 milhão de documentos digitalizados na trajetória da equipe — agora com tecnologia própria.'
  },
  papel: {
    eyebrow: 'Da gaveta · Para a nuvem · Sem perder o histórico',
    h1: ['Tira o papel.', 'Mantém a história.', 'Acelera o trabalho.'],
    accent: 'Digital de verdade',
    sub: 'Anos digitalizando arquivos públicos e privados — agora com software próprio. Capturamos, indexamos e devolvemos sua operação consultável em segundos.'
  },
  futuro: {
    eyebrow: 'Especialistas em GED · Tecnologia que entende auditoria',
    h1: ['Documentos seguros.', 'Processos enxutos.', 'Times produtivos.'],
    accent: 'O futuro do seu arquivo',
    sub: 'Nascemos com a bagagem de quem já tirou auditoria do vermelho mais de uma vez. A Scandex+ é a empresa nova com a experiência prática de uma vida inteira em gestão documental.'
  }
};

// The brand glyph — for `blue` we use a pre-tinted PNG (exact #3B7BA8)
// to avoid CSS-filter color drift. Other tones are derived from the black mask.
const ARROW_FILTERS = {
  light: 'brightness(0) saturate(100%) invert(82%) sepia(15%) saturate(450%) hue-rotate(155deg) brightness(95%) contrast(85%)',
  white: 'brightness(0) invert(1)',
  ink: 'none',
  gray: 'opacity(0.5)'
};
const COLOR_TO_TONE = c => {
  if (!c) return 'blue';
  const v = String(c).toLowerCase();
  if (v === '#fff' || v === '#ffffff' || v === 'white') return 'white';
  if (v === COLORS.blueLight.toLowerCase()) return 'light';
  if (v === COLORS.ink.toLowerCase() || v === 'black') return 'ink';
  if (v === COLORS.blue.toLowerCase() || v === COLORS.blueDeep.toLowerCase()) return 'blue';
  return 'blue';
};
const ArrowPlus = ({
  size = 80,
  color = '#fff',
  opacity = 1,
  tone
}) => {
  const t = tone || COLOR_TO_TONE(color);
  const usePrimary = t === 'blue';
  return /*#__PURE__*/React.createElement("img", {
    src: usePrimary ? 'assets/arrow-plus-primary.png' : 'assets/arrow-plus-mask.png',
    alt: "",
    style: {
      width: size,
      height: size * (219 / 652),
      objectFit: 'contain',
      opacity,
      filter: usePrimary ? 'none' : ARROW_FILTERS[t],
      display: 'inline-block',
      verticalAlign: 'middle'
    }
  });
};
const Wordmark = ({
  color = COLORS.ink,
  size = 24,
  accent,
  variant = 'auto'
}) => {
  // Use the official logo PNG. `variant`:
  //   'auto'  — pick by `color`: dark text → original; white/light text → white logo
  //   'dark'  — original colors (dark on light)
  //   'white' — all-white silhouette (for dark surfaces)
  const isLight = color === '#fff' || color === '#ffffff' || color === 'white';
  const useWhite = variant === 'white' || variant === 'auto' && isLight;
  // Cropped logo native is 586×151 → aspect 3.88
  const h = size * 1.55; // height tuned so it visually matches old wordmark size
  const w = h * (586 / 151);
  return /*#__PURE__*/React.createElement("img", {
    src: useWhite ? 'assets/logo-principal-white.png' : 'assets/logo-principal-cropped.png',
    alt: "Scandex+ \u2014 Servi\xE7os Digitais",
    style: {
      height: h,
      width: w,
      objectFit: 'contain',
      display: 'inline-block',
      verticalAlign: 'middle'
    }
  });
};

// Real brand pattern — assets/pattern.png is solid white bg with brand-blue arrows+.
// We use CSS blend modes so it composites cleanly over any surface:
//   - light surfaces → multiply (white bg disappears, blue strokes stay)
//   - dark surfaces  → invert + screen (strokes become light on dark)
// `scale` controls tile size (smaller = denser).
const PATTERN_NATIVE = {
  w: 2481,
  h: 3508
}; // native px
const Pattern = ({
  color,
  opacity = 1,
  scale = 1,
  tone = 'auto',
  surface = 'light'
}) => {
  // tile size on screen — base ~720x1018 then divided by scale (>1 = denser)
  const tileW = Math.round(720 / scale);
  const tileH = Math.round(tileW * (PATTERN_NATIVE.h / PATTERN_NATIVE.w));
  const isDark = surface === 'dark';
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      opacity,
      backgroundImage: 'url("assets/pattern.png")',
      backgroundRepeat: 'repeat',
      backgroundSize: `${tileW}px ${tileH}px`,
      mixBlendMode: isDark ? 'screen' : 'multiply',
      filter: isDark ? 'invert(1) brightness(1.4)' : 'none'
    }
  });
};
const WhatsappIcon = ({
  size = 18,
  color = 'currentColor'
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: color
}, /*#__PURE__*/React.createElement("path", {
  d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
}));

// Reveal-on-scroll wrapper
const Reveal = ({
  children,
  delay = 0,
  style
}) => {
  const ref = React.useRef();
  const [v, setV] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setV(true), {
      threshold: 0.15
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      ...style,
      opacity: v ? 1 : 0,
      transform: v ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.7s cubic-bezier(.2,.8,.2,1) ${delay}ms, transform 0.7s cubic-bezier(.2,.8,.2,1) ${delay}ms`
    }
  }, children);
};

// Counting number animation
const CountUp = ({
  to,
  suffix = '',
  prefix = '',
  decimals = 0,
  style
}) => {
  const ref = React.useRef();
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const start = performance.now();
      const dur = 1600;
      const animate = t => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(to * eased);
        if (p < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      obs.disconnect();
    }, {
      threshold: 0.5
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  const formatted = decimals > 0 ? n.toFixed(decimals) : Math.floor(n).toLocaleString('pt-BR');
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: style
  }, prefix, formatted, suffix);
};

// ─────────────────────────────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────────────────────────────
const Nav = ({
  T
}) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 24px',
      background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.65)',
      backdropFilter: 'blur(20px) saturate(140%)',
      WebkitBackdropFilter: 'blur(20px) saturate(140%)',
      position: 'sticky',
      top: 12,
      zIndex: 30,
      margin: '12px 12px 0',
      border: `1px solid ${scrolled ? COLORS.line : 'rgba(226,232,238,0.6)'}`,
      borderRadius: 999,
      transition: 'all 0.3s ease',
      boxShadow: scrolled ? '0 8px 32px rgba(15,22,32,0.06)' : 'none'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 20,
    accent: T.primary
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      fontFamily: 'Sora, system-ui',
      fontSize: 13.5,
      fontWeight: 500,
      color: COLORS.ink
    }
  }, ['Sobre', 'Serviços', 'ScandexPRO™', 'Stack'].map(x => /*#__PURE__*/React.createElement("a", {
    key: x,
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, x))), /*#__PURE__*/React.createElement("button", {
    style: {
      background: T.primary,
      color: 'white',
      border: 'none',
      padding: '11px 20px',
      borderRadius: 999,
      fontFamily: 'Sora, system-ui',
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      boxShadow: `0 4px 16px ${T.primary}40`
    }
  }, /*#__PURE__*/React.createElement(WhatsappIcon, {
    size: 14
  }), "Falar agora"));
};

// ─────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────
const Hero = ({
  T
}) => {
  const headline = HEADLINES[T.headline] || HEADLINES.controle;
  const [hour, setHour] = React.useState('');
  React.useEffect(() => {
    const tick = () => setHour(new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    }));
    tick();
    const i = setInterval(tick, 30000);
    return () => clearInterval(i);
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.35fr 1fr',
      minHeight: 'calc(100vh - 60px)',
      padding: '0 12px',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '56px 40px 40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignSelf: 'flex-start',
      alignItems: 'center',
      gap: 10,
      padding: '7px 14px',
      background: 'white',
      color: COLORS.ink,
      border: `1px solid ${COLORS.line}`,
      borderRadius: 999,
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 11,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: COLORS.inkSoft,
      textTransform: 'uppercase',
      letterSpacing: '0.1em'
    }
  }, headline.eyebrow))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: '"Sora", system-ui',
      fontWeight: 700,
      fontSize: 'clamp(60px, 8.2vw, 124px)',
      lineHeight: 0.92,
      letterSpacing: '-0.05em',
      color: COLORS.ink,
      margin: 0
    }
  }, headline.h1.map((line, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 90,
    style: {
      display: 'block'
    }
  }, line)), /*#__PURE__*/React.createElement(Reveal, {
    delay: headline.h1.length * 90,
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.primary,
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: 16
    }
  }, headline.accent, /*#__PURE__*/React.createElement(ArrowPlus, {
    size: 108,
    color: T.primary
  })))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 500
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'Sora, system-ui',
      fontSize: 18,
      lineHeight: 1.55,
      color: COLORS.inkSoft,
      marginTop: 36,
      maxWidth: 540,
      textWrap: 'pretty'
    }
  }, headline.sub), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 36,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      background: T.primary,
      color: 'white',
      border: 'none',
      padding: '17px 26px',
      borderRadius: 12,
      fontFamily: 'Sora, system-ui',
      fontSize: 14.5,
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      boxShadow: `0 8px 22px ${T.primary}33`,
      transition: 'transform 0.2s'
    },
    onMouseEnter: e => e.currentTarget.style.transform = 'translateY(-2px)',
    onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)'
  }, /*#__PURE__*/React.createElement(WhatsappIcon, {
    size: 17
  }), "Falar no WhatsApp"), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'white',
      color: COLORS.ink,
      border: `1px solid ${COLORS.line}`,
      padding: '17px 26px',
      borderRadius: 12,
      fontFamily: 'Sora, system-ui',
      fontSize: 14.5,
      fontWeight: 600,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, "Conhecer ScandexPRO\u2122", /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.primary
    }
  }, "\u2192"))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 700
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 64
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 10.5,
      color: COLORS.inkSoft,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      marginBottom: 18
    }
  }, "\u2500\u2500\u2500 Setores onde nossa equipe j\xE1 digitalizou"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 32,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, ['Setor público', 'Saúde privada', 'Jurídico', 'Educação', 'Indústria', 'Cartórios'].map(n => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      fontFamily: 'Sora, system-ui',
      fontSize: 13.5,
      fontWeight: 500,
      color: COLORS.inkSoft,
      opacity: 0.7
    }
  }, n)))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 300
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.primary,
      borderRadius: 24,
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: 22,
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Pattern, {
    surface: "dark",
    opacity: T.patternIntensity * 0.32,
    scale: 0.95
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 22,
      right: 22,
      zIndex: 2,
      opacity: 0.85
    }
  }, /*#__PURE__*/React.createElement(ArrowPlus, {
    size: 44,
    color: "white"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: 1,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1.5fr 1fr',
      gap: 12,
      minHeight: 620
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1',
      position: 'relative',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 24px 60px rgba(0,0,0,0.32)',
      background: COLORS.ink
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1600&q=80",
    alt: "",
    onError: e => {
      e.currentTarget.style.display = 'none';
    },
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: '0 16px 40px rgba(0,0,0,0.26)',
      background: COLORS.blueDeep
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=80",
    alt: "",
    onError: e => {
      e.currentTarget.style.display = 'none';
    },
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      filter: 'saturate(0.7) brightness(0.95)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: '0 16px 40px rgba(0,0,0,0.26)',
      background: COLORS.blueDeep
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=900&q=80",
    alt: "",
    onError: e => {
      e.currentTarget.style.display = 'none';
    },
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }))))));
};

// ─────────────────────────────────────────────────────────────────────
// METRICS — big destaque section
// ─────────────────────────────────────────────────────────────────────
const Metrics = ({
  T
}) => /*#__PURE__*/React.createElement("section", {
  style: {
    padding: '120px 40px',
    background: COLORS.ink,
    color: 'white',
    position: 'relative',
    overflow: 'hidden'
  }
}, /*#__PURE__*/React.createElement(Pattern, {
  surface: "dark",
  opacity: T.patternIntensity * 0.18,
  scale: 1.4
}), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'relative',
    maxWidth: 1400,
    margin: '0 auto'
  }
}, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11,
    color: T.accent,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    marginBottom: 24
  }
}, "\u2500\u2500\u2500 A bagagem por tr\xE1s da Scandex+"), /*#__PURE__*/React.createElement("h2", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontWeight: 700,
    fontSize: 'clamp(48px, 6.5vw, 96px)',
    lineHeight: 0.95,
    letterSpacing: '-0.04em',
    color: 'white',
    margin: 0,
    maxWidth: 1100
  }
}, "Empresa nova. ", /*#__PURE__*/React.createElement("span", {
  style: {
    color: T.accent,
    fontStyle: 'italic',
    fontWeight: 400,
    fontFamily: '"Fraunces", serif'
  }
}, "Equipe que j\xE1 tirou"), " auditoria do vermelho.")), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    marginTop: 80,
    borderTop: '1px solid rgba(255,255,255,0.12)'
  }
}, [{
  num: 1,
  suffix: 'M+',
  decimals: 0,
  label: 'Documentos digitalizados',
  sub: 'Soma de todas as experiências da equipe — público e privado'
}, {
  num: 12,
  suffix: '+',
  decimals: 0,
  label: 'Anos de experiência',
  sub: 'Carreiras inteiras dedicadas a digitalização e GED'
}, {
  num: 0,
  suffix: '',
  decimals: 0,
  label: 'Auditorias perdidas',
  sub: 'Crises de auditoria que a equipe enfrentou e resolveu'
}, {
  num: 100,
  suffix: '%',
  decimals: 0,
  label: 'Foco em GED',
  sub: 'Especialização do dia 1 — não é diversificação'
}].map((m, i) => /*#__PURE__*/React.createElement(Reveal, {
  key: i,
  delay: i * 100
}, /*#__PURE__*/React.createElement("div", {
  style: {
    padding: '40px 32px 40px 0',
    borderRight: i < 3 ? '1px solid rgba(255,255,255,0.12)' : 'none',
    borderBottom: '1px solid rgba(255,255,255,0.12)',
    paddingLeft: i > 0 ? 32 : 0
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontWeight: 700,
    fontSize: 'clamp(56px, 7vw, 104px)',
    letterSpacing: '-0.05em',
    color: 'white',
    lineHeight: 1
  }
}, /*#__PURE__*/React.createElement(CountUp, {
  to: m.num,
  suffix: m.suffix,
  decimals: m.decimals
})), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 16,
    fontWeight: 600,
    color: 'white',
    marginTop: 24
  }
}, m.label), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 13,
    color: 'rgba(255,255,255,0.55)',
    marginTop: 6,
    lineHeight: 1.5
  }
}, m.sub))))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 0
  }
}, [{
  num: 24,
  suffix: 'h',
  label: 'Resposta inicial em casos críticos de auditoria'
}, {
  num: 100,
  suffix: '%',
  label: 'Aderência a LGPD, retenção legal e normas setoriais'
}, {
  num: 0,
  suffix: '',
  label: 'Vícios de software house genérica · nascemos especialistas'
}].map((m, i) => /*#__PURE__*/React.createElement(Reveal, {
  key: i,
  delay: i * 80
}, /*#__PURE__*/React.createElement("div", {
  style: {
    padding: '40px 32px',
    borderRight: i < 2 ? '1px solid rgba(255,255,255,0.12)' : 'none',
    paddingLeft: i > 0 ? 32 : 0,
    display: 'flex',
    alignItems: 'baseline',
    gap: 24
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: '"Fraunces", serif',
    fontWeight: 300,
    fontStyle: 'italic',
    fontSize: 56,
    letterSpacing: '-0.03em',
    color: T.accent,
    lineHeight: 1,
    flexShrink: 0
  }
}, /*#__PURE__*/React.createElement(CountUp, {
  to: m.num,
  suffix: m.suffix
})), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 1.5
  }
}, m.label)))))));
window.SDXP = {
  COLORS,
  ArrowPlus,
  Wordmark,
  Pattern,
  WhatsappIcon,
  Reveal,
  CountUp,
  Nav,
  Hero,
  Metrics,
  HEADLINES
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "uploads/Landing Page ScandexPlus/v2-refined-part1.jsx", error: String((e && e.message) || e) }); }

// uploads/Landing Page ScandexPlus/v2-refined-part2.jsx
try { (() => {
// V2.1 part 2 — About, ScandexPRO solution, Services, Stack, CTA, Footer
const {
  COLORS,
  ArrowPlus,
  Wordmark,
  Pattern,
  WhatsappIcon,
  Reveal,
  CountUp
} = window.SDXP;

// ─────────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────────
const About = ({
  T
}) => /*#__PURE__*/React.createElement("section", {
  style: {
    padding: '120px 40px',
    background: 'white'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    maxWidth: 1400,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 80,
    alignItems: 'center'
  }
}, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11,
    color: T.primary,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    marginBottom: 24
  }
}, "\u2500\u2500\u2500 [01] Sobre a Scandex+"), /*#__PURE__*/React.createElement("h2", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontWeight: 700,
    fontSize: 'clamp(40px, 5vw, 64px)',
    lineHeight: 1.02,
    letterSpacing: '-0.035em',
    color: COLORS.ink,
    margin: 0
  }
}, "Empresa nova.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
  style: {
    color: T.primary,
    fontFamily: '"Fraunces", serif',
    fontWeight: 300,
    fontStyle: 'italic'
  }
}, "Equipe que j\xE1 tirou"), " mais de 1 milh\xE3o de documentos do papel."), /*#__PURE__*/React.createElement("p", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 17,
    lineHeight: 1.6,
    color: COLORS.inkSoft,
    marginTop: 28,
    textWrap: 'pretty'
  }
}, "A Scandex+ \xE9 uma marca rec\xE9m-fundada \u2014 mas as pessoas por tr\xE1s dela passaram a carreira inteira digitalizando arquivos: setor p\xFAblico, privado, contratos, prontu\xE1rios, processos. J\xE1 vivemos auditorias resgatadas em cima da hora \u2014 e constru\xEDmos os processos para que a pr\xF3xima sequer precise de resgate. Agora juntamos essa bagagem a tecnologia pr\xF3pria, incluindo o ", /*#__PURE__*/React.createElement("strong", {
  style: {
    color: COLORS.ink,
    fontWeight: 600
  }
}, "ScandexPRO\u2122"), ", nosso GED."), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 20,
    marginTop: 36
  }
}, [['Especialização', 'Não somos generalistas que entraram em GED. Já nascemos especialistas.'], ['Bagagem real', '+1 milhão de documentos digitalizados ao longo da carreira da equipe.'], ['Refino', 'Sistemas que sua equipe entende sem manual — porque já passamos pelo seu lugar.'], ['Conformidade', 'LGPD e retenção legal — domínio prático, forjado em auditoria real.']].map(([t, b], i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  style: {
    borderTop: `2px solid ${T.primary}`,
    paddingTop: 14
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontWeight: 600,
    fontSize: 14.5,
    color: COLORS.ink,
    marginBottom: 6
  }
}, t), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 13,
    lineHeight: 1.5,
    color: COLORS.inkSoft
  }
}, b))))), /*#__PURE__*/React.createElement(Reveal, {
  delay: 150
}, /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'relative',
    height: 560
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    inset: 0,
    background: COLORS.blueTint,
    borderRadius: 20,
    overflow: 'hidden'
  }
}, /*#__PURE__*/React.createElement(Pattern, {
  surface: "light",
  opacity: T.patternIntensity * 0.55,
  scale: 0.95
})), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    top: 32,
    left: 32,
    right: 32,
    padding: 28,
    background: 'white',
    borderRadius: 16,
    border: `1px solid ${COLORS.line}`,
    boxShadow: '0 12px 40px rgba(0,0,0,0.06)'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18
  }
}, /*#__PURE__*/React.createElement(Wordmark, {
  size: 18,
  accent: T.primary
}), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 10,
    color: COLORS.inkSoft
  }
}, "NOVA \xB7 ESTREIA 2026")), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: '"Fraunces", serif',
    fontSize: 22,
    lineHeight: 1.35,
    color: COLORS.ink,
    fontStyle: 'italic',
    fontWeight: 300
  }
}, "\"Empresa nova \xE9 toda igual? N\xE3o a nossa. J\xE1 tiramos +1 milh\xE3o de documentos do papel \u2014 s\xF3 faltava o nome.\""), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 20,
    fontFamily: 'Sora, system-ui',
    fontSize: 12,
    color: COLORS.inkSoft
  }
}, "\u2014 Manifesto Scandex+")), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    padding: 18,
    background: COLORS.ink,
    color: 'white',
    borderRadius: 12,
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 12,
    maxWidth: 280,
    boxShadow: '0 12px 40px rgba(0,0,0,0.18)'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 8,
    marginBottom: 10
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: T.accent
  }
}, "\u25CF"), /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'rgba(255,255,255,0.5)'
  }
}, "equipe.bagagem")), /*#__PURE__*/React.createElement("div", {
  style: {
    lineHeight: 1.7
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: T.accent
  }
}, "+1M docs digitalizados"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
  style: {
    color: T.accent
  }
}, "p\xFAblico + privado"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
  style: {
    color: T.accent
  }
}, "0 auditorias perdidas")))))));

// ─────────────────────────────────────────────────────────────────────
// SCANDEXPRO Solution Block
// ─────────────────────────────────────────────────────────────────────
const ScandexPro = ({
  T
}) => {
  const [tab, setTab] = React.useState(0);
  const tabs = [{
    label: 'Documentos',
    title: 'Cada papel encontra o seu lugar.',
    body: 'Captura, OCR, indexação automática e busca textual em milhões de documentos. Status visual por dot colorido, retenção configurável, trilha de auditoria por ação.',
    points: ['OCR multi-idioma + indexação por código de barras', 'Visualização de TIFF, PDF/A e imagens', 'Status: disponível, processando, alterado, ausente', 'Permissões granulares por setor e por documento']
  }, {
    label: 'Contratos',
    title: 'Do template à assinatura, com trilha completa.',
    body: 'Templates versionados, fluxo de aprovação configurável, alertas de vencimento e aditivos vinculados. Tudo conectado ao cadastro da contraparte.',
    points: ['Templates versionados com placeholders', 'Workflow de aprovação multi-nível', 'Alertas de vencimento e renovação', 'Aditivos vinculados ao contrato-mãe']
  }, {
    label: 'Auditoria',
    title: 'Tudo rastreável. Tudo defensável.',
    body: 'Cada visualização, edição e exportação registrada com usuário, IP, timestamp e dispositivo. Relatórios prontos para compliance, LGPD e auditoria externa.',
    points: ['Trilha de auditoria imutável', 'Relatórios LGPD prontos para o DPO', 'Exportação para CSV / PDF assinado', 'Retenção legal configurável por tipo']
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '120px 40px',
      background: COLORS.paper,
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Pattern, {
    surface: "light",
    opacity: T.patternIntensity * 0.18,
    scale: 1.6
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1400,
      margin: '0 auto',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      gap: 32,
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 11,
      color: T.primary,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      marginBottom: 24
    }
  }, "\u2500\u2500\u2500 [02] Solu\xE7\xE3o \xB7 ScandexPRO\u2122"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'Sora, system-ui',
      fontWeight: 700,
      fontSize: 'clamp(40px, 5.5vw, 72px)',
      lineHeight: 1.0,
      letterSpacing: '-0.04em',
      color: COLORS.ink,
      margin: 0,
      maxWidth: 900
    }
  }, "O GED feito para quem", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.primary
    }
  }, "gerencia documentos e contratos"), " a s\xE9rio.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 14px',
      background: 'white',
      border: `1px solid ${COLORS.line}`,
      borderRadius: 999,
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 11,
      color: COLORS.inkSoft,
      textTransform: 'uppercase',
      letterSpacing: '0.1em'
    }
  }, "GED \xB7 v3.2"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      padding: 4,
      background: 'white',
      border: `1px solid ${COLORS.line}`,
      borderRadius: 14,
      marginBottom: 32
    }
  }, tabs.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setTab(i),
    style: {
      padding: '12px 24px',
      borderRadius: 10,
      border: 'none',
      cursor: 'pointer',
      background: tab === i ? T.primary : 'transparent',
      color: tab === i ? 'white' : COLORS.inkSoft,
      fontFamily: 'Sora, system-ui',
      fontWeight: 600,
      fontSize: 14,
      transition: 'all 0.25s ease'
    }
  }, t.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.2fr',
      gap: 64,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    key: tab
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: '"Fraunces", serif',
      fontWeight: 300,
      fontStyle: 'italic',
      fontSize: 'clamp(32px, 3.5vw, 48px)',
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
      color: COLORS.ink,
      margin: 0
    }
  }, tabs[tab].title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'Sora, system-ui',
      fontSize: 17,
      lineHeight: 1.6,
      color: COLORS.inkSoft,
      marginTop: 24,
      textWrap: 'pretty'
    }
  }, tabs[tab].body), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: 'grid',
      gap: 12
    }
  }, tabs[tab].points.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 18px',
      background: 'white',
      borderRadius: 10,
      border: `1px solid ${COLORS.line}`,
      fontFamily: 'Sora, system-ui',
      fontSize: 14,
      color: COLORS.ink
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 6,
      background: COLORS.blueTint,
      color: T.primary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 13,
      fontWeight: 700,
      flexShrink: 0
    }
  }, "\u2713"), p)))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, (() => {
    const VISUALS = [{
      img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80',
      fallback: COLORS.blueDeep,
      eyebrow: 'Custódia · contratos · processos',
      headline: 'Tudo na nuvem.\nAcesso em segundos.',
      chips: ['Multi-formato', 'OCR pesquisável', 'Acesso por API']
    }, {
      img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80',
      fallback: COLORS.ink,
      eyebrow: 'Versionamento · aditivos · assinatura',
      headline: 'Cada versão.\nCada cláusula.\nCada assinatura.',
      chips: ['Histórico v1 → v8', 'Diff por cláusula', 'Assinatura digital']
    }, {
      img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80',
      fallback: COLORS.blueDeep,
      eyebrow: 'Quem · quando · de onde',
      headline: 'Trilha de auditoria\nimutável.',
      chips: ['LGPD · DPO ready', 'Logs imutáveis', 'Export auditável']
    }];
    const v = VISUALS[tab];
    return /*#__PURE__*/React.createElement("div", {
      key: tab,
      style: {
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(15,22,32,0.18)',
        aspectRatio: '4 / 5',
        background: v.fallback
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: v.img,
      alt: "",
      onError: e => {
        e.currentTarget.style.display = 'none';
      },
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(180deg, rgba(15,22,32,0.05) 0%, rgba(15,22,32,0.55) 70%, rgba(15,22,32,0.85) 100%)`
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        right: 24,
        top: 24,
        opacity: 0.92
      }
    }, /*#__PURE__*/React.createElement(ArrowPlus, {
      size: 68,
      color: "white"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: '32px 28px 28px',
        color: 'white'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.16em',
        opacity: 0.85,
        marginBottom: 12
      }
    }, v.eyebrow), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: '"Fraunces", serif',
        fontWeight: 300,
        fontStyle: 'italic',
        fontSize: 'clamp(28px, 3vw, 38px)',
        lineHeight: 1.15,
        letterSpacing: '-0.02em',
        whiteSpace: 'pre-line',
        marginBottom: 18
      }
    }, v.headline), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8
      }
    }, v.chips.map((c, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        padding: '6px 12px',
        borderRadius: 999,
        background: 'rgba(255,255,255,0.16)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.22)',
        fontFamily: 'Sora, system-ui',
        fontSize: 12,
        fontWeight: 500
      }
    }, c)))));
  })())))));
};

// ─────────────────────────────────────────────────────────────────────
// SERVICES (refined)
// ─────────────────────────────────────────────────────────────────────
const SERVICES = [{
  n: '01',
  title: 'Software sob medida',
  short: 'Sistemas web e desktop construídos do zero.',
  items: ['Next.js & TypeScript', 'Electron desktop', 'Integração com ERPs e legados', 'Mobile (PWA / React Native)']
}, {
  n: '02',
  title: 'Digitalização (GED)',
  short: 'Captura, OCR, indexação e custódia.',
  items: ['Scanners de produção', 'OCR multi-idioma', 'Conformidade LGPD', 'Backup e retenção legal']
}, {
  n: '03',
  title: 'Automação de processos',
  short: 'Tira a planilha do meio do caminho.',
  items: ['RPA e workflows', 'BPMN customizado', 'APIs e webhooks', 'Aprovações e SLAs']
}, {
  n: '04',
  title: 'Consultoria digital',
  short: 'Diagnóstico antes do código.',
  items: ['Mapa de sistemas atual', 'Roadmap 12-24 meses', 'Arquitetura técnica', 'Análise de compliance']
}, {
  n: '05',
  title: 'Suporte & manutenção',
  short: 'Sustentação contínua, plantão, SLA.',
  items: ['Monitoramento 24/7', 'Plantão em operações críticas', 'SLAs de resposta', 'Patches de segurança']
}];
const Services = ({
  T
}) => {
  const [active, setActive] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '120px 40px',
      background: 'white'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1400,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 64,
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 11,
      color: T.primary,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      marginBottom: 24
    }
  }, "\u2500\u2500\u2500 [03] Servi\xE7os"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'Sora, system-ui',
      fontWeight: 700,
      fontSize: 'clamp(40px, 5vw, 64px)',
      lineHeight: 1.05,
      letterSpacing: '-0.035em',
      color: COLORS.ink,
      margin: 0
    }
  }, "Cinco frentes.", /*#__PURE__*/React.createElement("br", null), "Um \xFAnico ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.primary,
      fontFamily: '"Fraunces", serif',
      fontWeight: 300,
      fontStyle: 'italic'
    }
  }, "princ\xEDpio"), ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'Sora, system-ui',
      fontSize: 17,
      lineHeight: 1.6,
      color: COLORS.inkSoft,
      alignSelf: 'flex-end',
      margin: 0
    }
  }, "N\xE3o vendemos servi\xE7o isolado. Vendemos a opera\xE7\xE3o inteira sob controle \u2014 do papel empilhado no almoxarifado ao dashboard de gest\xE3o na tela do diretor."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.4fr',
      gap: 32,
      background: COLORS.paper,
      borderRadius: 20,
      padding: 24,
      border: `1px solid ${COLORS.line}`
    }
  }, /*#__PURE__*/React.createElement("div", null, SERVICES.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onMouseEnter: () => setActive(i),
    onClick: () => setActive(i),
    style: {
      padding: '20px 16px',
      borderRadius: 12,
      background: active === i ? 'white' : 'transparent',
      boxShadow: active === i ? '0 4px 16px rgba(15,22,32,0.06)' : 'none',
      cursor: 'pointer',
      display: 'grid',
      gridTemplateColumns: '40px 1fr auto',
      alignItems: 'center',
      gap: 12,
      transition: 'all 0.25s ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 11.5,
      color: active === i ? T.primary : COLORS.inkSoft,
      fontWeight: 600
    }
  }, s.n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Sora, system-ui',
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: '-0.015em',
      color: active === i ? COLORS.ink : COLORS.inkSoft,
      transition: 'all 0.25s ease'
    }
  }, s.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: T.primary,
      opacity: active === i ? 1 : 0,
      transform: active === i ? 'translateX(0)' : 'translateX(-6px)',
      transition: 'all 0.25s ease'
    }
  }, "\u2192")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'white',
      borderRadius: 14,
      padding: 36,
      border: `1px solid ${COLORS.line}`,
      minHeight: 420
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 18,
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Fraunces", serif',
      fontWeight: 300,
      fontStyle: 'italic',
      fontSize: 88,
      lineHeight: 0.85,
      color: T.primary,
      letterSpacing: '-0.04em',
      minWidth: 90
    }
  }, SERVICES[active].n), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 11,
      color: T.primary,
      textTransform: 'uppercase',
      letterSpacing: '0.14em'
    }
  }, "Servi\xE7o"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Sora, system-ui',
      fontSize: 26,
      fontWeight: 700,
      color: COLORS.ink,
      marginTop: 4,
      letterSpacing: '-0.02em',
      lineHeight: 1.1
    }
  }, SERVICES[active].title))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: '"Fraunces", serif',
      fontSize: 28,
      lineHeight: 1.3,
      fontStyle: 'italic',
      color: COLORS.ink,
      fontWeight: 300,
      margin: 0,
      marginBottom: 28,
      letterSpacing: '-0.01em'
    }
  }, SERVICES[active].short), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: `1px solid ${COLORS.line}`,
      paddingTop: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 10.5,
      color: COLORS.inkSoft,
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      marginBottom: 14
    }
  }, "O que est\xE1 incluso"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, SERVICES[active].items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '12px 14px',
      background: COLORS.paper,
      borderRadius: 8,
      fontFamily: 'Sora, system-ui',
      fontSize: 13.5,
      color: COLORS.ink,
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.primary,
      fontWeight: 700
    }
  }, "\u2713"), it))))))));
};

// ─────────────────────────────────────────────────────────────────────
// STACK
// ─────────────────────────────────────────────────────────────────────
const STACK = [{
  cat: 'Frontend',
  icon: '◇',
  items: ['Next.js 15', 'React 18', 'TypeScript 5', 'Tailwind CSS', 'Electron 30', 'shadcn/ui']
}, {
  cat: 'Backend',
  icon: '◈',
  items: ['Node.js 22', 'PostgreSQL 16', 'Redis 7', 'Prisma ORM', 'tRPC', 'BullMQ']
}, {
  cat: 'Infra',
  icon: '◉',
  items: ['AWS EC2 + RDS', 'Docker', 'GitHub Actions', 'Cloudflare', 'Datadog', 'Sentry']
}, {
  cat: 'GED & OCR',
  icon: '◆',
  items: ['Tesseract OCR', 'Kofax Capture', 'TIFF / PDF/A', 'ZBar barcode', 'ImageMagick', 'PDFtk']
}];
const Stack = ({
  T
}) => /*#__PURE__*/React.createElement("section", {
  style: {
    padding: '120px 40px',
    background: COLORS.paper
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    maxWidth: 1400,
    margin: '0 auto'
  }
}, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 48,
    gap: 40,
    flexWrap: 'wrap'
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11,
    color: T.primary,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    marginBottom: 24
  }
}, "\u2500\u2500\u2500 [04] Stack tecnol\xF3gica"), /*#__PURE__*/React.createElement("h2", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontWeight: 700,
    fontSize: 'clamp(40px, 5vw, 64px)',
    lineHeight: 1.05,
    letterSpacing: '-0.035em',
    color: COLORS.ink,
    margin: 0
  }
}, "Ferramentas ", /*#__PURE__*/React.createElement("span", {
  style: {
    color: T.primary,
    fontFamily: '"Fraunces", serif',
    fontWeight: 300,
    fontStyle: 'italic'
  }
}, "maduras"), ",", /*#__PURE__*/React.createElement("br", null), "escolhidas a dedo.")), /*#__PURE__*/React.createElement("p", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 16,
    lineHeight: 1.55,
    color: COLORS.inkSoft,
    maxWidth: 380,
    margin: 0
  }
}, "N\xE3o usamos cada nova framework que sai. O que vai pra produ\xE7\xE3o precisa aguentar opera\xE7\xE3o cr\xEDtica em hor\xE1rio de pico \u2014 ent\xE3o prefere-se boring."))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 0,
    border: `1px solid ${COLORS.line}`,
    borderRadius: 16,
    overflow: 'hidden',
    background: 'white'
  }
}, STACK.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
  key: i,
  delay: i * 80
}, /*#__PURE__*/React.createElement("div", {
  style: {
    padding: 28,
    borderRight: i < 3 ? `1px solid ${COLORS.line}` : 'none',
    height: '100%'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    paddingBottom: 20,
    borderBottom: `1px solid ${COLORS.line}`
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: COLORS.blueTint,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: T.primary,
    fontSize: 18
  }
}, s.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 10,
    color: COLORS.inkSoft,
    textTransform: 'uppercase',
    letterSpacing: '0.1em'
  }
}, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.ink,
    letterSpacing: '-0.015em'
  }
}, s.cat))), /*#__PURE__*/React.createElement("ul", {
  style: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  }
}, s.items.map(it => /*#__PURE__*/React.createElement("li", {
  key: it,
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 14,
    color: COLORS.ink,
    padding: '10px 0',
    borderBottom: `1px dashed ${COLORS.line}`
  }
}, it))))))), /*#__PURE__*/React.createElement(Reveal, {
  delay: 400
}, /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 24,
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Sora, system-ui',
    fontSize: 14.5,
    color: COLORS.inkSoft,
    letterSpacing: '-0.005em'
  }
}, /*#__PURE__*/React.createElement("span", null, "Trabalha com outra tecnologia?", ' ', /*#__PURE__*/React.createElement("a", {
  href: "#contato",
  style: {
    color: T.primary,
    textDecoration: 'none',
    fontWeight: 500,
    borderBottom: `1px solid ${T.primary}55`,
    paddingBottom: 1
  }
}, "Vamos conversar sobre ", /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: '"Fraunces", serif',
    fontStyle: 'italic',
    fontWeight: 300
  }
}, "\u2192")))))));

// ─────────────────────────────────────────────────────────────────────
// CTA + FOOTER
// ─────────────────────────────────────────────────────────────────────
const CTA = ({
  T
}) => /*#__PURE__*/React.createElement("section", {
  style: {
    padding: '20px 12px'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    padding: '80px 56px',
    background: T.primary,
    color: 'white',
    borderRadius: 28,
    position: 'relative',
    overflow: 'hidden'
  }
}, /*#__PURE__*/React.createElement(Pattern, {
  surface: "dark",
  opacity: T.patternIntensity * 0.28,
  scale: 1.4
}), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: 64,
    alignItems: 'center'
  }
}, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11,
    color: T.accent,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    marginBottom: 24
  }
}, "\u2500\u2500\u2500 [05] Pr\xF3ximo passo"), /*#__PURE__*/React.createElement("h2", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontWeight: 700,
    fontSize: 'clamp(44px, 5.5vw, 80px)',
    lineHeight: 0.98,
    letterSpacing: '-0.035em',
    color: 'white',
    margin: 0
  }
}, "Conta pra gente o", /*#__PURE__*/React.createElement("br", null), "tamanho do seu legado.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
  style: {
    color: T.accent,
    fontFamily: '"Fraunces", serif',
    fontWeight: 300,
    fontStyle: 'italic'
  }
}, "Devolvemos um plano em 24h.")), /*#__PURE__*/React.createElement("p", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 17,
    lineHeight: 1.55,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 28,
    maxWidth: 560
  }
}, "Diagn\xF3stico inicial sem custo. Mande fotos do arquivo, screenshots do sistema atual ou s\xF3 descreva o problema \u2014 devolvemos um caminho t\xE9cnico e uma estimativa."), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 12,
    marginTop: 36,
    flexWrap: 'wrap'
  }
}, /*#__PURE__*/React.createElement("button", {
  style: {
    background: 'white',
    color: T.primary,
    border: 'none',
    padding: '20px 32px',
    borderRadius: 12,
    fontFamily: 'Sora, system-ui',
    fontSize: 15.5,
    fontWeight: 700,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 12,
    boxShadow: '0 12px 40px rgba(0,0,0,0.18)'
  }
}, /*#__PURE__*/React.createElement(WhatsappIcon, {
  size: 18
}), "Falar no WhatsApp", /*#__PURE__*/React.createElement("span", null, "\u2192")), /*#__PURE__*/React.createElement("button", {
  style: {
    background: 'rgba(255,255,255,0.12)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.3)',
    padding: '20px 32px',
    borderRadius: 12,
    fontFamily: 'Sora, system-ui',
    fontSize: 15.5,
    fontWeight: 600,
    cursor: 'pointer'
  }
}, "contato@scandexplus.com.br")), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 22,
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.7)'
  }
}, "+55 (32) 9 8765-4321 \xB7 seg-sex 9h-18h")), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  }
}, /*#__PURE__*/React.createElement(ArrowPlus, {
  size: 380,
  color: T.accent,
  opacity: 0.55,
  weight: 3
})))));
const Footer = ({
  T
}) => /*#__PURE__*/React.createElement("footer", {
  style: {
    padding: '40px 40px 24px',
    background: 'white'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    maxWidth: 1400,
    margin: '0 auto'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: 40,
    paddingBottom: 28,
    borderBottom: `1px solid ${COLORS.line}`
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Wordmark, {
  size: 24,
  accent: T.primary
}), /*#__PURE__*/React.createElement("p", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 13.5,
    lineHeight: 1.55,
    color: COLORS.inkSoft,
    marginTop: 14,
    maxWidth: 320
  }
}, "Software house brasileira. Efici\xEAncia, tecnologia e refino para empresas que precisam p\xF4r a opera\xE7\xE3o em ordem.")), [{
  t: 'Serviços',
  items: ['Software sob medida', 'Digitalização (GED)', 'Automação', 'Consultoria', 'Suporte']
}, {
  t: 'Empresa',
  items: ['Sobre', 'Manifesto', 'Equipe', 'Carreiras', 'Imprensa']
}, {
  t: 'Contato',
  items: ['contato@scandexplus.com.br', '+55 (32) 9 8765-4321', 'Belo Horizonte, MG']
}].map((col, i) => /*#__PURE__*/React.createElement("div", {
  key: i
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 10.5,
    color: T.primary,
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    marginBottom: 12
  }
}, col.t), col.items.map(x => /*#__PURE__*/React.createElement("div", {
  key: x,
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 13.5,
    color: COLORS.ink,
    padding: '5px 0'
  }
}, x))))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    fontFamily: 'Sora, system-ui',
    fontSize: 12.5,
    color: COLORS.inkSoft
  }
}, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Scandex+ Servi\xE7os Digitais"), /*#__PURE__*/React.createElement("span", {
  style: {
    fontStyle: 'italic'
  }
}, "Powered by ScandexPRO\u2122"))));
window.SDXP_Sections = {
  About,
  ScandexPro,
  Services,
  Stack,
  CTA,
  Footer
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "uploads/Landing Page ScandexPlus/v2-refined-part2.jsx", error: String((e && e.message) || e) }); }

// uploads/Landing Page ScandexPlus/v2-tech-corporate.jsx
try { (() => {
// V2 — Tech corporate / split-canvas with the brand's deep blue and the arrow+ pattern.
// Pillars: structure, product-feel, density without clutter.

const V2_BLUE = '#3B7BA8'; // submarca — deep blue, dominant
const V2_BLUE_DEEP = '#2E6388'; // hover/depth
const V2_BLUE_LIGHT = '#9CC8D6'; // logo principal — accent
const V2_BLUE_TINT = '#E8F1F5'; // wash backgrounds
const V2_INK = '#1A1A1A';
const V2_INK_SOFT = '#5C6470';
const V2_LINE = '#DDE5EA';
const V2_PAPER = '#FFFFFF';
const V2ArrowPlus = ({
  size = 80,
  color = '#fff',
  opacity = 1
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size * 0.55,
  viewBox: "0 0 100 55",
  fill: "none",
  style: {
    opacity
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 36 Q 25 50, 52 30",
  stroke: color,
  strokeWidth: "3.2",
  strokeLinecap: "round",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M52 30 L 44 28 M52 30 L 50 22",
  stroke: color,
  strokeWidth: "3.2",
  strokeLinecap: "round",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M70 14 L 70 36 M 60 25 L 80 25",
  stroke: color,
  strokeWidth: "3.2",
  strokeLinecap: "round",
  fill: "none"
}));
const V2Wordmark = ({
  color = V2_INK,
  size = 24
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: size * 0.2,
    fontFamily: '"Sora", system-ui',
    fontWeight: 700,
    fontSize: size,
    letterSpacing: '-0.02em',
    color,
    lineHeight: 1
  }
}, /*#__PURE__*/React.createElement("span", null, "scandex"), /*#__PURE__*/React.createElement(V2ArrowPlus, {
  size: size * 1.1,
  color: color === V2_INK ? V2_BLUE : color
}));
const V2Nav = () => /*#__PURE__*/React.createElement("nav", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 48px',
    background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(12px)',
    position: 'sticky',
    top: 16,
    zIndex: 20,
    margin: '16px',
    border: `1px solid ${V2_LINE}`,
    borderRadius: 999
  }
}, /*#__PURE__*/React.createElement(V2Wordmark, {
  size: 20
}), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 32,
    fontFamily: 'Sora, system-ui',
    fontSize: 14,
    fontWeight: 500,
    color: V2_INK
  }
}, /*#__PURE__*/React.createElement("a", {
  style: {
    color: 'inherit',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 6
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: V2_BLUE
  }
}), "Sobre"), /*#__PURE__*/React.createElement("a", {
  style: {
    color: 'inherit',
    textDecoration: 'none'
  }
}, "Servi\xE7os"), /*#__PURE__*/React.createElement("a", {
  style: {
    color: 'inherit',
    textDecoration: 'none'
  }
}, "Stack"), /*#__PURE__*/React.createElement("a", {
  style: {
    color: 'inherit',
    textDecoration: 'none'
  }
}, "ScandexPRO\u2122")), /*#__PURE__*/React.createElement("button", {
  style: {
    background: V2_BLUE,
    color: 'white',
    border: 'none',
    padding: '12px 22px',
    borderRadius: 999,
    fontFamily: 'Sora, system-ui',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 8
  }
}, /*#__PURE__*/React.createElement("svg", {
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, /*#__PURE__*/React.createElement("path", {
  d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
})), "WhatsApp"));

// SVG pattern of arrows+ — inline so we control size + color
const V2Pattern = ({
  color = V2_BLUE,
  opacity = 1,
  scale = 1
}) => {
  const id = React.useId();
  return /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: "100%",
    style: {
      position: 'absolute',
      inset: 0,
      opacity
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
    id: id,
    x: "0",
    y: "0",
    width: 120 * scale,
    height: 70 * scale,
    patternUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("g", {
    transform: `scale(${scale})`
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 50 Q 28 65, 60 42",
    stroke: color,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 42 L 50 39 M60 42 L 58 33",
    stroke: color,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M82 22 L 82 50 M 70 36 L 94 36",
    stroke: color,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    fill: "none"
  })))), /*#__PURE__*/React.createElement("rect", {
    width: "100%",
    height: "100%",
    fill: `url(#${id})`
  }));
};
const V2Hero = () => {
  const [hour, setHour] = React.useState('');
  React.useEffect(() => {
    const tick = () => {
      const d = new Date();
      setHour(d.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      minHeight: 'calc(100vh - 80px)',
      padding: '0 16px',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '64px 48px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignSelf: 'flex-start',
      alignItems: 'center',
      gap: 10,
      padding: '8px 14px',
      background: V2_BLUE_TINT,
      color: V2_BLUE,
      borderRadius: 999,
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 12,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: '#22C55E',
      boxShadow: '0 0 0 4px rgba(34,197,94,0.2)'
    }
  }), "Operando \xB7 ", hour, " BRT"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: '"Sora", system-ui',
      fontWeight: 700,
      fontSize: 'clamp(64px, 8.5vw, 132px)',
      lineHeight: 0.92,
      letterSpacing: '-0.045em',
      color: V2_INK,
      margin: 0
    }
  }, "Gest\xE3o.", /*#__PURE__*/React.createElement("br", null), "Mem\xF3ria.", /*#__PURE__*/React.createElement("br", null), "Conformidade.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: V2_BLUE,
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: 16
    }
  }, "Sob controle", /*#__PURE__*/React.createElement(V2ArrowPlus, {
    size: 120,
    color: V2_BLUE
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'Sora, system-ui',
      fontSize: 18,
      lineHeight: 1.55,
      color: V2_INK_SOFT,
      marginTop: 40,
      maxWidth: 560
    }
  }, "Software house brasileira focada em ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: V2_INK,
      fontWeight: 600
    }
  }, "digitaliza\xE7\xE3o documental, sistemas sob medida e automa\xE7\xE3o"), " para empresas com legado a organizar."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      background: V2_BLUE,
      color: 'white',
      border: 'none',
      padding: '18px 28px',
      borderRadius: 12,
      fontFamily: 'Sora, system-ui',
      fontSize: 15,
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      boxShadow: '0 8px 24px rgba(59,123,168,0.25)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
  })), "Falar no WhatsApp"), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'white',
      color: V2_INK,
      border: `1px solid ${V2_LINE}`,
      padding: '18px 28px',
      borderRadius: 12,
      fontFamily: 'Sora, system-ui',
      fontSize: 15,
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, "Ver servi\xE7os \u2192"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 11,
      color: V2_INK_SOFT,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: 16
    }
  }, "Confiam na Scandex+"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 32,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, ['Hospital do Olho', 'Clínica Visão+', 'Prefeitura de São Lourenço', 'Castro & Advogados', 'Rede Farma+', 'Colégio Phoenix'].map(n => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      fontFamily: 'Sora, system-ui',
      fontSize: 14,
      fontWeight: 500,
      color: V2_INK_SOFT
    }
  }, n))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: V2_BLUE,
      borderRadius: 24,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      padding: 32,
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(V2Pattern, {
    color: "white",
    opacity: 0.08,
    scale: 0.7
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 11,
      color: 'rgba(255,255,255,0.7)',
      textTransform: 'uppercase',
      letterSpacing: '0.15em'
    }
  }, "ScandexPRO\u2122 \xB7 em produ\xE7\xE3o"), /*#__PURE__*/React.createElement(V2ArrowPlus, {
    size: 36,
    color: "white"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'white',
      borderRadius: 16,
      padding: 0,
      boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '12px 16px',
      borderBottom: `1px solid ${V2_LINE}`,
      background: '#FAFAFB'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: '#FF5F57'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: '#FEBC2E'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: '#28C840'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      marginLeft: 16,
      padding: '4px 12px',
      background: 'white',
      border: `1px solid ${V2_LINE}`,
      borderRadius: 6,
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 11,
      color: V2_INK_SOFT
    }
  }, "scandexpro.com.br/dashboard")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Sora, system-ui',
      fontSize: 13,
      fontWeight: 600,
      color: V2_INK
    }
  }, "Documentos \xB7 Setembro 2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 10,
      padding: '3px 8px',
      background: V2_BLUE_TINT,
      color: V2_BLUE,
      borderRadius: 4,
      fontWeight: 600
    }
  }, "2.4M+"))), [{
    id: '08-2412-PRO',
    name: 'Prontuário · Maria S.',
    status: 'Disponível',
    color: '#10B981'
  }, {
    id: '08-2411-PRO',
    name: 'Exame · João T.',
    status: 'Processando',
    color: V2_BLUE
  }, {
    id: '08-2410-PRO',
    name: 'Receita · Ana B.',
    status: 'Disponível',
    color: '#10B981'
  }, {
    id: '08-2409-PRO',
    name: 'Internação · Paulo R.',
    status: 'Alterado',
    color: '#F59E0B'
  }, {
    id: '08-2408-PRO',
    name: 'Laudo · Clara M.',
    status: 'Disponível',
    color: '#10B981'
  }].map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto auto',
      gap: 12,
      alignItems: 'center',
      padding: '10px 12px',
      borderRadius: 8,
      background: i === 1 ? V2_BLUE_TINT : 'transparent',
      fontFamily: 'Sora, system-ui',
      fontSize: 12,
      marginBottom: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: d.color
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: V2_INK
    }
  }, d.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 10,
      color: V2_INK_SOFT
    }
  }, d.id)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: V2_INK_SOFT
    }
  }, d.status), /*#__PURE__*/React.createElement("button", {
    style: {
      border: `1px solid ${V2_LINE}`,
      background: 'white',
      padding: '4px 8px',
      borderRadius: 6,
      fontSize: 10,
      color: V2_INK_SOFT,
      cursor: 'pointer'
    }
  }, "Abrir")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 20px',
      borderTop: `1px solid ${V2_LINE}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 10,
      color: V2_INK_SOFT
    }
  }, /*#__PURE__*/React.createElement("span", null, "5 de 2.412.886 documentos"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: '#10B981'
    }
  }), "uptime 99.97%"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 12
    }
  }, [['7+', 'anos'], ['43', 'clientes'], ['2.4M', 'docs']].map(([n, l], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: 12,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Sora, system-ui',
      fontWeight: 700,
      fontSize: 28,
      color: 'white',
      letterSpacing: '-0.02em'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Sora, system-ui',
      fontSize: 11,
      color: 'rgba(255,255,255,0.7)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginTop: 4
    }
  }, l))))));
};
const V2About = () => /*#__PURE__*/React.createElement("section", {
  style: {
    padding: '120px 64px',
    background: 'white'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 80,
    alignItems: 'center'
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11,
    color: V2_BLUE,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: 24
  }
}, "[01] Sobre a Scandex+"), /*#__PURE__*/React.createElement("h2", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontWeight: 700,
    fontSize: 'clamp(40px, 5vw, 64px)',
    lineHeight: 1.05,
    letterSpacing: '-0.03em',
    color: V2_INK,
    margin: 0
  }
}, "Nascemos em um arquivo hospitalar.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
  style: {
    color: V2_BLUE
  }
}, "Crescemos sistematizando o caos.")), /*#__PURE__*/React.createElement("p", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 17,
    lineHeight: 1.6,
    color: V2_INK_SOFT,
    marginTop: 32
  }
}, "Come\xE7amos digitalizando milh\xF5es de prontu\xE1rios do Hospital do Olho Julio C\xE2ndido de Brito \u2014 e construindo o ScandexPRO\u2122, o GED hospitalar que hoje \xE9 nosso carro-chefe. Hoje atendemos cl\xEDnicas, farm\xE1cias, escolas, escrit\xF3rios de advocacia e prefeituras: lugares onde d\xE9cadas de papel encontram opera\xE7\xF5es que n\xE3o podem parar."), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 24,
    marginTop: 40
  }
}, [['Eficiência operacional', 'Cada projeto começa com um diagnóstico — sem ele, código vira retrabalho.'], ['Tecnologia madura', 'Usamos o que aguenta produção. Nada de hype, tudo de seriedade.'], ['Refino e clareza', 'Sistemas que sua equipe entende sem manual de 80 páginas.'], ['Conformidade real', 'LGPD, CFM, retenção legal — desenhado pra passar em auditoria.']].map(([t, b], i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  style: {
    borderTop: `2px solid ${V2_BLUE}`,
    paddingTop: 16
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontWeight: 600,
    fontSize: 15,
    color: V2_INK,
    marginBottom: 6
  }
}, t), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 13,
    lineHeight: 1.5,
    color: V2_INK_SOFT
  }
}, b))))), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'relative',
    height: 560
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    inset: 0,
    background: V2_BLUE_TINT,
    borderRadius: 20,
    overflow: 'hidden'
  }
}, /*#__PURE__*/React.createElement(V2Pattern, {
  color: V2_BLUE,
  opacity: 0.12,
  scale: 0.8
})), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    top: 40,
    left: 40,
    right: 40,
    padding: 32,
    background: 'white',
    borderRadius: 16,
    border: `1px solid ${V2_LINE}`,
    boxShadow: '0 12px 40px rgba(0,0,0,0.06)'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24
  }
}, /*#__PURE__*/React.createElement(V2Wordmark, {
  size: 18
}), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 10,
    color: V2_INK_SOFT
  }
}, "FUNDADO \xB7 2018")), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: '"Fraunces", serif',
    fontSize: 24,
    lineHeight: 1.35,
    color: V2_INK,
    fontStyle: 'italic',
    fontWeight: 300
  }
}, "\"Tirar a empresa da gaveta e p\xF4r na nuvem \u2014 sem perder o hist\xF3rico no caminho.\""), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 24,
    fontFamily: 'Sora, system-ui',
    fontSize: 12,
    color: V2_INK_SOFT
  }
}, "\u2014 Manifesto Scandex+")), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    bottom: 40,
    right: 32,
    padding: 20,
    background: V2_INK,
    color: 'white',
    borderRadius: 12,
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 12,
    maxWidth: 280,
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 8,
    marginBottom: 12
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: '#10B981'
  }
}, "\u25CF"), /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'rgba(255,255,255,0.5)'
  }
}, "scandex.status")), /*#__PURE__*/React.createElement("div", {
  style: {
    lineHeight: 1.6
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: V2_BLUE_LIGHT
  }
}, "43 clientes"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
  style: {
    color: V2_BLUE_LIGHT
  }
}, "2.4M docs"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
  style: {
    color: V2_BLUE_LIGHT
  }
}, "99.97% uptime"))))));
const V2_SERVICES = [{
  n: '01',
  title: 'Software sob medida',
  short: 'Sistemas web e desktop construídos do zero.',
  items: ['Next.js & TypeScript', 'Electron desktop', 'Integração com ERPs e legados', 'Mobile (PWA / React Native)']
}, {
  n: '02',
  title: 'Digitalização (GED)',
  short: 'Captura, OCR, indexação e custódia.',
  items: ['Scanners de produção', 'OCR multi-idioma', 'Conformidade LGPD/CFM', 'Backup e retenção legal']
}, {
  n: '03',
  title: 'Automação de processos',
  short: 'Tira a planilha do meio do caminho.',
  items: ['RPA e workflows', 'BPMN customizado', 'APIs e webhooks', 'Aprovações e SLAs']
}, {
  n: '04',
  title: 'Consultoria digital',
  short: 'Diagnóstico antes do código.',
  items: ['Mapa de sistemas atual', 'Roadmap 12-24 meses', 'Arquitetura técnica', 'Análise de compliance']
}, {
  n: '05',
  title: 'Suporte & manutenção',
  short: 'Sustentação contínua, plantão, SLA.',
  items: ['Monitoramento 24/7', 'Plantão hospitalar', 'SLAs de resposta', 'Patches de segurança']
}];
const V2Services = () => {
  const [active, setActive] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '120px 64px',
      background: V2_INK,
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(V2Pattern, {
    color: "white",
    opacity: 0.025,
    scale: 1
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 80,
      marginBottom: 60
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 11,
      color: V2_BLUE_LIGHT,
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      marginBottom: 24
    }
  }, "[02] Servi\xE7os"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'Sora, system-ui',
      fontWeight: 700,
      fontSize: 'clamp(40px, 5vw, 64px)',
      lineHeight: 1.05,
      letterSpacing: '-0.03em',
      color: 'white',
      margin: 0
    }
  }, "Cinco frentes.", /*#__PURE__*/React.createElement("br", null), "Um \xFAnico ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: V2_BLUE_LIGHT
    }
  }, "princ\xEDpio"), ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'Sora, system-ui',
      fontSize: 17,
      lineHeight: 1.6,
      color: 'rgba(255,255,255,0.6)',
      alignSelf: 'flex-end',
      margin: 0
    }
  }, "N\xE3o vendemos cada servi\xE7o isolado. Vendemos a opera\xE7\xE3o inteira sob controle \u2014 do papel empilhado no almoxarifado ao dashboard de gest\xE3o na tela do diretor.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '1fr 1.5fr',
      gap: 48,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, V2_SERVICES.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onMouseEnter: () => setActive(i),
    onClick: () => setActive(i),
    style: {
      padding: '24px 0',
      borderTop: `1px solid ${active === i ? V2_BLUE_LIGHT : 'rgba(255,255,255,0.1)'}`,
      cursor: 'pointer',
      display: 'grid',
      gridTemplateColumns: '60px 1fr auto',
      alignItems: 'center',
      gap: 16,
      transition: 'all 0.3s ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 12,
      color: active === i ? V2_BLUE_LIGHT : 'rgba(255,255,255,0.4)'
    }
  }, s.n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Sora, system-ui',
      fontSize: 22,
      fontWeight: 600,
      letterSpacing: '-0.02em',
      color: active === i ? 'white' : 'rgba(255,255,255,0.5)',
      transition: 'all 0.3s ease'
    }
  }, s.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      color: V2_BLUE_LIGHT,
      opacity: active === i ? 1 : 0,
      transform: active === i ? 'translateX(0)' : 'translateX(-8px)',
      transition: 'all 0.3s ease'
    }
  }, "\u2192")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(255,255,255,0.05)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 20,
      padding: 40,
      minHeight: 480
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 12,
      background: V2_BLUE,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(V2ArrowPlus, {
    size: 36,
    color: "white"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 11,
      color: V2_BLUE_LIGHT,
      textTransform: 'uppercase',
      letterSpacing: '0.1em'
    }
  }, "Servi\xE7o ", V2_SERVICES[active].n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Sora, system-ui',
      fontSize: 24,
      fontWeight: 600,
      color: 'white',
      marginTop: 2
    }
  }, V2_SERVICES[active].title))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: '"Fraunces", serif',
      fontSize: 28,
      lineHeight: 1.3,
      fontStyle: 'italic',
      color: 'white',
      fontWeight: 300,
      margin: 0,
      marginBottom: 32,
      letterSpacing: '-0.01em'
    }
  }, V2_SERVICES[active].short), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(255,255,255,0.1)',
      paddingTop: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 11,
      color: 'rgba(255,255,255,0.5)',
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      marginBottom: 16
    }
  }, "O que est\xE1 incluso"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, V2_SERVICES[active].items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '12px 16px',
      background: 'rgba(255,255,255,0.04)',
      borderRadius: 8,
      fontFamily: 'Sora, system-ui',
      fontSize: 14,
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: V2_BLUE_LIGHT
    }
  }, "\u2713"), it)))))));
};
const V2_STACK = [{
  cat: 'Frontend',
  icon: '◇',
  items: ['Next.js 15', 'React 18', 'TypeScript 5', 'Tailwind CSS', 'Electron 30', 'shadcn/ui']
}, {
  cat: 'Backend',
  icon: '◈',
  items: ['Node.js 22', 'PostgreSQL 16', 'Redis 7', 'Prisma ORM', 'tRPC', 'BullMQ']
}, {
  cat: 'Infra',
  icon: '◉',
  items: ['AWS EC2 + RDS', 'Docker', 'GitHub Actions', 'Cloudflare', 'Datadog', 'Sentry']
}, {
  cat: 'GED & OCR',
  icon: '◆',
  items: ['Tesseract OCR', 'Kofax Capture', 'TIFF / PDF/A', 'ZBar barcode', 'ImageMagick', 'PDFtk']
}];
const V2Stack = () => /*#__PURE__*/React.createElement("section", {
  style: {
    padding: '120px 64px',
    background: 'white'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 64,
    gap: 40
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11,
    color: V2_BLUE,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: 24
  }
}, "[03] Stack tecnol\xF3gica"), /*#__PURE__*/React.createElement("h2", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontWeight: 700,
    fontSize: 'clamp(40px, 5vw, 64px)',
    lineHeight: 1.05,
    letterSpacing: '-0.03em',
    color: V2_INK,
    margin: 0
  }
}, "Ferramentas ", /*#__PURE__*/React.createElement("span", {
  style: {
    color: V2_BLUE
  }
}, "maduras"), ",", /*#__PURE__*/React.createElement("br", null), "escolhidas a dedo.")), /*#__PURE__*/React.createElement("p", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 16,
    lineHeight: 1.55,
    color: V2_INK_SOFT,
    maxWidth: 380,
    margin: 0
  }
}, "N\xE3o usamos cada nova framework que sai. O que vai pra produ\xE7\xE3o precisa aguentar plant\xE3o hospitalar de madrugada \u2014 ent\xE3o prefere-se boring.")), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 0,
    border: `1px solid ${V2_LINE}`,
    borderRadius: 16,
    overflow: 'hidden'
  }
}, V2_STACK.map((s, i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  style: {
    padding: 32,
    borderRight: i < 3 ? `1px solid ${V2_LINE}` : 'none',
    background: i % 2 === 0 ? 'white' : '#FAFBFC'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    paddingBottom: 24,
    borderBottom: `1px solid ${V2_LINE}`
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: V2_BLUE_TINT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: V2_BLUE,
    fontSize: 18
  }
}, s.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 10,
    color: V2_INK_SOFT,
    textTransform: 'uppercase',
    letterSpacing: '0.1em'
  }
}, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 16,
    fontWeight: 600,
    color: V2_INK
  }
}, s.cat))), /*#__PURE__*/React.createElement("ul", {
  style: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  }
}, s.items.map(it => /*#__PURE__*/React.createElement("li", {
  key: it,
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 14,
    color: V2_INK,
    padding: '10px 0',
    borderBottom: `1px dashed ${V2_LINE}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}, /*#__PURE__*/React.createElement("span", null, it), /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 10,
    color: '#10B981'
  }
}, "\u25CF prod"))))))));
const V2CTA = () => /*#__PURE__*/React.createElement("section", {
  style: {
    padding: '64px',
    background: V2_BLUE,
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    margin: '0 16px 16px',
    borderRadius: 24
  }
}, /*#__PURE__*/React.createElement(V2Pattern, {
  color: "white",
  opacity: 0.07,
  scale: 1.4
}), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: 80,
    alignItems: 'center'
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11,
    color: V2_BLUE_LIGHT,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: 24
  }
}, "[04] Pr\xF3ximo passo"), /*#__PURE__*/React.createElement("h2", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontWeight: 700,
    fontSize: 'clamp(48px, 6vw, 88px)',
    lineHeight: 0.98,
    letterSpacing: '-0.03em',
    color: 'white',
    margin: 0
  }
}, "Conta pra gente o", /*#__PURE__*/React.createElement("br", null), "tamanho do seu legado.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
  style: {
    color: V2_BLUE_LIGHT
  }
}, "Devolvemos um plano em 24h.")), /*#__PURE__*/React.createElement("p", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 18,
    lineHeight: 1.55,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 32,
    maxWidth: 560
  }
}, "Diagn\xF3stico inicial sem custo. Voc\xEA manda fotos do arquivo, screenshots do sistema atual ou um print do problema \u2014 devolvemos um caminho t\xE9cnico e uma estimativa."), /*#__PURE__*/React.createElement("button", {
  style: {
    marginTop: 40,
    background: 'white',
    color: V2_BLUE,
    border: 'none',
    padding: '22px 36px',
    borderRadius: 12,
    fontFamily: 'Sora, system-ui',
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 12,
    boxShadow: '0 12px 40px rgba(0,0,0,0.2)'
  }
}, /*#__PURE__*/React.createElement("svg", {
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, /*#__PURE__*/React.createElement("path", {
  d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
})), "Falar no WhatsApp", /*#__PURE__*/React.createElement("span", null, "\u2192")), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 24,
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)'
  }
}, "+55 (32) 9 8765-4321 \xB7 seg-sex 9h-18h")), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  }
}, /*#__PURE__*/React.createElement(V2ArrowPlus, {
  size: 420,
  color: V2_BLUE_LIGHT,
  opacity: 0.5
}))));
const V2Footer = () => /*#__PURE__*/React.createElement("footer", {
  style: {
    padding: '48px 64px 32px',
    background: 'white'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: 40,
    paddingBottom: 32,
    borderBottom: `1px solid ${V2_LINE}`
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(V2Wordmark, {
  size: 28
}), /*#__PURE__*/React.createElement("p", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 14,
    lineHeight: 1.5,
    color: V2_INK_SOFT,
    marginTop: 16,
    maxWidth: 320
  }
}, "Software house brasileira. Efici\xEAncia, tecnologia e refino para empresas que precisam p\xF4r a opera\xE7\xE3o em ordem.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11,
    color: V2_BLUE,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: 12
  }
}, "Servi\xE7os"), ['Software sob medida', 'Digitalização (GED)', 'Automação', 'Consultoria', 'Suporte'].map(x => /*#__PURE__*/React.createElement("div", {
  key: x,
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 14,
    color: V2_INK,
    padding: '6px 0'
  }
}, x))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11,
    color: V2_BLUE,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: 12
  }
}, "Empresa"), ['Sobre', 'Manifesto', 'Cases', 'Carreiras', 'Imprensa'].map(x => /*#__PURE__*/React.createElement("div", {
  key: x,
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 14,
    color: V2_INK,
    padding: '6px 0'
  }
}, x))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11,
    color: V2_BLUE,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: 12
  }
}, "Contato"), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 14,
    color: V2_INK,
    padding: '6px 0'
  }
}, "contato@scandexplus.com.br"), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 14,
    color: V2_INK,
    padding: '6px 0'
  }
}, "+55 (32) 9 8765-4321"), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Sora, system-ui',
    fontSize: 14,
    color: V2_INK,
    padding: '6px 0'
  }
}, "Belo Horizonte, MG"))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 24,
    fontFamily: 'Sora, system-ui',
    fontSize: 13,
    color: V2_INK_SOFT
  }
}, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Scandex+ Servi\xE7os Digitais"), /*#__PURE__*/React.createElement("span", {
  style: {
    fontStyle: 'italic'
  }
}, "Powered by ScandexPRO\u2122")));
const LandingV2 = () => /*#__PURE__*/React.createElement("div", {
  style: {
    background: '#F4F6F8',
    minHeight: '100vh'
  }
}, /*#__PURE__*/React.createElement(V2Nav, null), /*#__PURE__*/React.createElement(V2Hero, null), /*#__PURE__*/React.createElement(V2About, null), /*#__PURE__*/React.createElement(V2Services, null), /*#__PURE__*/React.createElement(V2Stack, null), /*#__PURE__*/React.createElement(V2CTA, null), /*#__PURE__*/React.createElement(V2Footer, null));
window.LandingV2 = LandingV2;
})(); } catch (e) { __ds_ns.__errors.push({ path: "uploads/Landing Page ScandexPlus/v2-tech-corporate.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.BlueHeader = __ds_scope.BlueHeader;

__ds_ns.ICON_PATHS = __ds_scope.ICON_PATHS;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.MobileButton = __ds_scope.MobileButton;

__ds_ns.MobileCard = __ds_scope.MobileCard;

__ds_ns.SearchField = __ds_scope.SearchField;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.DOC_STATUS_META = __ds_scope.DOC_STATUS_META;

__ds_ns.StatusDot = __ds_scope.StatusDot;

__ds_ns.StatusLegend = __ds_scope.StatusLegend;

__ds_ns.TabBar = __ds_scope.TabBar;

})();
