import { createEntityAdapter } from '@reduxjs/toolkit';
import { CommentModel } from '../../type';

const commentAdapter = createEntityAdapter<CommentModel>({});

export const commentAdapterReference = commentAdapter;
