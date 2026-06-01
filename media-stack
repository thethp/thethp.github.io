# Media Stack Docker Compose Setup Guide

## Overview

This is a complete media management ecosystem running on your QNAP NAS. It handles everything from downloading (torrents/usenet) to organizing (Radarr/Sonarr) to serving (Plex/Jellyfin) to managing books (AudiobookShelf, BookShelf, ReadingGlasses).

**Location:** `/share/CACHEDEV1_DATA/Public/media-stack/`

---

## Architecture

### Data Flow

**Downloaders** → **Organizers** → **Libraries** → **Servers**

1. **qBittorrent / SABnzbd** — Download torrents and Usenet files
2. **Radarr / Sonarr / Lidarr** — Monitor for new content, auto-download, organize into folders
3. **Prowlarr / Jackett** — Index management (tell Radarr/Sonarr where to find content)
4. **Bazarr** — Auto-fetch subtitles for movies/TV
5. **Plex / Jellyfin** — Serve media to devices
6. **Tautulli** — Monitor Plex usage
7. **AudiobookShelf / ReadingGlasses / BookShelf** — Books/audiobooks library
8. **Heimdall** — Dashboard landing page
9. **Overseerr** — Request system (people ask for shows/movies)

### Custom Services

- **audiobook-search** — Telegram bot to search and auto-download audiobooks
- **telegram-bot** — General Plex integration bot
- **cloudflared** — Cloudflare tunnel (expose services to internet securely)
- **watchtower** — Auto-update Docker images
- **openclaw** — Your assistant (me!) running in the stack

---

## Services Breakdown

### Media Servers

| Service | Port | Purpose |
|---------|------|---------|
| **Plex** | Host mode | Movie/TV streaming server (your main player) |
| **Jellyfin** | 8096 | Open-source Plex alternative |
| **Tautulli** | 8181 | Plex monitoring & stats |

### Downloaders

| Service | Port | Purpose |
|---------|------|---------|
| **qBittorrent** | 8080 | Torrent client |
| **SABnzbd** | 2525 | Usenet downloader |
| **Prowlarr** | 9696 | Index aggregator (torrent/usenet sites) |
| **Jackett** | 9117 | Torrent indexer (legacy) |

### Organizers

| Service | Port | Purpose |
|---------|------|---------|
| **Radarr** | 7878 | Auto-download & organize movies |
| **Sonarr** | 8989 | Auto-download & organize TV shows |
| **Lidarr** | 8686 | Auto-download & organize music |
| **Bazarr** | 6767 | Auto-fetch subtitles |

### Books & Audiobooks

| Service | Port | Purpose |
|---------|------|---------|
| **AudiobookShelf** | 13378 | Audiobook streaming & management |
| **ReadingGlasses** | 8788 | Book progress tracking (Hardcover integration) |
| **BookShelf** | 8787 | Ebook management |
| **Calibre** | 8083 | Ebook conversion & library (also serves your ebook index!) |

### Utilities

| Service | Port | Purpose |
|---------|------|---------|
| **Overseerr** | Host mode | Request system (users request movies/shows) |
| **Heimdall** | 80/443 | Landing page dashboard |
| **Watchtower** | None | Auto-updates all containers |
| **Cloudflared** | Host mode | Securely expose services via `ebook.tillertv.net`, etc. |

---

## How to Start/Stop

### Start Everything
```bash
cd /share/CACHEDEV1_DATA/Public/media-stack
docker-compose up -d
```

### Stop Everything
```bash
docker-compose down
```

### Restart Specific Service
```bash
docker-compose restart radarr  # Example: restart Radarr
```

### View Logs
```bash
docker-compose logs -f plex  # Follow Plex logs in real-time
```

### See What's Running
```bash
docker-compose ps
```

---

## Volumes & File Structure

### Directory Structure
```
/share/Public/media-stack/
├── docker-compose.yml          ← This file
├── provision/                  ← Config/database storage for each service
│   ├── plex/
│   ├── radarr/
│   ├── sonarr/
│   ├── sabnzbd/
│   └── ... (one per service)
├── content/                    ← Actual media files
│   ├── media/                  ← Movies & TV (organized by Radarr/Sonarr)
│   ├── books/
│   │   ├── ebooks/             ← Your ebook library (also on HTTP at :8083)
│   │   └── audiobooks/         ← Audiobooks (downloaded by audiobook-search)
│   ├── usenet/downloads/       ← Staging area for SABnzbd/qBittorrent
│   └── torrents/
├── cloudflared/                ← Cloudflare tunnel config
└── audiobook-search/           ← Custom bot source (if cloned locally)
```

