/* eslint-disable security/detect-object-injection */
import dayjs from 'dayjs'
import winston from 'winston'

import { COLORS } from '@/constants/logger.const'

// ฟังก์ชันสำหรับสร้าง ANSI color string
function applyColor(value: unknown, colorCode: string): string {
  return `\x1b[${colorCode}m${String(value)}\x1b[0m`
}

// ฟังก์ชันสำหรับ format ค่าเดี่ยวตามประเภทข้อมูล
function formatValue(value: unknown): string {
  if (typeof value === 'string') return applyColor(`"${value}"`, COLORS.string)
  if (typeof value === 'number') return applyColor(value, COLORS.number)
  if (typeof value === 'boolean') return applyColor(value, COLORS.boolean)
  if (typeof value === 'function') return applyColor(value, COLORS.function)
  if (value === undefined) return applyColor(value, COLORS.undefined)
  if (value === null) return applyColor(value, COLORS.null)

  return formatJSON(value as Record<string, unknown>) // ส่งต่อไปยัง formatJSON สำหรับ object
}

// ฟังก์ชันสำหรับ format JSON object
function formatJSON(obj: Record<string, unknown> | null, indent = 0): string {
  if (typeof obj !== 'object' || obj === null) return formatValue(obj)
  if (Object.keys(obj).length === 0) return '{}'

  const indentStr = ' '.repeat(indent)
  let result = '{'
  const keys = Object.keys(obj)

  keys.forEach((key, index) => {
    const value = obj[key]
    const formattedValue =
      typeof value === 'object' && value !== null
        ? formatJSON(value as Record<string, unknown>, indent + 2)
        : formatValue(value)

    result += `\n${indentStr}  ${applyColor(
      `"${key}"`,
      COLORS.field
    )}: ${formattedValue}`
    if (index < keys.length - 1) result += ','
  })

  result += `\n${indentStr}}`
  return result
}

// สร้าง custom format สำหรับ Winston
const colorizedFormat = winston.format.printf(({ level, message }) => {
  const time = `[${dayjs().format('HH:mm:ss.SSS')}]`
  const levelUpper = level.toUpperCase()
  const levelColor = COLORS[level as keyof typeof COLORS] || COLORS.info
  const formattedLevel = applyColor(`${levelUpper}:`, levelColor)

  // จัดการ message ตามประเภท
  if (Array.isArray(message)) {
    const formattedArgs = message.map(formatValue).join(' ')
    return `${time} ${formattedLevel} ${formattedArgs}`
  }

  const formattedArg = formatValue(message)
  return `${time} ${formattedLevel} ${formattedArg}`
})

// สร้าง logger
export const logger = winston.createLogger({
  level: 'info',
  levels: {
    crit: 0,
    error: 1,
    warn: 2,
    info: 3,
  },
  format: colorizedFormat,
  transports: [new winston.transports.Console()],
})

// example
// logger.info('Hello World')
// logger.info(['สวัสดี World', 1, false, null, undefined, { foo: 'bar' }])
