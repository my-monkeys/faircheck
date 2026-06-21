<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>Faircheck — XML Sitemap</title>
        <style>
          :root{
            --bg:#161a1f; --card:#1b2128; --inset:#11151a; --ink:#e8ecf0; --soft:#a3acb8;
            --muted:#6c7682; --line:#2a313a; --line2:#232932; --lime:#bff24a; --ok:#7fe08a; --okbg:#152018;
          }
          *{box-sizing:border-box}
          body{margin:0;background:var(--bg);color:var(--ink);font-size:15px;line-height:1.5;
            font-family:'Inter Tight',ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
            -webkit-font-smoothing:antialiased;letter-spacing:-.01em;
            background-image:linear-gradient(var(--line2) 1px,transparent 1px),linear-gradient(90deg,var(--line2) 1px,transparent 1px);
            background-size:46px 46px}
          .wrap{max-width:1080px;margin:0 auto;padding:30px 22px 70px}
          a{color:var(--lime);text-decoration:none}
          a:hover{text-decoration:underline}
          .mono{font-family:'JetBrains Mono',ui-monospace,"SFMono-Regular",Menlo,monospace}

          header{display:flex;align-items:center;gap:11px;flex-wrap:wrap}
          .mark{width:22px;height:22px;border-radius:6px;background:var(--lime);display:inline-grid;place-items:center;flex:none}
          .mark svg{display:block}
          .brand{font-weight:600;font-size:18px;letter-spacing:-.02em}
          .brand b{color:var(--lime);font-weight:600}
          .eyebrow{font-family:'JetBrains Mono',ui-monospace,monospace;text-transform:uppercase;letter-spacing:.16em;font-size:10.5px;color:var(--muted)}
          .lead{margin:14px 0 0;color:var(--soft);max-width:640px;font-size:15px}

          .stats{display:flex;gap:10px;flex-wrap:wrap;margin:22px 0 6px}
          .stat{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:11px 15px;min-width:112px}
          .stat .n{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:21px;font-weight:600;color:var(--lime)}
          .stat .l{font-family:'JetBrains Mono',ui-monospace,monospace;text-transform:uppercase;letter-spacing:.13em;font-size:10px;color:var(--muted);margin-top:3px}

          .panel{background:var(--card);border:1px solid var(--line);border-radius:12px;margin-top:18px;overflow:hidden}
          table{width:100%;border-collapse:collapse;font-size:13px}
          thead th{font-family:'JetBrains Mono',ui-monospace,monospace;text-transform:uppercase;letter-spacing:.12em;
            font-size:10px;color:var(--muted);text-align:left;padding:13px 15px;border-bottom:1px solid var(--line);background:var(--inset)}
          thead th.r,td.r{text-align:right}
          thead th.c,td.c{text-align:center}
          tbody td{padding:9px 15px;border-bottom:1px solid var(--line2);vertical-align:middle}
          tbody tr:nth-child(even){background:#1d242b}
          tbody tr:hover{background:#222b33}
          tbody tr:last-child td{border-bottom:none}
          td.idx{color:var(--muted);font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12px;width:54px}
          td.url a{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12.5px;word-break:break-all;color:var(--ink)}
          td.url a:hover{color:var(--lime)}
          .badge{display:inline-block;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;
            background:var(--okbg);color:var(--ok);border:1px solid #2f4a33;padding:1px 8px;border-radius:5px}
          .freq{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12px;color:var(--soft)}
          .prio{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12px;color:var(--ink)}
          .bar{display:inline-block;height:5px;width:54px;background:var(--line);border-radius:3px;vertical-align:middle;margin-left:8px;position:relative;overflow:hidden}
          .bar i{position:absolute;left:0;top:0;bottom:0;background:var(--lime)}
          footer{margin-top:22px;color:var(--muted);font-size:12px;font-family:'JetBrains Mono',ui-monospace,monospace}
        </style>
      </head>
      <body>
        <div class="wrap">
          <header>
            <span class="mark"><svg width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M6 1l4 1.6v3c0 2.6-1.7 4.3-4 5.1C3.7 9.9 2 8.2 2 5.6v-3L6 1z" fill="#10140c"/><path d="M4.4 6l1.1 1.1L8 4.7" stroke="#bff24a" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            <span class="brand">fair<b>check</b></span>
            <span class="eyebrow">XML Sitemap</span>
          </header>
          <p class="lead">This is the machine-readable sitemap submitted to search engines. Every URL is listed in
            all five languages with its hreflang alternates. Humans can browse it below.</p>

          <div class="stats">
            <div class="stat"><div class="n"><xsl:value-of select="count(s:urlset/s:url)"/></div><div class="l">URLs</div></div>
            <div class="stat"><div class="n"><xsl:value-of select="count(s:urlset/s:url[1]/xhtml:link) - 1"/></div><div class="l">Languages</div></div>
            <div class="stat"><div class="n">HMAC<xsl:text>·</xsl:text>SHA256</div><div class="l">Provably fair</div></div>
          </div>

          <div class="panel">
            <table>
              <thead>
                <tr>
                  <th class="r">#</th>
                  <th>URL</th>
                  <th class="c">Langs</th>
                  <th class="c">Change</th>
                  <th class="r">Priority</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="s:urlset/s:url">
                  <tr>
                    <td class="idx r"><xsl:value-of select="position()"/></td>
                    <td class="url"><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                    <td class="c"><span class="badge"><xsl:value-of select="count(xhtml:link) - 1"/></span></td>
                    <td class="c"><span class="freq"><xsl:value-of select="s:changefreq"/></span></td>
                    <td class="r">
                      <span class="prio"><xsl:value-of select="s:priority"/></span>
                      <span class="bar"><i style="width:{s:priority * 54}px"></i></span>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <footer>faircheck.my-monkey.fr · independent provably-fair verifier · sitemap rendered with XSLT</footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
