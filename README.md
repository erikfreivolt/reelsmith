# Reelsmith

Telefonra szabott webapp: videóötlet, szöveg, kamerás felvétel súgógéppel.

## Mi van a mappában

- `index.html`: a teljes app (profil, ötletek, szöveg, felvétel, videóim).
- `api/generate.js`: szerveroldali végpont, ami a Claude API-tól kér ötletet és szöveget.

## Feltöltés Vercelre

1. Regisztrálj a vercel.com oldalon (az ingyenes csomag elég).
2. A számítógépeden nyiss terminált ebben a mappában, és futtasd: `npx vercel`
   Az első futásnál bejelentkeztet, és néhány kérdést tesz fel. Az alapértelmezett válaszok jók.
3. A Vercel felületén a projekt Settings > Environment Variables részénél add hozzá:
   - `ANTHROPIC_API_KEY`: a Claude API-kulcsod (console.anthropic.com).
4. Élesítés: `npx vercel --prod`

A kapott https címet nyisd meg telefonon. A kamera csak https címen működik.

## Tudnivalók

- API-kulcs nélkül is működik az app: ilyenkor általános példaötleteket és kitölthető szövegvázlatot ad.
- A felvétel a telefonon marad, a szerverre nem kerül fel. A Mentés gombbal lehet letölteni.
  iPhone-on a Megosztás gombbal lehet a Fotók közé menteni.
- iPhone-on MP4, a legtöbb Androidon WebM fájl készül. A TikTok és az Instagram feltöltéskor mindkettőt elfogadja,
  de ha valahol gond van a WebM-mel, azt át kell konvertálni.
- A végpont IP-címenként óránként 30 kérést enged (`RATE_LIMIT_PER_HOUR`). Ez csak alap védelem.
  Az ingyenes időszak alatt érdemes az Anthropic felületén havi költségkeretet is beállítani.
- A modell az `ANTHROPIC_MODEL` változóval cserélhető (alapértelmezés: `claude-haiku-5-5`).
- Az automata vágás még nincs benne.
