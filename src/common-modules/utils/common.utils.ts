/**
 * @module Common.Utils
 */
/** */
export class CommonUtils {
  /**
   * Detects lacked-of-value values
   * @param value Value to be tested
   * @returns True if nullable, False if not nullable
   */
  public isNullable(value: any): boolean {
      if (value !== null && value !== undefined && value !== '') {
          return !0;
      } else {
          return !1;
      }
  }

  /**
   * Parse to decimal integer
   * @param value Value to be parsed
   * @returns The parsed value
   */
  public parseToInteger(value: string): number {
    return parseInt(value, 10);
  }
}
