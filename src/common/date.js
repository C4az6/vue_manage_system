// 转换年月日方法
export function formatDateTime (inputTime) {
  var timestamp3 = inputTime
  var newDate = new Date()
  newDate.setTime(timestamp3 * 1000)
  return newDate.toLocaleDateString()
}
