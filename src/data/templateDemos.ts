// Demo HTML content for each template live preview
export const TEMPLATE_DEMOS: Record<string, string> = {
  'amore-eterno': `
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Georgia', serif; color: #4a3728; background: #fdf8f4; overflow-x: hidden; }
  .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(135deg, #fdf2f0 0%, #fce8e4 50%, #f9ddd6 100%); position: relative; overflow: hidden; }
  .hero::before { content: ''; position: absolute; top: -50px; right: -50px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(199,134,134,0.12) 0%, transparent 70%); border-radius: 50%; animation: pulse-glow 4s ease-in-out infinite; }
  .hero::after { content: ''; position: absolute; bottom: -30px; left: -30px; width: 250px; height: 250px; background: radial-gradient(circle, rgba(199,134,134,0.08) 0%, transparent 70%); border-radius: 50%; animation: pulse-glow 4s ease-in-out infinite 2s; }
  @keyframes pulse-glow { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.2); opacity: 1; } }
  .hero-content { z-index: 1; padding: 2rem; }
  .hero h3 { font-size: 0.9rem; letter-spacing: 0.3em; text-transform: uppercase; color: #c78686; margin-bottom: 1rem; font-weight: 400; animation: fadeDown 1s ease 0.3s both; }
  .hero h1 { font-size: 3.5rem; font-weight: 300; line-height: 1.2; margin-bottom: 0.5rem; color: #5a3e36; animation: fadeDown 1s ease 0.5s both; }
  .hero h1 span { display: block; font-style: italic; color: #c78686; }
  .hero .date { font-size: 1.1rem; letter-spacing: 0.2em; margin-top: 2rem; color: #8b6f66; animation: fadeDown 1s ease 0.7s both; }
  .hero .divider { width: 60px; height: 1px; background: linear-gradient(90deg, transparent, #c78686, transparent); margin: 1.5rem auto; animation: expandLine 1.2s ease 0.9s both; }
  @keyframes expandLine { from { width: 0; } to { width: 60px; } }
  .hero .scroll-hint { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); animation: bounce 2s infinite; color: #c78686; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; }
  .hero .scroll-hint::after { content: ''; display: block; width: 1px; height: 30px; background: #c78686; margin: 8px auto 0; }
  @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-8px); } }
  @keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .flower { position: absolute; font-size: 3rem; opacity: 0.12; animation: float 6s ease-in-out infinite; }
  .flower:nth-child(1) { top: 10%; left: 5%; animation-delay: 0s; }
  .flower:nth-child(2) { top: 20%; right: 8%; animation-delay: 1s; }
  .flower:nth-child(3) { bottom: 15%; left: 10%; animation-delay: 2s; }
  @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(10deg); } }
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; background: rgba(253,248,244,0.9); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(199,134,134,0.1); }
  .nav-brand { font-size: 1rem; color: #c78686; font-style: italic; }
  .nav-links { display: flex; gap: 2rem; }
  .nav-links a { font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: #8b6f66; text-decoration: none; }
  .section { padding: 6rem 2rem; text-align: center; }
  .section h2 { font-size: 2rem; color: #5a3e36; margin-bottom: 0.5rem; font-weight: 300; }
  .section .subtitle { color: #c78686; letter-spacing: 0.2em; text-transform: uppercase; font-size: 0.7rem; margin-bottom: 3rem; }
  .countdown { display: flex; justify-content: center; gap: 2rem; margin: 2rem 0; }
  .countdown-item { text-align: center; background: white; padding: 1.5rem 2rem; border-radius: 16px; box-shadow: 0 4px 20px rgba(199,134,134,0.1); min-width: 90px; }
  .countdown-item .number { font-size: 2.5rem; font-weight: 300; color: #c78686; display: block; }
  .countdown-item .label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.2em; color: #8b6f66; }
  .story { background: #fff; }
  .story-timeline { max-width: 600px; margin: 0 auto; position: relative; }
  .story-timeline::before { content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 1px; background: linear-gradient(180deg, transparent, #f0d4cf, transparent); }
  .story-item { padding: 2rem; position: relative; width: 45%; }
  .story-item:nth-child(odd) { text-align: right; margin-right: auto; }
  .story-item:nth-child(even) { text-align: left; margin-left: auto; }
  .story-item::after { content: ''; position: absolute; top: 2.5rem; width: 10px; height: 10px; background: #c78686; border-radius: 50%; border: 3px solid #fdf8f4; }
  .story-item:nth-child(odd)::after { right: -28px; }
  .story-item:nth-child(even)::after { left: -28px; }
  .story-item h3 { color: #c78686; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.5rem; }
  .story-item .year { font-size: 1.5rem; font-weight: 300; color: #5a3e36; margin-bottom: 0.5rem; }
  .story-item p { color: #6b5a52; line-height: 1.8; font-size: 0.85rem; }
  .quote-section { background: linear-gradient(135deg, #fce8e4, #fdf2f0); padding: 5rem 2rem; text-align: center; }
  .quote { font-size: 1.5rem; font-style: italic; color: #5a3e36; max-width: 500px; margin: 0 auto; line-height: 1.8; font-weight: 300; }
  .quote::before, .quote::after { content: '"'; color: #c78686; font-size: 3rem; line-height: 0; vertical-align: -0.4em; }
  .quote::after { content: '"'; }
  .gallery { background: #fdf8f4; }
  .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; max-width: 900px; margin: 0 auto; }
  .gallery-item { aspect-ratio: 1; background: linear-gradient(135deg, #f5e1dc, #edd0c8); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 2rem; opacity: 0.6; transition: all 0.4s; cursor: pointer; }
  .gallery-item:hover { transform: scale(1.05); opacity: 0.9; box-shadow: 0 8px 30px rgba(199,134,134,0.2); }
  .gallery-item:nth-child(1) { grid-column: span 2; grid-row: span 2; border-radius: 20px; font-size: 4rem; }
  .details { background: #fff; }
  .details-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; max-width: 800px; margin: 0 auto; }
  .detail-card { text-align: center; padding: 2rem; border-radius: 16px; border: 1px solid rgba(199,134,134,0.15); transition: all 0.3s; }
  .detail-card:hover { border-color: #c78686; box-shadow: 0 4px 20px rgba(199,134,134,0.1); transform: translateY(-4px); }
  .detail-card .icon { font-size: 2rem; margin-bottom: 1rem; }
  .detail-card h3 { font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: #c78686; margin-bottom: 0.75rem; }
  .detail-card p { color: #6b5a52; font-size: 0.85rem; line-height: 1.7; }
  .rsvp { background: linear-gradient(135deg, #c78686, #a06060); color: white; position: relative; overflow: hidden; }
  .rsvp::before { content: ''; position: absolute; top: -100px; right: -100px; width: 300px; height: 300px; background: rgba(255,255,255,0.05); border-radius: 50%; }
  .rsvp h2 { color: white; }
  .rsvp .subtitle { color: rgba(255,255,255,0.7); }
  .rsvp-form { max-width: 400px; margin: 0 auto; }
  .rsvp-form input, .rsvp-form select { width: 100%; padding: 1rem; border: 1px solid rgba(255,255,255,0.25); background: rgba(255,255,255,0.08); border-radius: 12px; color: white; font-family: inherit; font-size: 0.9rem; margin-bottom: 0.75rem; backdrop-filter: blur(4px); transition: all 0.3s; }
  .rsvp-form input:focus, .rsvp-form select:focus { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.12); outline: none; }
  .rsvp-form input::placeholder { color: rgba(255,255,255,0.45); }
  .rsvp-form button { width: 100%; padding: 1rem; background: white; color: #c78686; border: none; border-radius: 12px; font-family: inherit; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; }
  .rsvp-form button:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
  .map { background: #f5e8e3; }
  .map-placeholder { max-width: 800px; margin: 0 auto; height: 300px; background: linear-gradient(135deg, #e8d5ce, #dcc4bb); border-radius: 20px; display: flex; align-items: center; justify-content: center; color: #8b6f66; font-size: 1.1rem; position: relative; overflow: hidden; }
  .map-placeholder::after { content: ''; position: absolute; inset: 0; border: 2px dashed rgba(139,111,102,0.2); border-radius: 20px; margin: 12px; }
  .footer { padding: 4rem 2rem; text-align: center; background: #5a3e36; color: rgba(255,255,255,0.7); font-size: 0.8rem; position: relative; }
  .footer::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #c78686, #a06060, #c78686); }
  .footer .monogram { font-size: 2rem; margin-bottom: 1rem; opacity: 0.5; }
</style>
</head>
<body>
  <nav class="nav">
    <span class="nav-brand">M &amp; G</span>
    <div class="nav-links">
      <a href="#">La Storia</a>
      <a href="#">Dettagli</a>
      <a href="#">Galleria</a>
      <a href="#">RSVP</a>
    </div>
  </nav>
  <div class="flower">&#127799;</div>
  <div class="flower">&#127803;</div>
  <div class="flower">&#127800;</div>
  <section class="hero">
    <div class="hero-content">
      <h3>Vi invitiamo al matrimonio di</h3>
      <h1>Marco <span>&amp; Giulia</span></h1>
      <div class="divider"></div>
      <p class="date">15 Giugno 2026 &bull; Roma</p>
    </div>
    <div class="scroll-hint">Scopri di pi&ugrave;</div>
  </section>
  <section class="section">
    <h2>Mancano</h2>
    <p class="subtitle">al nostro grande giorno</p>
    <div class="countdown">
      <div class="countdown-item"><span class="number">120</span><span class="label">Giorni</span></div>
      <div class="countdown-item"><span class="number">14</span><span class="label">Ore</span></div>
      <div class="countdown-item"><span class="number">32</span><span class="label">Minuti</span></div>
      <div class="countdown-item"><span class="number">18</span><span class="label">Secondi</span></div>
    </div>
  </section>
  <section class="section story">
    <h2>La Nostra Storia</h2>
    <p class="subtitle">come tutto &egrave; iniziato</p>
    <div class="story-timeline">
      <div class="story-item"><div class="year">2020</div><h3>Il Primo Incontro</h3><p>Una sera d'estate, ci siamo conosciuti ad una cena tra amici. Un sorriso ha cambiato tutto.</p></div>
      <div class="story-item"><h3>Il Primo Viaggio</h3><div class="year">2021</div><p>Parigi in primavera. Tra caf&eacute; e passeggiate lungo la Senna, abbiamo capito che era per sempre.</p></div>
      <div class="story-item"><div class="year">2024</div><h3>La Convivenza</h3><p>Un appartamento con vista sui tetti di Roma. La nostra casa, il nostro nido.</p></div>
      <div class="story-item"><h3>La Proposta</h3><div class="year">2025</div><p>Al tramonto, sulla terrazza, Marco si &egrave; inginocchiato con un anello e una promessa.</p></div>
    </div>
  </section>
  <section class="quote-section">
    <p class="quote">L'amore non ha bisogno di essere perfetto, ha bisogno di essere vero</p>
  </section>
  <section class="section details">
    <h2>I Dettagli</h2>
    <p class="subtitle">tutto quello che serve sapere</p>
    <div class="details-grid">
      <div class="detail-card"><div class="icon">&#9962;</div><h3>Cerimonia</h3><p>Basilica di San Pietro<br/>Ore 15:00</p></div>
      <div class="detail-card"><div class="icon">&#127860;</div><h3>Ricevimento</h3><p>Villa Borghese<br/>Ore 18:00</p></div>
      <div class="detail-card"><div class="icon">&#127870;</div><h3>Dress Code</h3><p>Elegante<br/>Colori pastello</p></div>
    </div>
  </section>
  <section class="section gallery">
    <h2>I Nostri Momenti</h2>
    <p class="subtitle">galleria fotografica</p>
    <div class="gallery-grid">
      <div class="gallery-item">&#128150;</div>
      <div class="gallery-item">&#128247;</div>
      <div class="gallery-item">&#128150;</div>
      <div class="gallery-item">&#128247;</div>
      <div class="gallery-item">&#128150;</div>
      <div class="gallery-item">&#128247;</div>
    </div>
  </section>
  <section class="section rsvp">
    <h2>Conferma la Tua Presenza</h2>
    <p class="subtitle">RSVP</p>
    <div class="rsvp-form">
      <input placeholder="Nome e Cognome" />
      <input placeholder="Email" />
      <select><option>Parteciper&ograve; con gioia!</option><option>Purtroppo non posso</option></select>
      <input placeholder="Intolleranze alimentari (opzionale)" />
      <button>Conferma</button>
    </div>
  </section>
  <section class="section map">
    <h2>Dove Trovarci</h2>
    <p class="subtitle">Location</p>
    <div class="map-placeholder">&#128205; Villa Borghese, Roma</div>
  </section>
  <footer class="footer">
    <div class="monogram">M &amp; G</div>
    <p>Marco &amp; Giulia &bull; 15 Giugno 2026</p>
    <p style="margin-top: 0.5rem; opacity: 0.5;">Realizzato con amore</p>
  </footer>
</body>
</html>`,

  'minimal-love': `
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, 'Helvetica Neue', sans-serif; color: #1a1a1a; background: #ffffff; overflow-x: hidden; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes drawLine { from { width: 0; } to { width: 40px; } }
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1.5rem 3rem; display: flex; justify-content: space-between; align-items: center; mix-blend-mode: difference; }
  .nav span { font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: white; }
  .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 2rem; position: relative; }
  .hero h1 { font-size: 5rem; font-weight: 200; letter-spacing: -0.03em; line-height: 1; animation: fadeIn 1.5s ease; }
  .hero h1 span { display: block; font-weight: 700; background: linear-gradient(135deg, #1a1a1a, #555); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero .meta { margin-top: 3rem; font-size: 0.8rem; letter-spacing: 0.3em; text-transform: uppercase; color: #999; animation: slideUp 1s ease 0.5s both; }
  .hero .line { width: 40px; height: 1px; background: #ddd; margin: 2rem auto; animation: drawLine 1s ease 0.3s both; }
  .marquee { overflow: hidden; padding: 1.5rem 0; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0; }
  .marquee-inner { display: flex; gap: 3rem; animation: scroll 20s linear infinite; white-space: nowrap; }
  @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .marquee span { font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase; color: #ccc; }
  .section { padding: 7rem 2rem; max-width: 700px; margin: 0 auto; }
  .section.full { max-width: 100%; background: #fafafa; }
  .section h2 { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.3em; color: #999; margin-bottom: 2rem; }
  .section p { font-size: 1.1rem; line-height: 2.2; color: #444; font-weight: 300; }
  .countdown { display: flex; justify-content: center; gap: 5rem; padding: 5rem 2rem; background: #fafafa; }
  .countdown-item { text-align: center; }
  .countdown-item .num { font-size: 5rem; font-weight: 100; color: #1a1a1a; line-height: 1; }
  .countdown-item .lbl { font-size: 0.55rem; text-transform: uppercase; letter-spacing: 0.35em; color: #bbb; margin-top: 0.75rem; display: block; }
  .info-grid { display: grid; grid-template-columns: 1fr 1px 1fr; gap: 4rem; padding: 5rem 2rem; max-width: 700px; margin: 0 auto; }
  .info-grid .divider { background: #f0f0f0; }
  .info-grid .item h3 { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.25em; color: #bbb; margin-bottom: 1.5rem; }
  .info-grid .item p { font-size: 1rem; line-height: 2; color: #333; font-weight: 300; }
  .photo-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; padding: 0 2rem; max-width: 900px; margin: 0 auto; }
  .photo-strip .ph { aspect-ratio: 3/4; background: linear-gradient(135deg, #f5f5f5, #eee); display: flex; align-items: center; justify-content: center; font-size: 2rem; opacity: 0.3; transition: all 0.4s; }
  .photo-strip .ph:hover { opacity: 0.6; transform: scale(1.02); }
  .quote-band { padding: 5rem 2rem; text-align: center; }
  .quote-band p { font-size: 1.3rem; font-weight: 200; color: #333; max-width: 500px; margin: 0 auto; line-height: 2; font-style: italic; }
  .rsvp { padding: 7rem 2rem; text-align: center; background: #1a1a1a; color: white; }
  .rsvp h2 { color: #555; }
  .rsvp p { color: #666; font-size: 0.85rem; margin-bottom: 2rem; }
  .rsvp-form { display: flex; gap: 0; max-width: 500px; margin: 0 auto; }
  .rsvp input { flex: 1; padding: 1.2rem 1.5rem; border: 1px solid #333; background: transparent; color: white; font-family: inherit; font-size: 0.85rem; }
  .rsvp input::placeholder { color: #555; }
  .rsvp button { padding: 1.2rem 2.5rem; background: white; color: #1a1a1a; border: none; font-family: inherit; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.2em; cursor: pointer; transition: all 0.3s; }
  .rsvp button:hover { background: #f0f0f0; }
  .footer { padding: 4rem 2rem; text-align: center; font-size: 0.65rem; color: #ccc; letter-spacing: 0.2em; text-transform: uppercase; }
  .footer .divider { width: 20px; height: 1px; background: #ddd; margin: 1rem auto; }
</style>
</head>
<body>
  <nav class="nav"><span>L &amp; A</span><span>20.09.2026</span></nav>
  <section class="hero">
    <div>
      <h1>Luca<span>&amp; Anna</span></h1>
      <div class="line"></div>
      <p class="meta">20 Settembre 2026 &bull; Milano</p>
    </div>
  </section>
  <div class="marquee"><div class="marquee-inner">
    <span>Luca &amp; Anna</span><span>&bull;</span><span>20 Settembre 2026</span><span>&bull;</span><span>Milano</span><span>&bull;</span><span>Save the Date</span><span>&bull;</span>
    <span>Luca &amp; Anna</span><span>&bull;</span><span>20 Settembre 2026</span><span>&bull;</span><span>Milano</span><span>&bull;</span><span>Save the Date</span><span>&bull;</span>
  </div></div>
  <div class="countdown">
    <div class="countdown-item"><div class="num">218</div><span class="lbl">Giorni</span></div>
    <div class="countdown-item"><div class="num">08</div><span class="lbl">Ore</span></div>
    <div class="countdown-item"><div class="num">45</div><span class="lbl">Min</span></div>
  </div>
  <section class="section">
    <h2>La cerimonia</h2>
    <p>Vi invitiamo a celebrare insieme a noi il giorno pi&ugrave; importante della nostra vita. Sar&agrave; una cerimonia intima e piena di emozione, seguita da un ricevimento elegante nel cuore di Milano.</p>
  </section>
  <div class="photo-strip">
    <div class="ph">&#128247;</div>
    <div class="ph">&#128150;</div>
    <div class="ph">&#128247;</div>
    <div class="ph">&#128150;</div>
  </div>
  <div class="info-grid">
    <div class="item"><h3>Cerimonia</h3><p>Palazzo Reale<br/>Via Dante 1, Milano<br/>Ore 15:00</p></div>
    <div class="divider"></div>
    <div class="item"><h3>Ricevimento</h3><p>Villa Necchi<br/>Via Mozart 14, Milano<br/>Ore 18:00</p></div>
  </div>
  <div class="quote-band"><p>"In te ho trovato la mia casa, il mio viaggio, la mia destinazione."</p></div>
  <section class="rsvp">
    <h2>RSVP</h2>
    <p>Conferma la tua presenza entro il 20 Agosto 2026</p>
    <div class="rsvp-form"><input placeholder="La tua email" /><button>Conferma</button></div>
  </section>
  <footer class="footer">
    <div>Luca &amp; Anna</div>
    <div class="divider"></div>
    <div>2026</div>
  </footer>
</body>
</html>`,

  'golden-palace': `
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Georgia', serif; color: #ccc; background: #0a0a0a; overflow-x: hidden; }
  @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(212,175,55,0.1); } 50% { box-shadow: 0 0 40px rgba(212,175,55,0.2); } }
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1.2rem 2.5rem; display: flex; justify-content: space-between; align-items: center; background: rgba(10,10,10,0.9); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(212,175,55,0.1); }
  .nav-brand { font-size: 0.7rem; letter-spacing: 0.4em; text-transform: uppercase; color: #d4af37; }
  .nav-links { display: flex; gap: 2rem; }
  .nav-links a { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: #666; text-decoration: none; }
  .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, #0a0a0a 0%, #1a1208 50%, #0a0a0a 100%); position: relative; overflow: hidden; }
  .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, transparent 70%); }
  .hero::after { content: ''; position: absolute; inset: 60px; border: 1px solid rgba(212,175,55,0.08); pointer-events: none; }
  .gold-line { width: 120px; height: 1px; background: linear-gradient(90deg, transparent, #d4af37, transparent); margin: 1.5rem auto; }
  .gold-text { background: linear-gradient(90deg, #d4af37, #f5d76e, #d4af37); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 3s ease infinite; }
  .hero h3 { font-size: 0.75rem; letter-spacing: 0.5em; text-transform: uppercase; color: #d4af37; font-weight: 400; animation: fadeIn 1s ease 0.3s both; }
  .hero h1 { font-size: 4.5rem; color: #fff; font-weight: 300; animation: fadeIn 1s ease 0.5s both; }
  .hero h1 em { font-style: italic; }
  .hero .date { color: #777; font-size: 0.95rem; letter-spacing: 0.3em; animation: fadeIn 1s ease 0.9s both; }
  .hero .ornament { font-size: 1.5rem; color: #d4af37; opacity: 0.4; margin: 1rem 0; letter-spacing: 0.5em; }
  .section { padding: 7rem 2rem; text-align: center; }
  .section.dark { background: #0f0f0f; }
  .section.gold-bg { background: linear-gradient(135deg, #1a1208, #0f0f0f); }
  .section h2 { font-size: 2rem; font-weight: 300; margin-bottom: 0.5rem; }
  .section .sub { font-size: 0.6rem; letter-spacing: 0.4em; text-transform: uppercase; color: #555; margin-bottom: 3rem; }
  .countdown { display: flex; justify-content: center; gap: 2rem; }
  .countdown-item { padding: 1.5rem 2rem; border: 1px solid rgba(212,175,55,0.15); animation: glow 3s ease-in-out infinite; min-width: 100px; }
  .countdown-item .num { font-size: 3rem; color: #d4af37; font-weight: 300; }
  .countdown-item .lbl { font-size: 0.55rem; letter-spacing: 0.3em; text-transform: uppercase; color: #555; margin-top: 0.5rem; }
  .timeline { max-width: 600px; margin: 0 auto; text-align: left; }
  .timeline-item { display: flex; gap: 2rem; padding: 2rem 0; border-left: 1px solid #222; padding-left: 2rem; position: relative; transition: all 0.3s; }
  .timeline-item:hover { border-left-color: #d4af37; }
  .timeline-item::before { content: ''; position: absolute; left: -5px; top: 2rem; width: 9px; height: 9px; background: #d4af37; border-radius: 50%; border: 2px solid #0a0a0a; }
  .timeline-item .time { font-size: 0.7rem; color: #d4af37; letter-spacing: 0.2em; min-width: 60px; }
  .timeline-item .desc { color: #999; font-size: 0.85rem; line-height: 1.6; }
  .quote-gold { padding: 5rem 2rem; text-align: center; border-top: 1px solid rgba(212,175,55,0.1); border-bottom: 1px solid rgba(212,175,55,0.1); }
  .quote-gold p { font-size: 1.2rem; font-style: italic; color: #888; max-width: 500px; margin: 0 auto; line-height: 1.8; }
  .gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3px; max-width: 900px; margin: 0 auto; }
  .gallery-grid .item { aspect-ratio: 1; background: linear-gradient(135deg, #1a1208, #2a1a0a); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; transition: all 0.4s; cursor: pointer; }
  .gallery-grid .item:hover { background: linear-gradient(135deg, #2a1a0a, #3a2a1a); transform: scale(1.02); }
  .rsvp-section { background: linear-gradient(135deg, #d4af37, #b8941f); padding: 7rem 2rem; position: relative; }
  .rsvp-section::before { content: ''; position: absolute; inset: 30px; border: 1px solid rgba(10,10,10,0.1); pointer-events: none; }
  .rsvp-section h2 { color: #0a0a0a; font-size: 2.5rem; }
  .rsvp-section .sub { color: rgba(0,0,0,0.35); }
  .rsvp-form { max-width: 400px; margin: 0 auto; }
  .rsvp-form input { width: 100%; padding: 1.1rem; background: rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.15); color: #0a0a0a; font-family: inherit; margin-bottom: 0.75rem; font-size: 0.85rem; transition: all 0.3s; }
  .rsvp-form input:focus { border-color: rgba(0,0,0,0.4); outline: none; }
  .rsvp-form input::placeholder { color: rgba(0,0,0,0.35); }
  .rsvp-form button { width: 100%; padding: 1.1rem; background: #0a0a0a; color: #d4af37; border: none; font-family: inherit; font-size: 0.85rem; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
  .rsvp-form button:hover { background: #1a1a1a; }
  .footer { padding: 4rem; text-align: center; background: #0a0a0a; border-top: 1px solid rgba(212,175,55,0.1); }
  .footer .monogram { font-size: 0.7rem; letter-spacing: 0.5em; color: #d4af37; margin-bottom: 1rem; }
  .footer p { color: #333; font-size: 0.7rem; letter-spacing: 0.2em; }
</style>
</head>
<body>
  <nav class="nav">
    <span class="nav-brand">A &amp; F</span>
    <div class="nav-links"><a href="#">Programma</a><a href="#">Galleria</a><a href="#">RSVP</a></div>
  </nav>
  <section class="hero">
    <div>
      <h3>Il Matrimonio di</h3>
      <div class="gold-line"></div>
      <h1>Alessandro <em class="gold-text">&amp;</em> Francesca</h1>
      <div class="ornament">&diams; &diams; &diams;</div>
      <p class="date">12 &bull; Luglio &bull; 2026</p>
    </div>
  </section>
  <section class="section dark">
    <h2 class="gold-text">Il Grande Giorno</h2>
    <p class="sub">countdown</p>
    <div class="countdown">
      <div class="countdown-item"><div class="num">148</div><div class="lbl">Giorni</div></div>
      <div class="countdown-item"><div class="num">06</div><div class="lbl">Ore</div></div>
      <div class="countdown-item"><div class="num">15</div><div class="lbl">Minuti</div></div>
    </div>
  </section>
  <div class="quote-gold"><p>"Ogni storia d'amore &egrave; bella, ma la nostra &egrave; la mia preferita."</p></div>
  <section class="section gold-bg">
    <h2 class="gold-text">Programma</h2>
    <p class="sub">timeline della giornata</p>
    <div class="timeline">
      <div class="timeline-item"><span class="time">15:00</span><span class="desc">Cerimonia presso la Cappella Palatina</span></div>
      <div class="timeline-item"><span class="time">17:00</span><span class="desc">Aperitivo nei giardini del palazzo</span></div>
      <div class="timeline-item"><span class="time">19:30</span><span class="desc">Cena di gala nella Sala degli Specchi</span></div>
      <div class="timeline-item"><span class="time">22:00</span><span class="desc">Taglio della torta e primo ballo</span></div>
      <div class="timeline-item"><span class="time">23:00</span><span class="desc">Festa e balli fino a tarda notte</span></div>
    </div>
  </section>
  <section class="section dark">
    <h2 class="gold-text">Galleria</h2>
    <p class="sub">i nostri momenti dorati</p>
    <div class="gallery-grid">
      <div class="item">&#128142;</div><div class="item">&#127775;</div>
      <div class="item">&#127775;</div><div class="item">&#128142;</div>
      <div class="item">&#127775;</div><div class="item">&#128142;</div>
      <div class="item">&#128142;</div><div class="item">&#127775;</div>
    </div>
  </section>
  <section class="rsvp-section">
    <h2>RSVP</h2>
    <p class="sub">conferma la tua presenza</p>
    <div class="rsvp-form">
      <input placeholder="Nome completo" />
      <input placeholder="Email" />
      <input placeholder="Numero di ospiti" />
      <button>Conferma Presenza</button>
    </div>
  </section>
  <footer class="footer">
    <div class="monogram">A &amp; F</div>
    <p>Alessandro &amp; Francesca &bull; MMXXVI</p>
  </footer>
</body>
</html>`,

  'boho-garden': `
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Georgia', serif; color: #5c4a3a; background: #f7f3ee; overflow-x: hidden; }
  @keyframes sway { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1.2rem 2rem; display: flex; justify-content: space-between; align-items: center; background: rgba(247,243,238,0.9); backdrop-filter: blur(10px); }
  .nav-brand { font-size: 0.9rem; color: #9b7b5e; font-style: italic; }
  .nav-links { display: flex; gap: 1.5rem; }
  .nav-links a { font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: #8a7565; text-decoration: none; }
  .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, #e8dfd4 0%, #f7f3ee 100%); padding: 2rem; position: relative; }
  .leaf { position: absolute; font-size: 3rem; opacity: 0.12; animation: sway 4s ease-in-out infinite; }
  .leaf:nth-child(1) { top: 5%; left: 3%; animation-delay: 0s; }
  .leaf:nth-child(2) { top: 15%; right: 5%; animation-delay: 1s; }
  .leaf:nth-child(3) { bottom: 10%; left: 8%; animation-delay: 0.5s; }
  .leaf:nth-child(4) { bottom: 20%; right: 3%; animation-delay: 1.5s; }
  .leaf:nth-child(5) { top: 40%; left: 2%; animation-delay: 2s; font-size: 2rem; }
  .hero h3 { font-size: 0.8rem; color: #9b7b5e; letter-spacing: 0.2em; font-weight: 400; animation: fadeUp 1s ease 0.3s both; }
  .hero h1 { font-size: 3.5rem; font-weight: 300; color: #5c4a3a; margin: 0.5rem 0; animation: fadeUp 1s ease 0.5s both; }
  .hero h1 em { font-style: italic; color: #9b7b5e; }
  .hero .date { font-size: 1rem; color: #8a7565; margin-top: 1.5rem; animation: fadeUp 1s ease 0.7s both; }
  .wreath { width: 130px; height: 130px; border: 2px solid #c4a882; border-radius: 50%; margin: 2rem auto; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; animation: fadeUp 1s ease 0.6s both; position: relative; }
  .wreath::before { content: ''; position: absolute; inset: -8px; border: 1px dashed rgba(196,168,130,0.3); border-radius: 50%; }
  .section { padding: 6rem 2rem; text-align: center; }
  .section h2 { font-size: 1.8rem; color: #5c4a3a; font-weight: 300; }
  .section .sub { font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase; color: #9b7b5e; margin-bottom: 2.5rem; }
  .bg-cream { background: #f0ebe3; }
  .story-section { background: white; }
  .story-text { max-width: 500px; margin: 0 auto; font-size: 1rem; line-height: 2; color: #6b5a4a; font-weight: 300; }
  .info-cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; max-width: 600px; margin: 0 auto; }
  .info-card { background: white; border-radius: 20px; padding: 2rem; border: 1px solid #e5ddd3; transition: all 0.3s; }
  .info-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
  .info-card .icon { font-size: 1.5rem; margin-bottom: 0.75rem; }
  .info-card h3 { color: #9b7b5e; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.75rem; }
  .info-card p { color: #6b5a4a; font-size: 0.9rem; line-height: 1.7; }
  .menu-section { background: #f7f3ee; }
  .menu-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; max-width: 700px; margin: 0 auto; }
  .menu-item { background: white; border-radius: 16px; padding: 1.5rem; text-align: center; }
  .menu-item .icon { font-size: 2rem; margin-bottom: 0.75rem; }
  .menu-item h4 { font-size: 0.7rem; color: #9b7b5e; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.5rem; }
  .menu-item p { font-size: 0.8rem; color: #8a7565; line-height: 1.6; }
  .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; max-width: 700px; margin: 0 auto; }
  .gallery-item { aspect-ratio: 1; background: linear-gradient(135deg, #e8dfd4, #d9cfc2); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 2rem; opacity: 0.5; transition: all 0.4s; cursor: pointer; }
  .gallery-item:hover { opacity: 0.8; transform: scale(1.03); }
  .gallery-item:nth-child(2) { grid-row: span 2; aspect-ratio: auto; border-radius: 20px; }
  .quote-boho { padding: 4rem 2rem; text-align: center; background: linear-gradient(135deg, rgba(196,168,130,0.1), transparent); }
  .quote-boho p { font-size: 1.3rem; font-style: italic; color: #5c4a3a; max-width: 450px; margin: 0 auto; line-height: 1.8; font-weight: 300; }
  .rsvp-card { background: #5c4a3a; color: white; border-radius: 28px; max-width: 500px; margin: 0 auto; padding: 3.5rem; position: relative; overflow: hidden; }
  .rsvp-card::before { content: ''; position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: rgba(196,168,130,0.1); border-radius: 50%; }
  .rsvp-card h2 { color: #c4a882; }
  .rsvp-card input { width: 100%; padding: 1rem; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 14px; color: white; font-family: inherit; margin-bottom: 0.75rem; transition: all 0.3s; }
  .rsvp-card input:focus { border-color: rgba(196,168,130,0.5); outline: none; }
  .rsvp-card input::placeholder { color: rgba(255,255,255,0.35); }
  .rsvp-card button { width: 100%; padding: 1rem; background: #c4a882; color: #3a2e24; border: none; border-radius: 14px; font-family: inherit; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.3s; }
  .rsvp-card button:hover { background: #d4b892; transform: translateY(-2px); }
  .footer { padding: 4rem 2rem; text-align: center; font-size: 0.8rem; color: #9b7b5e; }
  .footer .leaf-icon { font-size: 1.5rem; margin-bottom: 0.75rem; opacity: 0.5; }
</style>
</head>
<body>
  <nav class="nav">
    <span class="nav-brand">D &amp; E</span>
    <div class="nav-links"><a href="#">Info</a><a href="#">Galleria</a><a href="#">Menu</a><a href="#">RSVP</a></div>
  </nav>
  <div class="leaf">&#127807;</div>
  <div class="leaf">&#127811;</div>
  <div class="leaf">&#127807;</div>
  <div class="leaf">&#127811;</div>
  <div class="leaf">&#127807;</div>
  <section class="hero">
    <div>
      <h3>Celebrate with us</h3>
      <h1>Davide <em>&amp;</em> Elena</h1>
      <div class="wreath">&#127803;</div>
      <p class="date">8 Maggio 2026 &bull; Toscana</p>
    </div>
  </section>
  <section class="section story-section">
    <h2>La Nostra Storia</h2>
    <p class="sub">un amore nato in campagna</p>
    <p class="story-text">Ci siamo incontrati durante una vendemmia in Chianti. Tra filari di vigne e tramonti toscani, abbiamo scoperto che i nostri cuori battevano allo stesso ritmo. Tre anni dopo, siamo pronti a dire "s&igrave;" nello stesso luogo dove tutto &egrave; iniziato.</p>
  </section>
  <section class="section">
    <h2>Cerimonia &amp; Ricevimento</h2>
    <p class="sub">dove trovarci</p>
    <div class="info-cards">
      <div class="info-card"><div class="icon">&#127807;</div><h3>Cerimonia</h3><p>Giardino delle Rose<br/>Borgo Antico, Siena<br/>Ore 16:00</p></div>
      <div class="info-card"><div class="icon">&#127860;</div><h3>Ricevimento</h3><p>Agriturismo Il Casale<br/>Val d'Orcia<br/>Ore 18:30</p></div>
      <div class="info-card"><div class="icon">&#127870;</div><h3>Dress Code</h3><p>Garden Chic<br/>Colori naturali e terrosi</p></div>
      <div class="info-card"><div class="icon">&#127968;</div><h3>Alloggio</h3><p>Camere disponibili<br/>presso l'agriturismo</p></div>
    </div>
  </section>
  <section class="section menu-section">
    <h2>Il Menu</h2>
    <p class="sub">sapori toscani</p>
    <div class="menu-grid">
      <div class="menu-item"><div class="icon">&#127798;</div><h4>Antipasti</h4><p>Bruschette miste<br/>Tagliere toscano<br/>Crostini ai funghi</p></div>
      <div class="menu-item"><div class="icon">&#127837;</div><h4>Primi</h4><p>Pici al rag&ugrave;<br/>Ribollita<br/>Risotto al tartufo</p></div>
      <div class="menu-item"><div class="icon">&#127856;</div><h4>Dolci</h4><p>Cantuccini<br/>Torta nuziale<br/>Panna cotta</p></div>
    </div>
  </section>
  <div class="quote-boho"><p>"E quando ti ho trovato, ho capito che non stavo cercando una persona, ma una casa."</p></div>
  <section class="section bg-cream">
    <h2>Galleria</h2>
    <p class="sub">la nostra avventura</p>
    <div class="gallery-grid">
      <div class="gallery-item">&#127803;</div>
      <div class="gallery-item">&#128247;</div>
      <div class="gallery-item">&#127807;</div>
      <div class="gallery-item">&#128247;</div>
      <div class="gallery-item">&#127803;</div>
      <div class="gallery-item">&#128247;</div>
    </div>
  </section>
  <section class="section">
    <div class="rsvp-card">
      <h2>RSVP</h2>
      <p class="sub" style="color: rgba(255,255,255,0.4);">conferma entro il 1 aprile</p>
      <input placeholder="Il tuo nome" />
      <input placeholder="Email" />
      <input placeholder="Intolleranze alimentari" />
      <button>Conferma</button>
    </div>
  </section>
  <footer class="footer">
    <div class="leaf-icon">&#127807;</div>
    <p>Davide &amp; Elena &bull; con amore</p>
  </footer>
</body>
</html>`,

  'modern-metro': `
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, 'Helvetica Neue', sans-serif; color: #111; background: #fff; overflow-x: hidden; }
  @keyframes slideLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes slideRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); border-bottom: 3px solid #111; }
  .nav-brand { font-size: 1rem; font-weight: 800; letter-spacing: -0.02em; }
  .nav-brand .accent { color: #ff6b6b; }
  .nav-links { display: flex; gap: 1.5rem; }
  .nav-links a { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #666; text-decoration: none; }
  .hero { min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; position: relative; }
  .hero-left { background: #111; color: white; display: flex; align-items: center; padding: 4rem; }
  .hero-right { background: linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff); display: flex; align-items: center; justify-content: center; font-size: 10rem; position: relative; overflow: hidden; }
  .hero-right::after { content: 'LOVE'; position: absolute; font-size: 8rem; font-weight: 900; color: rgba(255,255,255,0.1); transform: rotate(-45deg); }
  .hero h1 { font-size: 4rem; font-weight: 900; line-height: 0.95; letter-spacing: -0.03em; animation: slideLeft 0.8s ease; }
  .hero h1 .accent { color: #ff6b6b; }
  .hero .meta { margin-top: 2.5rem; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: #666; animation: slideLeft 0.8s ease 0.3s both; }
  .hero .cta-btn { display: inline-block; margin-top: 2rem; padding: 1rem 2.5rem; background: #ff6b6b; color: white; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; text-decoration: none; transition: all 0.3s; animation: slideLeft 0.8s ease 0.5s both; }
  .hero .cta-btn:hover { background: #ff5252; transform: translateY(-2px); }
  .ticker { background: #111; color: white; padding: 0.8rem 0; overflow: hidden; }
  .ticker-inner { display: flex; gap: 3rem; animation: tickerScroll 15s linear infinite; white-space: nowrap; }
  @keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .ticker span { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; }
  .ticker .dot { color: #ff6b6b; }
  .section { padding: 6rem 3rem; }
  .section h2 { font-size: 3rem; font-weight: 900; margin-bottom: 0.5rem; letter-spacing: -0.02em; }
  .section .tag { display: inline-block; background: #111; color: white; padding: 0.3rem 1.2rem; font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 2rem; font-weight: 700; }
  .bg-dark { background: #111; color: white; }
  .bg-dark .tag { background: #ff6b6b; }
  .bg-coral { background: #ff6b6b; color: white; }
  .countdown { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; max-width: 500px; }
  .countdown-item { background: #f5f5f5; padding: 2.5rem; text-align: center; transition: all 0.3s; }
  .countdown-item:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
  .bg-dark .countdown-item { background: #1a1a1a; }
  .countdown-item .num { font-size: 3.5rem; font-weight: 900; letter-spacing: -0.03em; }
  .countdown-item .lbl { font-size: 0.55rem; text-transform: uppercase; letter-spacing: 0.2em; color: #999; margin-top: 0.5rem; font-weight: 600; }
  .info-blocks { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; max-width: 700px; }
  .info-block { padding: 2.5rem; border: 1px solid #f0f0f0; }
  .info-block h3 { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #ff6b6b; margin-bottom: 1rem; }
  .info-block p { font-size: 0.9rem; line-height: 1.8; color: #555; }
  .geo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; }
  .geo-item { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; transition: all 0.3s; cursor: pointer; }
  .geo-item:nth-child(1) { background: #ff6b6b; }
  .geo-item:nth-child(2) { background: #ffd93d; }
  .geo-item:nth-child(3) { background: #6bcb77; }
  .geo-item:nth-child(4) { background: #4d96ff; }
  .geo-item:nth-child(5) { background: #111; color: white; }
  .geo-item:nth-child(6) { background: #ff6b6b; }
  .geo-item:nth-child(7) { background: #ffd93d; }
  .geo-item:nth-child(8) { background: #6bcb77; }
  .geo-item:nth-child(9) { background: #4d96ff; }
  .geo-item:hover { transform: scale(1.05); z-index: 1; }
  .rsvp { background: #ff6b6b; color: white; padding: 6rem 3rem; }
  .rsvp h2 { font-size: 3.5rem; font-weight: 900; letter-spacing: -0.03em; }
  .rsvp p { font-size: 0.85rem; color: rgba(255,255,255,0.7); margin-top: 0.5rem; }
  .rsvp input { padding: 1.1rem; background: rgba(255,255,255,0.15); border: 2px solid rgba(255,255,255,0.25); color: white; font-family: inherit; font-size: 0.9rem; width: 100%; margin-bottom: 0.75rem; transition: all 0.3s; }
  .rsvp input:focus { border-color: white; outline: none; }
  .rsvp input::placeholder { color: rgba(255,255,255,0.5); }
  .rsvp button { padding: 1.1rem 3rem; background: #111; color: white; border: none; font-family: inherit; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em; cursor: pointer; width: 100%; transition: all 0.3s; }
  .rsvp button:hover { background: #222; }
  .rsvp-form { max-width: 400px; margin-top: 2.5rem; }
  .footer { padding: 2rem 3rem; background: #111; color: #666; font-size: 0.7rem; display: flex; justify-content: space-between; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
</style>
</head>
<body>
  <nav class="nav">
    <span class="nav-brand">F<span class="accent">&amp;</span>V</span>
    <div class="nav-links"><a href="#">Info</a><a href="#">Gallery</a><a href="#">RSVP</a></div>
  </nav>
  <section class="hero">
    <div class="hero-left">
      <div>
        <h1>FEDERICO<br/><span class="accent">&amp;</span><br/>VALENTINA</h1>
        <p class="meta">10 Ottobre 2026 &bull; Torino</p>
        <a href="#" class="cta-btn">Conferma Presenza &rarr;</a>
      </div>
    </div>
    <div class="hero-right">&#128150;</div>
  </section>
  <div class="ticker"><div class="ticker-inner">
    <span>Federico &amp; Valentina</span><span class="dot">&bull;</span><span>10.10.2026</span><span class="dot">&bull;</span><span>Torino</span><span class="dot">&bull;</span><span>Save the Date</span><span class="dot">&bull;</span>
    <span>Federico &amp; Valentina</span><span class="dot">&bull;</span><span>10.10.2026</span><span class="dot">&bull;</span><span>Torino</span><span class="dot">&bull;</span><span>Save the Date</span><span class="dot">&bull;</span>
  </div></div>
  <section class="section">
    <span class="tag">Countdown</span>
    <h2>Il countdown<br/>&egrave; partito</h2>
    <div class="countdown" style="margin-top: 2rem;">
      <div class="countdown-item"><div class="num">238</div><div class="lbl">Giorni</div></div>
      <div class="countdown-item"><div class="num">12</div><div class="lbl">Ore</div></div>
      <div class="countdown-item"><div class="num">05</div><div class="lbl">Min</div></div>
    </div>
  </section>
  <section class="section" style="padding-top:0;">
    <span class="tag">Info</span>
    <h2>I Dettagli</h2>
    <div class="info-blocks" style="margin-top: 2rem;">
      <div class="info-block"><h3>Cerimonia</h3><p>Chiesa di San Lorenzo<br/>Via Roma 1, Torino<br/>Ore 15:00</p></div>
      <div class="info-block"><h3>Ricevimento</h3><p>Reggia di Venaria<br/>Piazza della Repubblica<br/>Ore 18:00</p></div>
      <div class="info-block"><h3>Dress Code</h3><p>Smart Casual<br/>Colori vivaci benvenuti!</p></div>
      <div class="info-block"><h3>Parcheggio</h3><p>Parcheggio interno<br/>gratuito per gli ospiti</p></div>
    </div>
  </section>
  <section class="section bg-dark">
    <span class="tag">Gallery</span>
    <h2>Momenti</h2>
    <div class="geo-grid" style="max-width:600px; margin-top: 2rem;">
      <div class="geo-item">&#128247;</div>
      <div class="geo-item">&#128150;</div>
      <div class="geo-item">&#128247;</div>
      <div class="geo-item">&#128150;</div>
      <div class="geo-item">&#128247;</div>
      <div class="geo-item">&#128150;</div>
      <div class="geo-item">&#128247;</div>
      <div class="geo-item">&#128150;</div>
      <div class="geo-item">&#128247;</div>
    </div>
  </section>
  <section class="rsvp">
    <h2>RSVP</h2>
    <p>Conferma la tua presenza entro Settembre 2026</p>
    <div class="rsvp-form">
      <input placeholder="Nome" />
      <input placeholder="Email" />
      <button>Conferma &rarr;</button>
    </div>
  </section>
  <footer class="footer"><span>Federico &amp; Valentina</span><span>2026</span></footer>
</body>
</html>`,

  'seaside-dream': `
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Georgia', serif; color: #2c4a5a; background: #f0f7fa; overflow-x: hidden; }
  @keyframes wave { 0% { transform: translateX(0) translateZ(0) scaleY(1); } 50% { transform: translateX(-25%) translateZ(0) scaleY(0.55); } 100% { transform: translateX(-50%) translateZ(0) scaleY(1); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(25px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1.2rem 2rem; display: flex; justify-content: space-between; align-items: center; background: rgba(240,247,250,0.9); backdrop-filter: blur(10px); }
  .nav-brand { font-size: 0.9rem; color: #e8836b; font-style: italic; }
  .nav-links { display: flex; gap: 1.5rem; }
  .nav-links a { font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: #7aadbe; text-decoration: none; }
  .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, #87ceeb 0%, #e0f4ff 35%, #f5e6d0 55%, #f0f7fa 100%); padding: 2rem; position: relative; overflow: hidden; }
  .wave-bottom { position: absolute; bottom: -5px; left: 0; width: 200%; height: 60px; background: #f0f7fa; opacity: 0.8; }
  .wave-bottom:nth-child(1) { animation: wave 7s linear infinite; bottom: 0; }
  .wave-bottom:nth-child(2) { animation: wave 10s linear infinite; bottom: 10px; opacity: 0.5; }
  .hero h3 { font-size: 0.85rem; letter-spacing: 0.25em; color: #5a8fa8; font-weight: 400; text-transform: uppercase; animation: fadeUp 1s ease 0.2s both; }
  .hero h1 { font-size: 4rem; font-weight: 300; color: #2c4a5a; margin: 0.5rem 0; animation: fadeUp 1s ease 0.4s both; }
  .hero h1 em { font-style: italic; color: #e8836b; }
  .hero .date { color: #7aadbe; font-size: 1rem; letter-spacing: 0.2em; margin-top: 1rem; animation: fadeUp 1s ease 0.6s both; }
  .shell { font-size: 3rem; margin: 1.5rem 0; opacity: 0.4; animation: float 3s ease-in-out infinite; }
  .section { padding: 6rem 2rem; text-align: center; }
  .section h2 { font-size: 2rem; color: #2c4a5a; font-weight: 300; }
  .section .sub { font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase; color: #7aadbe; margin-bottom: 2.5rem; }
  .bg-sand { background: #f5e6d0; }
  .bg-ocean { background: linear-gradient(135deg, #2c4a5a, #1a3040); color: #b0d4e8; }
  .bg-ocean h2 { color: #e8836b; }
  .story-seaside { max-width: 500px; margin: 0 auto; }
  .story-seaside p { font-size: 1rem; line-height: 2; color: #4a7a8a; font-weight: 300; }
  .info-row { display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; }
  .info-item { text-align: center; padding: 2.5rem 2rem; background: white; border-radius: 20px; min-width: 180px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); transition: all 0.3s; }
  .info-item:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.08); }
  .info-item .icon { font-size: 2rem; margin-bottom: 1rem; }
  .info-item h3 { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: #5a8fa8; margin-bottom: 0.75rem; }
  .info-item p { color: #4a7a8a; font-size: 0.85rem; line-height: 1.7; }
  .gallery-sea { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; max-width: 700px; margin: 0 auto; }
  .gallery-sea .item { aspect-ratio: 1; background: linear-gradient(135deg, #b0d4e8, #87ceeb); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 2rem; opacity: 0.5; transition: all 0.4s; cursor: pointer; }
  .gallery-sea .item:hover { opacity: 0.8; transform: scale(1.03); }
  .gallery-sea .item:first-child { grid-column: span 2; aspect-ratio: 2/1; }
  .quote-sea { padding: 4rem 2rem; text-align: center; background: linear-gradient(135deg, rgba(135,206,235,0.1), rgba(232,131,107,0.1)); }
  .quote-sea p { font-size: 1.2rem; font-style: italic; color: #2c4a5a; max-width: 450px; margin: 0 auto; line-height: 1.8; font-weight: 300; }
  .travel-info { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; max-width: 600px; margin: 2rem auto 0; }
  .travel-card { background: rgba(255,255,255,0.08); border: 1px solid rgba(176,212,232,0.2); border-radius: 16px; padding: 1.5rem; text-align: left; }
  .travel-card h3 { font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: #e8836b; margin-bottom: 0.5rem; }
  .travel-card p { font-size: 0.85rem; line-height: 1.7; color: #8ab8cc; }
  .rsvp-sea { background: #e8836b; color: white; position: relative; overflow: hidden; }
  .rsvp-sea::before { content: ''; position: absolute; bottom: -50px; right: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.05); border-radius: 50%; }
  .rsvp-sea h2 { color: white; }
  .rsvp-sea .sub { color: rgba(255,255,255,0.6); }
  .rsvp-form { max-width: 400px; margin: 0 auto; }
  .rsvp-form input { width: 100%; padding: 1rem; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25); border-radius: 12px; color: white; font-family: inherit; margin-bottom: 0.75rem; transition: all 0.3s; }
  .rsvp-form input:focus { border-color: rgba(255,255,255,0.5); outline: none; }
  .rsvp-form input::placeholder { color: rgba(255,255,255,0.45); }
  .rsvp-form button { width: 100%; padding: 1rem; background: white; color: #e8836b; border: none; border-radius: 12px; font-family: inherit; font-weight: 600; cursor: pointer; transition: all 0.3s; }
  .rsvp-form button:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
  .footer { padding: 4rem 2rem; text-align: center; font-size: 0.8rem; color: #7aadbe; background: #f0f7fa; }
  .footer .wave-icon { font-size: 1.5rem; margin-bottom: 0.75rem; opacity: 0.5; }
</style>
</head>
<body>
  <nav class="nav">
    <span class="nav-brand">P &amp; S</span>
    <div class="nav-links"><a href="#">Programma</a><a href="#">Galleria</a><a href="#">Info</a><a href="#">RSVP</a></div>
  </nav>
  <section class="hero">
    <div>
      <h3>Ci sposiamo!</h3>
      <h1>Paolo <em>&amp;</em> Sara</h1>
      <div class="shell">&#127754;</div>
      <p class="date">28 Agosto 2026 &bull; Amalfi</p>
    </div>
  </section>
  <section class="section">
    <h2>La Nostra Storia</h2>
    <p class="sub">un amore nato sul mare</p>
    <div class="story-seaside"><p>Ci siamo incontrati su una barca a vela al largo della Costiera Amalfitana. Il sole, il vento e le onde ci hanno uniti per sempre. Ora vi invitiamo a celebrare il nostro amore nello stesso luogo magico.</p></div>
  </section>
  <div class="quote-sea"><p>"L'amore &egrave; come il mare: lo puoi vedere all'infinito, ma non puoi vederne la fine."</p></div>
  <section class="section bg-sand">
    <h2>Il Programma</h2>
    <p class="sub">la nostra giornata</p>
    <div class="info-row">
      <div class="info-item"><div class="icon">&#9962;</div><h3>Cerimonia</h3><p>Duomo di Amalfi<br/>Ore 16:00</p></div>
      <div class="info-item"><div class="icon">&#127860;</div><h3>Aperitivo</h3><p>Terrazza sul mare<br/>Ore 17:30</p></div>
      <div class="info-item"><div class="icon">&#127878;</div><h3>Ricevimento</h3><p>Villa Cimbrone<br/>Ore 19:30</p></div>
    </div>
  </section>
  <section class="section">
    <h2>Galleria</h2>
    <p class="sub">i nostri momenti</p>
    <div class="gallery-sea">
      <div class="item">&#127754;</div>
      <div class="item">&#128247;</div>
      <div class="item">&#9875;</div>
      <div class="item">&#128150;</div>
      <div class="item">&#127754;</div>
    </div>
  </section>
  <section class="section bg-ocean">
    <h2>Come Arrivare</h2>
    <p class="sub">informazioni utili</p>
    <div class="travel-info">
      <div class="travel-card"><h3>In Auto</h3><p>Da Napoli: autostrada A3, uscita Vietri sul Mare, SS163.</p></div>
      <div class="travel-card"><h3>In Treno</h3><p>Stazione Salerno, poi bus SITA per Amalfi (1h).</p></div>
      <div class="travel-card"><h3>Alloggio</h3><p>Hotel convenzionato con sconto 20% per gli ospiti.</p></div>
      <div class="travel-card"><h3>Dress Code</h3><p>Elegante estivo. Colori chiari. Scarpe comode!</p></div>
    </div>
  </section>
  <section class="section rsvp-sea">
    <h2>RSVP</h2>
    <p class="sub">conferma la tua presenza</p>
    <div class="rsvp-form">
      <input placeholder="Nome e Cognome" />
      <input placeholder="Email" />
      <input placeholder="Allergie alimentari (opzionale)" />
      <button>Conferma</button>
    </div>
  </section>
  <footer class="footer">
    <div class="wave-icon">&#127754;</div>
    <p>Paolo &amp; Sara &bull; Amalfi 2026</p>
  </footer>
</body>
</html>`,

  'tuscan-villa': `
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Georgia', serif; color: #4a3f35; background: #f5f0e8; overflow-x: hidden; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1.2rem 2rem; display: flex; justify-content: space-between; align-items: center; background: rgba(245,240,232,0.9); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(139,107,62,0.1); }
  .nav-brand { font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #8b6b3e; }
  .nav-links { display: flex; gap: 1.5rem; }
  .nav-links a { font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: #8b7d6b; text-decoration: none; }
  .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, #d4c5a9 0%, #e8dcc8 30%, #f5f0e8 100%); padding: 2rem; position: relative; }
  .hero::before { content: ''; position: absolute; inset: 40px; border: 1px solid rgba(139,107,62,0.1); pointer-events: none; }
  .hero-frame { border: 2px solid #b8a88a; padding: 5rem 4rem; display: inline-block; position: relative; animation: fadeIn 1.5s ease; }
  .hero-frame::before, .hero-frame::after { content: ''; position: absolute; width: 20px; height: 20px; border: 2px solid #b8a88a; }
  .hero-frame::before { top: -2px; left: -2px; border-right: 0; border-bottom: 0; }
  .hero-frame::after { bottom: -2px; right: -2px; border-left: 0; border-top: 0; }
  .hero h3 { font-size: 0.75rem; letter-spacing: 0.3em; text-transform: uppercase; color: #8b7d6b; font-weight: 400; animation: slideUp 1s ease 0.3s both; }
  .hero h1 { font-size: 3.5rem; font-weight: 300; color: #4a3f35; margin: 0.75rem 0; animation: slideUp 1s ease 0.5s both; }
  .hero h1 em { color: #8b6b3e; font-style: italic; }
  .hero .date { font-size: 1rem; color: #8b7d6b; letter-spacing: 0.2em; margin-top: 1rem; animation: slideUp 1s ease 0.7s both; }
  .olive { font-size: 1.5rem; margin: 1rem 0; opacity: 0.5; }
  .section { padding: 6rem 2rem; text-align: center; }
  .section h2 { font-size: 2rem; color: #4a3f35; font-weight: 300; }
  .section .sub { font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase; color: #8b6b3e; margin-bottom: 2.5rem; }
  .bg-stone { background: #e8dcc8; }
  .bg-terracotta { background: #c4775a; color: #f5f0e8; }
  .bg-terracotta h2 { color: #f5f0e8; }
  .story-tuscan { max-width: 500px; margin: 0 auto; }
  .story-tuscan p { font-size: 1rem; line-height: 2; color: #6b5f50; font-weight: 300; }
  .villa-info { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; max-width: 700px; margin: 0 auto; text-align: left; }
  .villa-card { background: white; padding: 2rem; border-radius: 4px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); transition: all 0.3s; position: relative; overflow: hidden; }
  .villa-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #8b6b3e, #c4a882); }
  .villa-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
  .villa-card .icon { font-size: 1.5rem; margin-bottom: 0.75rem; }
  .villa-card h3 { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: #8b6b3e; margin-bottom: 0.75rem; }
  .villa-card p { color: #6b5f50; line-height: 1.7; font-size: 0.85rem; }
  .menu-tuscan { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; max-width: 700px; margin: 2rem auto 0; }
  .menu-course { text-align: center; padding: 2rem; background: rgba(255,255,255,0.5); border-radius: 4px; }
  .menu-course .icon { font-size: 2rem; margin-bottom: 0.75rem; }
  .menu-course h4 { font-size: 0.65rem; color: #8b6b3e; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.75rem; }
  .menu-course p { font-size: 0.8rem; color: #6b5f50; line-height: 1.8; }
  .gallery-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 0.75rem; max-width: 800px; margin: 0 auto; }
  .gallery-item { background: linear-gradient(135deg, #d4c5a9, #c4b494); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 2rem; opacity: 0.5; min-height: 150px; transition: all 0.4s; cursor: pointer; }
  .gallery-item:first-child { grid-row: span 2; }
  .gallery-item:hover { opacity: 0.7; transform: scale(1.02); }
  .quote-tuscan { padding: 5rem 2rem; text-align: center; background: linear-gradient(135deg, rgba(196,168,130,0.1), transparent); }
  .quote-tuscan p { font-size: 1.2rem; font-style: italic; color: #4a3f35; max-width: 450px; margin: 0 auto; line-height: 1.8; font-weight: 300; }
  .rsvp-form { max-width: 400px; margin: 2rem auto 0; }
  .rsvp-form input { width: 100%; padding: 1rem; background: rgba(255,255,255,0.12); border: 1px solid rgba(245,240,232,0.25); border-radius: 4px; color: #f5f0e8; font-family: inherit; margin-bottom: 0.75rem; transition: all 0.3s; }
  .rsvp-form input:focus { border-color: rgba(245,240,232,0.5); outline: none; }
  .rsvp-form input::placeholder { color: rgba(245,240,232,0.4); }
  .rsvp-form button { width: 100%; padding: 1rem; background: #f5f0e8; color: #c4775a; border: none; border-radius: 4px; font-family: inherit; font-weight: 600; cursor: pointer; transition: all 0.3s; }
  .rsvp-form button:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
  .footer { padding: 4rem 2rem; text-align: center; font-size: 0.8rem; color: #8b7d6b; }
  .footer .olive-icon { font-size: 1.5rem; margin-bottom: 0.75rem; opacity: 0.4; }
</style>
</head>
<body>
  <nav class="nav">
    <span class="nav-brand">R &amp; B</span>
    <div class="nav-links"><a href="#">Location</a><a href="#">Menu</a><a href="#">Galleria</a><a href="#">RSVP</a></div>
  </nav>
  <section class="hero">
    <div class="hero-frame">
      <h3>Siete invitati al matrimonio di</h3>
      <h1>Roberto <em>&amp;</em> Beatrice</h1>
      <div class="olive">&#127807;</div>
      <p class="date">5 Settembre 2026 &bull; Chianti</p>
    </div>
  </section>
  <section class="section">
    <h2>La Nostra Storia</h2>
    <p class="sub">un amore tra le colline</p>
    <div class="story-tuscan"><p>Ci siamo incontrati durante una degustazione di vini nel cuore del Chianti. Tra calici di Brunello e tramonti dorati, abbiamo capito che eravamo destinati a stare insieme. Oggi vi invitiamo a brindare con noi.</p></div>
  </section>
  <section class="section bg-stone">
    <h2>La Location</h2>
    <p class="sub">villa dei cipressi, chianti</p>
    <div class="villa-info">
      <div class="villa-card"><div class="icon">&#9962;</div><h3>Cerimonia</h3><p>Cappella della Villa<br/>Ore 16:30<br/>Cerimonia religiosa</p></div>
      <div class="villa-card"><div class="icon">&#127860;</div><h3>Ricevimento</h3><p>Giardino degli Ulivi<br/>Ore 18:30<br/>Cena toscana</p></div>
      <div class="villa-card"><div class="icon">&#128663;</div><h3>Come Arrivare</h3><p>A 30 min da Firenze<br/>Parcheggio disponibile<br/>Navetta dalla stazione</p></div>
      <div class="villa-card"><div class="icon">&#127968;</div><h3>Alloggio</h3><p>Suite nella villa<br/>Agriturismo convenzionato<br/>Prenotare entro Luglio</p></div>
    </div>
  </section>
  <div class="quote-tuscan"><p>"Il vino &egrave; la poesia della terra. L'amore &egrave; la poesia dell'anima."</p></div>
  <section class="section">
    <h2>Il Menu</h2>
    <p class="sub">sapori della tradizione</p>
    <div class="menu-tuscan">
      <div class="menu-course"><div class="icon">&#127798;</div><h4>Antipasti</h4><p>Bruschette al pomodoro<br/>Fiori di zucca<br/>Crostini toscani</p></div>
      <div class="menu-course"><div class="icon">&#127837;</div><h4>Primi</h4><p>Pappardelle al cinghiale<br/>Ribollita<br/>Gnudi burro e salvia</p></div>
      <div class="menu-course"><div class="icon">&#127856;</div><h4>Dolci</h4><p>Torta nuziale<br/>Cantucci e Vin Santo<br/>Gelato artigianale</p></div>
    </div>
  </section>
  <section class="section bg-stone">
    <h2>Galleria</h2>
    <p class="sub">scorci toscani</p>
    <div class="gallery-grid">
      <div class="gallery-item">&#127807;</div>
      <div class="gallery-item">&#128247;</div>
      <div class="gallery-item">&#127815;</div>
      <div class="gallery-item">&#128247;</div>
    </div>
  </section>
  <section class="section bg-terracotta">
    <h2>RSVP</h2>
    <p class="sub" style="color:rgba(245,240,232,0.5)">conferma la tua presenza</p>
    <div class="rsvp-form">
      <input placeholder="Nome" />
      <input placeholder="Email" />
      <input placeholder="Intolleranze alimentari" />
      <button>Conferma</button>
    </div>
  </section>
  <footer class="footer">
    <div class="olive-icon">&#127807;</div>
    <p>Roberto &amp; Beatrice &bull; Chianti 2026</p>
  </footer>
</body>
</html>`,

  'elopement-story': `
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Georgia', serif; color: #3a3a3a; background: #fafaf8; overflow-x: hidden; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes typewriter { from { width: 0; } to { width: 100%; } }
  .chapter { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 4rem 2rem; text-align: center; position: relative; }
  .chapter:nth-child(even) { background: #f3f1ec; }
  .chapter::after { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 1px; height: 60px; background: linear-gradient(180deg, #c4b494, transparent); }
  .chapter-num { font-size: 0.55rem; letter-spacing: 0.5em; text-transform: uppercase; color: #b8a88a; margin-bottom: 2rem; display: flex; align-items: center; justify-content: center; gap: 1rem; }
  .chapter-num::before, .chapter-num::after { content: ''; width: 30px; height: 1px; background: #d4cec4; }
  .chapter h1 { font-size: 3rem; font-weight: 300; line-height: 1.3; max-width: 600px; margin: 0 auto; animation: slideUp 1s ease; }
  .chapter h1 em { font-style: italic; color: #8b7d6b; }
  .chapter h2 { font-size: 2rem; font-weight: 300; color: #5a524a; margin-bottom: 1.5rem; }
  .chapter p { font-size: 1.05rem; line-height: 2.2; color: #6b635a; max-width: 480px; margin: 0 auto; font-weight: 300; }
  .chapter .date-badge { display: inline-block; border: 1px solid #c4b494; padding: 0.5rem 2.5rem; margin-top: 2rem; font-size: 0.8rem; letter-spacing: 0.2em; color: #8b7d6b; }
  .photo-frame { width: 280px; height: 380px; background: linear-gradient(135deg, #e8e2d8, #d4cec4); margin: 2.5rem auto; display: flex; align-items: center; justify-content: center; font-size: 4rem; opacity: 0.25; border: 10px solid white; box-shadow: 0 12px 40px rgba(0,0,0,0.08); position: relative; }
  .photo-frame::after { content: ''; position: absolute; inset: 0; border: 1px solid rgba(0,0,0,0.05); }
  .chapter.dark { background: #3a3a3a; color: #d4cec4; }
  .chapter.dark::after { background: linear-gradient(180deg, #5a524a, transparent); }
  .chapter.dark h2 { color: #e8e2d8; }
  .chapter.dark p { color: #a09888; }
  .chapter.accent { background: linear-gradient(135deg, #c4b494, #a09070); color: white; }
  .chapter.accent h2 { color: white; }
  .chapter.accent p { color: rgba(255,255,255,0.8); }
  .chapter.accent .chapter-num { color: rgba(255,255,255,0.5); }
  .chapter.accent .chapter-num::before, .chapter.accent .chapter-num::after { background: rgba(255,255,255,0.3); }
  .timeline-mini { display: flex; gap: 3rem; justify-content: center; margin: 2rem 0; flex-wrap: wrap; }
  .timeline-dot { text-align: center; position: relative; }
  .timeline-dot::after { content: ''; position: absolute; top: 8px; right: -28px; width: 22px; height: 1px; background: #c4b494; }
  .timeline-dot:last-child::after { display: none; }
  .timeline-dot .year { font-size: 1.5rem; color: #c4b494; font-weight: 300; }
  .timeline-dot .event { font-size: 0.7rem; color: #8b7d6b; letter-spacing: 0.1em; margin-top: 0.5rem; }
  .rsvp-mini { max-width: 350px; margin: 2.5rem auto 0; }
  .rsvp-mini input { width: 100%; padding: 1rem; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #e8e2d8; font-family: inherit; margin-bottom: 0.75rem; text-align: center; transition: all 0.3s; }
  .rsvp-mini input:focus { border-color: rgba(196,180,148,0.5); outline: none; }
  .rsvp-mini input::placeholder { color: rgba(255,255,255,0.25); }
  .rsvp-mini button { width: 100%; padding: 1rem; background: #c4b494; color: #3a3a3a; border: none; font-family: inherit; cursor: pointer; letter-spacing: 0.15em; text-transform: uppercase; font-size: 0.75rem; font-weight: 600; transition: all 0.3s; }
  .rsvp-mini button:hover { background: #d4c4a4; transform: translateY(-2px); }
  .quote-story { font-size: 1.3rem; font-style: italic; font-weight: 300; color: #5a524a; max-width: 400px; margin: 2rem auto 0; line-height: 1.8; }
  .footer { padding: 3rem 2rem; text-align: center; font-size: 0.7rem; color: #b8a88a; letter-spacing: 0.15em; background: #fafaf8; }
  .footer .divider { width: 30px; height: 1px; background: #d4cec4; margin: 1rem auto; }
</style>
</head>
<body>
  <section class="chapter">
    <div>
      <div class="chapter-num">Capitolo Uno</div>
      <h1>La storia di <em>Matteo</em> e <em>Chiara</em></h1>
      <div class="date-badge">3 Aprile 2026</div>
    </div>
  </section>
  <section class="chapter">
    <div>
      <div class="chapter-num">Capitolo Due</div>
      <h2>Come tutto &egrave; iniziato</h2>
      <p>Un incontro casuale in una libreria di Venezia. Lei cercava Calvino, lui Borges. I loro sguardi si sono incrociati tra gli scaffali, e da quel momento non si sono pi&ugrave; lasciati.</p>
      <div class="photo-frame">&#128150;</div>
    </div>
  </section>
  <section class="chapter">
    <div>
      <div class="chapter-num">Capitolo Tre</div>
      <h2>Il Nostro Viaggio</h2>
      <div class="timeline-mini">
        <div class="timeline-dot"><div class="year">2020</div><div class="event">Il primo incontro</div></div>
        <div class="timeline-dot"><div class="year">2021</div><div class="event">Il primo viaggio</div></div>
        <div class="timeline-dot"><div class="year">2023</div><div class="event">La convivenza</div></div>
        <div class="timeline-dot"><div class="year">2025</div><div class="event">La proposta</div></div>
      </div>
    </div>
  </section>
  <section class="chapter accent">
    <div>
      <div class="chapter-num">Capitolo Quattro</div>
      <h2>La Promessa</h2>
      <p>In una sera di dicembre, sotto la neve a Cortina, Matteo ha preso la mano di Chiara e le ha chiesto di sposarlo. Lei ha detto s&igrave; prima ancora che finisse la domanda.</p>
      <p class="quote-story" style="color: rgba(255,255,255,0.7);">"In ogni vita, ti sceglierei. In ogni mondo, ti troverei."</p>
    </div>
  </section>
  <section class="chapter">
    <div>
      <div class="chapter-num">Capitolo Cinque</div>
      <h2>I Dettagli</h2>
      <p>Cerimonia intima nella Basilica di San Marco, Venezia, alle ore 15:00. A seguire, ricevimento al Gritti Palace con vista sul Canal Grande.</p>
    </div>
  </section>
  <section class="chapter dark">
    <div>
      <div class="chapter-num" style="color:#8b7d6b">Capitolo Finale</div>
      <h2>Il Grande Giorno</h2>
      <p>Vi aspettiamo per celebrare insieme il nostro amore. Una cerimonia intima, solo le persone pi&ugrave; care.</p>
      <div class="rsvp-mini">
        <input placeholder="Il tuo nome" />
        <input placeholder="Email" />
        <button>Sar&ograve; presente</button>
      </div>
    </div>
  </section>
  <footer class="footer">
    <div>Matteo &amp; Chiara</div>
    <div class="divider"></div>
    <div>Venezia 2026</div>
  </footer>
</body>
</html>`,
};
