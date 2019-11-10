import request from '@/utils/request'

export function listComment (query) {
  return request({
    url: '/comment/list',
    method: 'get'
  })
}

export function deleteComment (data) {
  return request({
    url: '/comment/delete',
    method: 'post',
    data
  })
}
