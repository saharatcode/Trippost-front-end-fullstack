
function cutWordLength(title, text, titleLength, textLength) {
    let titleCut
    if (title !== null) {
        const titleStr = title
        const titleResult = titleStr.slice(0, titleLength)
        titleCut = (<>{titleResult}</>)
        if (titleStr.length > titleLength) {
            titleCut = (<>{titleResult} ...</>)
        }
    }

    let textCut;
    if (text !== null) {
        const str = text
        const textResult = text.slice(0, textLength)
        textCut = (<>{textResult}</>)
        if (str.length > textLength) {
            textCut = (<>{textResult} ...</>)
        }
    }

    return {titleCut, textCut}
}

export default cutWordLength;