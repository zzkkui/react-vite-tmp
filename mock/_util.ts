export function resultSuccess<T = Recordable>(data: T, { message = 'ok' } = {}) {
  return {
    code: 0,
    data,
    message,
  }
}

export function resultPageSuccess<T = any>(page: number, pageSize: number, list: T[], { message = 'ok' } = {}) {
  const pageData = pagination(page, pageSize, list)

  return {
    ...resultSuccess({
      items: pageData,
      total: list.length,
    }),
    message,
  }
}

export function resultError(message = 'Request failed', { code = -1, data = null } = {}) {
  return {
    code,
    data,
    message,
  }
}

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * Number(pageSize)
  const ret =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize))
  return ret
}

export interface RequestParams {
  method: string
  body: any
  headers?: { authorization?: string }
  query: any
}
