#!/usr/bin/env bash
set -euo pipefail

project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
archive_path="${1:?usage: npm run sites:package -- /absolute/path/site.tar.gz}"
stage_dir="$(mktemp -d)"

cleanup() {
  rm -rf -- "$stage_dir"
}
trap cleanup EXIT

cd "$project_dir"
npm run worker:build

mkdir -p "$stage_dir/dist/server" "$stage_dir/dist/client" "$stage_dir/dist/.openai"
npx wrangler deploy --dry-run --outdir "$stage_dir/dist/server"
mv "$stage_dir/dist/server/worker.js" "$stage_dir/dist/server/index.js"
cp -R ".open-next/assets/." "$stage_dir/dist/client/"
cp ".openai/hosting.json" "$stage_dir/dist/.openai/hosting.json"
cp "hosting/wrangler.json" "$stage_dir/dist/server/wrangler.json"

mkdir -p "$(dirname "$archive_path")"
tar -C "$stage_dir" -czf "$archive_path" dist

tar -tzf "$archive_path" | grep -qx "dist/server/index.js"
tar -tzf "$archive_path" | grep -qx "dist/server/wrangler.json"
tar -tzf "$archive_path" | grep -qx "dist/.openai/hosting.json"
printf "%s\n" "$archive_path"
