import request from '@/utils/request'

export function listIssue (query) {
  return request({
    url: '/issue/list',
    method: 'get',
    params: query
  })
}
