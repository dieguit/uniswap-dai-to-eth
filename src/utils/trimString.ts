const trimString = (
  str: string | null | undefined,
  charsLeft = 6,
  charsRight = 4
) => (str ? `${str.slice(0, 6)}...${str.slice(-4)}` : null);

export default trimString;