### Key Mounts

| Container | Config Path | Media Path |
|-----------|-------------|-----------|
| Radarr | `/config` → `provision/radarr` | `/data` → `content/` |
| Sonarr | `/config` → `provision/sonarr` | `/data` → `content/` |
| Plex | `/config` → `provision/plex` | `/data/media` → `content/media` |
| AudiobookShelf | `/config` → `config/audiobookshelf` | `/audiobooks` → `content/books/audiobooks` |

---

## Setup Process (For Someone New)

### 1. **Initial Setup**

Clone or copy the docker-compose file to your QNAP:
```bash
# SSH into NAS
ssh tiller@10.0.0.166

# Go to media-stack directory
cd /share/CACHEDEV1_DATA/Public/media-stack

# Start containers
docker-compose up -d
```

### 2. **Configure Each Service**

Visit each service on the NAS IP:

- **Heimdall** → `http://10.0.0.166` — Set up dashboard
- **Radarr** → `http://10.0.0.166:7878` — Add movie library path
- **Sonarr** → `http://10.0.0.166:8989` — Add TV library path
- **Prowlarr** → `http://10.0.0.166:9696` — Connect to Radarr/Sonarr, add indexers
- **qBittorrent** → `http://10.0.0.166:8080` — Set download path
- **SABnzbd** → `http://10.0.0.166:2525` — Set download path, Usenet credentials
- **Plex** → `http://10.0.0.166:32400` — Claim server, add libraries

### 3. **Configure Secrets**

Some services need API keys / credentials in `docker-compose.yml`:

- **Plex Claim Token** — Get from `https://www.plex.tv/claim/`
- **Prowlarr/Jackett Indexers** — Add manually via UI
- **Usenet Credentials** — Add in SABnzbd UI
- **Hardcover API Token** — Add for ReadingGlasses (already set, don't change)

### 4. **Test Downloads**

- **In Radarr:** Search for a movie, let it auto-download
- **Check qBittorrent/SABnzbd:** Verify download started
- **Check media folder:** File should appear in `content/media/movies/`
- **Check Plex:** Movie should show up after scanning

---

## Environment Variables (Standard Across All Services)

```
PUID=1000              ← User ID (for file permissions)
PGID=1000              ← Group ID (for file permissions)
TZ=America/Chicago     ← Your timezone
```

---

## Networking

- **media-network** — Bridge network connecting all services
- **Host mode** — Plex, Overseerr, Cloudflared use host network (for better performance)

---

## Persistence

All configs are stored in `/share/Public/media-stack/provision/` and `/share/Public/media-stack/config/`. Even if containers are deleted, data persists (except temporary downloads).

To back up: `tar -czf media-stack-backup.tar.gz /share/Public/media-stack/provision/`

---

## Exposed to Internet (via Cloudflare Tunnel)

- `ebook.tillertv.net` → Calibre ebook server (:8083)
- Other services can be added as needed

---

## Troubleshooting

**Service won't start:**
```bash
docker-compose logs plex  # Check error messages
docker-compose up plex    # Run in foreground to see errors
```

**Files not found in libraries:**
```bash
# Ensure permissions are correct
sudo chown -R 1000:1000 /share/Public/media-stack/content/
```

**Network issues:**
```bash
docker network ls
docker network inspect media-network
```

---

## Customization

To add a new service:

1. Add it to `docker-compose.yml` under `services:`
2. Include proper `volumes:`, `ports:`, `networks:`, `environment:`
3. Run `docker-compose up -d servicename`

Example:
```yaml
newservice:
  image: someimage:latest
  container_name: newservice
  environment:
    - PUID=1000
    - PGID=1000
    - TZ=America/Chicago
  volumes:
    - /share/Public/media-stack/provision/newservice:/config
    - /share/Public/media-stack/content:/data
  ports:
    - "9999:9999"
  restart: unless-stopped
  networks:
    - media-network
```

---
