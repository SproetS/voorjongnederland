#!/usr/bin/env bash

REPO_DIR="/var/www/sites/astro.voorjongnederland.nl"
BRANCH="main"
LOCK_FILE="/tmp/astro-vjnl-autodeploy.lock"
BUILD_LOG="/tmp/astro-vjnl-build.log"

log() {
  printf '[%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$1"
}

if [ ! -d "$REPO_DIR/.git" ]; then
  log "repo not found: $REPO_DIR"
  exit 1
fi

exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  log "another deploy check is already running; skipping"
  exit 0
fi

cd "$REPO_DIR" || exit 1

DIRTY="$(git status --porcelain)"
if [ -n "$DIRTY" ]; then
  log "working tree is dirty; skipping auto-deploy to avoid overwriting local changes"
  exit 0
fi

if ! git fetch --quiet origin "$BRANCH"; then
  log "git fetch failed"
  exit 1
fi

LOCAL_SHA="$(git rev-parse HEAD)"
REMOTE_SHA="$(git rev-parse "origin/$BRANCH")"

if [ "$LOCAL_SHA" = "$REMOTE_SHA" ]; then
  log "no upstream changes"
  exit 0
fi

log "new commit detected: $LOCAL_SHA -> $REMOTE_SHA"
if ! git pull --ff-only --quiet origin "$BRANCH"; then
  log "git pull failed"
  exit 1
fi

if ! npm run build >"$BUILD_LOG" 2>&1; then
  log "build failed; see $BUILD_LOG"
  exit 1
fi

log "build completed successfully"
