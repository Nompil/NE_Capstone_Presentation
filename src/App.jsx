import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SlideView from './components/SlideView.jsx';
import { TermsLauncher } from './components/PresentationPolish.jsx';
import { appendixSlides } from './data/appendix.js';
import { mainSlides } from './data/slides.js';
import { projectStatus } from './data/projectStatus.js';

const allSlides = [...mainSlides, ...appendixSlides];
const qaItems = [
  ['Frontend / API integration', 'system-integration'],
  ['Insights API evidence', 'appendix-app-evidence'],
  ['Core data model', 'data-model'],
  ['SQL evidence', 'sql-evidence'],
  ['SQL / Lambda / API / alerts', 'appendix-technical'],
  ['Business problem', 'scenario'],
  ['Architecture', 'aws-architecture'],
  ['Why RDS?', 'appendix-rds'],
  ['Why DynamoDB?', 'appendix-dynamodb'],
  ['Why SQS?', 'appendix-sqs'],
  ['Security', 'security'],
  ['Cost', 'finops'],
  ['Budget', 'finops'],
  ['Stakeholders', 'business-analysis'],
  ['Users / RBAC', 'security'],
  ['Scalability', 'roadmap'],
  ['SLA', 'appendix-risk'],
  ['Data Quality', 'data-quality'],
  ['Risk Rules', 'appendix-risk'],
  ['Risk monitoring', 'solution-difference'],
  ['Testing', 'testing'],
  ['Limitations', 'well-architected'],
  ['Future roadmap', 'roadmap'],
  ['Evidence', 'testing']
];

const closingTopics = [
  ['Business problem', 'scenario'],
  ['Architecture', 'aws-architecture'],
  ['Service choices', 'foundations'],
  ['Security', 'security'],
  ['Cost', 'finops'],
  ['Testing', 'testing'],
  ['Risk monitoring', 'solution-difference'],
  ['Scalability', 'roadmap'],
  ['Lessons', 'lessons'],
  ['Future roadmap', 'roadmap']
];

const indexGroups = [
  { title: 'WHY', ids: ['cover', 'about', 'scenario'] },
  { title: 'WHAT', ids: ['assignment', 'disciplines', 'business-analysis'] },
  { title: 'HOW', ids: ['solution-design', 'data-model', 'sql-evidence', 'aws-architecture', 'system-integration', 'foundations', 'security', 'finops'] },
  { title: 'SHOW', ids: ['solution-difference', 'data-quality', 'testing', 'well-architected'] },
  { title: 'LEARN', ids: ['delivery', 'lessons', 'skills'] },
  { title: 'SCALE', ids: ['roadmap'] },
  { title: 'CLOSE', ids: ['closing'] }
];
const navigationGroups = [
  ...indexGroups,
  { title: 'APPENDIX', ids: appendixSlides.map((slide) => slide.id) }
];

const evidenceItems = [
  { label: 'API → Workbench · hero capture and request / JSON evidence', slideId: 'system-integration' },
  { label: 'Insights dashboard API requests · appendix capture 06', slideId: 'appendix-app-evidence' },
  { label: 'Core data model · supplied ERD and implementation comparison', slideId: 'data-model' },
  { label: 'SQL query · repository source and live walkthrough', slideId: 'sql-evidence' },
  { label: 'LIVE SYSTEM DEMONSTRATION · dedicated presenter slide', slideId: 'appendix-live-demo' },
  { label: 'TECHNICAL WALKTHROUGH · SQL, Lambda, API, alerts & documents', slideId: 'appendix-technical' },
  { label: 'Use Case / Activity / Wireframe · supplied design evidence', slideId: 'business-analysis' },
  { label: 'Original architecture evidence', slideId: 'aws-architecture' },
  { label: 'Imbokodo Bank application screens', slideId: 'solution-difference' },
  { label: 'Quarantine and recovery evidence', slideId: 'data-quality' },
  { label: 'R2 rules and interactive score explorer', slideId: 'appendix-risk' },
  { label: 'Recorded Linux verification & historical milestones', slideId: 'testing' },
  { label: 'Source images and R2 captures', slideId: 'appendix-app-evidence' },
  { label: 'Prudential Authority sources', slideId: 'appendix-references' }
];

