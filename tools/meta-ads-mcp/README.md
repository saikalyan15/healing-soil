# Healing Soil Meta Ads MCP

This local MCP connection is pinned to `meta-ads-mcp-server@1.5.1` and starts
with Meta Ads write tools disabled. It is intended for read-only campaign
audits and reporting.

The Meta access token is read at runtime from `.env.local`, with macOS Keychain
as a fallback on macOS. `.env.local` is excluded by the repository's
`.gitignore`, and the token is not stored in `~/.codex/config.toml`.

Use `start.mjs` on Windows. On macOS, `start.sh` additionally supports Keychain
as a token fallback. Both launchers keep Meta Ads write tools disabled.

## Store the token in `.env.local`

Replace the blank placeholder in the project root's `.env.local`:

```dotenv
META_ADS_ACCESS_TOKEN=your_complete_token_here
```

Do not add spaces. Quoted values are also supported. Restart Codex/ChatGPT
after changing it.

## Store or replace the token in macOS Keychain

Copy the complete token using Meta's **Copy** button, then run this command in
Terminal:

```sh
security add-generic-password -U -a healingsoil -s healingsoil-meta-ads-mcp -w "$(pbpaste)"
pbcopy </dev/null
```

The clipboard form is required because the interactive `security -w` password
prompt can truncate long Meta access tokens. The second command clears the
clipboard after the token has been saved.

For audit access, issue the token with `ads_read`. Add
`business_management` only if Meta requires it to discover the Business
Manager ad account. Do not grant `ads_management` unless write access is
deliberately enabled later.

After updating the token, restart Codex/ChatGPT so the MCP server reconnects.

## Remove the saved token

```sh
security delete-generic-password -a healingsoil -s healingsoil-meta-ads-mcp
```
