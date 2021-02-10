import { Result, Ok, Err } from "../Result";

export const json = <T>(value: string): Result<T, string> => {
  try {
    const res = JSON.parse(value);

    return Ok(res);
  } catch (err) {
    return Err(err.toString());
  }
};

export const float = (value: string): Result<number, string> => {
  const res = parseFloat(value);

  if (isNaN(res)) {
    return Err(`Unable to parse ${value} as a float, received NaN`);
  }

  return Ok(res);
};

export const int = (
  value: string,
  radix: number = 10
): Result<number, string> => {
  const res = parseInt(value, radix);

  if (isNaN(res)) {
    return Err(`Unable to parse ${value} as an int, received NaN`);
  }

  return Ok(res);
};

export const Parse = {
  json,
  float,
  int,
};