function readSlideId(hash) {
  try {
    return decodeURIComponent(hash.replace(/^#(?:slide\/)?/, ''));
  } catch {
    return '';
  }
}

function isTypingTarget(target) {
  return target instanceof HTMLElement && (
    target.isContentEditable ||
    target.closest('input, textarea, select, [contenteditable="true"], .problem-detail-dialog')
  );
}

function Panel({ type, onClose, onNavigate, setAnnouncement, assetBase }) {
  const panelRef = useRef(null);
  const title = {
    index: 'Presentation Index',
    qa: 'Q&A · Quick Access',
    architecture: 'Architecture Quick Access',
    evidence: 'View Evidence'
  }[type];

  useEffect(() => {
    panelRef.current?.focus();
  }, [type]);

  const item = (label, id) => (
    <button className="menu-item" key={`${label}-${id}`} type="button" onClick={() => onNavigate(id)}>
      <span>{label}</span>
      <span aria-hidden="true">↗</span>
    </button>
  );

  return (
    <div className="panel-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        aria-labelledby="panel-title"
        aria-modal="true"
        className="command-panel"
        ref={panelRef}
        role="dialog"
        tabIndex={-1}
      >
        <header className="command-panel-header">
          <div><span>IMBOKODO RISK AND COMPLIANCE WORKBENCH</span><h2 id="panel-title">{title}</h2></div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="Close panel">×</button>
        </header>

        {type === 'index' && (
          <div className="panel-scroll">
            {indexGroups.map((group) => {
              const slides = group.ids.map((id) => mainSlides.find((slide) => slide.id === id)).filter(Boolean);
              return (
                <section className="menu-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <div className="menu-grid">{slides.map((slide) => item(slide.id === 'cover' ? 'Home' : slide.title, slide.id))}</div>
                </section>
              );
            })}
            <section className="menu-group">
              <h3>TECHNICAL APPENDIX</h3>
              <div className="menu-grid">{appendixSlides.map((slide) => item(`${slide.appendix} · ${slide.title}`, slide.id))}</div>
            </section>
          </div>
        )}

        {type === 'qa' && (
          <div className="panel-scroll">
            <p className="panel-quote">Trust the data. Understand the risk. Prove the decision.</p>
            <section className="menu-group">
              <h3>ASK ME ABOUT</h3>
              <div className="menu-grid">{qaItems.map(([label, id]) => item(label, id))}</div>
            </section>
            <p className="panel-hint">Press Q to open this index. Choose a topic to jump directly to its slide.</p>
          </div>
        )}

        {type === 'architecture' && (
          <div className="panel-scroll">
            <section className="menu-group">
              <h3>ARCHITECTURE</h3>
              <div className="menu-grid">
                {item('Three-Tier Architecture', 'aws-architecture')}
                {item('Service Choices', 'foundations')}
                {item('Scale and Resilience', 'well-architected')}
                {item('Security and Operations', 'security')}
                {item('Detailed Architecture Appendix', 'appendix-architecture')}
              </div>
            </section>
          </div>
        )}

        {type === 'evidence' && (
          <div className="panel-scroll">
            <p className="panel-hint">Source images included with the presentation open directly; evidence not present here is identified as available in the project repository.</p>
            <section className="menu-group">
              <h3>EXISTING EVIDENCE AREAS</h3>
              <div className="evidence-list">
                {evidenceItems.map((evidence) => (
                  <div className="evidence-row" key={evidence.label}>
                    <span>{evidence.label}</span>
                    {evidence.slideId ? (
                      <button type="button" className="evidence-action" onClick={() => {
                        onNavigate(evidence.slideId);
                        setAnnouncement(`Opened ${evidence.label}.`);
                      }}>Open evidence</button>
                    ) : evidence.asset ? (
                      <a className="evidence-action" href={`${assetBase}${evidence.asset}`} target="_blank" rel="noopener noreferrer">View image</a>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
            <button className="panel-link" type="button" onClick={() => {
              onNavigate('testing');
              setAnnouncement('Opened the testing and verification slide.');
            }}>Go to Testing & Verification <span aria-hidden="true">→</span></button>
          </div>
        )}
      </section>
    </div>
  );
}

function PresentationToolbar({
  activeIndex,
  mode,
  onNavigate,
  onPanel,
  onToggleMode,
  onToggleFullscreen,
  onToggleAudience,
  isFullscreen
}) {
  const activeSlide = allSlides[activeIndex];
  const isAppendix = Boolean(activeSlide.appendix);
  const countText = isAppendix
    ? `A${activeSlide.appendix.slice(1).padStart(2, '0')} / A${String(appendixSlides.length).padStart(2, '0')}`
    : `${String(activeIndex + 1).padStart(2, '0')} / ${String(mainSlides.length).padStart(2, '0')}`;
  const progress = isAppendix
    ? ((activeIndex - mainSlides.length + 1) / appendixSlides.length) * 100
    : ((activeIndex + 1) / mainSlides.length) * 100;

  return (
    <header className="presentation-toolbar">
      <div className="toolbar-brand" aria-label="Imbokodo Risk and Compliance Workbench presentation">
        <span className="toolbar-emblem">I</span>
        <span><strong>IMBOKODO BANK</strong><small>RISK &amp; COMPLIANCE WORKBENCH</small></span>
      </div>
      <div className="toolbar-current" aria-live="polite">
        <strong>{countText}</strong>
        <span>{activeSlide.title}</span>
        <div className="toolbar-progress" role="progressbar" aria-label="Chapter progress" aria-valuenow={Math.round(progress)} aria-valuemin="0" aria-valuemax="100">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="toolbar-actions" aria-label="Presentation controls">
          <button type="button" onClick={() => onPanel('index')} title="Presentation Index">Index</button>
          <button type="button" onClick={() => onPanel('qa')} title="Q opens the Q&A index">Q&amp;A</button>
          <button type="button" onClick={() => onPanel('architecture')} title="A jumps to Architecture">Architecture</button>
          <button type="button" onClick={() => onPanel('evidence')} title="E opens Evidence">Evidence</button>
          <TermsLauncher />
          <a className="toolbar-demo-link" href={projectStatus.liveDemoUrl} target="_blank" rel="noopener noreferrer" title="Runs on the presenter’s computer. Remote viewers need their own running copy.">Presenter demo <small>LOCAL COMPUTER</small></a>
        <button type="button" onClick={onToggleAudience} title="P toggles a clean audience view">Audience view</button>
        <button className="toolbar-mode" type="button" onClick={onToggleMode}>{mode === 'present' ? 'Browse' : 'Present'}</button>
        <button type="button" onClick={onToggleFullscreen}>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</button>
      </div>
      <div className="toolbar-navigation">
        <button type="button" onClick={() => onNavigate(-1)} disabled={activeIndex <= 0} aria-label="Previous slide">←</button>
        <button type="button" onClick={() => onNavigate(1)} disabled={(!isAppendix && activeIndex >= mainSlides.length - 1) || activeIndex >= allSlides.length - 1} aria-label="Next slide">→</button>
      </div>
    </header>
  );
}

function StoryNavigation({ activeSlide, onNavigate }) {
  return (
    <nav className="story-navigation" aria-label="Presentation chapter groups">
      {navigationGroups.map((group, index) => {
        const activePosition = group.ids.indexOf(activeSlide.id);
        const active = activePosition >= 0;
        const progress = active ? (activePosition + 1) / group.ids.length : 0;
        return (
          <button
            aria-current={active ? 'step' : undefined}
            aria-label={`Go to ${group.title.toLowerCase()} chapter group${active ? `, chapter ${activePosition + 1} of ${group.ids.length}` : ''}`}
            className={`story-navigation__item story-navigation__item--${group.title.toLowerCase()}${active ? ' is-active' : ''}`}
            key={group.title}
            onClick={() => onNavigate(group.ids[0])}
            style={{ '--group-progress': progress }}
            type="button"
          >
            <span className="story-navigation__number">{String(index + 1).padStart(2, '0')}</span>
            <span className="story-navigation__title">{group.title}</span>
            <span className="story-navigation__count">{active ? `${activePosition + 1} / ${group.ids.length}` : `${group.ids.length} ${group.ids.length === 1 ? 'slide' : 'slides'}`}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default function App() {
  const initialId = readSlideId(window.location.hash);
  const initialIndex = allSlides.findIndex((slide) => slide.id === initialId);
  const [activeIndex, setActiveIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [mode, setMode] = useState('present');
  const [panel, setPanel] = useState('');
  const [scale, setScale] = useState(0.5);
  const [announcement, setAnnouncement] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement));
  const [audienceView, setAudienceView] = useState(false);
  const allSlideCount = mainSlides.length;

  const currentSlide = allSlides[activeIndex];
  const assetBase = `${import.meta.env.BASE_URL}assets/`;
  const logoSrc = `${assetBase}image-1-1.png`;
  const profileSrc = `${assetBase}profile.jpg`;

  const navigateTo = useCallback((id) => {
    const index = allSlides.findIndex((slide) => slide.id === id);
    if (index < 0) {
      setAnnouncement(`Could not find the requested slide: ${id}.`);
      return;
    }
    setActiveIndex(index);
    setPanel('');
    window.history.replaceState(null, '', `#slide/${encodeURIComponent(id)}`);
    setAnnouncement(`Slide ${index + 1}: ${allSlides[index].title}`);
    if (mode === 'browse') {
      requestAnimationFrame(() => document.querySelector(`[data-slide-id="${CSS.escape(id)}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    }
  }, [mode]);

  const navigateBy = useCallback((direction) => {
    const nextIndex = activeIndex + direction;
    if (nextIndex < 0 || nextIndex >= allSlides.length) return;
    if (!currentSlide.appendix && nextIndex >= mainSlides.length) return;
    if (currentSlide.appendix && nextIndex < mainSlides.length) {
      navigateTo(mainSlides[mainSlides.length - 1].id);
      return;
    }
    navigateTo(allSlides[nextIndex].id);
  }, [activeIndex, currentSlide, navigateTo]);

  const toggleFullscreen = useCallback(async () => {
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch (error) {
        setAnnouncement(`Could not exit fullscreen: ${error.message}`);
      }
      return;
    }
    try {
      await document.documentElement.requestFullscreen();
      setAnnouncement('Fullscreen presentation mode enabled.');
    } catch (error) {
      setAnnouncement(`Fullscreen is unavailable in this browser. Use the browser's full-screen shortcut instead. ${error.message}`);
    }
  }, []);

  const openDemo = useCallback(() => {
    try {
      const opened = window.open(projectStatus.liveDemoUrl, '_blank');
      if (!opened) {
        setAnnouncement('The browser blocked the local demo tab. Allow pop-ups for this presentation and try again.');
        return;
      }
      opened.opener = null;
      setAnnouncement('Opening Imbokodo Risk and Compliance Workbench in a new tab.');
    } catch (error) {
      setAnnouncement(`Could not open the local demo: ${error.message}`);
    }
  }, []);

  const toggleMode = useCallback(() => {
    setPanel('');
    setMode((current) => current === 'present' ? 'browse' : 'present');
  }, []);

  useEffect(() => {
    const view = document.querySelector('.presentation-view');
    if (!view) return undefined;
    let resizeFrame;
    const updateScale = () => {
      const style = window.getComputedStyle(view);
      const horizontalPadding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      const verticalPadding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      const availableWidth = Math.max(1, view.clientWidth - horizontalPadding - (mode === 'browse' ? 64 : 0));
      const availableHeight = Math.max(1, view.clientHeight - verticalPadding - (mode === 'browse' ? 74 : 0));
      setScale(Math.min(1, availableWidth / 1920, availableHeight / 1080));
    };
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(updateScale);
    });
    observer.observe(view);
    updateScale();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(resizeFrame);
    };
  }, [mode]);

  useEffect(() => {
    const updateFullscreenState = () => {
      const fullscreen = Boolean(document.fullscreenElement);
      setIsFullscreen(fullscreen);
      setAudienceView(fullscreen);
    };
    document.addEventListener('fullscreenchange', updateFullscreenState);
    return () => document.removeEventListener('fullscreenchange', updateFullscreenState);
  }, []);

  useEffect(() => {
    if (mode !== 'browse') return undefined;
    const browseStage = document.querySelector('.browse-stage');
    if (!browseStage) return undefined;
    const updateActiveFromScroll = () => {
      const bounds = browseStage.getBoundingClientRect();
      const center = bounds.top + browseStage.clientHeight / 2;
      let closestId = currentSlide.id;
      let closestDistance = Infinity;
      browseStage.querySelectorAll('.slide-stage--browse').forEach((stage) => {
        const rect = stage.getBoundingClientRect();
        const distance = Math.abs((rect.top + rect.height / 2) - center);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = stage.dataset.slideId;
        }
      });
      const index = allSlides.findIndex((slide) => slide.id === closestId);
      if (index >= 0 && index !== activeIndex) {
        setActiveIndex(index);
        window.history.replaceState(null, '', `#slide/${encodeURIComponent(closestId)}`);
      }
    };
    browseStage.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    return () => browseStage.removeEventListener('scroll', updateActiveFromScroll);
  }, [activeIndex, currentSlide.id, mode]);

  useEffect(() => {
    if (mode !== 'browse') return;
    requestAnimationFrame(() => {
      document.querySelector(`[data-slide-id="${CSS.escape(currentSlide.id)}"]`)?.scrollIntoView({ behavior: 'auto', block: 'center' });
    });
  }, [mode, scale]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (document.querySelector('[data-presentation-dialog]')) return;
      if (isTypingTarget(event.target)) return;
      if (event.key === 'Escape') {
        if (panel) {
          setPanel('');
          return;
        }
        if (document.fullscreenElement) void toggleFullscreen();
        setAudienceView(false);
        return;
      }
      if (panel) return;
      if ((event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === 'PageDown') && !event.altKey && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        navigateBy(1);
        return;
      }
      if ((event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'PageUp') && !event.altKey && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        navigateBy(-1);
        return;
      }
      if (event.code === 'Space' && event.target instanceof Element && event.target.closest('button, a, summary')) return;
      if (event.code === 'Space' && !event.altKey && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        navigateBy(event.shiftKey ? -1 : 1);
        return;
      }
      if (event.key === 'Home') {
        event.preventDefault();
        navigateTo(mainSlides[0].id);
        return;
      }
      if (event.key === 'End') {
        event.preventDefault();
        navigateTo(mainSlides[mainSlides.length - 1].id);
        return;
      }
      const key = event.key.toLowerCase();
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (key === 'p') {
        setAudienceView((current) => !current);
        return;
      }
      const shortcuts = {
        a: 'aws-architecture',
        c: 'finops',
        s: 'security',
        t: 'testing',
        r: 'roadmap'
      };
      if (key === 'q') {
        setPanel('qa');
        return;
      }
      if (key === 'e') {
        setPanel('evidence');
        return;
      }
      if (key === 'd') {
        event.preventDefault();
        openDemo();
        return;
      }
      if (shortcuts[key]) {
        event.preventDefault();
        navigateTo(shortcuts[key]);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigateBy, navigateTo, openDemo, panel, toggleFullscreen]);

  useEffect(() => {
    const onHashChange = () => {
      const id = readSlideId(window.location.hash);
      const index = allSlides.findIndex((slide) => slide.id === id);
      if (index >= 0) setActiveIndex(index);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const menuTitle = useMemo(() => currentSlide.appendix
    ? `${currentSlide.appendix} · ${currentSlide.title}`
    : currentSlide.title, [currentSlide]);

  return (
    <div className={`presentation-app presentation-app--${mode}${audienceView && mode === 'present' ? ' presentation-app--audience' : ''}`}>
      <PresentationToolbar
        activeIndex={activeIndex}
        mode={mode}
        onNavigate={navigateBy}
        onPanel={setPanel}
        onToggleMode={toggleMode}
        onToggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
        onToggleAudience={() => { setMode('present'); setAudienceView(true); }}
      />
      <StoryNavigation activeSlide={currentSlide} onNavigate={navigateTo} />
      {audienceView && mode === 'present' && <nav className="audience-controls" aria-label="Audience view controls"><button type="button" aria-label="Previous slide" disabled={activeIndex === 0} onClick={() => navigateBy(-1)}>←</button><span>{currentSlide.appendix || `${activeIndex + 1} / ${mainSlides.length}`}</span><button type="button" aria-label="Next slide" disabled={activeIndex === (currentSlide.appendix ? allSlides.length : mainSlides.length) - 1} onClick={() => navigateBy(1)}>→</button><button type="button" onClick={() => setAudienceView(false)}>Show controls</button></nav>}
      <main className={`presentation-view presentation-view--${mode}`} aria-label="Imbokodo Risk and Compliance Workbench presentation slides">
        {mode === 'present' ? (
          <div className="presentation-stage">
            {allSlides.map((slide, index) => (
              <SlideView
                active={index === activeIndex}
                key={slide.id}
                logoSrc={logoSrc}
                mode="present"
                number={index + 1}
                appendixTotal={appendixSlides.length}
                onNavigate={navigateTo}
                profileSrc={profileSrc}
                assetBase={assetBase}
                qaItems={closingTopics}
                scale={scale}
                slide={slide}
                total={allSlideCount}
              />
            ))}
          </div>
        ) : (
          <div className="browse-stage">
            {allSlides.map((slide, index) => (
              <SlideView
                active={index === activeIndex}
                key={slide.id}
                logoSrc={logoSrc}
                mode="browse"
                number={index + 1}
                appendixTotal={appendixSlides.length}
                onNavigate={navigateTo}
                profileSrc={profileSrc}
                assetBase={assetBase}
                qaItems={closingTopics}
                scale={scale}
                slide={slide}
                total={allSlideCount}
              />
            ))}
          </div>
        )}
      </main>
      <p className="screen-reader-only" aria-live="polite">{announcement || menuTitle}</p>
      {panel && <Panel type={panel} onClose={() => setPanel('')} onNavigate={navigateTo} setAnnouncement={setAnnouncement} assetBase={assetBase} />}
    </div>
  );
}
