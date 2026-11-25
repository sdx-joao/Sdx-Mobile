/** Bound native tasks too: fetch's AbortController does not cover Expo transfers. */
export async function runNativeTransfer<T>(task: { cancelAsync(): Promise<void> }, start: () => Promise<T>, timeoutMs = 60000): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      start(),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => {
          reject(new Error('Tempo limite na transferência da foto. Verifique a conexão e tente novamente.'));
          void task.cancelAsync().catch(() => {});
        }, timeoutMs);
      }),
    ]);
  } finally { if (timer) clearTimeout(timer); }
}
