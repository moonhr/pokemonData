import { IdGenerator } from "./IdGenerator";

describe("IdGenerator", () => {
  // UUID 형식 검증 테스트
  test("generateUUID() should return a valid UUID v4 format", () => {
    const uuid = (IdGenerator as any).generateUUID(); // private 메서드를 테스트하려면 타입 단언이 필요함
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

    // UUID 형식이 맞는지 확인
    expect(uuid).toMatch(uuidRegex);
  });

  // formatString() 메서드의 특수문자 변환 테스트
  test("formatString() should replace special characters with underscores", () => {
    const input = "Hello!@#$World";
    const expected = "hello_world";

    // 특수문자가 언더스코어로 바뀌었는지 확인
    expect(IdGenerator.formatString(input)).toBe(expected);
  });

  // 연속된 언더스코어가 하나로 바뀌는지 테스트
  test("formatString() should remove consecutive underscores", () => {
    const input = "Hello__World";
    const expected = "hello_world";

    expect(IdGenerator.formatString(input)).toBe(expected);
  });

  // 문자열 시작과 끝의 언더스코어 제거 테스트
  test("formatString() should remove leading and trailing underscores", () => {
    const input = "_HelloWorld_";
    const expected = "helloworld";

    expect(IdGenerator.formatString(input)).toBe(expected);
  });

  // generate() 메서드 테스트
  test("generate() should return a string with prefix and UUID", () => {
    const prefix = "item";
    const generatedId = IdGenerator.generate(prefix);

    // `prefix_UUID` 형태로 반환되는지 확인
    expect(generatedId).toMatch(
      /^item_[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    );
  });

  // 기본 prefix 값인 "item"을 사용하여 generate() 메서드 테스트
  test('generate() should return a string with default prefix "item"', () => {
    const generatedId = IdGenerator.generate();

    // 기본 prefix인 "item_"과 UUID 형태로 반환되는지 확인
    expect(generatedId).toMatch(
      /^item_[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    );
  });
});
