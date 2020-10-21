import request from '@/utils/request'
export const getComment = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
// 对评论点赞
export const addLike = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target
    }
  })
}
// 取消评论点赞
export const deleteLike = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${target}`
  })
}
// 添加评论或评论回复
export const addComment = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
