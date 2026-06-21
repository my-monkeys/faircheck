{
  "target": "faircheck.my-monkey.fr",
  "source": "./",
  "nodejs_app": "faircheck",
  "setup": {
    "nodejs_version": "22",
    "base_uri": "/",
    "startup_file": "server.js",
    "deployment_mode": "production"
  },
  "post_deploy": "mkdir -p tmp && touch tmp/restart.txt",
  "site": {
    "title": "Faircheck",
    "description": "Independent provably-fair verifier for crypto casinos. Paste your server seed, client seed and nonce to recompute any Dice, Limbo, Mines, Plinko, Roulette, Keno, Wheel or Hi-Lo result yourself.",
    "image": "/og.png",
    "category": "tool"
  }
}
