# Decap OAuth on VPS (current setup)
This project uses a self-hosted GitHub OAuth proxy on the VPS for Decap CMS authentication.
Cloudflare Worker OAuth was attempted first, but was not used as final routing/auth path.

## Active architecture
- Decap admin URL: `https://voorjongnederland.nl/admin`
- OAuth base URL in Decap config: `https://voorjongnederland.nl`
- OAuth endpoint in Decap config: `decap-oauth/auth`
- OAuth callback URL: `https://voorjongnederland.nl/decap-oauth/callback`

## Service components on VPS
- App code: `/var/www/services/decap-oauth-voorjongnederland/server.mjs`
- Systemd unit: `/etc/systemd/system/decap-oauth-voorjongnederland.service`
- Environment file: `/etc/default/decap-oauth-voorjongnederland`
- Service name: `decap-oauth-voorjongnederland.service`

## Apache routing
The SSL vhost for `voorjongnederland.nl` proxies OAuth traffic:
- `ProxyPass /decap-oauth/ http://127.0.0.1:8789/`
- `ProxyPassReverse /decap-oauth/ http://127.0.0.1:8789/`

Vhost file:
- `/etc/apache2/sites-available/voorjongnederland.nl-le-ssl.conf`

## Required GitHub OAuth App settings
- Homepage URL: `https://voorjongnederland.nl/decap-oauth`
- Authorization callback URL: `https://voorjongnederland.nl/decap-oauth/callback`

## Operational commands
Restart service:
`sudo systemctl restart decap-oauth-voorjongnederland.service`

Check service status:
`sudo systemctl --no-pager --full status decap-oauth-voorjongnederland.service`

Health check:
`curl -i https://www.voorjongnederland.nl/decap-oauth/health`

Auth redirect check:
`curl -i "https://www.voorjongnederland.nl/decap-oauth/auth"`

## Cloudflare note (for record)
During the Cloudflare Worker path, build failed with:
- `Missing entry-point to Worker script or to assets directory`

Root cause:
- `wrangler.toml` was missing in the `SproetS/decap-proxy` fork used by Cloudflare deploys.

Mitigation committed in that repo:
- Added tracked `wrangler.toml` and adjusted `.gitignore` so future deploys have an entry-point configuration.
