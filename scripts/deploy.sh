#!/usr/bin/env bash
set -euo pipefail

DEPLOY_HOST="${DEPLOY_HOST:-}"
DEPLOY_USER="${DEPLOY_USER:-root}"
DEPLOY_PORT="${DEPLOY_PORT:-22}"
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/skgarant}"
DEPLOY_KEY="${DEPLOY_KEY:-$HOME/.ssh/id_ed25519_skgarant_deploy}"
DEPLOY_RELOAD_CMD="${DEPLOY_RELOAD_CMD:-sudo systemctl reload nginx || systemctl reload nginx || true}"

if [[ -z "$DEPLOY_HOST" ]]; then
  echo "DEPLOY_HOST is required."
  echo "Example: DEPLOY_HOST=203.0.113.10 DEPLOY_USER=root ./scripts/deploy.sh"
  exit 1
fi

if [[ ! -f "$DEPLOY_KEY" ]]; then
  echo "SSH key not found: $DEPLOY_KEY"
  exit 1
fi

if ! command -v rsync >/dev/null 2>&1; then
  echo "rsync is required but not installed."
  exit 1
fi

echo "[1/4] Build project..."
npm run build

SSH_OPTS=(-p "$DEPLOY_PORT" -i "$DEPLOY_KEY" -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new)
REMOTE="$DEPLOY_USER@$DEPLOY_HOST"

echo "[2/4] Ensure remote directory exists..."
ssh "${SSH_OPTS[@]}" "$REMOTE" "mkdir -p '$DEPLOY_PATH'"

echo "[3/4] Upload dist via rsync..."
rsync -az --delete \
  -e "ssh -p $DEPLOY_PORT -i $DEPLOY_KEY -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new" \
  dist/ "$REMOTE:$DEPLOY_PATH/"

echo "[4/4] Reload web server..."
ssh "${SSH_OPTS[@]}" "$REMOTE" "$DEPLOY_RELOAD_CMD"

echo "Deploy complete: $REMOTE:$DEPLOY_PATH"
