/* 全国消防本部 搬送所要時間ダッシュボード — レイアウト比較用ウェブコンポーネント
   variant: a = サイドパネル型 / b = フルブリード型 / c = ランキング連動型 / m = スマホ表示 */
(function () {
  const CSS = `
fire-dash{display:block;width:100%;height:100%;flex:1 1 auto;min-width:0}
.fd{--bg:oklch(0.985 0.004 90);--panel:#fff;--ink:oklch(0.22 0.01 250);--ink2:oklch(0.48 0.012 250);
 --line:oklch(0.9 0.006 250);--accent:oklch(0.5 0.13 250);
 font-family:"Noto Sans JP","Hiragino Sans",sans-serif;color:var(--ink);background:var(--bg);
 width:100%;height:100%;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box}
.fd *{box-sizing:border-box}
.fd-hd{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;padding:16px 22px 14px;
 background:var(--panel);border-bottom:1px solid var(--line);flex:none}
.fd-ttl{font-size:19px;font-weight:700;letter-spacing:.01em;margin:0;line-height:1.3}
.fd-sub{font-size:11.5px;color:var(--ink2);margin-top:5px;display:flex;gap:10px;flex-wrap:wrap;white-space:normal}
.fd-sub b{font-weight:600;color:var(--ink)}
.fd-seg{display:flex;gap:0;border:1px solid var(--line);border-radius:7px;overflow:hidden;flex:none;background:#fff}
.fd-seg button{appearance:none;border:0;background:#fff;font:inherit;font-size:12px;padding:8px 13px;cursor:pointer;
 color:var(--ink2);border-right:1px solid var(--line);white-space:nowrap}
.fd-seg button:last-child{border-right:0}
.fd-seg button[aria-pressed="true"]{background:var(--ink);color:#fff}
.fd-body{flex:1;min-height:0;display:flex}
.fd-rail{width:326px;flex:none;background:var(--panel);border-right:1px solid var(--line);
 display:flex;flex-direction:column;min-height:0}
.fd-map{flex:1;min-width:0;position:relative;background:oklch(0.93 0.005 250)}
.fd-map .leaflet-container{width:100%;height:100%;background:oklch(0.955 0.004 250);font-family:inherit}
.fd-sec{padding:14px 18px;border-bottom:1px solid var(--line)}
.fd-sec:last-child{border-bottom:0}
.fd-lab{font-size:10.5px;letter-spacing:.09em;color:var(--ink2);font-weight:600;margin:0 0 9px;text-transform:uppercase}
.fd-src{padding:10px 18px;font-size:10.5px;color:var(--ink2);line-height:1.6;border-top:1px solid var(--line)}
.fd-search{width:100%;font:inherit;font-size:13px;padding:9px 11px;border:1px solid var(--line);border-radius:7px;
 background:oklch(0.98 0.003 250);color:var(--ink)}
.fd-search:focus{outline:2px solid var(--accent);outline-offset:-1px;background:#fff}
.fd-info{padding:14px 18px 16px;border-bottom:1px solid var(--line);min-height:132px}
.fd-info .p{font-size:11.5px;color:var(--ink2)}
.fd-info .n{font-size:14.5px;font-weight:700;line-height:1.35;margin:1px 0 10px}
.fd-big{display:flex;align-items:baseline;gap:7px}
.fd-big em{font-family:"IBM Plex Mono",ui-monospace,monospace;font-style:normal;font-size:34px;font-weight:600;
 letter-spacing:-.02em;line-height:1}
.fd-big span{font-size:12px;color:var(--ink2)}
.fd-meta{margin-top:11px;display:grid;grid-template-columns:1fr auto;gap:4px 12px;font-size:11.5px;color:var(--ink2)}
.fd-meta b{font-family:"IBM Plex Mono",ui-monospace,monospace;font-weight:500;color:var(--ink);font-size:12px}
.fd-hint{font-size:11.5px;color:var(--ink2);line-height:1.6}
.fd-hist{width:100%;display:block;overflow:visible}
.fd-hist text{font-size:9px;fill:var(--ink2);font-family:"IBM Plex Mono",ui-monospace,monospace}
.fd-scale{display:flex;margin-top:8px}
.fd-scale div{flex:1;height:8px}
.fd-scale-l{display:flex;justify-content:space-between;font-size:9px;color:var(--ink2);margin-top:5px;gap:4px}
.fd-list{flex:1;min-height:0;overflow-y:auto;padding:4px 10px 14px}
.fd-row{display:grid;grid-template-columns:26px 1fr 62px 46px;align-items:center;gap:8px;padding:5px 8px;
 border-radius:6px;cursor:pointer;font-size:12px}
.fd-row:hover,.fd-row[data-on="1"]{background:oklch(0.955 0.006 250)}
.fd-row .r{font-family:"IBM Plex Mono",monospace;font-size:10.5px;color:var(--ink2);text-align:right}
.fd-row .nm{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px}
.fd-row .nm i{font-style:normal;color:var(--ink2);font-size:10.5px;margin-right:5px}
.fd-row .bar{height:7px;background:oklch(0.94 0.005 250);border-radius:2px;overflow:hidden}
.fd-row .bar i{display:block;height:100%}
.fd-row .v{font-family:"IBM Plex Mono",monospace;font-size:11.5px;text-align:right}
.fd-sortrow{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:12px 18px 8px}
.fd-mini{display:flex;gap:0;border:1px solid var(--line);border-radius:6px;overflow:hidden}
.fd-mini button{appearance:none;border:0;border-right:1px solid var(--line);background:#fff;font:inherit;font-size:11px;
 padding:5px 9px;cursor:pointer;color:var(--ink2)}
.fd-mini button:last-child{border-right:0}
.fd-mini button[aria-pressed="true"]{background:var(--ink);color:#fff}
/* --- overlay (variant b) --- */
.fd-ov{position:absolute;z-index:600;background:rgba(255,255,255,.93);backdrop-filter:blur(8px);
 border:1px solid var(--line);border-radius:10px;box-shadow:0 6px 24px oklch(0.2 0.02 250 / .12)}
.fd-ov.tl{top:16px;left:16px;width:310px;padding:16px 18px}
.fd-ov.bl{bottom:16px;left:16px;width:310px;padding:13px 16px}
.fd-ov.tr{top:16px;right:16px;width:300px;max-height:calc(100% - 32px);display:flex;flex-direction:column;overflow:hidden}
.fd-ov .fd-info{border:0;padding:0;min-height:0}
.fd-ov .fd-sec{border:0;padding:0}
/* --- mobile --- */
.fd[data-variant="m"]{--pad:15px}
.fd[data-variant="m"] .fd-hd{display:block;padding:11px var(--pad) 0}
.fd[data-variant="m"] .fd-ttl{font-size:15px;letter-spacing:0}
.fd[data-variant="m"] .fd-sub{font-size:10px;gap:9px;margin-top:3px;white-space:normal}
.fd[data-variant="m"] .fd-seg{margin:10px calc(var(--pad) * -1) 0;padding:0 var(--pad) 10px;border:0;border-radius:0;
 background:transparent;gap:7px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.fd[data-variant="m"] .fd-seg::-webkit-scrollbar{display:none}
.fd[data-variant="m"] .fd-seg button{border:1px solid var(--line);border-radius:999px;padding:8px 14px;font-size:12.5px;
 background:#fff;flex:none;min-height:34px}
.fd[data-variant="m"] .fd-seg button[aria-pressed="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}
.fd[data-variant="m"] .fd-body{flex-direction:column;position:relative}
.fd[data-variant="m"] .fd-map{flex:1;min-height:0}
.fd-sheet{position:absolute;left:0;right:0;bottom:0;z-index:700;background:var(--panel);
 border-top:1px solid var(--line);border-radius:16px 16px 0 0;box-shadow:0 -8px 26px oklch(0.2 0.02 250 / .13);
 display:flex;flex-direction:column;height:186px;transition:height .28s cubic-bezier(.32,.72,0,1)}
.fd-sheet[data-open="1"]{height:70%}
.fd-grip{flex:none;padding:9px 0 5px;display:flex;justify-content:center;cursor:pointer;touch-action:none}
.fd-grip i{display:block;width:40px;height:4px;border-radius:2px;background:oklch(0.85 0.008 250)}
.fd-mhead{flex:none;padding:2px var(--pad) 11px;display:flex;align-items:flex-start;gap:12px}
.fd-mhead .txt{flex:1;min-width:0}
.fd-mhead .p{font-size:10.5px;color:var(--ink2);letter-spacing:.02em}
.fd-mhead .n{font-size:14px;font-weight:700;line-height:1.35;margin-top:1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.fd-mhead .num{flex:none;text-align:right;line-height:1}
.fd-mhead .num em{font-family:"IBM Plex Mono",monospace;font-style:normal;font-size:27px;font-weight:600;letter-spacing:-.02em}
.fd-mhead .num u{text-decoration:none;font-size:11px;color:var(--ink2);margin-left:3px}
.fd-mhead .num div{font-size:11px;margin-top:4px;font-family:"IBM Plex Mono",monospace}
.fd-mclose{flex:none;width:30px;height:30px;border-radius:50%;border:1px solid var(--line);background:#fff;
 font:inherit;font-size:14px;color:var(--ink2);cursor:pointer;line-height:1;padding:0}
.fd-mrank{padding:0 var(--pad) 11px;display:flex;gap:7px;flex-wrap:wrap;font-size:11px;color:var(--ink2)}
.fd-mrank span{background:oklch(0.96 0.005 250);border-radius:999px;padding:4px 10px}
.fd-mrank b{font-family:"IBM Plex Mono",monospace;font-weight:600;color:var(--ink)}
.fd-tabs{flex:none;display:flex;gap:20px;padding:0 var(--pad);border-bottom:1px solid var(--line)}
.fd-tabs button{appearance:none;border:0;background:none;font:inherit;font-size:12.5px;color:var(--ink2);
 padding:9px 0 8px;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;min-height:38px}
.fd-tabs button[aria-selected="true"]{color:var(--ink);font-weight:600;border-bottom-color:var(--ink)}
.fd-pane{flex:1;min-height:0;overflow-y:auto;-webkit-overflow-scrolling:touch;display:none}
.fd-pane[data-on="1"]{display:block}
.fd-sheet:not([data-open="1"]) .fd-tabs,.fd-sheet:not([data-open="1"]) .fd-pane{display:none}
.fd-sheet:not([data-open="1"]) .fd-peek{display:block}
.fd-peek{display:none;padding:0 var(--pad) 14px}
.fd[data-variant="m"] .fd-row{grid-template-columns:28px 1fr 54px 50px;padding:9px 7px;min-height:44px;font-size:13px}
.fd[data-variant="m"] .fd-row .nm{font-size:13px}
.fd[data-variant="m"] .fd-row .v{font-size:12.5px}
.fd[data-variant="m"] .fd-list{padding:4px var(--pad) 22px}
.fd[data-variant="m"] .fd-sortrow{padding:11px var(--pad) 5px}
.fd[data-variant="m"] .fd-search{font-size:16px;padding:11px 12px}
.fd[data-variant="m"] .leaflet-control-zoom{display:none}
`;
  if (!document.getElementById('fd-css')) {
    const s = document.createElement('style'); s.id = 'fd-css'; s.textContent = CSS; document.head.appendChild(s);
  }

  const el = (t, cls, html) => { const e = document.createElement(t); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const fmt = (v, d) => v == null ? '—' : v.toLocaleString('ja-JP', { minimumFractionDigits: d, maximumFractionDigits: d });

  const DIV = ['#2166ac', '#7ba7cd', '#cfe0ec', '#f2f0ee', '#f6cdb4', '#e08159', '#b2182b'];
  const SEQ = ['#f0efec', '#d9dfe6', '#b3c2d4', '#7f97b8', '#4a6a94'];

  const METRICS = [
    { id: 'shuyo', key: '入電病院収容平均分', label: '入電→病院収容', unit: '分', dec: 1, type: 'div', hi: '遅い', lo: '速い' },
    { id: 'gencha', key: '入電現着平均分', label: '入電→現場到着', unit: '分', dec: 1, type: 'div', hi: '遅い', lo: '速い' },
    { id: 'ken', key: '出場件数', label: '出場件数', unit: '件', dec: 0, type: 'seq', hi: '多い', lo: '少ない' },
    { id: 'nin', key: '搬送人員', label: '搬送人員', unit: '人', dec: 0, type: 'seq', hi: '多い', lo: '少ない' }
  ];

  function stats(feats, key, wkey) {
    const vals = [], out = {};
    let ws = 0, w = 0;
    feats.forEach(f => {
      const v = f.properties[key];
      if (typeof v === 'number') {
        vals.push(v);
        const wt = f.properties[wkey] || 0; ws += v * wt; w += wt;
      }
    });
    vals.sort((a, b) => a - b);
    out.vals = vals; out.min = vals[0]; out.max = vals[vals.length - 1];
    out.mean = vals.reduce((a, b) => a + b, 0) / vals.length;
    out.wmean = w ? ws / w : out.mean;
    out.q = p => vals[Math.min(vals.length - 1, Math.floor(p * (vals.length - 1)))];
    out.rank = v => vals.length - vals.filter(x => x <= v).length + 1;
    return out;
  }

  function makeScale(m, st) {
    if (m.type === 'div') {
      const c = m.id === 'gencha' ? st.wmean : st.wmean;
      const s = m.id === 'gencha' ? 1.2 : 1;
      const b = [-10, -5, -1.5, 1.5, 5, 10].map(d => c + d * s);
      return { breaks: b, colors: DIV, center: c, type: 'div' };
    }
    const b = [0.2, 0.4, 0.6, 0.8].map(p => st.q(p));
    return { breaks: b, colors: SEQ, type: 'seq' };
  }
  const colorOf = (v, sc) => {
    if (typeof v !== 'number') return '#e4e4e2';
    let i = 0; while (i < sc.breaks.length && v > sc.breaks[i]) i++;
    return sc.colors[i];
  };

  class FireDash extends HTMLElement {
    connectedCallback() {
      if (this._init) return; this._init = true;
      const _attrVariant = this.getAttribute('variant');
      this.variant = _attrVariant ? _attrVariant.toLowerCase()
        : window.innerWidth <= 600 ? 'm' : 'c';
      if (!_attrVariant) {
        window.matchMedia('(max-width:600px)').addEventListener('change', () => location.reload());
      }
      const mid = this.getAttribute('metric');
      this.metric = METRICS.find(m => m.id === mid) || METRICS[0];
      this.sortDir = this.getAttribute('sort') === 'asc' ? 'asc' : 'desc';
      this.showLabels = this.getAttribute('labels') !== 'false';
      this.selected = null;
      const wait = () => {
        if (window.L && window.FIRE_GEO) this.build();
        else setTimeout(wait, 60);
      };
      // 重い地図は表示領域に入ってから初期化する
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(es => {
          if (es.some(e => e.isIntersecting)) { io.disconnect(); setTimeout(wait, 30); }
        }, { rootMargin: '120px' });
        io.observe(this);
        setTimeout(() => { if (!this.root) { io.disconnect(); wait(); } }, 1500);
      } else wait();
    }

    build() {
      const v = this.variant;
      this.feats = window.FIRE_GEO.features;
      this.root = el('div', 'fd'); this.root.dataset.variant = v;
      this.appendChild(this.root);

      // header
      const hd = el('div', 'fd-hd');
      const left = el('div');
      left.appendChild(el('h1', 'fd-ttl', '全国消防本部別　救急搬送 所要時間マップ'));
      left.appendChild(el('div', 'fd-sub',
        '<b>令和4〜6年（2022〜2024年）平均</b><span>全国 719 消防本部</span><span>出典：総務省消防庁「救急・救助の現況」</span>'));
      hd.appendChild(left);
      this.seg = el('div', 'fd-seg');
      METRICS.forEach(m => {
        const b = el('button', null, m.label + (m.unit === '分' ? '' : ''));
        b.setAttribute('aria-pressed', m === this.metric ? 'true' : 'false');
        b.onclick = () => this.setMetric(m);
        this.seg.appendChild(b);
      });
      hd.appendChild(this.seg);
      this.root.appendChild(hd);

      const body = el('div', 'fd-body'); this.root.appendChild(body);
      this.mapWrap = el('div', 'fd-map');

      if (v === 'a') {
        const rail = el('div', 'fd-rail');
        rail.appendChild(this.searchBox());
        rail.appendChild(this.infoBox());
        rail.appendChild(this.histBox());
        rail.appendChild(this.sortRow('ワースト / ベスト'));
        rail.appendChild(this.listBox(12));
        rail.appendChild(el('div', 'fd-src', '数値は入電から病院収容までの平均所要時間。市町村単位の値を本部区域で集計。'));
        body.appendChild(rail); body.appendChild(this.mapWrap);
      } else if (v === 'b') {
        body.appendChild(this.mapWrap);
        const tl = el('div', 'fd-ov tl'); tl.appendChild(this.infoBox()); this.mapWrap.appendChild(tl);
        const bl = el('div', 'fd-ov bl'); bl.appendChild(this.histBox(true)); this.mapWrap.appendChild(bl);
        const tr = el('div', 'fd-ov tr');
        const p = el('div', 'fd-sec'); p.style.padding = '14px 16px 0'; p.appendChild(this.searchBox(true));
        tr.appendChild(p); tr.appendChild(this.sortRow('ランキング')); tr.appendChild(this.listBox(15));
        this.mapWrap.appendChild(tr);
      } else if (v === 'c') {
        body.appendChild(this.mapWrap);
        const rail = el('div', 'fd-rail'); rail.style.width = '400px';
        rail.style.borderRight = '0'; rail.style.borderLeft = '1px solid var(--line)';
        rail.appendChild(this.histBox());
        rail.appendChild(this.searchBox());
        rail.appendChild(this.sortRow('719本部 一覧'));
        rail.appendChild(this.listBox(719));
        body.appendChild(rail);
        const info = el('div', 'fd-ov tl'); info.style.width = '286px'; info.appendChild(this.infoBox());
        this.mapWrap.appendChild(info);
      } else { // mobile
        this.mobile = true;
        body.appendChild(this.mapWrap);
        body.appendChild(this.buildSheet());
      }

      this.st = stats(this.feats, this.metric.key, '搬送人員');
      this.scale = makeScale(this.metric, this.st);
      this.initMap();
      this.refresh();
      if (this._pending) { const p = this._pending; this._pending = null; this.setOptions(p); }
    }

    /* ---------- pieces ---------- */
    searchBox(bare) {
      const wrap = el('div', bare ? '' : 'fd-sec');
      if (!bare) wrap.appendChild(el('p', 'fd-lab', '消防本部を検索'));
      const i = el('input', 'fd-search');
      i.placeholder = '本部名・都道府県で絞り込み';
      i.oninput = () => { this.query = i.value.trim(); this.renderList(); };
      wrap.appendChild(i);
      return wrap;
    }
    infoBox() {
      this.info = el('div', 'fd-info');
      return this.info;
    }
    histBox(bare) {
      const wrap = el('div', bare ? '' : 'fd-sec');
      wrap.appendChild(el('p', 'fd-lab', '全国の分布と凡例'));
      this.hist = el('div'); wrap.appendChild(this.hist);
      return wrap;
    }
    sortRow(label) {
      const r = el('div', 'fd-sortrow');
      r.appendChild(el('p', 'fd-lab', label)).style.margin = '0';
      const mini = el('div', 'fd-mini');
      [['desc', '遅い順'], ['asc', '速い順']].forEach(([d, t]) => {
        const b = el('button', null, t);
        b.setAttribute('aria-pressed', d === this.sortDir ? 'true' : 'false');
        b.onclick = () => {
          this.sortDir = d;
          mini.querySelectorAll('button').forEach((x, i) => x.setAttribute('aria-pressed', (i === 0) === (d === 'desc') ? 'true' : 'false'));
          this.renderList();
        };
        mini.appendChild(b);
      });
      this.mini = mini; r.appendChild(mini);
      return r;
    }
    listBox(limit) {
      this.listLimit = limit;
      this.list = el('div', 'fd-list');
      return this.list;
    }

    /* ---------- map ---------- */
    initMap() {
      const map = L.map(this.mapWrap, {
        preferCanvas: true, zoomControl: false, attributionControl: true,
        zoomSnap: 0.25, minZoom: 3, maxZoom: 11
      });
      this.map = map;
      L.control.zoom({ position: (this.variant === 'a' ? 'topleft' : 'bottomright') }).addTo(map);
      L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
        maxZoom: 18, opacity: 1,
        attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">国土地理院</a>'
      }).addTo(map);
      this.layer = L.geoJson(window.FIRE_GEO, {
        style: f => this.styleOf(f),
        onEachFeature: (f, l) => {
          f.__l = l;
          l.on({
            mouseover: () => { if (!this.selected) this.showInfo(f); this.hover(l, true); },
            mouseout: () => { if (!this.selected) this.showInfo(null); this.hover(l, false); },
            click: () => { this._hit = Date.now(); this.select(f); }
          });
        }
      }).addTo(map);
      /* labels disabled: GSI tile includes labels */
      const fit = () => {
        map.invalidateSize();
        const pad = this.mobile ? (this.sheet && this.sheet.dataset.open === '1' ? 0 : this.sheet ? this.sheet.offsetHeight : 186) : 0;
        map.fitBounds(this.layer.getBounds(), { paddingTopLeft: [10, 10], paddingBottomRight: [10, 10 + pad], maxZoom: 6 });
      };
      this._fit = fit;
      fit(); setTimeout(fit, 120); setTimeout(fit, 500);
      map.on('click', () => { if (Date.now() - (this._hit || 0) > 80) this.select(null); });
    }
    styleOf(f) {
      return {
        fillColor: colorOf(f.properties[this.metric.key], this.scale),
        weight: this.selected === f ? 2.2 : 0.4,
        color: this.selected === f ? '#111' : '#ffffff',
        opacity: 1, fillOpacity: 0.88
      };
    }
    hover(l, on) {
      if (this.selected === l.feature) return;
      if (on) { l.setStyle({ weight: 1.8, color: '#1a1a1a' }); l.bringToFront(); }
      else this.layer.resetStyle(l);
    }
    select(f) {
      const prev = this.selected;
      this.selected = f;
      if (prev && prev.__l) this.layer.resetStyle(prev.__l);
      if (f && f.__l) { f.__l.setStyle(this.styleOf(f)); f.__l.bringToFront(); }
      this.showInfo(f);
      this.renderList();
    }
    focus(f) {
      this.select(f);
      const b = f.__l.getBounds();
      this.map.flyToBounds(b, { padding: [80, 80], maxZoom: 9, duration: .6 });
    }

    /* ---------- mobile sheet ---------- */
    buildSheet() {
      const sheet = el('div', 'fd-sheet'); this.sheet = sheet;
      const grip = el('div', 'fd-grip', '<i></i>');
      let _startY = null, _startH = null, _dragging = false;
      const CLOSED_H = 186, MIN_H = 80, MAX_H_RATIO = 0.75;

      grip.addEventListener('pointerdown', e => {
        _startY = e.clientY;
        _startH = this.sheet.offsetHeight;
        _dragging = false;
        grip.setPointerCapture(e.pointerId);
        this.sheet.style.transition = 'none'; // ドラッグ中はアニメーション無効
      });

      grip.addEventListener('pointermove', e => {
        if (_startY === null) return;
        const dy = _startY - e.clientY; // 上方向が正
        if (Math.abs(dy) > 4) _dragging = true;
        if (!_dragging) return;
        const maxH = window.innerHeight * MAX_H_RATIO;
        const newH = Math.max(MIN_H, Math.min(maxH, _startH + dy));
        this.sheet.style.height = newH + 'px';
      });

      grip.addEventListener('pointerup', e => {
        if (_startY === null) return;
        this.sheet.style.transition = ''; // アニメーション再有効化
        const dy = _startY - e.clientY;
        _startY = null;

        if (!_dragging) {
          // タップ → トグル
          this.toggleSheet();
        } else {
          // スワイプ: 現在の高さで開閉を確定
          const maxH = window.innerHeight * MAX_H_RATIO;
          const cur = this.sheet.offsetHeight;
          const open = cur > CLOSED_H * 1.1 || dy > 40;
          this.toggleSheet(open);
        }
        _dragging = false;
      });
      sheet.appendChild(grip);

      this.info = el('div', 'fd-mhead');
      sheet.appendChild(this.info);
      this.mrank = el('div', 'fd-mrank');
      sheet.appendChild(this.mrank);

      const peek = el('div', 'fd-peek'); this.peek = peek; sheet.appendChild(peek);

      const tabs = el('div', 'fd-tabs');
      const panes = [];
      const mk = (label, node) => {
        const b = el('button', null, label);
        const pane = el('div', 'fd-pane'); pane.appendChild(node);
        b.onclick = () => {
          tabs.querySelectorAll('button').forEach(x => x.setAttribute('aria-selected', x === b ? 'true' : 'false'));
          panes.forEach(p => p.dataset.on = p === pane ? '1' : '0');
          const host = node.dataset && node.dataset.wantsList;
          if (host && this.list) node.appendChild(this.list);
        };
        tabs.appendChild(b); panes.push(pane);
        return { b, pane };
      };
      const rankWrap = el('div'); rankWrap.dataset.wantsList = '1';
      rankWrap.appendChild(this.sortRow('ワースト順・ベスト順'));
      rankWrap.appendChild(this.listBox(30));
      const distWrap = el('div'); distWrap.style.padding = '14px 15px 20px';
      distWrap.appendChild(this.histBox(true));
      const searchWrap = el('div'); searchWrap.style.padding = '14px 15px 0';
      searchWrap.dataset.wantsList = '1';
      searchWrap.appendChild(this.searchBox(true));
      const first = mk('ランキング', rankWrap);
      mk('分布・凡例', distWrap);
      const sw = mk('検索', searchWrap);
      sw.b.onclick = ((orig) => () => {
        orig();
        const i = searchWrap.querySelector('input'); if (i) setTimeout(() => i.focus(), 60);
      })(sw.b.onclick);
      sheet.appendChild(tabs);
      panes.forEach(p => sheet.appendChild(p));
      first.b.setAttribute('aria-selected', 'true'); panes[0].dataset.on = '1';
      this.onSearch = null;
      return sheet;
    }
    toggleSheet(force) {
      const open = force != null ? force : this.sheet.dataset.open !== '1';
      this.sheet.dataset.open = open ? '1' : '0';
      setTimeout(() => { if (this.map) { this.map.invalidateSize(); if (!open && this._fit) this._fit(); } }, 320);
    }
    renderPeek() {
      if (!this.peek) return;
      const sc = this.scale, m = this.metric, st = this.st;
      this.peek.innerHTML =
        '<div class="fd-scale">' + sc.colors.map(c => '<div style="background:' + c + '"></div>').join('') + '</div>' +
        '<div class="fd-scale-l"><span>' + m.lo + '　' + fmt(st.min, m.dec) + m.unit + '</span><span>' +
        fmt(st.max, m.dec) + m.unit + '　' + m.hi + '</span></div>' +
        '<div class="fd-hint" style="margin-top:10px">地図をタップして本部を選択。上のつまみでランキング・分布・検索を開きます。</div>';
    }

    /* ---------- state ---------- */
    setMetric(m) {
      this.metric = m;
      this.seg.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-pressed', METRICS[i] === m ? 'true' : 'false'));
      if (this.mini) this.mini.querySelectorAll('button')[0].innerHTML = m.hi + '順',
        this.mini.querySelectorAll('button')[1].innerHTML = m.lo + '順';
      this.refresh();
    }
    refresh() {
      const m = this.metric;
      this.st = stats(this.feats, m.key, '搬送人員');
      this.scale = makeScale(m, this.st);
      this.layer.setStyle(f => this.styleOf(f));
      if (this.selected && this.selected.__l) this.selected.__l.setStyle(this.styleOf(this.selected));
      this.showInfo(this.selected);
      this.renderHist();
      this.renderPeek();
      this.renderList();
    }

    showInfo(f) {
      const m = this.metric, st = this.st, sc = this.scale;
      if (this.mobile) return this.showInfoM(f);
      if (!f) {
        this.info.innerHTML =
          '<div class="p">全国平均（搬送人員で加重）</div>' +
          '<div class="fd-big"><em>' + fmt(st.wmean, m.dec) + '</em><span>' + m.unit + '</span></div>' +
          '<div class="fd-hint" style="margin-top:12px">地図上の消防本部にカーソルを合わせると詳細、' +
          'クリックすると固定表示になります。</div>';
        this.markVal = null; this.renderHist(); return;
      }
      const p = f.properties, v = p[m.key];
      const diff = m.type === 'div' ? v - st.wmean : null;
      this.info.innerHTML =
        '<div class="p">' + p['都道府県'] + '</div>' +
        '<div class="n">' + p['消防本部'] + '</div>' +
        '<div class="fd-big"><em>' + fmt(v, m.dec) + '</em><span>' + m.unit +
        (diff != null ? '　全国平均比 <b style="color:' + (diff > 0 ? '#b2182b' : '#2166ac') + '">' +
          (diff > 0 ? '+' : '') + fmt(diff, 1) + '分</b>' : '') + '</span></div>' +
        '<div class="fd-meta">' +
        '<span>' + m.hi + '順の順位</span><b>' + st.rank(v) + ' / 719</b>' +
        '<span>入電→病院収容</span><b>' + fmt(p['入電病院収容平均分'], 1) + ' 分</b>' +
        '<span>入電→現場到着</span><b>' + fmt(p['入電現着平均分'], 1) + ' 分</b>' +
        '<span>出場件数</span><b>' + fmt(p['出場件数'], 0) + ' 件</b>' +
        '<span>搬送人員</span><b>' + fmt(p['搬送人員'], 0) + ' 人</b>' +
        '</div>';
      this.markVal = v; this.renderHist();
    }

    showInfoM(f) {
      const m = this.metric, st = this.st;
      if (!f) {
        this.info.innerHTML =
          '<div class="txt"><div class="p">全国平均（搬送人員で加重）</div>' +
          '<div class="n">719 消防本部の平均値</div></div>' +
          '<div class="num"><em>' + fmt(st.wmean, m.dec) + '</em><u>' + m.unit + '</u></div>';
        this.mrank.innerHTML = '<span>最速 <b>' + fmt(st.min, m.dec) + '</b> ' + m.unit + '</span>' +
          '<span>中央値 <b>' + fmt(st.q(.5), m.dec) + '</b> ' + m.unit + '</span>' +
          '<span>最遅 <b>' + fmt(st.max, m.dec) + '</b> ' + m.unit + '</span>';
        this.markVal = null; this.renderHist(); this.renderPeek(); return;
      }
      const p = f.properties, v = p[m.key], diff = m.type === 'div' ? v - st.wmean : null;
      this.info.innerHTML =
        '<div class="txt"><div class="p">' + p['都道府県'] + '</div>' +
        '<div class="n">' + p['消防本部'] + '</div></div>' +
        '<div class="num"><em>' + fmt(v, m.dec) + '</em><u>' + m.unit + '</u>' +
        (diff != null ? '<div style="color:' + (diff > 0 ? '#b2182b' : '#2166ac') + '">' +
          (diff > 0 ? '+' : '') + fmt(diff, 1) + '</div>' : '') + '</div>' +
        '<button class="fd-mclose" aria-label="選択を解除">×</button>';
      this.info.querySelector('.fd-mclose').onclick = e => { e.stopPropagation(); this.select(null); };
      this.mrank.innerHTML = '<span>' + m.hi + '順 <b>' + st.rank(v) + '</b> / 719</span>' +
        '<span>現着 <b>' + fmt(p['入電現着平均分'], 1) + '</b> 分</span>' +
        '<span>搬送人員 <b>' + fmt(p['搬送人員'], 0) + '</b> 人</span>';
      this.markVal = v; this.renderHist(); this.renderPeek();
    }

    renderHist() {
      if (!this.hist) return;
      const m = this.metric, st = this.st, sc = this.scale;
      const W = 100, H = 46, N = 34;
      const lo = st.min, hi = st.max, span = hi - lo || 1;
      const bins = new Array(N).fill(0);
      st.vals.forEach(v => { bins[Math.min(N - 1, Math.floor((v - lo) / span * N))]++; });
      const mx = Math.max(...bins);
      let bars = '';
      bins.forEach((c, i) => {
        const h = c / mx * (H - 12), x = i / N * W, w = W / N;
        const cv = lo + (i + .5) / N * span;
        bars += '<rect x="' + x.toFixed(2) + '" y="' + (H - 10 - h).toFixed(2) + '" width="' + (w * .84).toFixed(2) +
          '" height="' + h.toFixed(2) + '" fill="' + colorOf(cv, sc) + '"/>';
      });
      const px = v => ((v - lo) / span * W);
      let marks = '';
      if (sc.type === 'div') marks += '<line x1="' + px(sc.center).toFixed(2) + '" x2="' + px(sc.center).toFixed(2) +
        '" y1="0" y2="' + (H - 10) + '" stroke="#111" stroke-width=".35" stroke-dasharray="1.5 1.2"/>' +
        '<text x="' + px(sc.center).toFixed(2) + '" y="-1.5" text-anchor="middle" style="font-size:3px">全国平均 ' + fmt(sc.center, 1) + '</text>';
      if (this.markVal != null) marks += '<line x1="' + px(this.markVal).toFixed(2) + '" x2="' + px(this.markVal).toFixed(2) +
        '" y1="0" y2="' + (H - 8) + '" stroke="oklch(0.5 0.13 250)" stroke-width=".8"/>';
      this.hist.innerHTML =
        '<svg class="fd-hist" viewBox="-2 -7 104 ' + (H - 2) + '" preserveAspectRatio="none" style="height:' + (this.mobile ? 100 : 140) + 'px">' +
        bars + marks + '</svg>' +
        '<div class="fd-scale">' + sc.colors.map(c => '<div style="background:' + c + '"></div>').join('') + '</div>' +
        '<div class="fd-scale-l"><span>' + m.lo + '　' + fmt(lo, m.dec) + m.unit + '</span><span>' +
        fmt(hi, m.dec) + m.unit + '　' + m.hi + '</span></div>';
    }

    renderList() {
      if (!this.list) return;
      const m = this.metric, st = this.st, q = (this.query || '');
      let rows = this.feats.filter(f => typeof f.properties[m.key] === 'number');
      if (q) rows = rows.filter(f => (f.properties['消防本部'] + f.properties['都道府県']).includes(q));
      rows.sort((a, b) => this.sortDir === 'desc'
        ? b.properties[m.key] - a.properties[m.key] : a.properties[m.key] - b.properties[m.key]);
      const lim = q ? Math.min(rows.length, 40) : Math.min(rows.length, this.listLimit);
      this.list.innerHTML = '';
      if (!rows.length) { this.list.appendChild(el('div', 'fd-hint', '該当する消防本部がありません。')).style.padding = '10px 8px'; return; }
      rows.slice(0, lim).forEach((f, i) => {
        const p = f.properties, v = p[m.key];
        const r = el('div', 'fd-row');
        if (this.selected === f) r.dataset.on = '1';
        r.innerHTML = '<span class="r">' + (this.sortDir === 'desc' ? st.rank(v) : rows.length - st.rank(v) + 1) + '</span>' +
          '<span class="nm"><i>' + p['都道府県'] + '</i>' + p['消防本部'].replace(/消防本部$/, '') + '</span>' +
          '<span class="bar"><i style="width:' + (Math.max(4, (v - st.min) / (st.max - st.min) * 100)).toFixed(1) +
          '%;background:' + colorOf(v, this.scale) + '"></i></span>' +
          '<span class="v">' + fmt(v, m.dec) + '</span>';
        r.onmouseenter = () => { if (!this.selected) this.showInfo(f); if (f.__l) this.hover(f.__l, true); };
        r.onmouseleave = () => { if (!this.selected) this.showInfo(null); if (f.__l) this.hover(f.__l, false); };
        r.onclick = () => this.focus(f);
        this.list.appendChild(r);
      });
      if (!q && rows.length > lim) {
        const more = el('div', 'fd-hint', '上位 ' + lim + ' 件を表示（全 ' + rows.length + ' 本部）');
        more.style.padding = '9px 8px 0'; this.list.appendChild(more);
      }
    }
  }
  FireDash.prototype.setOptions = function (o) {
    if (!this.root) { this._pending = o; return; }
    if (o.metric) { const m = METRICS.find(x => x.id === o.metric); if (m && m !== this.metric) this.setMetric(m); }
    if (o.sort && o.sort !== this.sortDir) {
      this.sortDir = o.sort;
      if (this.mini) this.mini.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-pressed', (i === 0) === (o.sort === 'desc') ? 'true' : 'false'));
      this.renderList();
    }
    if (typeof o.labels === 'boolean' && o.labels !== this.showLabels) {
      this.showLabels = o.labels;
      if (o.labels) { /* labels disabled */ }
      else if (this._labels) { this.map.removeLayer(this._labels); this._labels = null; }
    }
  };
  if (!window.customElements.get('fire-dash')) window.customElements.define('fire-dash', FireDash);
})();
