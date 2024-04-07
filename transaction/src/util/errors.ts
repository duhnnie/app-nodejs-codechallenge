const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINIT', 'SIGUSR2']

export function initProcessErrorHandlers(onError: () => Promise<void>) {
  errorTypes.forEach(type => {
    process.on(type, async e => {
      try {
        console.log(`process.on ${type}`)
        console.error(e)
        await onError()
        process.exit(0)
      } catch (_) {
        process.exit(1)
      }
    })
  })

  signalTraps.forEach(type => {
    process.once(type, async () => {
      try {
        await onError()
      } finally {
        process.kill(process.pid, type)
      }
    })
  })
}
