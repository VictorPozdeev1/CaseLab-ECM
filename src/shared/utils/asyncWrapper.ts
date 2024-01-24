// type  WrapperFunctionType=
export function asyncWrapper<T extends any[], K>(
  fn: (...args: T) => Promise<K>,
): typeof wrapperFunction {
  async function wrapperFunction(
    ...args: Parameters<typeof fn>
  ): Promise<[K, null] | [null, unknown]> {
    try {
      const data = await fn(...args);
      return [data, null];
    } catch (error) {
      console.error(error);
      return [null, error];
    }
  }

  return wrapperFunction;
}
