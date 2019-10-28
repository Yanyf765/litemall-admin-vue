import request from '@/utils/request'

export function listComment (query) {
  return request({
    url: '/comment/list',
    method: 'get'
  })
}
