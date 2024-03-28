import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export function formatUtc(utcString: string, format: string = 'YYYY/MM/DD HH:mm:ss') {
  const dataTime = dayjs.utc(utcString).utcOffset(8).format(format)
  return dataTime
}
