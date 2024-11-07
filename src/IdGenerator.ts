/**
 * UUID 생성과 문자열 처리를 담당하는 유틸리티 클래스임
 * 시스템 전반의 고유 식별자 생성을 전담함
 */
export class IdGenerator {
  private static counter = 0;

  /**
   * UUID v4 형식의 고유 식별자를 생성하는 private 메서드임
   * 16진수와 특정 버전 표시를 이용해 UUID를 구성함
   */
  private static generateUUID(): string {
    const hex = "0123456789abcdef";
    let uuid = "";

    // 첫 번째 그룹: 8자리 랜덤 값을 생성함
    for (let i = 0; i < 8; i++) {
      uuid += hex[Math.floor(Math.random() * 16)];
    }
    uuid += "-";

    // 두 번째 그룹: 4자리 랜덤 값을 생성함
    for (let i = 0; i < 4; i++) {
      uuid += hex[Math.floor(Math.random() * 16)];
    }
    uuid += "-";

    // 세 번째 그룹: 버전 4를 나타내는 4자리를 생성함
    uuid += "4"; // UUID 버전 4를 명시적으로 표시함
    for (let i = 0; i < 3; i++) {
      uuid += hex[Math.floor(Math.random() * 16)];
    }
    uuid += "-";

    // 네 번째 그룹: 특수 비트를 포함한 4자리를 생성함
    uuid += hex[8 + Math.floor(Math.random() * 4)]; // 8,9,a,b 중 하나를 선택함
    for (let i = 0; i < 3; i++) {
      uuid += hex[Math.floor(Math.random() * 16)];
    }
    uuid += "-";

    // 다섯 번째 그룹: 12자리 랜덤 값을 생성함
    for (let i = 0; i < 12; i++) {
      uuid += hex[Math.floor(Math.random() * 16)];
    }

    return uuid;
  }

  /**
   * 문자열에서 특수문자를 제거하고 일관된 형식으로 변환하는 메서드임
   */
  static formatString(text: string): string {
    // 특수문자 데이터 가져오기
    const specialChars = '!@#$%^&*()+=[]{}|\\;:",.<>?/~`'.split("");
    let formattedText = text.toLowerCase();

    // 각 특수문자를 순회하며 언더스코어로 변환함
    specialChars.forEach((char) => {
      formattedText = formattedText.split(char).join("_");
    });

    // 연속된 언더스코어를 제거하는 처리를 진행함
    let result = "";
    let prevChar = "";

    // 문자열을 순회하며 연속된 언더스코어를 하나로 만듦
    for (let i = 0; i < formattedText.length; i++) {
      if (formattedText[i] === "_" && prevChar === "_") {
        continue; // 연속된 언더스코어는 건너뜀
      }
      result += formattedText[i];
      prevChar = formattedText[i];
    }

    // 문자열 시작과 끝의 언더스코어를 제거함
    if (result.startsWith("_")) {
      result = result.substring(1);
    }
    if (result.endsWith("_")) {
      result = result.substring(0, result.length - 1);
    }

    return result;
  }

  /**
   * 외부에서 호출할 수 있는 ID 생성 메서드임
   * prefix를 포함한 완전한 식별자를 생성함
   */
  static generate(prefix: string = "item"): string {
    return `${prefix}_${this.generateUUID()}`;
  }
}
