/** The landing page's own footer — distinct from the site's shared Footer component (see SiteShell's `chrome` prop). */
export function PragyaFooter() {
  return (
    <footer aria-label="Pragya footer navigation" className="continuation">
      <div className="footer-statement">
        <p>ONE SOVEREIGN INTELLIGENCE.</p>
        <strong>MULTIPLE EMBODIED CAPABILITIES.</strong>
      </div>
      <nav aria-label="About Pragya" className="footer-links">
        <a href="/?view=vision" rel="noreferrer" target="_blank">
          Vision
        </a>
        <a href="/?view=research" rel="noreferrer" target="_blank">
          Research
        </a>
        <a href="/?view=team" rel="noreferrer" target="_blank">
          Team
        </a>
        <a href="mailto:hello@pragyalab.ai" rel="noreferrer" target="_blank">
          Contact
        </a>
      </nav>
    </footer>
  );
}
