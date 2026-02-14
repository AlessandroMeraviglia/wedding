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
  body { font-family: 'Georgia', serif; color: #4a3728; background: #fdf8f4; }
  .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(135deg, #fdf2f0 0%, #fce8e4 50%, #f9ddd6 100%); position: relative; overflow: hidden; }
  .hero::before { content: ''; position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(199,134,134,0.15) 0%, transparent 70%); border-radius: 50%; }
  .hero::after { content: ''; position: absolute; bottom: -30px; left: -30px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(199,134,134,0.1) 0%, transparent 70%); border-radius: 50%; }
  .hero-content { z-index: 1; padding: 2rem; }
  .hero h3 { font-size: 1rem; letter-spacing: 0.3em; text-transform: uppercase; color: #c78686; margin-bottom: 1rem; font-weight: 400; }
  .hero h1 { font-size: 3.5rem; font-weight: 300; line-height: 1.2; margin-bottom: 0.5rem; color: #5a3e36; }
  .hero h1 span { display: block; font-style: italic; color: #c78686; }
  .hero .date { font-size: 1.2rem; letter-spacing: 0.2em; margin-top: 2rem; color: #8b6f66; }
  .hero .divider { width: 60px; height: 1px; background: #c78686; margin: 1.5rem auto; }
  .flower { position: absolute; font-size: 3rem; opacity: 0.15; animation: float 6s ease-in-out infinite; }
  .flower:nth-child(1) { top: 10%; left: 5%; animation-delay: 0s; }
  .flower:nth-child(2) { top: 20%; right: 8%; animation-delay: 1s; }
  .flower:nth-child(3) { bottom: 15%; left: 10%; animation-delay: 2s; }
  @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(10deg); } }
  .section { padding: 5rem 2rem; text-align: center; }
  .section h2 { font-size: 2rem; color: #5a3e36; margin-bottom: 0.5rem; font-weight: 300; }
  .section .subtitle { color: #c78686; letter-spacing: 0.2em; text-transform: uppercase; font-size: 0.75rem; margin-bottom: 3rem; }
  .countdown { display: flex; justify-content: center; gap: 2rem; margin: 2rem 0; }
  .countdown-item { text-align: center; }
  .countdown-item .number { font-size: 3rem; font-weight: 300; color: #c78686; display: block; }
  .countdown-item .label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.2em; color: #8b6f66; }
  .story { background: #fff; }
  .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; max-width: 800px; margin: 0 auto; text-align: left; }
  .story-item { padding: 2rem; border-left: 2px solid #f0d4cf; }
  .story-item h3 { color: #c78686; font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.5rem; }
  .story-item p { color: #6b5a52; line-height: 1.8; font-size: 0.9rem; }
  .gallery { background: #fdf8f4; }
  .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; max-width: 900px; margin: 0 auto; }
  .gallery-item { aspect-ratio: 1; background: linear-gradient(135deg, #f5e1dc, #edd0c8); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 2rem; opacity: 0.6; transition: all 0.3s; }
  .gallery-item:hover { transform: scale(1.05); opacity: 0.8; }
  .rsvp { background: linear-gradient(135deg, #c78686, #a06060); color: white; }
  .rsvp h2 { color: white; }
  .rsvp .subtitle { color: rgba(255,255,255,0.7); }
  .rsvp-form { max-width: 400px; margin: 0 auto; }
  .rsvp-form input, .rsvp-form select { width: 100%; padding: 1rem; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); border-radius: 8px; color: white; font-family: inherit; font-size: 0.9rem; margin-bottom: 1rem; }
  .rsvp-form input::placeholder { color: rgba(255,255,255,0.5); }
  .rsvp-form button { width: 100%; padding: 1rem; background: white; color: #c78686; border: none; border-radius: 8px; font-family: inherit; font-size: 1rem; font-weight: 600; cursor: pointer; }
  .map { background: #f5e8e3; }
  .map-placeholder { max-width: 800px; margin: 0 auto; height: 300px; background: linear-gradient(135deg, #e8d5ce, #dcc4bb); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #8b6f66; }
  .footer { padding: 3rem 2rem; text-align: center; background: #5a3e36; color: rgba(255,255,255,0.7); font-size: 0.8rem; }
  .addon-badge { display: none; position: fixed; bottom: 20px; right: 20px; background: #c78686; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.75rem; z-index: 100; }
  .addon-badge.visible { display: block; animation: slideIn 0.3s ease; }
  @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
</style>
</head>
<body>
  <div class="flower">&#127�;</div>
  <div class="flower">&#127803;</div>
  <div class="flower">&#127800;</div>
  <section class="hero">
    <div class="hero-content">
      <h3>Vi invitiamo al matrimonio di</h3>
      <h1>Marco <span>&amp; Giulia</span></h1>
      <div class="divider"></div>
      <p class="date">15 Giugno 2026 &bull; Roma</p>
    </div>
  </section>
  <section class="section">
    <h2>Mancano</h2>
    <p class="subtitle">al nostro grande giorno</p>
    <div class="countdown">
      <div class="countdown-item"><span class="number">120</span><span class="label">Giorni</span></div>
      <div class="countdown-item"><span class="number">14</span><span class="label">Ore</span></div>
      <div class="countdown-item"><span class="number">32</span><span class="label">Minuti</span></div>
    </div>
  </section>
  <section class="section story">
    <h2>La Nostra Storia</h2>
    <p class="subtitle">come tutto &egrave; iniziato</p>
    <div class="story-grid">
      <div class="story-item"><h3>Il Primo Incontro</h3><p>Era una sera d'estate del 2020, ci siamo conosciuti ad una cena tra amici. Un sorriso ha cambiato tutto.</p></div>
      <div class="story-item"><h3>La Proposta</h3><p>Al tramonto, sulla terrazza con vista sui tetti di Roma, Marco si &egrave; inginocchiato con un anello e una promessa.</p></div>
    </div>
  </section>
  <section class="section gallery">
    <h2>I Nostri Momenti</h2>
    <p class="subtitle">galleria fotografica</p>
    <div class="gallery-grid">
      <div class="gallery-item">&#128247;</div>
      <div class="gallery-item">&#128150;</div>
      <div class="gallery-item">&#128247;</div>
      <div class="gallery-item">&#128150;</div>
      <div class="gallery-item">&#128247;</div>
      <div class="gallery-item">&#128150;</div>
    </div>
  </section>
  <section class="section rsvp">
    <h2>Conferma la Tua Presenza</h2>
    <p class="subtitle">RSVP</p>
    <div class="rsvp-form">
      <input placeholder="Nome e Cognome" />
      <input placeholder="Email" />
      <select><option>Parteciperò con gioia!</option><option>Purtroppo non posso</option></select>
      <button>Conferma</button>
    </div>
  </section>
  <section class="section map">
    <h2>Dove Trovarci</h2>
    <p class="subtitle">Location</p>
    <div class="map-placeholder">&#128205; Villa Borghese, Roma</div>
  </section>
  <footer class="footer">
    <p>Marco &amp; Giulia &bull; 15 Giugno 2026</p>
    <p style="margin-top: 0.5rem; opacity: 0.5;">Realizzato con amore da WeddingSite</p>
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
  body { font-family: -apple-system, 'Helvetica Neue', sans-serif; color: #1a1a1a; background: #ffffff; }
  .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 2rem; }
  .hero h1 { font-size: 4rem; font-weight: 200; letter-spacing: -0.02em; line-height: 1.1; }
  .hero h1 span { display: block; font-weight: 600; }
  .hero .meta { margin-top: 3rem; font-size: 0.85rem; letter-spacing: 0.3em; text-transform: uppercase; color: #999; }
  .hero .line { width: 40px; height: 1px; background: #ddd; margin: 2rem auto; }
  .section { padding: 6rem 2rem; max-width: 700px; margin: 0 auto; }
  .section.full { max-width: 100%; background: #fafafa; }
  .section h2 { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.3em; color: #999; margin-bottom: 2rem; }
  .section p { font-size: 1.1rem; line-height: 2; color: #444; font-weight: 300; }
  .countdown { display: flex; justify-content: center; gap: 4rem; padding: 4rem 2rem; }
  .countdown-item { text-align: center; }
  .countdown-item .num { font-size: 4rem; font-weight: 200; color: #1a1a1a; }
  .countdown-item .lbl { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.3em; color: #999; margin-top: 0.5rem; }
  .info-grid { display: grid; grid-template-columns: 1fr 1px 1fr; gap: 3rem; padding: 4rem 2rem; max-width: 700px; margin: 0 auto; }
  .info-grid .divider { background: #eee; }
  .info-grid .item h3 { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.25em; color: #999; margin-bottom: 1rem; }
  .info-grid .item p { font-size: 1rem; line-height: 1.8; color: #333; }
  .rsvp { padding: 6rem 2rem; text-align: center; background: #1a1a1a; color: white; }
  .rsvp h2 { color: #666; }
  .rsvp p { color: #888; font-size: 0.9rem; margin-bottom: 2rem; }
  .rsvp input { padding: 1rem 1.5rem; border: 1px solid #333; background: transparent; color: white; font-family: inherit; font-size: 0.9rem; width: 300px; margin-right: 0.5rem; }
  .rsvp button { padding: 1rem 2rem; background: white; color: #1a1a1a; border: none; font-family: inherit; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.2em; cursor: pointer; }
  .footer { padding: 3rem 2rem; text-align: center; font-size: 0.7rem; color: #ccc; letter-spacing: 0.2em; text-transform: uppercase; }
</style>
</head>
<body>
  <section class="hero">
    <div>
      <h1>Luca<span>&amp; Anna</span></h1>
      <div class="line"></div>
      <p class="meta">20 Settembre 2026 &bull; Milano</p>
    </div>
  </section>
  <div class="countdown">
    <div class="countdown-item"><div class="num">218</div><div class="lbl">Giorni</div></div>
    <div class="countdown-item"><div class="num">08</div><div class="lbl">Ore</div></div>
    <div class="countdown-item"><div class="num">45</div><div class="lbl">Min</div></div>
  </div>
  <section class="section">
    <h2>La cerimonia</h2>
    <p>Vi invitiamo a celebrare insieme a noi il giorno pi&ugrave; importante della nostra vita. Sar&agrave; una cerimonia intima e piena di emozione, seguita da un ricevimento elegante.</p>
  </section>
  <div class="info-grid">
    <div class="item"><h3>Cerimonia</h3><p>Palazzo Reale<br/>Via Dante 1, Milano<br/>Ore 15:00</p></div>
    <div class="divider"></div>
    <div class="item"><h3>Ricevimento</h3><p>Villa Necchi<br/>Via Mozart 14, Milano<br/>Ore 18:00</p></div>
  </div>
  <section class="rsvp">
    <h2>RSVP</h2>
    <p>Conferma la tua presenza entro il 20 Agosto 2026</p>
    <div><input placeholder="La tua email" /><button>Conferma</button></div>
  </section>
  <footer class="footer">Luca &amp; Anna &bull; 2026</footer>
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
  body { font-family: 'Georgia', serif; color: #2c1810; background: #0a0a0a; }
  .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, #0a0a0a 0%, #1a1208 50%, #0a0a0a 100%); position: relative; overflow: hidden; }
  .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%); }
  .gold-line { width: 100px; height: 1px; background: linear-gradient(90deg, transparent, #d4af37, transparent); margin: 1.5rem auto; }
  .hero h3 { font-size: 0.8rem; letter-spacing: 0.5em; text-transform: uppercase; color: #d4af37; font-weight: 400; }
  .hero h1 { font-size: 4rem; color: #fff; font-weight: 300; }
  .hero h1 em { font-style: italic; color: #d4af37; }
  .hero .date { color: #888; font-size: 1rem; letter-spacing: 0.3em; }
  .hero .ornament { font-size: 2rem; color: #d4af37; opacity: 0.5; margin: 1rem 0; }
  .section { padding: 6rem 2rem; text-align: center; }
  .section.dark { background: #0f0f0f; color: #ccc; }
  .section.gold-bg { background: linear-gradient(135deg, #1a1208, #0f0f0f); }
  .section h2 { font-size: 2rem; color: #d4af37; font-weight: 300; margin-bottom: 0.5rem; }
  .section .sub { font-size: 0.65rem; letter-spacing: 0.4em; text-transform: uppercase; color: #666; margin-bottom: 3rem; }
  .countdown { display: flex; justify-content: center; gap: 3rem; }
  .countdown-item .num { font-size: 3.5rem; color: #d4af37; font-weight: 300; }
  .countdown-item .lbl { font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase; color: #666; }
  .timeline { max-width: 600px; margin: 0 auto; text-align: left; }
  .timeline-item { display: flex; gap: 2rem; padding: 2rem 0; border-left: 1px solid #333; padding-left: 2rem; position: relative; }
  .timeline-item::before { content: ''; position: absolute; left: -4px; top: 2rem; width: 7px; height: 7px; background: #d4af37; border-radius: 50%; }
  .timeline-item .time { font-size: 0.75rem; color: #d4af37; letter-spacing: 0.2em; min-width: 60px; }
  .timeline-item .desc { color: #aaa; font-size: 0.9rem; }
  .gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; max-width: 900px; margin: 0 auto; }
  .gallery-grid .item { aspect-ratio: 1; background: linear-gradient(135deg, #1a1208, #2a1a0a); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; transition: all 0.3s; }
  .gallery-grid .item:hover { background: linear-gradient(135deg, #2a1a0a, #3a2a1a); }
  .rsvp-section { background: linear-gradient(135deg, #d4af37, #b8941f); padding: 6rem 2rem; }
  .rsvp-section h2 { color: #0a0a0a; }
  .rsvp-section .sub { color: rgba(0,0,0,0.4); }
  .rsvp-form { max-width: 400px; margin: 0 auto; }
  .rsvp-form input { width: 100%; padding: 1rem; background: rgba(0,0,0,0.1); border: 1px solid rgba(0,0,0,0.2); color: #0a0a0a; font-family: inherit; margin-bottom: 1rem; font-size: 0.9rem; }
  .rsvp-form input::placeholder { color: rgba(0,0,0,0.4); }
  .rsvp-form button { width: 100%; padding: 1rem; background: #0a0a0a; color: #d4af37; border: none; font-family: inherit; font-size: 0.9rem; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; }
  .footer { padding: 3rem; text-align: center; background: #0a0a0a; color: #444; font-size: 0.75rem; letter-spacing: 0.2em; }
</style>
</head>
<body>
  <section class="hero">
    <div>
      <h3>Il Matrimonio di</h3>
      <div class="gold-line"></div>
      <h1>Alessandro <em>&amp;</em> Francesca</h1>
      <div class="ornament">&diams;</div>
      <p class="date">12 &bull; Luglio &bull; 2026</p>
    </div>
  </section>
  <section class="section dark">
    <h2>Il Grande Giorno</h2>
    <p class="sub">countdown</p>
    <div class="countdown">
      <div class="countdown-item"><div class="num">148</div><div class="lbl">Giorni</div></div>
      <div class="countdown-item"><div class="num">06</div><div class="lbl">Ore</div></div>
      <div class="countdown-item"><div class="num">15</div><div class="lbl">Minuti</div></div>
    </div>
  </section>
  <section class="section gold-bg">
    <h2>Programma</h2>
    <p class="sub">timeline della giornata</p>
    <div class="timeline">
      <div class="timeline-item"><span class="time">15:00</span><span class="desc">Cerimonia presso la Cappella Palatina</span></div>
      <div class="timeline-item"><span class="time">17:00</span><span class="desc">Aperitivo nei giardini del palazzo</span></div>
      <div class="timeline-item"><span class="time">19:30</span><span class="desc">Cena di gala nella Sala degli Specchi</span></div>
      <div class="timeline-item"><span class="time">22:00</span><span class="desc">Taglio della torta e balli</span></div>
    </div>
  </section>
  <section class="section dark">
    <h2>Galleria</h2>
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
      <button>Conferma Presenza</button>
    </div>
  </section>
  <footer class="footer">Alessandro &amp; Francesca &bull; MMXXVI</footer>
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
  body { font-family: 'Georgia', serif; color: #5c4a3a; background: #f7f3ee; }
  .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, #e8dfd4 0%, #f7f3ee 100%); padding: 2rem; position: relative; }
  .leaf { position: absolute; font-size: 3rem; opacity: 0.15; }
  .leaf:nth-child(1) { top: 5%; left: 3%; transform: rotate(-30deg); }
  .leaf:nth-child(2) { top: 15%; right: 5%; transform: rotate(20deg); }
  .leaf:nth-child(3) { bottom: 10%; left: 8%; transform: rotate(15deg); }
  .leaf:nth-child(4) { bottom: 20%; right: 3%; transform: rotate(-15deg); }
  .hero h3 { font-size: 0.85rem; color: #9b7b5e; letter-spacing: 0.2em; font-weight: 400; }
  .hero h1 { font-size: 3.5rem; font-weight: 300; color: #5c4a3a; margin: 0.5rem 0; }
  .hero h1 em { font-style: italic; color: #9b7b5e; }
  .hero .date { font-size: 1rem; color: #8a7565; margin-top: 1.5rem; }
  .wreath { width: 120px; height: 120px; border: 2px solid #c4a882; border-radius: 50%; margin: 2rem auto; display: flex; align-items: center; justify-content: center; font-size: 2rem; }
  .section { padding: 5rem 2rem; text-align: center; }
  .section h2 { font-size: 1.8rem; color: #5c4a3a; font-weight: 300; }
  .section .sub { font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase; color: #9b7b5e; margin-bottom: 2.5rem; }
  .bg-cream { background: #f0ebe3; }
  .info-cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; max-width: 600px; margin: 0 auto; }
  .info-card { background: white; border-radius: 16px; padding: 2rem; border: 1px solid #e5ddd3; }
  .info-card h3 { color: #9b7b5e; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.75rem; }
  .info-card p { color: #6b5a4a; font-size: 0.95rem; line-height: 1.7; }
  .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; max-width: 700px; margin: 0 auto; }
  .gallery-item { aspect-ratio: 1; background: linear-gradient(135deg, #e8dfd4, #d9cfc2); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 2rem; opacity: 0.5; }
  .rsvp { background: #5c4a3a; color: white; border-radius: 24px; max-width: 500px; margin: 0 auto; padding: 3rem; }
  .rsvp h2 { color: #c4a882; }
  .rsvp input { width: 100%; padding: 0.9rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; color: white; font-family: inherit; margin-bottom: 0.75rem; }
  .rsvp input::placeholder { color: rgba(255,255,255,0.4); }
  .rsvp button { width: 100%; padding: 1rem; background: #c4a882; color: #3a2e24; border: none; border-radius: 12px; font-family: inherit; font-size: 0.95rem; cursor: pointer; }
  .footer { padding: 3rem 2rem; text-align: center; font-size: 0.8rem; color: #9b7b5e; }
</style>
</head>
<body>
  <div class="leaf">&#127807;</div>
  <div class="leaf">&#127811;</div>
  <div class="leaf">&#127807;</div>
  <div class="leaf">&#127811;</div>
  <section class="hero">
    <div>
      <h3>Celebrate with us</h3>
      <h1>Davide <em>&amp;</em> Elena</h1>
      <div class="wreath">&#127803;</div>
      <p class="date">8 Maggio 2026 &bull; Toscana</p>
    </div>
  </section>
  <section class="section">
    <h2>Cerimonia &amp; Ricevimento</h2>
    <p class="sub">dove trovarci</p>
    <div class="info-cards">
      <div class="info-card"><h3>Cerimonia</h3><p>Giardino delle Rose<br/>Borgo Antico, Siena<br/>Ore 16:00</p></div>
      <div class="info-card"><h3>Ricevimento</h3><p>Agriturismo Il Casale<br/>Val d'Orcia<br/>Ore 18:30</p></div>
      <div class="info-card"><h3>Dress Code</h3><p>Garden Chic<br/>Colori naturali e terrosi</p></div>
      <div class="info-card"><h3>Alloggio</h3><p>Camere disponibili<br/>presso l'agriturismo</p></div>
    </div>
  </section>
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
    <div class="rsvp">
      <h2>RSVP</h2>
      <p class="sub" style="color: rgba(255,255,255,0.5);">conferma entro il 1 aprile</p>
      <input placeholder="Il tuo nome" />
      <input placeholder="Email" />
      <button>Conferma</button>
    </div>
  </section>
  <footer class="footer">Davide &amp; Elena &bull; con amore &#127807;</footer>
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
  body { font-family: -apple-system, 'Helvetica Neue', sans-serif; color: #111; background: #fff; }
  .hero { min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; position: relative; }
  .hero-left { background: #111; color: white; display: flex; align-items: center; padding: 4rem; }
  .hero-right { background: linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff); display: flex; align-items: center; justify-content: center; font-size: 8rem; }
  .hero h1 { font-size: 3.5rem; font-weight: 800; line-height: 1; }
  .hero h1 .accent { color: #ff6b6b; }
  .hero .meta { margin-top: 2rem; font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase; color: #666; }
  .section { padding: 5rem 3rem; }
  .section h2 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
  .section .tag { display: inline-block; background: #111; color: white; padding: 0.3rem 1rem; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 2rem; }
  .bg-dark { background: #111; color: white; }
  .bg-dark .tag { background: #ff6b6b; }
  .countdown { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; max-width: 500px; }
  .countdown-item { background: #f5f5f5; padding: 2rem; text-align: center; border-radius: 0; }
  .bg-dark .countdown-item { background: #222; }
  .countdown-item .num { font-size: 3rem; font-weight: 800; }
  .countdown-item .lbl { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.2em; color: #999; margin-top: 0.5rem; }
  .geo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; }
  .geo-item { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-size: 2rem; transition: all 0.2s; cursor: pointer; }
  .geo-item:nth-child(1) { background: #ff6b6b; }
  .geo-item:nth-child(2) { background: #ffd93d; }
  .geo-item:nth-child(3) { background: #6bcb77; }
  .geo-item:nth-child(4) { background: #4d96ff; }
  .geo-item:nth-child(5) { background: #111; color: white; }
  .geo-item:nth-child(6) { background: #ff6b6b; }
  .geo-item:hover { transform: scale(1.05); }
  .rsvp { background: #ff6b6b; color: white; padding: 5rem 3rem; }
  .rsvp h2 { font-size: 3rem; font-weight: 800; }
  .rsvp input { padding: 1rem; background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.3); color: white; font-family: inherit; font-size: 1rem; width: 100%; margin-bottom: 1rem; }
  .rsvp input::placeholder { color: rgba(255,255,255,0.6); }
  .rsvp button { padding: 1rem 3rem; background: #111; color: white; border: none; font-family: inherit; font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; cursor: pointer; }
  .rsvp-form { max-width: 400px; margin-top: 2rem; }
  .footer { padding: 2rem 3rem; background: #111; color: #666; font-size: 0.75rem; display: flex; justify-content: space-between; }
</style>
</head>
<body>
  <section class="hero">
    <div class="hero-left">
      <div>
        <h1>FEDERICO<br/><span class="accent">&amp;</span><br/>VALENTINA</h1>
        <p class="meta">10 Ottobre 2026 &bull; Torino</p>
      </div>
    </div>
    <div class="hero-right">&#128150;</div>
  </section>
  <section class="section">
    <span class="tag">Countdown</span>
    <h2>Il countdown &egrave; partito</h2>
    <div class="countdown" style="margin-top: 2rem;">
      <div class="countdown-item"><div class="num">238</div><div class="lbl">Giorni</div></div>
      <div class="countdown-item"><div class="num">12</div><div class="lbl">Ore</div></div>
      <div class="countdown-item"><div class="num">05</div><div class="lbl">Min</div></div>
    </div>
  </section>
  <section class="section bg-dark">
    <span class="tag">Gallery</span>
    <h2>Momenti</h2>
    <div class="geo-grid" style="max-width:500px; margin-top: 2rem;">
      <div class="geo-item">&#128247;</div>
      <div class="geo-item">&#128150;</div>
      <div class="geo-item">&#128247;</div>
      <div class="geo-item">&#128150;</div>
      <div class="geo-item">&#128247;</div>
      <div class="geo-item">&#128150;</div>
    </div>
  </section>
  <section class="rsvp">
    <h2>RSVP</h2>
    <div class="rsvp-form">
      <input placeholder="Nome" />
      <input placeholder="Email" />
      <button>Conferma</button>
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
  body { font-family: 'Georgia', serif; color: #2c4a5a; background: #f0f7fa; }
  .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, #87ceeb 0%, #e0f4ff 40%, #f5e6d0 60%, #f0f7fa 100%); padding: 2rem; position: relative; }
  .wave { position: absolute; bottom: 0; width: 100%; height: 60px; background: #f0f7fa; clip-path: polygon(0 60%, 15% 40%, 30% 55%, 45% 35%, 60% 50%, 75% 30%, 90% 45%, 100% 25%, 100% 100%, 0 100%); }
  .hero h3 { font-size: 0.85rem; letter-spacing: 0.25em; color: #5a8fa8; font-weight: 400; text-transform: uppercase; }
  .hero h1 { font-size: 3.5rem; font-weight: 300; color: #2c4a5a; margin: 0.5rem 0; }
  .hero h1 em { font-style: italic; color: #e8836b; }
  .hero .date { color: #7aadbe; font-size: 1rem; letter-spacing: 0.2em; margin-top: 1rem; }
  .shell { font-size: 2.5rem; margin: 1rem 0; opacity: 0.5; }
  .section { padding: 5rem 2rem; text-align: center; }
  .section h2 { font-size: 2rem; color: #2c4a5a; font-weight: 300; }
  .section .sub { font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase; color: #7aadbe; margin-bottom: 2.5rem; }
  .bg-sand { background: #f5e6d0; }
  .bg-ocean { background: linear-gradient(135deg, #2c4a5a, #1a3040); color: #b0d4e8; }
  .bg-ocean h2 { color: #e8836b; }
  .info-row { display: flex; justify-content: center; gap: 3rem; flex-wrap: wrap; }
  .info-item { text-align: center; padding: 2rem; }
  .info-item .icon { font-size: 2rem; margin-bottom: 0.75rem; }
  .info-item h3 { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: #5a8fa8; margin-bottom: 0.5rem; }
  .info-item p { color: #4a7a8a; font-size: 0.9rem; line-height: 1.6; }
  .rsvp { background: #e8836b; color: white; }
  .rsvp h2 { color: white; }
  .rsvp .sub { color: rgba(255,255,255,0.6); }
  .rsvp-form { max-width: 400px; margin: 0 auto; }
  .rsvp-form input { width: 100%; padding: 1rem; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; color: white; font-family: inherit; margin-bottom: 0.75rem; }
  .rsvp-form input::placeholder { color: rgba(255,255,255,0.5); }
  .rsvp-form button { width: 100%; padding: 1rem; background: white; color: #e8836b; border: none; border-radius: 8px; font-family: inherit; font-weight: 600; cursor: pointer; }
  .footer { padding: 3rem 2rem; text-align: center; font-size: 0.8rem; color: #7aadbe; background: #f0f7fa; }
</style>
</head>
<body>
  <section class="hero">
    <div>
      <h3>Ci sposiamo!</h3>
      <h1>Paolo <em>&amp;</em> Sara</h1>
      <div class="shell">&#127802;</div>
      <p class="date">28 Agosto 2026 &bull; Amalfi</p>
    </div>
    <div class="wave"></div>
  </section>
  <section class="section">
    <h2>Il Programma</h2>
    <p class="sub">la nostra giornata</p>
    <div class="info-row">
      <div class="info-item"><div class="icon">&#9962;</div><h3>Cerimonia</h3><p>Duomo di Amalfi<br/>Ore 16:00</p></div>
      <div class="info-item"><div class="icon">&#127860;</div><h3>Aperitivo</h3><p>Terrazza sul mare<br/>Ore 17:30</p></div>
      <div class="info-item"><div class="icon">&#127878;</div><h3>Ricevimento</h3><p>Villa Cimbrone<br/>Ore 19:30</p></div>
    </div>
  </section>
  <section class="section rsvp">
    <h2>RSVP</h2>
    <p class="sub">conferma la tua presenza</p>
    <div class="rsvp-form">
      <input placeholder="Nome e Cognome" />
      <input placeholder="Email" />
      <button>Conferma</button>
    </div>
  </section>
  <footer class="footer">Paolo &amp; Sara &bull; Amalfi 2026 &#127754;</footer>
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
  body { font-family: 'Georgia', serif; color: #4a3f35; background: #f5f0e8; }
  .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, #d4c5a9 0%, #e8dcc8 30%, #f5f0e8 100%); padding: 2rem; }
  .hero-frame { border: 2px solid #b8a88a; padding: 4rem; display: inline-block; }
  .hero h3 { font-size: 0.8rem; letter-spacing: 0.3em; text-transform: uppercase; color: #8b7d6b; font-weight: 400; }
  .hero h1 { font-size: 3.5rem; font-weight: 300; color: #4a3f35; margin: 0.5rem 0; }
  .hero h1 em { color: #8b6b3e; font-style: italic; }
  .hero .date { font-size: 1rem; color: #8b7d6b; letter-spacing: 0.2em; margin-top: 1rem; }
  .olive { font-size: 1.5rem; margin: 0.75rem 0; opacity: 0.6; }
  .section { padding: 5rem 2rem; text-align: center; }
  .section h2 { font-size: 2rem; color: #4a3f35; font-weight: 300; }
  .section .sub { font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase; color: #8b6b3e; margin-bottom: 2.5rem; }
  .bg-stone { background: #e8dcc8; }
  .bg-terracotta { background: #c4775a; color: #f5f0e8; }
  .bg-terracotta h2 { color: #f5f0e8; }
  .villa-info { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; max-width: 700px; margin: 0 auto; text-align: left; }
  .villa-card { background: white; padding: 2rem; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
  .villa-card h3 { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: #8b6b3e; margin-bottom: 0.75rem; }
  .villa-card p { color: #6b5f50; line-height: 1.7; font-size: 0.9rem; }
  .gallery-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 0.75rem; max-width: 800px; margin: 0 auto; }
  .gallery-item { background: linear-gradient(135deg, #d4c5a9, #c4b494); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 2rem; opacity: 0.5; min-height: 150px; }
  .gallery-item:first-child { grid-row: span 2; }
  .rsvp-form { max-width: 400px; margin: 2rem auto 0; }
  .rsvp-form input { width: 100%; padding: 1rem; background: rgba(255,255,255,0.15); border: 1px solid rgba(245,240,232,0.3); border-radius: 4px; color: #f5f0e8; font-family: inherit; margin-bottom: 0.75rem; }
  .rsvp-form input::placeholder { color: rgba(245,240,232,0.5); }
  .rsvp-form button { width: 100%; padding: 1rem; background: #f5f0e8; color: #c4775a; border: none; border-radius: 4px; font-family: inherit; font-weight: 600; cursor: pointer; }
  .footer { padding: 3rem 2rem; text-align: center; font-size: 0.8rem; color: #8b7d6b; }
</style>
</head>
<body>
  <section class="hero">
    <div class="hero-frame">
      <h3>Siete invitati al matrimonio di</h3>
      <h1>Roberto <em>&amp;</em> Beatrice</h1>
      <div class="olive">&#127807;</div>
      <p class="date">5 Settembre 2026 &bull; Chianti</p>
    </div>
  </section>
  <section class="section">
    <h2>La Location</h2>
    <p class="sub">villa dei cipressi, chianti</p>
    <div class="villa-info">
      <div class="villa-card"><h3>Cerimonia</h3><p>Cappella della Villa<br/>Ore 16:30<br/>Cerimonia religiosa</p></div>
      <div class="villa-card"><h3>Ricevimento</h3><p>Giardino degli Ulivi<br/>Ore 18:30<br/>Cena toscana</p></div>
      <div class="villa-card"><h3>Come Arrivare</h3><p>A 30 min da Firenze<br/>Parcheggio disponibile<br/>Navetta dalla stazione</p></div>
      <div class="villa-card"><h3>Alloggio</h3><p>Suite nella villa<br/>Agriturismo convenzionato<br/>Prenotare entro Luglio</p></div>
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
    <p class="sub" style="color:rgba(245,240,232,0.6)">conferma la tua presenza</p>
    <div class="rsvp-form">
      <input placeholder="Nome" />
      <input placeholder="Email" />
      <button>Conferma</button>
    </div>
  </section>
  <footer class="footer">Roberto &amp; Beatrice &bull; Chianti 2026</footer>
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
  body { font-family: 'Georgia', serif; color: #3a3a3a; background: #fafaf8; }
  .chapter { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 3rem 2rem; text-align: center; }
  .chapter:nth-child(even) { background: #f3f1ec; }
  .chapter-num { font-size: 0.6rem; letter-spacing: 0.4em; text-transform: uppercase; color: #b8a88a; margin-bottom: 2rem; }
  .chapter h1 { font-size: 3rem; font-weight: 300; line-height: 1.3; max-width: 600px; margin: 0 auto; }
  .chapter h1 em { font-style: italic; color: #8b7d6b; }
  .chapter h2 { font-size: 2rem; font-weight: 300; color: #5a524a; margin-bottom: 1rem; }
  .chapter p { font-size: 1.1rem; line-height: 2; color: #6b635a; max-width: 500px; margin: 0 auto; }
  .chapter .date-badge { display: inline-block; border: 1px solid #c4b494; padding: 0.5rem 2rem; margin-top: 2rem; font-size: 0.85rem; letter-spacing: 0.2em; color: #8b7d6b; }
  .photo-frame { width: 300px; height: 400px; background: linear-gradient(135deg, #e8e2d8, #d4cec4); margin: 2rem auto; display: flex; align-items: center; justify-content: center; font-size: 4rem; opacity: 0.3; border: 8px solid white; box-shadow: 0 8px 30px rgba(0,0,0,0.1); }
  .chapter.dark { background: #3a3a3a; color: #d4cec4; }
  .chapter.dark h2 { color: #e8e2d8; }
  .chapter.dark p { color: #a09888; }
  .rsvp-mini { max-width: 350px; margin: 2rem auto 0; }
  .rsvp-mini input { width: 100%; padding: 0.9rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #e8e2d8; font-family: inherit; margin-bottom: 0.75rem; text-align: center; }
  .rsvp-mini input::placeholder { color: rgba(255,255,255,0.3); }
  .rsvp-mini button { width: 100%; padding: 0.9rem; background: #c4b494; color: #3a3a3a; border: none; font-family: inherit; cursor: pointer; letter-spacing: 0.15em; text-transform: uppercase; font-size: 0.8rem; }
  .footer { padding: 2rem; text-align: center; font-size: 0.75rem; color: #b8a88a; letter-spacing: 0.15em; }
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
      <h2>La Promessa</h2>
      <p>In una sera di dicembre, sotto la neve a Cortina, Matteo ha preso la mano di Chiara e le ha chiesto di sposarlo. Lei ha detto s&igrave; prima ancora che finisse la domanda.</p>
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
  <footer class="footer">Matteo &amp; Chiara &bull; Venezia 2026</footer>
</body>
</html>`,
};
