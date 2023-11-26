import { QueryClient } from '@tanstack/query-core';
import api, { axiosPrivate } from './axios';

export const queryClient = new QueryClient();

// 게시판 정보 가져오는 함수
export async function fetchEvents(endpoint) {
  const response = await axiosPrivate().get(endpoint, { withCredentials: true });

  if (response.status !== 200) {
    const error = new Error('게시판 정보를 가져오는데 실패했습니다.');
    error.code = response.status;
    error.info = response.data;
    throw error;
  }

  const events = response.data;

  return events;
}

// 작성된 게시판 텍스트 정보를 보내는 함수
export async function createNewEvent(eventData) {
  const response = await api.post('/post', eventData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });

  if (response.status !== 200) {
    const error = new Error('게시글 작성에 실패했습니다.');
    error.code = response.status;
    error.info = response.data;
    throw error;
  }

  const event = response.data;

  return event;
}

// 게시글 삭제하는 함수
export async function deleteEvent(postId) {
  const response = await axiosPrivate().delete(`/post/${postId}`);

  if (response.status !== 200) {
    const error = new Error('게시글 삭제에 실패했습니다.');
    error.code = response.status;
    error.info = response.data;
    throw error;
  }

  const event = response.data;

  return event;
}

// 게시글 업데이트 함수
export async function updateEvent({postId, eventData}) {
  console.log('Sending update request with postId and eventData:', postId, eventData);
  const response = await api.put(`/post/${postId}`, eventData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });

  if (response.status !== 200) {
    const error = new Error('게시글 수정에 실패했습니다.');
    error.code = response.status;
    error.info = response.data;
    throw error;
  }

  const event = response.data;

  return event;
}
