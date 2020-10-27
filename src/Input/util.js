const trimStr = (str, end) => str.slice(0, end);

const overrideOperator = (input, operator) => input.replce(/[\*\/\+\-]*$/, operator);

const isOperator = (text) =>{
    return isNaN(text) && text !=="."
};

const toggleMinus = (input)=>{
    const negatedInput = unFormatNumberWithCommas(input)
    return formatNumberWithCommas(negatedInput.toString())
}

const popInput = (input) =>{
    return input.length > 1 ? input.slice(0, -1) : "0"
}

const peekInput = (input) =>{
    if(!isNaN(Number(input)) || input === "/" || input ==="+" || input ==="_")
}