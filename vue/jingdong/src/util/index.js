/**
 * 取出小括号内的内容
 * @param text
 * @returns {string}
 */
export function getParenthesesStr(text) {
  let result = ''
  function isObjEmpty(text) {
    if (text == null || text == '')
      return false;
  }
  if (isObjEmpty(text))
    return result
  let regex = /\((.+?)\)/g;
  let options = text.match(regex)
  if (!isObjEmpty(options)) {
    let option = options[0]
    if (!isObjEmpty(option)) {
      result = option.substring(1, option.length - 1)
    }
  }

  return result
}
