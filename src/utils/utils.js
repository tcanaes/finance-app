const leadingZeros = (value, strLength) => {
  let strValue = value + ''; //Transforma em STRING
  const leadAmmount = strLength - strValue.length;
  if (leadAmmount > 0)
    for (let i = 0; i < leadAmmount; i++) strValue = '0' + strValue;
  return strValue;
};

export { leadingZeros };
