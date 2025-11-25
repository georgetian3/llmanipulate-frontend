pnpm i
# pnpm run build


# # server.js is created by next build from the standalone output
# # https://nextjs.org/docs/pages/api-reference/next-config-js/output
# ENV HOSTNAME="0.0.0.0"
# CMD ["node", "server.js"]
$env:HOSTNAME = '127.0.0.1'
$env:PORT = 7000
cd .next/standalone
node server.js